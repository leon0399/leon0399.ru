declare module 'react-typical' {
  import FC from 'react'

  interface TypicalProps {
    steps: (string | number)[]
    loop: number
  }

  declare const Typical: FC<TypicalProps>

  export default Typical
}
