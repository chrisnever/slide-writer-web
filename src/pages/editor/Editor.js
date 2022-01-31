import React, { useState, useEffect, useLayoutEffect } from 'react'
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
import styles from './editor.module.css'

// Layout Container
const Editor = () => {
  // get the doc id from route params
  const { id } = useParams()
  // use the doc id to get the doc from firebase
  const { error, document } = useDocument('projects', id)
  const [showSlidePanel, setShowSlidePanel] = useState(false)
  const [presentationModeActive, setPresentationModeActive] = useState(false)
  //rename - this is the text for the slides
  const [serialisedText, setSerialisedText] = useState()
  //rename this is the raw json data from and for the editor
  const [rawData, setRawData] = useState([
    {
      type: 'paragraph',
      children: [{ text: 'Loading presentation...' }]
    }
  ])

  useEffect(() => {
    var docRef = projectFirestore.collection('projects').doc(id)
    docRef
      .get()
      .then(doc => {
        if (doc.exists) {
          setRawData(doc.data().rawData)
        } else { 
          console.log('No such document!')
        }
      })
      .catch(error => {
        console.log('Error getting document:', error)
      })
  }, [])

  //Toggle side panel
  const handleToggleSidePanel = () => setShowSlidePanel(!showSlidePanel)
  //Activate presentation mode
  const handleTogglePresentationMode = () => {
    setPresentationModeActive(
      prevPresentationModeActive => !prevPresentationModeActive
    )
  }

  //update document in firestore on save
  const updateDocument = () => {
    const documentRef = doc(projectFirestore, 'projects', id)
    updateDoc(documentRef, {
      markdownData: serialisedText,
      rawData: rawData
    })
  }
  // errors
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
        userData={id}
      />
      <main className={styles.container}>
        <SlideNavigator
          showSlidePanel={showSlidePanel}
          serialisedText={serialisedText}
        />
        <span>{document.name}</span>
        <button onClick={updateDocument}> save</button>
        <Outlet
          context={[
            document,
            serialisedText,
            setSerialisedText,
            rawData,
            setRawData
          ]}
        />
      </main>
    </div>
  )
}

export default Editor
