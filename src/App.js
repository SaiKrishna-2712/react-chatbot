import React, { useState } from 'react';
import axios from 'axios';
import './App.css';  // Import the CSS file

function App() {
  const [files, setFiles] = useState([]);
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFiles(event.target.files);
  };

  const handleSubmitFiles = async () => {
    const formData = new FormData();
    for (const file of files) {
      formData.append('files', file);
    }

    try {
      setLoading(true);
      await axios.post('http://127.0.0.1:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Files uploaded successfully!');
    } catch (error) {
      console.error(error);
      alert('Error uploading files');
    } finally {
      setLoading(false);
    }
  };

  const handleQuery = async () => {
    try {
      setLoading(true);
      const response = await axios.post('http://127.0.0.1:5000/api/query', { question });
      setResponse(response.data.reply);
    } catch (error) {
      console.error(error);
      setResponse('Error processing the query');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Chat with PDF</h1>
      </header>
      
      <div className="file-upload">
        <h2>Upload PDF Files</h2>
        <input type="file" multiple onChange={handleFileChange} />
        <button onClick={handleSubmitFiles} disabled={loading}>
          {loading ? 'Processing...' : 'Submit & Process'}
        </button>
      </div>
      
      <div className="question-input">
        <h2>Ask a Question</h2>
        <textarea value={question} onChange={(e) => setQuestion(e.target.value)} />
        <button onClick={handleQuery} disabled={loading}>
          {loading ? 'Loading...' : 'Submit Query'}
        </button>
      </div>
      
      {response && (
        <div className="response">
          <h2>Response</h2>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
}

export default App;
