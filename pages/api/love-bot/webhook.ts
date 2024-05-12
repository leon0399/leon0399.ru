import { BotError, webhookCallback } from 'grammy'
import { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect'

import { logger } from '@/utils/logger'
import { bot, startTelegramBotInProduction } from '@/utils/tg-love-bot'

const router = createRouter<NextApiRequest, NextApiResponse>()

router
  .all((req, _res, next) => {
    if (process.env.NODE_ENV === 'production') {
      next()
    }
  })
  .all((req, res, next) => {
    if (
      req.query &&
      req.query.token !== process.env.LOVE_TG_BOT_WEBHOOK_TOKEN
    ) {
      res.status(500).send({ error: { message: 'Wrong gateway.' } })
    }

    next()
  })
  .post(webhookCallback(bot, 'next-js'))
  .get(async (req, res) => {
    // this is used to automatically setup your webhook by visiting https://my-secrete-webapp.tld/api/telegram-webhook?token=[YOUR-BOT-TOKEN]
    // replace [YOUR-BOT-TOKEN] with your telegram bot token
    // only do so after you have deployed your bot in production
    try {
      await startTelegramBotInProduction()
    } catch (err) {
      console.error('telegram bot error', err)
    } finally {
      res.status(200).send('ok')
    }
  })

export default router.handler({
  onError(err, req, res) {
    if (err instanceof BotError) {
      res.status(200).send({})
    } else {
      logger.error(err)
      res.status(500).end('Something broke!')
    }
  },
})
