import { type } from '@camwiegert/typical'
import React, { memo, useEffect, useRef } from 'react'

// const memo: <T>(component: T) => T = baseMemo

export interface Props<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends React.ComponentType<any> | keyof JSX.IntrinsicElements,
> {
  steps: Parameters<typeof type>[1]
  loop?: number
  className?: string
  wrapper?: T
}

const Typical = <
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends React.ComponentType<any> | keyof JSX.IntrinsicElements,
>({
  steps,
  loop,
  wrapper = 'p',
  ...props
}: Props<T> & React.ComponentProps<T>) => {
  const typicalRef = useRef<HTMLElement>(null)
  const Component = wrapper

  useEffect(() => {
    if (loop === Infinity) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      type(typicalRef.current!, ...steps, type)
    } else if (typeof loop === 'number') {
      const timesStep = Array(loop).fill(steps).flat()
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      type(typicalRef.current!, ...timesStep)
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      type(typicalRef.current!, ...steps)
    }

    return () => {
      // alive.current = false
    }
  }, [typicalRef, loop, steps])

  return <Component ref={typicalRef} {...props} />
}

export default memo(Typical) as typeof Typical
