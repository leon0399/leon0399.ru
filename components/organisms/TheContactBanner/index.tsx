import 'twin.macro'

import { Icon } from '@iconify/react'
import React, { type FC } from 'react'

const TheContactBanner: FC<JSX.IntrinsicElements['section']> = (props) => (
  <section
    tw="
      mx-auto w-full max-w-4xl rounded-2xl border border-indigo-800 bg-indigo-600 px-12 py-10
      text-center text-gray-100 md:text-left
      dark:border-indigo-600 dark:bg-indigo-300 dark:text-gray-900
    "
    {...props}
  >
    <h2 tw="text-3xl/[150%] font-bold md:text-5xl">Contact me</h2>
    <p tw="my-2 text-gray-200 md:text-lg dark:text-gray-800">
      I’m always looking forward for new opportunities, and my inbox is always
      open. Whether you have a question or just want to say hi, I’ll try my best
      to get back to you!
    </p>
    <div tw="mt-6 space-y-4 md:space-x-4 md:space-y-0">
      <a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        tw="
          flex h-12
          items-center justify-center
          rounded-lg bg-gray-100 px-6
          text-center text-sm font-semibold text-gray-900
          ring-offset-2 hover:bg-gray-200
          focus:outline-none focus:ring md:inline-flex dark:bg-gray-900
          dark:text-gray-100 dark:hover:bg-gray-800
        "
      >
        Download Résumé
        <Icon icon={'heroicons-outline:arrow-down-tray'} tw="ml-4 size-6" />
      </a>
      <a
        href="https://t.me/leon0399"
        target="_blank"
        rel="noopener noreferrer"
        tw="
          flex h-12
          items-center justify-center rounded-lg
          bg-transparent px-6 text-center
          text-sm font-semibold text-gray-100 ring-offset-2
          hover:bg-indigo-500 focus:outline-none
          focus:ring md:inline-flex dark:text-gray-900 dark:hover:bg-indigo-200
        "
      >
        Telegram me
      </a>
      <a
        href="mailto:hello@leon0399.ru"
        target="_blank"
        rel="noopener noreferrer"
        tw="
          flex h-12
          items-center justify-center rounded-lg
          bg-transparent px-6 text-center
          text-sm font-semibold text-gray-100 ring-offset-2
          hover:bg-indigo-500 focus:outline-none
          focus:ring md:inline-flex dark:text-gray-900 dark:hover:bg-indigo-200
        "
      >
        Hit me an email
      </a>
    </div>
  </section>
)

export default TheContactBanner
