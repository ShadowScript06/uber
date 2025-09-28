import React from 'react'
import { CaptainDataContext } from './CaptainDataContext'
import { useState } from 'react'

function CaptainContext({children}) {
    const [captain,setCaptain]=useState(null);

  return (
    <CaptainDataContext.Provider value={{captain,setCaptain}}>
        {children}
    </CaptainDataContext.Provider>
  )
}

export default CaptainContext