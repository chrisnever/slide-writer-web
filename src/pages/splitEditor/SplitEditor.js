import React from 'react'
import { useOutletContext } from 'react-router-dom'
import TextEditor from '../textEditor/TextEditor'
import SlideEditor from '../slideEditor/slideEditor'


const SplitEditor = () => {
  const [
    document,
    serialisedText,
    setSerialisedText,
    rawData,
    setRawData
  ] = useOutletContext()

  return (
    <div style={{ paddingTop: '48px' }}>
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{ width: '50%', height: '100vh', overflowY: 'scroll' }}>
        <TextEditor handleMarkdownUpdate={serialisedText}  />
      </div>
      <div style={{ width: '50%', height: '100vh', overflowY: 'scroll' }}>
        <SlideEditor serialisedText={serialisedText} />
      </div>
    </div>
    </div>
  )
}

export default SplitEditor


