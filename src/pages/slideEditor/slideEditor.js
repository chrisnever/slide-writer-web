import React, { useState, useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'

//components
import Slides from '../../components/Slides/Slides'

//styles
import styles from './slide-editor.module.css'

//need to move this to it's own slide container file
const SlideEditor = () => {
  const [document] = useOutletContext()

  return (
    <div>
      <div className={styles.containerMain}>
        <h1>Slide Editor</h1>
        <p style={{ paddingTop: '68px' }}>{document.name}</p>
        <div className={styles.fullPane}>
          <div className={styles.slidesContainer}>
            <Slides serialisedText={document.markdownData} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SlideEditor
