import React from "react"

import { useEtherBalance, useEthers } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'

import { GITHUB, ETHERSCAN } from 'icons';

const Nav = () => {
  const { activateBrowserWallet, deactivate, account } = useEthers()
  const etherBalance = useEtherBalance(account)
  const renderedBalance = etherBalance && (+formatEther(etherBalance)).toFixed(4)
  return (
    <nav className='with-sidebar'>
      <div className='sidebar'>
        {account ?
          <>
            <button className="login-button" onClick={() => deactivate()}>Logout {account} ({renderedBalance} ETH)</button>
          </>
          : <button className="login-button" onClick={() => activateBrowserWallet()}>Connect</button>
        }
      </div>
      <div className='not-sidebar nav-title'>
        <h1>Future Prizes</h1>
        <h2 className='nav-subtitle'>Hindsight is 20/20.</h2>
        <a href="https://github.com/FuturePrizes" target="_blank">
          <img src={GITHUB} />
        </a>
        <a href="https://rinkeby.etherscan.io/address/0x51998c89f2f210a996e48f4bce16e0eac9602541#code" target="_blank">
          <img src={ETHERSCAN} />
        </a>
      </div>
    </nav>

  )
}

export default Nav
