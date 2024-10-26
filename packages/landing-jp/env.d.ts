/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_API_KEY: string;
    MY_ENV: string;
    MORE_ENV: string;
    LOCALE_ENV: string;
    LANDING_ENV: string;
  }
}
