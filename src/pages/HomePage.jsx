import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import { getLeaderboard } from '../utils/leaderboard';

function HomePage() {
  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    setLeaderboard(getLeaderboard());
  }, []);

  const startGame = () => {
    navigate('/game');
  };

  return (
    <div className="home-container">
      <h1>GeoQUIZ - UC0621 React</h1>
      <p>Teste seus conhecimentos geográficos!</p>
      <p>Você será colocado em um local aleatório no Street View e deverá adivinhar a cidade.</p>
      <button onClick={startGame}>Iniciar Jogo</button>

      {leaderboard.length > 0 && (
        <div className="leaderboard">
          <h2> Os mais inteligentes </h2>
          <ol>
            {leaderboard.map((entry, index) => (
              <li key={index}>
                <strong>{entry.nome}</strong> - {entry.pontuacao} acerto(s)
                <span className="date">
                  ({new Date(entry.data).toLocaleDateString()})
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export default HomePage;