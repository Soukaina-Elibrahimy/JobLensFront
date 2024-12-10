import React, { useState, ChangeEvent } from 'react';
import './App.css';

interface Freelance {
  id: number;
  name: string;
  speciality: string;
  skills: string[];
}

// Données fictives de freelances
const freelanceData: Freelance[] = [
  { id: 1, name: "Sophie Martin", speciality: "Développeur Full Stack", skills: ["React", "Node.js", "MongoDB"] },
  { id: 2, name: "Thomas Dubois", speciality: "Designer UX/UI", skills: ["Figma", "Adobe XD", "Sketch"] },
  { id: 3, name: "Camille Leroy", speciality: "Data Scientist", skills: ["Python", "R", "Machine Learning"] },
  { id: 4, name: "Antoine Moreau", speciality: "DevOps Engineer", skills: ["Docker", "Kubernetes", "AWS"] },
  { id: 5, name: "Élodie Petit", speciality: "Développeur Mobile", skills: ["React Native", "Swift", "Kotlin"] },
];

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Freelance[]>(freelanceData);

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);

    const filteredResults = freelanceData.filter(freelance =>
      freelance.name.toLowerCase().includes(term.toLowerCase()) ||
      freelance.speciality.toLowerCase().includes(term.toLowerCase()) ||
      freelance.skills.some(skill => skill.toLowerCase().includes(term.toLowerCase()))
    );

    setSearchResults(filteredResults);
  };

  return (
    <div className="App" style={{backgroundImage: "url('src/bg.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh',backgroundAttachment:'fixed'}}>
      <div className="container">
        <header className="header">
          <img src="src/logo.png" alt="Logo" className="logo" />
        </header>
        <main className="main-content">
          <h1 className="title">Bienvenue sur FreelanceIT</h1>
          <p className="subtitle">Trouvez le freelance IT parfait pour votre projet</p>
          <input
            type="search"
            placeholder="Rechercher des freelances..."
            className="search-input"
            value={searchTerm}
            onChange={handleSearch}
          />
          <div className="results">
            {searchResults.map(freelance => (
              <div key={freelance.id} className="card">
                <h2>{freelance.name}</h2>
                <p>{freelance.speciality}</p>
                <div className="skills">
                  {freelance.skills.map(skill => (
                    <span key={skill} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;

