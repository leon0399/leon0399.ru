'use server'

import { openai } from '@ai-sdk/openai'
import { generateText } from 'ai'
import { Bot } from 'grammy'
import { type NextApiRequest, type NextApiResponse } from 'next'

const bot = new Bot(process.env.LOVE_TG_BOT_TOKEN!)
const receivers = process.env.LOVE_TG_BOT_RECEIVERS?.split(',') || []

const model = openai('gpt-3.5-turbo', {
  // additional settings
})
const prompt =
  'Напиши любовное письмо на 100 слов своей любимой жене.\n' +
  'Письмо должно быть написано на русском языке.\n' +
  'Подпиши письмо "Твой любящий муж".\n'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  const { text, finishReason, usage } = await generateText({
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
}
