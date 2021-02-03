import React, { useState } from 'react'
import "./styles.css";
import { getResult } from './modules/treatment_decisions_solver';
import FileDropzone from './components/FileDropzone';

export default function App() {

  const [output, setOutput] = useState();

  const handleChange = value => {
    const results = getResult(value);
    setOutput(results)
  }

  return (
    <div className="App">
      <h1 className="title">Patient Treatment Solver</h1>
      <FileDropzone onChange={handleChange} />
        

      {output && (<>            
        <h2 className="label">Result</h2>
        <p className="result">{output}</p>
      </>)}
    </div>)
}

