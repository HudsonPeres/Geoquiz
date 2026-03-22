import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './GamePage.css';

const places = [
  [{ lat: 38.706871, lng: -9.136196 }, { city: 'Lisboa' }],
  [{ lat: 48.858093, lng: 2.294694 }, { city: 'Paris' }],
  [{ lat: 51.505946, lng: -0.120314 }, { city: 'Londres' }],
  [{ lat: 41.8902, lng: 12.4922 }, { city: 'Roma' }],
  [{ lat: 25.198546, lng: 55.273276 }, { city: 'Dubai' }],
  [{ lat: -33.851192, lng: 151.217172 }, { city: 'Sidney' }],
  [{ lat: 29.976768, lng: 31.135538 }, { city: 'Cairo' }],
  [{ lat: 40.757876, lng: -73.985592 }, { city: 'Nova York' }],
  [{ lat: 40.280215, lng: -7.507109 }, { city: 'Covilhã' }],
  [{ lat: -5.870383, lng: -35.181368 }, { city: 'Natal' }],
  [{ lat: 41.148416, lng: -8.647584 }, { city: 'Porto' }],
  [{ lat: -5.916738, lng: -35.260632 }, { city: 'Parnamirim'}],
  [{ lat: -5.752831, lng: -35.202848 }, { city: 'Natal'}],
  [{ lat: -5.142992, lng: -36.610094 }, { city: 'Macau'}],
];

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
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCWv382ndu6yjqkXsq9xCbrNj10-kMEGuQ&callback=initMap&libraries=&v=weekly`;
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