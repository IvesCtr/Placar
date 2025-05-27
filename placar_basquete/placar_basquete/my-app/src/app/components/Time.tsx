import React, { useState, useContext, useMemo } from 'react';
import Jogador from './Jogador';
import { PlacarContext } from '../context/PlacarContext';

interface TimeProps {
  timeId: number;
}

export default function Time({ timeId }: TimeProps) {
  const { times, jogadores, adicionarJogador } = useContext(PlacarContext);
  const [novoJogadorNome, setNovoJogadorNome] = useState('');

  const time = times.find((t) => t.id === timeId);
  const jogadoresDoTime = useMemo(() => {
    return jogadores
      .filter((j) => j.timeId === timeId)
      .sort((a, b) => b.pontos - a.pontos); // Ordena por pontos decrescente [cite: 10]
  }, [jogadores, timeId]);

  const placarTotal = useMemo(() => {
      return jogadoresDoTime.reduce((acc, jogador) => acc + jogador.pontos, 0);
  }, [jogadoresDoTime]);


  const handleInserirClick = () => {
    adicionarJogador(timeId, novoJogadorNome);
    setNovoJogadorNome(''); // Limpa o input
  };

  if (!time) return <div>Time não encontrado</div>;

  return (
    <div style={{ border: '1px solid black', padding: '20px', width: '45%' }}>
      {/* Placar total da equipe */}
      <h2 style={{ fontSize: '48px', margin: '0 10px', textAlign: 'center' }}>{placarTotal}</h2>
      <h3 style={{ textAlign: 'center', marginTop: '5px' }}>{time.nome}</h3>

      {/* Input para adicionar novo jogador [cite: 5] */}
      <div style={{ margin: '20px 0', display: 'flex' }}>
        <input
          type="text"
          value={novoJogadorNome}
          onChange={(e) => setNovoJogadorNome(e.target.value)}
          placeholder="Nome do Jogador"
          style={{ flexGrow: 1, marginRight: '10px', padding: '8px' }}
        />
        <button onClick={handleInserirClick}>Inserir Novo</button>
      </div>

      {/* Lista de jogadores [cite: 1] */}
      <div>
        {jogadoresDoTime.map((jogador) => (
          <Jogador key={jogador.id} jogador={jogador} />
        ))}
      </div>
    </div>
  );
}