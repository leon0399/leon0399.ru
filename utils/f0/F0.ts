import abi from './abi.json'
import InviteList from './invitelist'

// @ts-ignore
import { dtoc } from 'ipfsh'
import { Contract } from "@ethersproject/contracts"

import type { Provider } from "@ethersproject/abstract-provider"
import type { Signer } from "@ethersproject/abstract-signer"
import type { BigNumber } from 'ethers'
import type { F0Interface } from './types'

export interface F0Config {
  contractAddress: string
  providerOrSigner: Provider | Signer
}

export interface InviteCondition {
  limit: number
  start: Date
  price: BigNumber
}

export interface Invite {
  name: string
  key: string
  cid: string
  list?: InviteList
  condition: InviteCondition
}

export class F0 implements F0Interface {
  readonly contract: Contract

  constructor(options: F0Config) {
    this.contract = new Contract(options.contractAddress, abi, options.providerOrSigner)
  }

  name(): Promise<string> {
    return this.contract.name()
  }

  symbol(): Promise<string> {
    return this.contract.symbol()
  }

  async invites() {
    const inviteEvents = await this.contract.queryFilter(this.contract.filters.Invited())

    return await Promise.all(
      inviteEvents.map(
        async (event) => {
          const condition: Record<string, BigNumber> = await this.contract.invite(event.args!.key)

          const invite: Invite = {
            name: event.args!.key,
            key: event.args!.key,
            cid: dtoc(event.args!.cid),
            condition: {
              limit: condition.limit.toNumber(),
              price: condition.price,
              start: new Date(condition.start.toNumber() * 1000),
            },
          }

          if (invite.key === '0x0000000000000000000000000000000000000000000000000000000000000000') {
            invite.name = 'Public mint'

            return invite
          }

          const request = await fetch(`https://ipfs.io/ipfs/${invite.cid}`)
          const response: { name: string, addresses: string[] } = await request.json()

          invite.name = response.name
          invite.list = new InviteList(response.addresses)

          return invite
        }
      )
    )
  }
}
