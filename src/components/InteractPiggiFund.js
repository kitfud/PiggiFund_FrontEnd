import React from 'react'
import ContractDetails from './usefulComponents/ContractDetails'

const InteractPiggiFund = ({setWalletBalance, defaultAccount, signer,contract,provider}) => {
  return (
  <>
    <ContractDetails setWalletBalance={setWalletBalance} defaultAccount={defaultAccount} signer={signer} contract={contract} provider={provider}/>
  </>
   
  )
}

export default InteractPiggiFund