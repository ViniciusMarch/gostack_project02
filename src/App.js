import React, { useState, useEffect } from "react";

import api from "./services/api.js";
import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      "title": "Suck Natalee Boobs",
      "url": "https://github.com/ViniciusMarch/english",
      "techs": ["Cambly", "English", "Gary"]
    });

    setRepositories([... repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    
    const repositoryIndex = repositories.findIndex(repository => repository.id === id)
    
    // Se encontrei no meu array, falo com a API
    if(repositoryIndex >= 0) {
      try {
        await api.delete('repositories/' + id);
        
        repositories.splice(repositoryIndex, 1);

        setRepositories([... repositories]);

      } catch (error) {
        console.log("ERROR");        
      }
    }
    else {
      console.log(repositories);
      
      console.log(id);
      
    }
  }

  return (
      
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
              <li key={repository.id}>{repository.title}
                <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>              
              </li>   
          )}
      </ul>
         
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
