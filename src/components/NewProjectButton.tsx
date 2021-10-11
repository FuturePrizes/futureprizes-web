import React, { useState } from "react"
import { useEthers, useContractFunction } from '@usedapp/core'
import { Contract } from '@ethersproject/contracts'
import { Interface } from '@ethersproject/abi'
import { parseEther } from '@ethersproject/units'

import { CONTRACT_ADDRESS, CONTRACT_ABI } from "rinkeby"

const NewProjectButton = () => {
  const { account } = useEthers()
  const [projectName, setProjectName] = useState("")
  const [reserve, setReserve] = useState(0)
  const contract = new Contract(CONTRACT_ADDRESS, new Interface(CONTRACT_ABI))
  const { state, send } = useContractFunction(contract, 'createProject')
  const isMining = state.status === 'Mining'

  const handleReserve = (event: React.ChangeEvent<HTMLInputElement>) => setReserve(Number(event.target.value) || 0)
  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => setProjectName(event.target.value)

  const handleNew = () => {
    send(projectName, account, parseEther(reserve.toString()))
  }

  return (
    <>
      {isMining ?
        <p>Mining transaction...</p> :
        <>
          <input placeholder="Project Name" size={40} onChange={handleName} />
          <input type="number" step="any" min="0" placeholder="Reserve (in ETH)" onChange={handleReserve} />
          <button onClick={handleNew} disabled={isMining}>Create new project ({reserve} ETH reserve)</button>
        </>
      }
    </>
  )
}

export default NewProjectButton
