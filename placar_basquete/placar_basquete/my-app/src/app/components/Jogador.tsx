import React, { useContext } from 'react';
import { PlacarContext } from '../context/PlacarContext';


export default function Jogador({jogador, timeId}) {
  const { handleAdicionarPontuacao } = useContext(PlacarContext);

  return (
    <div style={{marginBottom: '10px',borderBottom: '1px solid #eee', paddingBottom: '10px'}}>
      <span style = {{marginRight: '15px', minWidth: '150px', display: 'inline-block'}}>
        {jogador.nome}
      </span>
      <button onClick={() => handleAdicionarPontuacao(timeId, jogador.id, 1)}> +1 </button>
      <button onClick={() => handleAdicionarPontuacao(timeId, jogador.id, 2)}> +2 </button>
      <button onClick={() => handleAdicionarPontuacao(timeId, jogador.id, 3)}> +3 </button>
      <span style={{marginLeft: '15px', fontWeight: 'bold'}}>
        {jogador.pontuacao} pts
      </span>
    </div>
  );
}