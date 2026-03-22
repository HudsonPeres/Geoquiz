import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();

  const startGame = () => {
    navigate('/game');
  };

  return (
    <div className="home-container">
      <h1>GeoQUIZ - UC0621 React</h1>
      <p>Teste seus conhecimentos geográficos!</p>
      <p>Você será colocado em um local aleatório no Street View e deverá adivinhar a cidade.</p>
      <button onClick={startGame}>Iniciar Jogo</button>
    </div>
  );
}

export default HomePage;