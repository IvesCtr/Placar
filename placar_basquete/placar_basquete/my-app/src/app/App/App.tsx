import React from 'react';
import Time from '../components/Time';
import Controles from '../components/Controles';
import { PlacarProvider, PlacarContext } from '../context/PlacarContext';
import { useContext } from 'react';

// Componente interno para acessar o contexto e renderizar
function PlacarLayout() {
    const { times } = useContext(PlacarContext);

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Placar de Basquete</h1>
            <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start' }}>
                <Time timeId={times[0].id} />
                <span style={{ fontSize: '48px', alignSelf: 'center' }}>vs</span>
                <Time timeId={times[1].id} />
            </div>
            <Controles />
        </div>
    );
}

// Componente App principal que usa o Provider
export default function App() {
  return (
    <PlacarProvider>
      <PlacarLayout />
    </PlacarProvider>
  );
}