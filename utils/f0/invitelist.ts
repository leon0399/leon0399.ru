import { MerkleTree } from 'merkletreejs';
import { keccak256, solidityKeccak256 } from "ethers/lib/utils"

class InviteList {
  readonly addresses: string[]
  readonly hashedAddresses: Buffer[]
  readonly tree: MerkleTree

  constructor(addresses: string[]) {
    this.addresses = addresses
    this.hashedAddresses = addresses.map(this.hash)
    this.tree = new MerkleTree(this.hashedAddresses, keccak256, { sortPairs: true })
  }

  hash(address: string) {
    return Buffer.from(solidityKeccak256(['address'], [address]).slice(2), 'hex')
  }

  root() {
    return this.tree.getHexRoot()
  }

  proof(address: string) {
    return this.tree.getHexProof(this.hash(address))
  }

  verify(address: string, proof: any[]) {
    return this.tree.verify(proof, this.hash(address), this.root())
  }
}

export default InviteList
