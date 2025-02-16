declare module NodeJS {
  interface Require {
    context: (
      directory: string,
      useSubdirectories: boolean,
      regExp: RegExp
    ) => __WebpackModuleApi.RequireContext;
  }
}
