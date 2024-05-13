import { openai } from '@ai-sdk/openai'
import { generateText } from 'ai'
import { Bot, Context } from 'grammy'

import { logger } from './logger'

const receivers = (process.env.LOVE_TG_BOT_RECEIVERS + '').split(',') || []

const model = openai('gpt-4o', {
  // additional settings
})
const prompt =
  'Напиши короткое, немного забавное, романтичное и немного сексуальное любовное письмо на 100 слов своей любимой жене.\n' +
  'У нас нет детей.\n' +
  'Письмо должно быть написано на русском языке.\n' +
  'Подпиши письмо от имени мужа.\n' +
  'Не забудь добавить emoji.'

export const bot = new Bot<Context>(process.env.LOVE_TG_BOT_TOKEN!)

bot.command('generate', async (ctx) => {
  const message = await ctx.reply('Generating...')

  const { text } = await generateText({
    model,
    prompt,
    temperature: 1.2,
  })

  await ctx.api.editMessageText(ctx.chat.id, message.message_id, text, {
    parse_mode: 'HTML',
  })
})

bot.command('send', async (ctx) => {
  const message = await ctx.reply('Sending message...')

  const test_parts = ctx.message!.text.split(' ')
  const text = test_parts.slice(1).join(' ')

  const messages = []
  for (const receiver of receivers) {
    messages.push(
      await bot.api.sendMessage(
        receiver,
        '<span class="tg-spoiler">' + text + '</span>',
        {
          parse_mode: 'HTML',
        },
      ),
    )
  }

  await ctx.api.editMessageText(
    ctx.chat.id,
    message.message_id,
    `Sent ${messages.length} love letters with text:\n\n${text}`,
  )
})

const handleGracefulShutdown = async () => {
  logger.info('shutdown')

  await bot.stop()

  process.exit()
}

if (process.env.NODE_ENV === 'development') {
  // Graceful shutdown handlers
  process.once('SIGTERM', handleGracefulShutdown)
  process.once('SIGINT', handleGracefulShutdown)
}

export const startTelegramBotInDev = async () => {
  if (!bot.isInited()) {
    bot
      .start({
        onStart: ({ username }) => {
          logger.info({
            msg: 'bot running...',
            username,
            at: new Date(),
          })
        },
      })
      .catch((err) => logger.error(err))
  }
}

export const startTelegramBotInProduction = async () => {
  const webhookUrl = `https://${process.env.VERCEL_URL}/api/love-bot/webhook?token=${process.env.LOVE_TG_BOT_WEBHOOK_TOKEN}`

  try {
    logger.info('fetching  webhook info')
    const webhookInfo = await bot.api.getWebhookInfo()
    logger.info(`existing webhook info fetched: ${webhookInfo.url}`)

    if (webhookInfo.url === webhookUrl) {
      logger.info("Sorry, same url, i don't wanna waste my time here.")
    } else {
      logger.info('deleting existing webhook')
      await bot.api.deleteWebhook()
      console.info('existing webhook deleted')

      logger.info(`setting new webhook to: ${webhookUrl}`)
      await bot.api.setWebhook(webhookUrl)
      console.info(`bot webhook set to: ${webhookUrl}`)
    }
  } catch (err) {
    console.error('failed to delete/set webhook url', err)
  }
}
