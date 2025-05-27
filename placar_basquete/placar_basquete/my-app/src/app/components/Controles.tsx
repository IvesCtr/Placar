"use client";
import React, { useContext, useState, useEffect } from 'react';
import { PlacarContext } from '../context/PlacarContext';
import styles from './placar.module.css';

export default function Controles() {
  const {
    teamA,
    teamB,
    handleAlterarNomeTime,
    handleResetarPlacar,
    handleDesfazerAcao
  } = useContext(PlacarContext);

  const [isEditingNames, setIsEditingNames] = useState(false);
  
  const [inputNomeA, setInputNomeA] = useState('');
  const [inputNomeB, setInputNomeB] = useState('');

  useEffect(() => {
    if (isEditingNames) {
      setInputNomeA(teamA?.nome || ''); 
      setInputNomeB(teamB?.nome || '');
    }
  }, [isEditingNames, teamA, teamB]);

  const handleAbrirEdicaoNomes = () => {
    setIsEditingNames(true);
  };

  const handleSalvarNovosNomes = () => {
    const finalNomeA = inputNomeA.trim() !== '' ? inputNomeA.trim() : teamA?.nome;
    const finalNomeB = inputNomeB.trim() !== '' ? inputNomeB.trim() : teamB?.nome;

    if (finalNomeA !== undefined && finalNomeB !== undefined) {
        handleAlterarNomeTime(finalNomeA, finalNomeB);
    }
    setIsEditingNames(false);
  };

  const handleCancelarEdicao = () => {
    setIsEditingNames(false);
  };

  return (
    <div className={styles.controlesContainer} style={{ marginTop: '30px', textAlign: 'center' }}>
      {isEditingNames ? (
        <div style={{ 
            padding: '20px', 
            border: '1px solid #ccc', 
            borderRadius: '8px', 
            backgroundColor: '#f9f9f9', 
            maxWidth: '400px', 
            margin: '20px auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
        }}>
          <h3 style={{ marginTop: 0, marginBottom: '15px', textAlign: 'center' }}>Alterar Nomes dos Times</h3>
          <div>
            <label htmlFor="novoNomeTimeA" style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>
              Nome do Time A:
            </label>
            <input
              type="text"
              id="novoNomeTimeA"
              value={inputNomeA}
              onChange={(e) => setInputNomeA(e.target.value)}
              className={styles.inputJogador}
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            />
          </div>
          <div>
            <label htmlFor="novoNomeTimeB" style={{ display: 'block', marginBottom: '5px', textAlign: 'left' }}>
              Nome do Time B:
            </label>
            <input
              type="text"
              id="novoNomeTimeB"
              value={inputNomeB}
              onChange={(e) => setInputNomeB(e.target.value)}
              className={styles.inputJogador}
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ textAlign: 'right', marginTop: '10px' }}>
            <button 
              className={styles.controleBotao}
              style={{ marginRight: '10px' }}
              onClick={handleCancelarEdicao}
            >
              Cancelar
            </button>            
            <button 
              className={styles.controleBotao}
              onClick={handleSalvarNovosNomes}
            >
              Salvar Nomes
            </button>
          </div>
        </div>
      ) : (
        <>
          <button className={styles.controleBotao} onClick={handleAbrirEdicaoNomes}>
            Alterar Nomes
          </button>
          <button className={styles.controleBotao} onClick={handleResetarPlacar}>
            Resetar Placar
          </button>
          <button className={styles.controleBotao} onClick={handleDesfazerAcao}>
            Desfazer
          </button>
        </>
      )}
    </div>
  );
}