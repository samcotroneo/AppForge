export type StarterContractLayerStatus = 'ready' | 'documented' | 'planned'

export type StarterContractLayer = {
  title: string
  detail: string
  status: StarterContractLayerStatus
}

export type FreshRepoStep = {
  title: string
  detail: string
}

export type StarterContract = {
  name: string
  prompt: string
  bootstrapCommand: string
  bootstrapArtifacts: string[]
  layers: StarterContractLayer[]
  requiredDocs: string[]
  freshRepoSteps: FreshRepoStep[]
}

export const starterContract: StarterContract = {
  name: 'AppForge starter template',
  prompt:
    'Use npx @samcotroneo/appforge init to install the AppForge sample, choose the desired native targets, then build X app using it as a base.',
  bootstrapCommand: 'npx @samcotroneo/appforge init',
  bootstrapArtifacts: ['appforge.config.json'],
  layers: [
    {
      title: 'Base app shell',
      detail: 'The existing SolidJS route tree, shell layout, and starter screens are the canonical app foundation.',
      status: 'ready',
    },
    {
      title: 'Reusable starter contract',
      detail: 'The new contract module will describe the base app, reusable seams, and the bootstrap sequence for fresh repos.',
      status: 'planned',
    },
    {
      title: 'Agent workflow guidance',
      detail: 'The repo already documents how agents should read the starter and decide what to replace first.',
      status: 'documented',
    },
  ],
  requiredDocs: [
    'README.md',
    'docs/agent-workflows.md',
    'CLAUDE.md',
    '.github/copilot-instructions.md',
  ],
  freshRepoSteps: [
    {
      title: 'Read the contract and docs first',
      detail:
        'Load the starter contract before editing so the agent understands the base app, the reusable seams, and the repo-specific instructions.',
    },
    {
      title: 'Keep the AppForge shell as the base',
      detail:
        'Use the starter app as the canonical scaffold while the new product replaces only the sample routes and feature slices that need to change.',
    },
    {
      title: 'Specialize the app in one pass',
      detail:
        'Replace placeholder features with the target product domain, then wire any new adapters behind src/lib boundaries.',
    },
    {
      title: 'Validate the delivery paths',
      detail: 'Run lint, unit tests, build, and native sync before handing the repo back to the user.',
    },
  ],
}
