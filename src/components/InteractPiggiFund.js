import React from 'react'
import ContractDetails from './usefulComponents/ContractDetails'

const InteractPiggiFund = ({
  addresspassed,
  walletBalance,
  setWalletBalance, 
  defaultAccount, 
  signer,
  contract,
  provider}) => {
  return (
  <>
    <ContractDetails
    addresspassed={addresspassed} 
    walletBalance={walletBalance} 
    setWalletBalance={setWalletBalance} 
    defaultAccount={defaultAccount} 
    signer={signer} 
    contract={contract} 
    provider={provider}/>
  </>
   
  )
}

export default InteractPiggiFund