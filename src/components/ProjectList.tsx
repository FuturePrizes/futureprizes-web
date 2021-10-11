import React from "react"
import { useContractCall } from '@usedapp/core'
import { Interface } from '@ethersproject/abi'
import { formatEther } from '@ethersproject/units'

import { CONTRACT_ADDRESS, CONTRACT_ABI } from "rinkeby"
import NewProjectButton from "components/NewProjectButton"
import Project from "components/Project"

const ProjectList = () => {
  const projectList = useContractCall(
    {
      abi: new Interface(CONTRACT_ABI),
      address: CONTRACT_ADDRESS,
      method: 'getProjectList',
      args: [],
    }
  )

  const prizeAmount = useContractCall(
    {
      abi: new Interface(CONTRACT_ABI),
      address: CONTRACT_ADDRESS,
      method: 'prizeAmount',
      args: [],
    }
  )

  const elementList: JSX.Element[] = []
  if (projectList?.[0]) {
    const numProjects = projectList[0].length
    for (let i = 0; i < numProjects; i++) {
      elementList.push(
        <Project
          key={i}
          projectId={i}
          name={projectList[0][i]}
          treasurer={projectList[1][i]}
          bidder={projectList[2][i]}
          reserve={formatEther(projectList[3][i])}
          bid={formatEther(projectList[4][i])}
          funded={projectList[5][i]}
        />
      )
    }
  }

  return (
    <div className="project-list">
      {prizeAmount && <h1>Prize Pool: {formatEther(prizeAmount[0])} ETH</h1>}
      <NewProjectButton />
      {elementList}
    </div>
  )
}

export default ProjectList
