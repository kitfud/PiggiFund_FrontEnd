import React from 'react'
import ContractDetails from './usefulComponents/ContractDetails'

const InteractPiggiFund = ({walletBalance,setWalletBalance, defaultAccount, signer,contract,provider}) => {
  return (
  <>
    <ContractDetails walletBalance={walletBalance} setWalletBalance={setWalletBalance} defaultAccount={defaultAccount} signer={signer} contract={contract} provider={provider}/>
  </>
   
  )
}

export default InteractPiggiFund