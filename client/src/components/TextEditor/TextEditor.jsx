import React from 'react'
import {CKEditor} from '@ckeditor/ckeditor5-react'
import Editor from 'ckeditor5-custom-build/build/ckeditor'
// import TextEditorConfig from './TextEditorConfig'

const TextEditor = (props) => {
    const handleChange = (e, editor) => {
        const data = editor.getData()
        props.onSendValue(data)
    }
    return (
        <>
            <CKEditor editor={Editor}
            data={props.value}
            onChange={handleChange}
            />
        </>
    )
}

export default TextEditor