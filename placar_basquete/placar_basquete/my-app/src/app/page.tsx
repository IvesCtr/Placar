"use client"; // Marca este componente para renderização no lado do cliente

import React, { useContext } from 'react';
import Time from './components/Time';     // Ajuste o caminho se necessário
import Controles from './components/Controles'; // Ajuste o caminho se necessário
import { PlacarProvider, PlacarContext } from './context/PlacarContext'; // Ajuste o caminho se necessário

// Componente interno para o layout, que acessa o contexto
function PlacarLayout() {
    const { timeA, timeB } = useContext(PlacarContext);

    return (
        <main className="container">
            <h1>Placar de Basquete</h1>
            <div className="placar-area">
                <Time timeId={timeA.id} />
                <span className="vs-text">vs</span>
                <Time timeId={timeB.id} />
            </div>
            <Controles />
        </main>
    );
}

// Componente da Página Principal (Home)
export default function Home() {
  return (
    <PlacarProvider>
      <PlacarLayout />
    </PlacarProvider>
  );
}