import React, { useState, useMemo, useCallback, Component } from 'react'
import { PlusIcon } from '@radix-ui/react-icons'
import { motion, AnimatePresence } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import rehypeWrap from 'rehype-wrap-all'
import remarkSectionize from 'remark-sectionize'
import styles from './slide-navigator.module.css'

//Slide preview component
const SlideNavContainer = ({ data, serialisedText, props, children }) => {
  return (
    <motion.div
      whileTap={{ scale: 0.9 }}
      whileHover={{
        scale: 1.025,
        transition: { duration: 0 }
      }}
      className={styles.slideNavContainer}
    >
      {children}
    </motion.div>
  )
}

const SlideNavigator = ({
  showSlidePanel,
  serialisedText
}) => {
  return (
    <AnimatePresence>
      {showSlidePanel && (
        <motion.div
          initial={{ left: -200 }}
          animate={{ left: 0 }}
          exit={{ left: -200 }}
          className={styles.slidePane}
        >
          <div className={styles.slidePaneInner}>
            <ReactMarkdown
              children={serialisedText}
              remarkPlugins={[remarkSectionize]}
              rehypePlugins={[
                [
                  rehypeWrap,
                  { selector: 'section', wrapper: 'SlideNavContainer' }
                ]
              ]}
              components={{
                // Rewrite `em`s (`*like so*`) to `i` with a red foreground color.
                hr: ({ node, ...props }) => (
                  <div
                    style={{
                      backgroundColor: 'red',
                      width: '200px',
                      height: '200px'
                    }}
                    {...props}
                  ></div>
                ),
                SlideNavContainer: ({ node, ...props }) => (
                  //need to figure out the id for anchor links..
                  <SlideNavContainer {...props} />
                )
              }}
            />

            <div className={styles.slidePaneInnerSlide}>
              <div className={styles.slideNavContainer}>
                <PlusIcon /> <p>add slide</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default SlideNavigator
