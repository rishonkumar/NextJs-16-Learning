import React from 'react'

const abcLayout = ({children} : {children: React.ReactNode}) => {
  return (
    <div>
      <h1>layout from abc from hello</h1>
      {children}
    </div>
   
  )
}

export default abcLayout