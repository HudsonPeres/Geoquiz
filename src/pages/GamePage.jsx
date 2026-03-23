import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GamePage.css';
import places from '../data/places';




function GamePage() {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [currentPlace, setCurrentPlace] = useState(null);
  const streetViewRef = useRef(null);
  const panoramaRef = useRef(null);

  const pickRandomPlace = () => {
    return places[Math.floor(Math.random() * places.length)];
  };

   const initializeStreetView = (place) => {
    if (!window.google || !streetViewRef.current) return;
    panoramaRef.current = new window.google.maps.StreetViewPanorama(
      streetViewRef.current,
      {
        position: place[0],
        pov: { heading: 165, pitch: 0 },
        zoom: 1,
      }
    );
  };

  useEffect(() => {
    if (window.google) {
      const place = currentPlace || pickRandomPlace();
      setCurrentPlace(place);
      initializeStreetView(place);
      return;
    }

    const script = document.createElement('script');
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap&libraries=&v=weekly`;
    script.async = true;
    script.defer = true;
    window.initMap = () => {
      const place = pickRandomPlace();
      setCurrentPlace(place);
      initializeStreetView(place);
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
      delete window.initMap;
    };
  }, []);

  useEffect(() => {
    if (currentPlace && window.google) {
      initializeStreetView(currentPlace);
    }
  }, [currentPlace]);

  const handleGuess = () => {
    if (!currentPlace) return;

    const guess = window.prompt('Onde estamos?');
    if (guess && guess.toLowerCase() === currentPlace[1].city.toLowerCase()) {
      const newScore = score + 1;
      setScore(newScore);
      alert(`Acertô Mizeravi! Placar atual: ${newScore}`);
    } else {
      setScore(0);
      alert(`Errô Mizeravi! Placar atual: 0`);
    }
    setCurrentPlace(pickRandomPlace());
  };

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className="game-container">
      <div id="floating-panel" className="floating-panel">
        <img
          src=".\img\treasure-map.png"
          alt="icon"
          width="50"
          height="50"
        />
        <h2>Qual é a cidade? Responda!</h2>
        <h2>Seu placar atual é: {score}</h2>
        <button onClick={handleGuess}>Responde!</button>
        <button onClick={goHome} style={{ marginTop: '10px', backgroundColor: 'gray' }}>
          Sair
        </button>
      </div>
      <div id="street-view" ref={streetViewRef} className="street-view"></div>
    </div>
  );
}

export default GamePage;