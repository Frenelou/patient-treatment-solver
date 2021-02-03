import React from 'react'
import { useDropzone, } from 'react-dropzone';
import './style.css';

function FileDropzone(props) {

    const handleChange = value => {
        props.onChange(value);
    }
    const onDrop = acceptedFiles => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader()

            reader.onabort = () => console.log('file reading was aborted')
            reader.onerror = () => console.log('file reading has failed')
            reader.onload = () => {
                const binaryStr = reader.result
                return handleChange(binaryStr)
            }
            reader.readAsText(file)
        })
    }
    const { fileRejections, getRootProps, getInputProps, acceptedFiles } = useDropzone({
        accept: '.txt',
        onDrop
    })

    const file = acceptedFiles.map(file => (<div key={file.path}>
        <hr />
        <p className="show-input">Input: {file.path}</p>
    </div>
    ));

    const fileRejectionItems = fileRejections.map((file, errors) => (<p key={`${file.path}_error`} className="error">This file is not supported.<br />
      You can only import *.txt files
        {fileRejections[0].a}
    </p>
    ));

    return (
        <div>
            <div className="dropzone" {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag and drop your input file here, <br />
            or click to select files</p>
            </div>
            {file}
            {fileRejectionItems}
        </div>
    )
}

export default FileDropzone;