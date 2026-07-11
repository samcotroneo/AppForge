#!/usr/bin/env node
import { cp, mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { createInterface } from 'node:readline/promises'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const packageRoot = path.resolve(__dirname, '..')
const sourcePackagePath = path.join(packageRoot, 'package.json')

const templateEntries = [
  '.github',
  'CLAUDE.md',
  'README.md',
  'capacitor.config.ts',
  'docs',
  'eslint.config.js',
  'index.html',
  'public',
  'src',
  'tsconfig.app.json',
  'tsconfig.json',
  'tsconfig.node.json',
  'vite.config.ts',
]

const gitignoreTemplate = `# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
`

const launchTargetPresets = [
  {
    key: 'web',
    label: 'Web only',
    nativeTargets: [],
  },
  {
    key: 'android',
    label: 'Android only',
    nativeTargets: ['android'],
  },
  {
    key: 'ios',
    label: 'iOS only',
    nativeTargets: ['ios'],
  },
  {
    key: 'android-ios',
    label: 'Android + iOS',
    nativeTargets: ['android', 'ios'],
  },
]

function usage() {
  return [
    'AppForge starter CLI',
    '',
    'Usage:',
    '  npx @samcotroneo/appforge init [directory]',
    '',
    'Options:',
    '  --name <name>   Override the generated package name',
    '  --targets <preset>  Set web, android, ios, both, or native targets without prompting',
    '  --force         Overwrite existing files',
  ].join('\n')
}

function normalizePackageName(value) {
  const normalized = value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
  return normalized || 'appforge-app'
}

function getPresetByKey(key) {
  return launchTargetPresets.find((preset) => preset.key === key)
}

function parseTargetsInput(value) {
  const normalized = value.trim().toLowerCase()

  if (!normalized || normalized === '4' || normalized === 'default') {
    return getPresetByKey('android-ios')
  }

  if (normalized === '1' || normalized === 'web' || normalized === 'web-only' || normalized === 'browser') {
    return getPresetByKey('web')
  }

  if (normalized === '2' || normalized === 'android') {
    return getPresetByKey('android')
  }

  if (normalized === '3' || normalized === 'ios') {
    return getPresetByKey('ios')
  }

  if (
    normalized === '4' ||
    normalized === 'both' ||
    normalized === 'android-ios' ||
    normalized === 'android+ios' ||
    normalized === 'native'
  ) {
    return getPresetByKey('android-ios')
  }

  return undefined
}

function parseTargetsFlag(value) {
  const normalized = value.trim().toLowerCase()

  if (!normalized || normalized === 'default') {
    return getPresetByKey('android-ios')
  }

  if (normalized === 'web' || normalized === 'web-only' || normalized === 'browser' || normalized === 'none') {
    return getPresetByKey('web')
  }

  if (normalized === 'android') {
    return getPresetByKey('android')
  }

  if (normalized === 'ios') {
    return getPresetByKey('ios')
  }

  if (
    normalized === 'android,ios' ||
    normalized === 'ios,android' ||
    normalized === 'both' ||
    normalized === 'android-ios' ||
    normalized === 'android+ios' ||
    normalized === 'native'
  ) {
    return getPresetByKey('android-ios')
  }

  return undefined
}

async function promptLaunchTargets() {
  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    return getPresetByKey('android-ios')
  }

  const readline = createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  try {
    console.log('Which native targets do you want AppForge to prepare?')
    for (const [index, preset] of launchTargetPresets.entries()) {
      console.log(`  ${index + 1}. ${preset.label}`)
    }

    while (true) {
      const answer = await readline.question('Choose 1-4 [4]: ')
      const preset = parseTargetsInput(answer)
      if (preset) {
        return preset
      }

      console.log('Please choose 1-4, or use web, android, ios, both, native, or android,ios.')
    }
  } finally {
    readline.close()
  }
}

async function ensureTargetDirectory(targetPath, force) {
  try {
    const entries = await readdir(targetPath)
    if (entries.length > 0 && !force) {
      throw new Error(`Target directory is not empty: ${targetPath}`)
    }
  } catch (error) {
    if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
      await mkdir(targetPath, { recursive: true })
      return
    }

    if (error instanceof Error && error.message.startsWith('Target directory is not empty:')) {
      throw error
    }

    throw error
  }
}

async function copyStarterEntries(targetPath, force) {
  for (const entry of templateEntries) {
    const sourcePath = path.join(packageRoot, entry)
    const targetEntryPath = path.join(targetPath, entry)
    await cp(sourcePath, targetEntryPath, {
      recursive: true,
      force,
      errorOnExist: false,
    })
  }

  await writeFile(path.join(targetPath, '.gitignore'), gitignoreTemplate)
}

async function readJson(filePath) {
  return JSON.parse(await readFile(filePath, 'utf8'))
}

async function writeJson(filePath, value) {
  await writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`)
}

async function scaffoldPackageFiles(targetPath, generatedName) {
  const templatePackage = await readJson(sourcePackagePath)

  const packageJson = {
    name: generatedName,
    private: true,
    version: templatePackage.version,
    type: templatePackage.type,
    description: templatePackage.description,
    scripts: templatePackage.scripts,
    dependencies: templatePackage.dependencies,
    devDependencies: templatePackage.devDependencies,
  }

  const lockfile = {
    name: generatedName,
    version: templatePackage.version,
    lockfileVersion: 3,
    requires: true,
    packages: {
      '': {
        name: generatedName,
        version: templatePackage.version,
        dependencies: templatePackage.dependencies,
        devDependencies: templatePackage.devDependencies,
        bin: templatePackage.bin,
      },
    },
  }

  await writeJson(path.join(targetPath, 'package.json'), packageJson)
  await writeJson(path.join(targetPath, 'package-lock.json'), lockfile)
}

async function initCommand(args) {
  let directoryArg = '.'
  let requestedName
  let targetsArg
  let force = false

  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index]

    if (arg === '--force') {
      force = true
      continue
    }

    if (arg === '--name') {
      requestedName = args[index + 1]
      if (!requestedName || requestedName.startsWith('-')) {
        throw new Error('Missing value for --name.')
      }
      index += 1
      continue
    }

    if (arg === '--targets') {
      targetsArg = args[index + 1]
      if (!targetsArg || targetsArg.startsWith('-')) {
        throw new Error('Missing value for --targets.')
      }
      index += 1
      continue
    }

    if (!arg.startsWith('-') && directoryArg === '.') {
      directoryArg = arg
    }
  }

  const targetPath = path.resolve(process.cwd(), directoryArg)
  const targetPreset = targetsArg ? parseTargetsFlag(targetsArg) : await promptLaunchTargets()

  if (!targetPreset) {
    throw new Error(
      'Invalid native target selection. Use web, android, ios, both, native, or android,ios.',
    )
  }

  await ensureTargetDirectory(targetPath, force)
  await copyStarterEntries(targetPath, force)
  await scaffoldPackageFiles(targetPath, normalizePackageName(requestedName ?? path.basename(targetPath)))

  const bootstrapConfig = {
    bootstrapCommand: 'npx @samcotroneo/appforge init',
    launchTargets: ['web', ...targetPreset.nativeTargets],
    nativeTargets: targetPreset.nativeTargets,
    selectedPreset: targetPreset.key,
  }

  await writeJson(path.join(targetPath, 'appforge.config.json'), bootstrapConfig)

  console.log(`Initialized AppForge starter in ${targetPath}`)
  console.log(`Selected launch targets: ${targetPreset.label}`)
  console.log('Next: run npm install, then customize the app name and product-specific settings.')
}

async function main() {
  const [command, ...args] = process.argv.slice(2)

  if (!command || command === '--help' || command === '-h' || command === 'help') {
    console.log(usage())
    return
  }

  if (command === 'init') {
    await initCommand(args)
    return
  }

  throw new Error(`Unknown command: ${command}`)
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : 'Unknown AppForge CLI failure')
  process.exitCode = 1
})
