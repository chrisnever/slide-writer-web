import React, { useState, useMemo, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import rehypeWrap from 'rehype-wrap-all'
import remarkSectionize from 'remark-sectionize'

import styles from './presentation-mode.module.css'

//slide component
const Slide = ({ serialisedText, children }) => {
  return (
    <div id='slide' className={styles.presentationSlide}>
      {children}
    </div>
  )
}

//markdown conversion into slides
const PresentationMode = ({
  data,
  serialisedText,
  presentationModeActive,
  handleTogglePresentationMode
}) => {
  const slideRef = React.useRef(null)

  //. needto add and (presentationModeActive == true) ?
  const escFunction = useCallback(event => {
    if (event.keyCode === 27) {
      handleTogglePresentationMode()
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false)
    return () => {
      document.removeEventListener('keydown', escFunction, false)
    }
  }, [escFunction])

  //get the amount of slides  using react ref
  useEffect(() => {
    const refer = slideRef.current && slideRef.current.childElementCount
    console.log(refer)
  }, [presentationModeActive])

  return (
    <AnimatePresence>
      {presentationModeActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={styles.slidePane}
          ref={slideRef}
        >
          <ReactMarkdown
            children={serialisedText}
            remarkPlugins={[remarkSectionize]}
            rehypePlugins={[
              [rehypeWrap, { selector: 'section', wrapper: 'slide' }]
            ]}
            components={{
              // replace the slide from rehype with my Slide react component..
              slide: ({ node, ...props }) => (
                //need to figure out the id for anchor links..
                <Slide id={'testId'} {...props} />
              )
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PresentationMode
