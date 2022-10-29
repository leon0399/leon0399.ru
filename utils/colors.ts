export function isDark(c: string) {
  c = c.substring(1) // strip #
  const rgb = parseInt(c, 16) // convert rrggbb to decimal
  // eslint-disable-next-line prettier/prettier
  const r = (rgb >> 16) & 0xFF // extract red
  // eslint-disable-next-line prettier/prettier
  const g = (rgb >> 8) & 0xFF // extract green
  // eslint-disable-next-line prettier/prettier
  const b = (rgb >> 0) & 0xFF // extract blue
  const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b // per ITU-R BT.709
  return luma < 128
}
