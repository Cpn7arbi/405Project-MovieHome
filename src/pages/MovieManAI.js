import React, { useState } from 'react';
import axios from 'axios';
import "../style/MovieManAI.css"

const MovieManAI = () => {
  const [userInput, setUserInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const openAiApiKey = process.env.REACT_APP_OPENAI_API_KEY;
  console.log(openAiApiKey); // Check if it’s properly loaded
  
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse(''); 

    try {
      
      const prompt = `You are a movie expert and assistant. You provide information only about movies, TV shows, actors, directors, genres, and anything related to entertainment. Please do not respond to any question that is not related to movies or TV shows. If the question is not related to movies, respond with "Sorry, I can only answer questions about movies and TV shows."`;

      // Call the ChatGPT API
      const result = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: prompt },
            { role: 'user', content: userInput },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${openAiApiKey}`,
          },
        }
      );

      const chatResponse = result.data.choices[0]?.message?.content;

      if (chatResponse) {
        setResponse(chatResponse);
      } else {
        setResponse('No valid response received from ChatGPT.');
      }
    } catch (error) {
      console.error('Error fetching data from ChatGPT API:', error);
      setResponse('Failed to fetch data from the API.');
    } finally {
      setLoading(false);
    }

    setUserInput('');
  };

  return (
    <div className="movie-man-container">
      <h1>Welcome to MovieMan!</h1>
      <p>Your AI assistant for movies: Get descriptions, rankings, and more!</p>
      
      <div className="chat-container">
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            value={userInput} 
            onChange={handleInputChange} 
            placeholder="Ask me about a movie..." 
            className="chat-input"
            required
          />
          <button type="submit" className="chat-button">Ask</button>
        </form>

        <div className="chat-response">
          {loading ? (
            <p>Loading...</p>  //show loading while waiting
          ) : (
            response && <p>{response}</p>  //display response
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieManAI;
