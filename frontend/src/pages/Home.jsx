import React from 'react'
import Findtrip from '../components/Findtrip'
import HomeLarge from '../components/HomeLarge'

function Home() {
  return (
    <div className='h-screen relative'>
      <Findtrip/>
      <HomeLarge/>
    </div>
  )
}

export default Home