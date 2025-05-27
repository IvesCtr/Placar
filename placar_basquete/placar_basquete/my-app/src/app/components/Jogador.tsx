import React, { useContext } from 'react';
import { PlacarContext } from '../context/PlacarContext';

interface JogadorProps {
  jogador: {
    id: number;
    nome: string;
    pontos: number;
    timeId: number;
  };
}

export default function Jogador({ jogador }: JogadorProps) {
  const { adicionarPontos } = useContext(PlacarContext);

  return (
    <div style={{ marginBottom: '10px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
      <span style={{ marginRight: '15px', minWidth: '150px', display: 'inline-block' }}>
        {jogador.nome}
      </span>
      {/* Botões para adicionar pontos [cite: 7] */}
      <button onClick={() => adicionarPontos(jogador.id, 1)}> +1 </button>
      <button onClick={() => adicionarPontos(jogador.id, 2)}> +2 </button>
      <button onClick={() => adicionarPontos(jogador.id, 3)}> +3 </button>
      {/* Exibe a pontuação individual [cite: 6] */}
      <span style={{ marginLeft: '15px', fontWeight: 'bold' }}>
        {jogador.pontos} pts
      </span>
    </div>
  );
}