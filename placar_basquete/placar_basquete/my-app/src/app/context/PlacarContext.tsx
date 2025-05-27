import React, { createContext, useState, ReactNode, useCallback } from 'react';

// Define a estrutura de um jogador e de um time
interface Jogador {
  id: number;
  nome: string;
  pontos: number;
  timeId: number;
}

interface Time {
  id: number;
  nome: string;
}

interface PlacarContextData {
  times: Time[];
  jogadores: Jogador[];
  adicionarJogador: (timeId: number, nome: string) => void;
  adicionarPontos: (jogadorId: number, pontos: number) => void;
  alterarNomes: () => void;
  resetarPlacar: () => void;
  desfazer: () => void;
  podeDesfazer: boolean;
}

// Cria o Contexto
export const PlacarContext = createContext<PlacarContextData>({} as PlacarContextData);

// Define o tipo para as props do Provider
interface PlacarProviderProps {
  children: ReactNode;
}

// Cria o Componente Provedor
export function PlacarProvider({ children }: PlacarProviderProps) {
  const [times, setTimes] = useState<Time[]>([
    { id: 1, nome: 'Ceará' },
    { id: 2, nome: 'Fortaleza' },
  ]);
  const [jogadores, setJogadores] = useState<Jogador[]>([]);
  const [historico, setHistorico] = useState<Jogador[][]>([]); // Histórico de estados dos jogadores

  const podeDesfazer = historico.length > 0;

  // Função para salvar o estado atual antes de modificar
  const salvarEstadoAtual = useCallback(() => {
    setHistorico((prevHistorico) => [...prevHistorico, jogadores]);
  }, [jogadores]);

  const adicionarJogador = (timeId: number, nome: string) => {
    if (!nome.trim()) {
        alert("Por favor, insira um nome para o jogador.");
        return;
    }
    salvarEstadoAtual();
    const novoJogador: Jogador = {
      id: Date.now(), // ID único baseado no tempo
      nome: nome.trim(),
      pontos: 0,
      timeId: timeId,
    };
    setJogadores((prevJogadores) => [...prevJogadores, novoJogador]);
  };

  const adicionarPontos = (jogadorId: number, pontosParaAdicionar: number) => {
    salvarEstadoAtual();
    setJogadores((prevJogadores) =>
      prevJogadores.map((jogador) =>
        jogador.id === jogadorId
          ? { ...jogador, pontos: jogador.pontos + pontosParaAdicionar }
          : jogador
      )
    );
  };

  const alterarNomes = () => {
     // A alteração de nomes não será incluída no histórico de "desfazer" por simplicidade
    const novoNome1 = prompt("Digite o novo nome para o Time 1:", times[0].nome);
    const novoNome2 = prompt("Digite o novo nome para o Time 2:", times[1].nome);
    setTimes([
        { ...times[0], nome: novoNome1 || times[0].nome },
        { ...times[1], nome: novoNome2 || times[1].nome }
    ]);
  };

  const resetarPlacar = () => {
    salvarEstadoAtual();
    setJogadores([]); // Remove todos os jogadores [cite: 12]
  };

  const desfazer = () => {
    if (historico.length > 0) {
      const estadoAnterior = historico[historico.length - 1];
      setJogadores(estadoAnterior);
      setHistorico((prevHistorico) => prevHistorico.slice(0, -1));
    }
  };

  return (
    <PlacarContext.Provider
      value={{
        times,
        jogadores,
        adicionarJogador,
        adicionarPontos,
        alterarNomes,
        resetarPlacar,
        desfazer,
        podeDesfazer,
      }}
    >
      {children}
    </PlacarContext.Provider>
  );
}