import React from 'react'
import { useOutletContext } from 'react-router-dom'

const SplitEditor = () => {
  const [document] = useOutletContext()

  return (
    <div style={{ paddingTop: '48px' }}>
      <h1>Split Editor</h1>
      <p style={{paddingTop: "68px"}}>{document.name}</p>

    </div>
  )
}

export default SplitEditor


