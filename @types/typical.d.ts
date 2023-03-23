declare module '@camwiegert/typical' {
  async function type(
    node: HTMLOrSVGElement,
    ...args: Array<string | number | function>
  ): Promise<void>
}
