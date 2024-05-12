import { BotError } from 'grammy'
import { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect'

import { logger } from '@/utils/logger'
import { bot, startTelegramBotInDev } from '@/utils/tg-love-bot'

const router = createRouter<NextApiRequest, NextApiResponse>()

router
  .get((req, _res, next) => {
    if (process.env.NODE_ENV === 'development') {
      next()
    }
  })
  .get(async (req, res) => {
    try {
      if (req.query && req.query.action !== 'start') {
        res.status(500).send({ error: { message: 'Wrong gateway.' } })
        return
      }

      await startTelegramBotInDev()
      res.status(200).send('ok')
    } catch (error) {
      res.status(500).json({ error })
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
