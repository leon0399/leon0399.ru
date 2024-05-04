import { Bot } from 'grammy'
import { type NextApiRequest, type NextApiResponse } from 'next'

const bot = new Bot(process.env.LOVE_TG_BOT_TOKEN!)
const receivers = process.env.LOVE_TG_BOT_RECEIVERS?.split(',') || []

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>,
) {
  const messages = []

  for (const receiver of receivers) {
    messages.push(
      await bot.api.sendMessage(receiver, '💌 Someone sent you a love letter!'),
    )
  }

  return res.status(200).send(`Sent ${messages.length} love letters!`)
}
