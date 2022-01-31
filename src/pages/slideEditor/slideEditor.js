import React from 'react'
import { useOutletContext } from 'react-router-dom'

//components
import Slides from '../../components/Slides/Slides'

//styles
import styles from './slide-editor.module.css'

//need to move this to it's own slide container file
const SlideEditor = () => {
  const [
    document,
    serialisedText,
    setSerialisedText,
    rawData,
    setRawData
  ] = useOutletContext()

  return (
    <div>
      <div className={styles.containerMain}>
        <p style={{ paddingTop: '0px' }}>{document.name}</p>
        <div className={styles.fullPane}>
          <div className={styles.slidesContainer}>
            <Slides serialisedText={serialisedText} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SlideEditor
