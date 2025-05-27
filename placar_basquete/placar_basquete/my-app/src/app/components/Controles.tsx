import React, { useContext } from 'react';
import { PlacarContext } from '../context/PlacarContext';
import styles from './placar.module.css';

export default function Controles() {
  const { handleAlterarNomeTime, handleResetarPlacar, handleDesfazerAcao } = useContext(PlacarContext);

  return (
    <div className={styles.controlesContainer}>
      <button className={styles.controleBotao} onClick={handleAlterarNomeTime}>Alterar Nomes</button>
      <button className={styles.controleBotao} onClick={handleResetarPlacar}>Resetar Placar</button>
      <button className={styles.controleBotao} onClick={handleDesfazerAcao}>Desfazer</button>
    </div>
  );
}