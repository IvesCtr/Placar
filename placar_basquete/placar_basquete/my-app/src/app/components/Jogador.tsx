import React, { useContext } from 'react';
import { PlacarContext } from '../context/PlacarContext';
import styles from './placar.module.css';

export default function Jogador({jogador, timeId}) {
  const { handleAdicionarPontuacao } = useContext(PlacarContext);

  return (
    <div className={styles.jogadorItem}>
      <span className={styles.jogadorNome}>
        {jogador.nome}
      </span>
      <button onClick={() => handleAdicionarPontuacao(timeId, jogador.id, 1)}> +1 </button>
      <button onClick={() => handleAdicionarPontuacao(timeId, jogador.id, 2)}> +2 </button>
      <button onClick={() => handleAdicionarPontuacao(timeId, jogador.id, 3)}> +3 </button>
      <span className={styles.jogadorPontuacao}>
        {jogador.pontuacao} pts
      </span>
    </div>
  );
}