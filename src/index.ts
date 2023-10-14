import {Context, Schema} from 'koishi'
import {isValidateInput, pingIP} from "./utils/PingUtils";

export const name = 'ping'

export interface Config {
}

export const Config: Schema<Config> = Schema.object({})

export function apply(ctx: Context) {
  ctx.command('ping <message:text>', 'ping指定的ip或域名').action(async (_, ip) => {
    const available = isValidateInput(ip)
    if (available) {
      return await pingIP(ip)
    } else return '请输入正确的ip或域名。'
  })
}
