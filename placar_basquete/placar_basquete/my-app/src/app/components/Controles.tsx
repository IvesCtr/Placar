import React, { useContext } from 'react';
import { PlacarContext } from '../context/PlacarContext';

export default function Controles() {
  const { alterarNomes, resetarPlacar, desfazer, podeDesfazer } = useContext(PlacarContext);

  return (
    <div style={{ marginTop: '30px', textAlign: 'center' }}>
      {/* Botão para alterar nomes [cite: 11] */}
      <button style={{ margin: '0 10px', padding: '10px 20px' }} onClick={alterarNomes}>
        Alterar Nomes
      </button>
      {/* Botão para resetar placar [cite: 12] */}
      <button style={{ margin: '0 10px', padding: '10px 20px' }} onClick={resetarPlacar}>
        Resetar Placar
      </button>
      {/* Botão para desfazer [cite: 13] */}
      <button style={{ margin: '0 10px', padding: '10px 20px' }} onClick={desfazer} disabled={!podeDesfazer}>
        Desfazer
      </button>
    </div>
  );
}