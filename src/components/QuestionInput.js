import React, { useState } from 'react';
import axios from '../axios';  // Adjust the path if necessary

function QuestionInput() {
  const [question, setQuestion] = useState("");
  const [reply, setReply] = useState("");

  const handleQuestionSubmit = async () => {
    try {
      const response = await axios.post('/api/query', { question });
      setReply(response.data.reply);
    } catch (error) {
      console.error("Error fetching reply:", error);
    }
  };

  return (
    <div>
      <input 
        type="text" 
        value={question} 
        onChange={(e) => setQuestion(e.target.value)} 
        placeholder="Ask your question..." 
      />
      <button onClick={handleQuestionSubmit}>Ask</button>
      {reply && <div><strong>Reply:</strong> {reply}</div>}
    </div>
  );
}

export default QuestionInput;
