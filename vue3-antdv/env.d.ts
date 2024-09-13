/** @format */

/// <reference types="vite/client" />
declare module '*.vue' {
  import { ComponentOptions } from 'vue';
  const componentOptions: ComponentOptions;
  export default componentOptions;
}
declare module '*.less' {
  const classes: { readonly [key: string]: any };
  export default classes;
}
declare module '*.module.less' {
  const classes: { readonly [key: string]: any };
  export default classes;
}
