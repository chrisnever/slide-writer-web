import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  Component
} from 'react'
import { useOutletContext } from 'react-router-dom'

// slate
import { createEditor, Editor, Transforms, Text } from 'slate'

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from 'slate-react'
import { Node } from 'slate'

//styles
import styles from './text-editor.module.css'

//serialize to text
const serialize = value => {
  return (
    value
      // Return the string content of each paragraph in the value's children.
      .map(n => Node.string(n))
      // Join them all with line breaks denoting paragraphs.
      .join('\n')
  )
}
//deserialize to object
const deserialize = string => {
  // Return a value array of children derived by splitting the string.
  return string.split('\n').map(line => {
    return {
      children: [{ text: line }]
    }
  })
}

// Define our own custom set of helpers.
const CustomEditor = {
  isBoldMarkActive (editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.bold === true,
      universal: true
    })

    return !!match
  },

  isCodeBlockActive (editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === 'code'
    })

    return !!match
  },

  isHeaderOneActive (editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.h1 === true,
      universal: true
    })
    return !!match
  },

  toggleHeaderOne (editor) {
    const isActive = CustomEditor.isHeaderOneActive(editor)
    Transforms.setNodes(
      editor,
      { h1: isActive ? null : true },
      { match: n => Text.isText(n), split: true }
    )
  },

  toggleBoldMark (editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor)
    Transforms.setNodes(
      editor,
      { bold: isActive ? null : true },
      { match: n => Text.isText(n), split: true }
    )
  },

  toggleCodeBlock (editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor)
    Transforms.setNodes(
      editor,
      { type: isActive ? null : 'code' },
      { match: n => Editor.isBlock(editor, n) }
    )
  }
}

// Bold styling leaf
const Leaf = props => {
  return (
    <span
      {...props.attributes}
      style={{
        fontWeight: props.leaf.bold ? 'bold' : 'normal',
        fontSize: props.leaf.h1 ? '2.2rem' : '1rem'
      }}
    >
      {props.children}
    </span>
  )
}

//MAIN COMPONENT
const TextEditor = () => {
  const [
    document,
    handleMarkdownUpdate,
    handleRawDataUpdate
  ] = useOutletContext()
  const editor = useMemo(() => withReact(createEditor()), [])
  const [serialisedText, setSerialisedText] = useState()

  console.log(document.rawData)

  const [valueTwo, setValueTwo] = useState(
    //JSON.parse(localStorage.getItem('contentTwo'))
    document.rawData || [
      {
        type: 'paragraph',
        children: [{ text: 'A line of text in a paragraph.' }]
      }
    ]
  )

  // Update the initial content to be pulled from Local Storage if it exists.
  const [slideTextRawData, setSlideTextRawData] = useState(
    deserialize(localStorage.getItem('testSerial')) ||
      deserialize('test content')
  )

  useEffect(() => {
    setSerialisedText(slideTextRawData.map(n => Node.string(n)).join('\n'))
  }, [slideTextRawData])

  //creates the serialised text and sends it up with handlemarkdownupdate
  useEffect(() => {
    handleMarkdownUpdate(serialisedText)
    handleRawDataUpdate(valueTwo)
  }, [serialisedText]) //

  // code style element
  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])

  // Define a leaf rendering function that is memoized with `useCallback`.
  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />
  }, [])

  ///custom function for testing header creation
  const generateNewHeader = event => {
    event.preventDefault()
    // copy text selection
    const selectedText = Editor.string(editor, editor.selection)
    // change txt to new slide then copy the selection
    editor.insertText(`# ${selectedText}`)
  }

  // start of main container
  return (
    <div>
      <div className={styles.fullPane}>
        <div className={styles.editorPane}>
          <div className={styles.editorPaneInner}>
            <Slate
              editor={editor}
              value={valueTwo}
              onChange={value => {
                //set json value
                setValueTwo(value)
                setSlideTextRawData(value)
                const isAstChange = editor.operations.some(
                  op => 'set_selection' !== op.type
                )
                if (isAstChange) {
                  // Serialize the value and save the string value to Local Storage.
                  localStorage.setItem('content', serialize(value))
                  localStorage.setItem('testSerial', serialize(value))
                  //store in json format
                  const content = JSON.stringify(value)
                  localStorage.setItem('contentTwo', content)
                }
              }}
            >
              <Editable
                style={{ minWidth: '100%' }}
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                onKeyDown={event => {
                  //generate new "header" (slide...)
                  if (event.key === 'n' && event.ctrlKey) {
                    generateNewHeader()
                  }
                  // Formatting "code" test...
                  if (event.key === '/' && event.ctrlKey) {
                    // Prevent the "€" from being inserted by default.
                    event.preventDefault()
                    // Otherwise, set the currently selected blocks type to "code".
                    const [match] = Editor.nodes(editor, {
                      match: n => n.type === 'code'
                    })
                    Transforms.setNodes(
                      editor,
                      { type: match ? 'paragraph' : 'code' },
                      { match: n => Editor.isBlock(editor, n) }
                    )
                  }
                  if (!event.ctrlKey) {
                    return
                  }
                  // eslint-disable-next-line default-case
                  switch (event.key) {
                    case '`': {
                      event.preventDefault()
                      CustomEditor.toggleCodeBlock(editor)
                      break
                    }
                    case 'b': {
                      event.preventDefault()
                      CustomEditor.toggleBoldMark(editor)
                      break
                    }
                    //testing transforming to style h1  when ctrl 1 is tapped
                    case '1': {
                      event.preventDefault()
                      CustomEditor.toggleHeaderOne(editor)
                      //call my function to create markdown header
                      generateNewHeader()
                      break
                    }
                  }
                }}
              />
            </Slate>
          </div>
        </div>
      </div>
    </div>
  )
}

//style for code test
const CodeElement = props => {
  return (
    <pre {...props.attributes}>
      <h2 style={{ fontSize: '24px' }}>{props.children}</h2>
    </pre>
  )
}

const DefaultElement = props => {
  return <p {...props.attributes}>{props.children}</p>
}

export default TextEditor
