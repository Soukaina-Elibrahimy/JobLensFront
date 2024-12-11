import React, { useState, ChangeEvent } from 'react';
import './App.css';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

interface SearchResult {
  file: string;
  terms: string[];
}

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const formatName = (fileName: string) => {
    const nameWithoutExtension = fileName.replace('.pdf', '');
    return nameWithoutExtension
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join(' ');
  };

  const handleSearch = async (event: ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term) {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/search?query=${term}`);
        console.log(response.data);
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
      <div
          className="App"
          style={{
            backgroundImage: "url('src/bg.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: '100vh',
            backgroundAttachment: 'fixed',
          }}
      >
        <div className="container">
          <header className="header">
            <img src="src/logo.png" alt="Logo" className="logo" />
          </header>
          <main className="main-content">
            <h1 className="title">Welcome To JobLens</h1>
            <p className="subtitle">Spot the Perfect Talent in a Blink</p>
            <input
                type="search"
                placeholder="Focused on Finding the Best..."
                className="search-input"
                value={searchTerm}
                onChange={handleSearch}
            />
            <div className="results">
              {searchResults.map((result) =>
                  result[0] !== 'Aucun résultat' ? (
                      <div key={uuidv4()} className="card">
                        <div>
                          <h2>{formatName(result[0])}</h2>

                          <div className="search-terms">
                            <h3>Search Terms :</h3>
                            <ul>
                              {searchTerm.split(' ').map((term, index) => (
                                  <li key={index} className={result[1].includes(term) ? '' : 'not-found'}>
                                    {term}
                                  </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="card-content">
                          <a
                              href={`src/Cvs/${result[0]}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="cv-button"
                          >
                            View CV
                          </a>
                        </div>
                      </div>
                  ) : <div>
                    <div key={uuidv4()} className="card">
                      <h2>No Resume Founded</h2>
                    </div>
                  </div>
              )}
            </div>
          </main>
        </div>
      </div>
  );
};

export default App;
