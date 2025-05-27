import React from 'react';
import Time from '../components/Time';
import Controles from '../components/Controles';
import { PlacarProvider, PlacarContext } from '../context/PlacarContext';
import { useContext } from 'react';
import styles from './placar.module.css';

function PlacarLayout() {
    const { times } = useContext(PlacarContext);

    const { timeA, timeB } = useContext(PlacarContext);


    return (
        <div className={styles.placarContainer}>
            <h1 className={styles.titulo}>Placar de Basquete</h1>
            <div className={styles.timesContainer}>
                {timeA && <Time timeId={timeA.id} />}
                <span className={styles.vsSpan}>vs</span>
                {timeB && <Time timeId={timeB.id} />}
            </div>
            <Controles />
        </div>
    );
}

export default function App() {
  return (
    <PlacarProvider>
      <PlacarLayout />
    </PlacarProvider>
  );
}