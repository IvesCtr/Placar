import React, { useState, useContext, useMemo } from 'react';
import Jogador from './Jogador';
import { PlacarContext } from '../context/PlacarContext';


export default function Time({ timeId }) {
  const { timeA, timeB, handleAdicionarJogador, handleAlterarNomeTime} = useContext(PlacarContext);
  const [novoJogadorNome, setNovoJogadorNome] = useState('');

  const time = timeId === 'A' ? timeA : timeB; 


  const handleInserirClick = () => {
    handleAdicionarJogador(timeId, novoJogadorNome);
    setNovoJogadorNome(''); 
  };

  if (!time) return <div>Time não encontrado</div>;

  return (
    <div style={{ border: '1px solid black', padding: '20px', width: '45%' }}>
      {/* Placar total da equipe */}
      <h2 style={{ fontSize: '48px', margin: '0 10px', textAlign: 'center' }}>{time.pontuacao}</h2>
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
        {time.jogadores.map((jogador) => (
          <Jogador key={jogador.id} jogador={jogador} timeId={timeId} />
        ))}
      </div>
    </div>
  );
}