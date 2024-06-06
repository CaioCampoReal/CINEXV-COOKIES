import React, { useState, useEffect } from 'react';
import './style.css'; // Importe o CSS aqui
import MapContainer from '../../components/mapas';

function LoginButton() {
  const [user, setUser] = useState(null);

  useEffect(() => {
  }, []);

  return (
   
      <div className="map-container"> {/* Adicione uma classe para o container do MapContainer */}
        <MapContainer />
      </div>
  );
}

export default LoginButton;
