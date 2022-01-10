import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'

//components
import TopMenu from '../../components/TopMenu/TopMenu'
import SlideNavigator from '../../components/SlideNavigator/SlideNavigator'
import PresentationMode from '../../components/PresentationMode/PresentationMode'
//functions
import { useParams } from 'react-router-dom'
import { useDocument } from '../../hooks/useDocument'
import { doc, updateDoc } from 'firebase/firestore'
import { projectFirestore } from '../../firebase/firebase'
//styles

// Layout Container
const Editor = () => {
  const [showSlidePanel, setShowSlidePanel] = useState(false)
  const [presentationModeActive, setPresentationModeActive] = useState(false)
  //rename - this is the text
  const [serialisedText, setSerialisedText] = useState()
  //rename this is the raw json data from the editor
  const [rawData, setRawData] = useState()

  //toggle side panel
  const handleToggleSidePanel = () => setShowSlidePanel(!showSlidePanel)
  //activate presentation mode
  const handleTogglePresentationMode = () => {
    setPresentationModeActive(
      prevPresentationModeActive => !prevPresentationModeActive
    )
  }
  //md value "markdown value"
  const handleMarkdownUpdate = text => {
    setSerialisedText(text)
  }
  const handleRawDataUpdate = val => {
    setRawData(val)
  }

  // get the doc id from route params
  const { id } = useParams()
  // use the doc id to get the doc from firebase
  const { error, document } = useDocument('projects', id)

  //update document in firestore on save
  const updateDocument = () => {
    const documentRef = doc(projectFirestore, 'projects', id)
    updateDoc(documentRef, {
      markdownData: serialisedText,
      rawData: rawData
    })
  }

  if (error) {
    return <div>{error}</div>
  }
  if (!document) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <PresentationMode
        serialisedText={serialisedText}
        presentationModeActive={presentationModeActive}
        handleTogglePresentationMode={handleTogglePresentationMode}
      />
      <TopMenu
        handleToggleSidePanel={handleToggleSidePanel}
        handleTogglePresentationMode={handleTogglePresentationMode}
      />

      <main>
        <SlideNavigator
          showSlidePanel={showSlidePanel}
          serialisedText={serialisedText}
        />
        <h1 style={{ paddingTop: '68px' }}>{document.name}</h1>
        <button onClick={updateDocument}> save</button>
        <Outlet context={[document, handleMarkdownUpdate,handleRawDataUpdate, serialisedText, rawData]} />
      </main>
    </div>
  )
}

export default Editor
