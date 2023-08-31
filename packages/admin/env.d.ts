declare module "process" {
  global {
    namespace NodeJS {
      interface ProcessEnv {
        readonly VITE_WEB_API_URL: string;
        readonly VITE_MOCK_SIN_IN_PW: string;
      }
    }
  }
}
