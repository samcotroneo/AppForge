/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string
  readonly VITE_PUBLIC_AUTH_CLIENT_ID?: string
  readonly VITE_ENABLE_MOCK_DATA?: string
  readonly VITE_ENABLE_EXPERIMENTAL_WORKSPACE?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
