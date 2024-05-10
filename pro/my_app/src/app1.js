import React, { useState , useEffect} from 'react';
import './app1.css'

const InputForm = () => {
  const [inputValue, setInputValue] = useState('');
  const [fetchedText, setFetchedText] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      fetchText();
    }, 1000); // Poll every second, you can adjust this interval as needed
    
    return () => clearInterval(interval);
  }, []); // Run once when component mounts
  const fetchText = async () => {
    try {
      const response = await fetch('http://localhost:3001/get-received-text');
      const data = await response.text();
      setFetchedText(data); // Set the fetched text to the state
   
    } catch (error) {
      console.error('Error fetching text:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await fetch('http://localhost:3001/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },  
        body: JSON.stringify({ inputValue }),
      });
      
      console.log('Form submitted successfully');
    } catch (error) {
      console.error('Error submitting input:', error);
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="input-form">
    <div className="h11">
    <h1>My App</h1>
    </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter text"
        />
        <button type="submit">Submit</button>
      </form>
       {/* Display the fetched text */}
       <div>
       <h2>Results:</h2>
        <textarea
          rows="20" cols="110"
          readOnly
          value={fetchedText}
        />
      </div>
    </div>
  );
};

export default InputForm;
