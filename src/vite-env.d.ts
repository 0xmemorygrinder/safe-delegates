/// <reference types="vite/client" />

  interface ImportMetaEnv {
    VITE_APP_NAME: string
    VITE_PROJECT_ID: string
    VITE_ENABLE_TESTNETS: string
  }

interface ImportMeta {
  env: ImportMetaEnv
}