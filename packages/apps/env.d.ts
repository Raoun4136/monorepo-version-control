/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_API_KEY: string;
    NEXT_PUBLIC_NODE_ENV: 'development' | 'staging' | 'production';
  }
}
