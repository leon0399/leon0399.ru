interface FrontMatter {
  __resourcePath: string
  // And so on...
}

declare module '*.mdx' {
  let MDXComponent: (props: any) => JSX.Element
  export default MDXComponent
  export const frontMatter: FrontMatter[]
  export const _importMeta: { absolutePath: string; importedPath: string }[]
}
