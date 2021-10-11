import React from "react"

import { useEtherBalance, useEthers } from '@usedapp/core'
import { formatEther } from '@ethersproject/units'

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
      <h1 className='not-sidebar'>
        Future Prizes
      </h1>
    </nav>

  )
}

export default Nav
