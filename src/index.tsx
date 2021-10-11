import React from "react"
import ReactDOM from "react-dom"
import { DAppProvider, ChainId, Config } from '@usedapp/core'

import './styles.css'
import App from "./App"

const config: Config = {
  readOnlyChainId: ChainId.Rinkeby,
  readOnlyUrls: {
    [ChainId.Rinkeby]: 'https://rinkeby.infura.io/v3/316b53aa05e34fd184c5815a5d6db1f5',
  },
}

ReactDOM.render(
  <DAppProvider config={config}>
    <App />
  </DAppProvider>,
  document.getElementById("root")
)
