import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RandomQuoteGenerator() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    const fetchQuote = async () => {
      const apiKey = 'KC1yHAio1cGof7WBAZ4OIA==4km1Ry2EShdDac2f'; 
      const apiUrl = `https://api.api-ninjas.com/v1/quotes?cat=inspirational`;

      try {
        const response = await axios.get(apiUrl, {
          headers: {
            'X-Api-Key': apiKey,
          },
        });
        const randomQuote = response.data[Math.floor(Math.random() * response.data.length)];
        setQuote(randomQuote.quote);
        setAuthor(randomQuote.author);
      } catch (error) {
        console.error('Error fetching quote:', error);
      }
    };

    fetchQuote();
  }, []); 

  const handleRefresh = async () => {
    setQuote('');
    setAuthor('');
  }

  return (
    <div id="quote-container">
      <p id="quote" className=''>{quote}</p>
      <p id="author" className=''>- {author}</p>
      <button id="refresh-button" className='' onClick={handleRefresh}>
        Refresh Quote
      </button>
    </div>
  );
}

export default RandomQuoteGenerator;
