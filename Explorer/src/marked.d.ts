declare module 'marked' {
  export class Renderer {
    [name: string]: any;
  }

  export interface MarkedOptions {
    renderer?: Renderer;
    baseUrl?: string;
    breaks?: boolean;
    gfm?: boolean;
    headerIds?: boolean;
    headerPrefix?: string;
    langPrefix?: string;
    mangle?: boolean;
    pedantic?: boolean;
    silent?: boolean;
    smartLists?: boolean;
    smartypants?: boolean;
    xhtml?: boolean;
    highlight?(code: string, lang: string, callback?: (error: any | undefined, code: string) => void): string;
    [key: string]: any;
  }

  export function marked(src: string, options?: MarkedOptions): string;
  export function use(...extensions: any[]): void;
}