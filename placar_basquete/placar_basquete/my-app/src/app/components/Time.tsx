import React, { useState, useContext, useMemo } from 'react';
import Jogador from './Jogador';
import { PlacarContext } from '../context/PlacarContext';
import styles from './placar.module.css';


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
    <div className={styles.timeContainer}>
      <h2 className={styles.pontuacaoTime}>{time.pontuacao}</h2>
      <h3 className={styles.nomeTime}>{time.nome}</h3>

      <div className={styles.adicionarJogadorContainer}>
        <input
          type="text"
          value={novoJogadorNome}
          onChange={(e) => setNovoJogadorNome(e.target.value)}
          placeholder="Nome do Jogador"
          className={styles.inputJogador}
        />
        <button onClick={handleInserirClick}>Inserir Novo</button>
      </div>
      <div>
        {time.jogadores.map((jogador) => (
          <Jogador key={jogador.id} jogador={jogador} timeId={timeId} />
        ))}
      </div>
    </div>
  );
}