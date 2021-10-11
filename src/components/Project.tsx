import React, { useState } from "react"
import { useContractFunction } from '@usedapp/core'
import { Contract } from '@ethersproject/contracts'
import { Interface } from '@ethersproject/abi'
import { parseEther } from '@ethersproject/units'
import { BigNumber } from '@ethersproject/bignumber'

import { CONTRACT_ADDRESS, CONTRACT_ABI } from "rinkeby"

interface ProjectProps {
  projectId: number
  name: string
  treasurer: string
  bidder: string
  reserve: string
  bid: string
  funded: boolean
}

const Project: React.FC<ProjectProps> = (props) => {
  const { projectId, name, reserve, bid } = props
  const [myBid, setMyBid] = useState(0)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setMyBid(Number(event.target.value) || 0)
  const contract = new Contract(CONTRACT_ADDRESS, new Interface(CONTRACT_ABI))
  const { state, send } = useContractFunction(contract, 'bid')
  const isMining = state.status === 'Mining'

  const handleBid = () => {
    send(BigNumber.from(projectId), { value: parseEther(myBid.toString()) })
  }

  return (
    <div className="project">
      <h2>{name}</h2>
      <h3>Reserve: {reserve} ETH</h3>
      <h3>Current bid: {bid} ETH</h3>
      <input type="number" step="any" min={0} onChange={handleChange} />
      <button onClick={handleBid}>Bid {myBid} ETH</button>
      {isMining && "Mining transaction..."}
    </div>
  )
}

export default Project
