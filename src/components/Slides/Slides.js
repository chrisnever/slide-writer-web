import React, { useState, useMemo, useCallback, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeWrap from 'rehype-wrap-all'
import remarkSectionize from 'remark-sectionize'

import styles from './slide.module.css'

//slide component
const Slide = ({ serialisedText, props, children }) => {
  return <div className={styles.slide}>{children}</div>
}

//markdown conversion into slides
const Slides = ({ serialisedText }) => {
  return (
    <ReactMarkdown
      children={serialisedText}
      remarkPlugins={[remarkSectionize]}
      rehypePlugins={[[rehypeWrap, { selector: 'section', wrapper: 'slide' }]]}
      components={{
        // replace the slide from rehype with my Slide react component..
        slide: ({ node, ...props }) => (
          //need to figure out the id for anchor links..
          <Slide id={'testId'} className={'slide'} {...props} />
        ),
        h1: ({ node, ...props }) => <h1 id={node} {...props} />
      }}
    />
  )
}

export default Slides
