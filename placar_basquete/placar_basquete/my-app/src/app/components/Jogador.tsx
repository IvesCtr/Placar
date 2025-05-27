import React, { useContext } from 'react';
import { PlacarContext } from '../context/PlacarContext';


export default function Jogador({jogador, timeId}) {
  const { handleAdicionarPontuacao } = useContext(PlacarContext);

  return (
    <div >
      <span>
        {jogador.nome}
      </span>
      <button onClick={() => handleAdicionarPontuacao(timeId, jogador.id, 1)}> +1 </button>
      <button onClick={() => handleAdicionarPontuacao(timeId, jogador.id, 2)}> +2 </button>
      <button onClick={() => handleAdicionarPontuacao(timeId, jogador.id, 3)}> +3 </button>
      <span>
        {jogador.pontuacao} pts
      </span>
    </div>
  );
}