import React from 'react'
import ContractDetails from './usefulComponents/ContractDetails'

const InteractPiggiFund = ({contract,provider}) => {
  return (
  <>
    <ContractDetails contract={contract} provider={provider}/>
  </>
   
  )
}

export default InteractPiggiFund