import React, { useContext } from 'react';
import { PlacarContext } from '../context/PlacarContext';

export default function Controles() {
  const { handleAlterarNomeTime, handleResetarPlacar, handleDesfazerAcao } = useContext(PlacarContext);

  return (
    <div style={{ marginTop: '30px', textAlign: 'center' }}>
      <button style={{ margin: '0 10px', padding: '10px 20px' }} onClick={handleAlterarNomeTime}>Alterar Nomes</button>
      <button style={{ margin: '0 10px', padding: '10px 20px' }} onClick={handleResetarPlacar}>Resetar Placar</button>
      <button style={{ margin: '0 10px', padding: '10px 20px' }} onClick={handleDesfazerAcao}>Desfazer</button>
    </div>
  );
}