'use server'

import { openai } from '@ai-sdk/openai'
import { generateText } from 'ai'
import { type NextApiRequest, type NextApiResponse } from 'next'
import { createRouter } from 'next-connect'

import { bot } from '@/utils/tg-love-bot'

const receivers = (process.env.LOVE_TG_BOT_RECEIVERS + '').split(',') || []

const model = openai('gpt-3.5-turbo', {
  // additional settings
})
const prompt =
  'Напиши короткое, немного забавное, романтичное и немного сексуальное любовное письмо на 100 слов своей любимой жене.\n' +
  'У нас нет детей.\n' +
  'Письмо должно быть написано на русском языке.\n' +
  'Подпиши письмо от имени мужа.\n' +
  'Не забудь добавить emoji.'

const router = createRouter<NextApiRequest, NextApiResponse>()

router
  .all((req, _res, next) => {
    if (
      req.query &&
      req.query.token === process.env.LOVE_TG_BOT_WEBHOOK_TOKEN
    ) {
      next()
    }
  })
  .get(async (req, res) => {
    const { text } = await generateText({
      model,
      prompt,
      temperature: 1.2,
    })

    const formattedText = text

    const messages = []
    for (const receiver of receivers) {
      messages.push(
        await bot.api.sendMessage(
          receiver,
          '<span class="tg-spoiler">' + formattedText + '</span>',
          {
            parse_mode: 'HTML',
          },
        ),
      )
    }

    return res
      .status(200)
      .setHeader('Content-Type', 'text/plain; charset=utf-8')
      .send(`Sent ${messages.length} love letters with text: ${text}`)
  })

export default router.handler()
