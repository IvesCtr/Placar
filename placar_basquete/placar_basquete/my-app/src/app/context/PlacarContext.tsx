import { useState, useCallback, createContext, useContext } from "react";

export const PlacarContext = createContext();

const dadosIniciaisTimes = (nomeTime) => ({
    nome: nomeTime,
    jogadores: [],
    pontuacao: 0,
})

export const PlacarProvider = ({children}) => {

    const [historico, setHistorico] = useState([]);
    const [timeA, setTimeA] = useState({id: "A", nome: "Ceará", jogadores: [], pontuacao: 0});
    const [timeB, setTimeB] = useState({id: "B", nome: "Fortaleza", jogadores: [], pontuacao: 0});

    const salvarHistorico = () => {
        const snapshotAtual = {
            timeA: JSON.parse(JSON.stringify(timeA)),
            timeB: JSON.parse(JSON.stringify(timeB)),
        };
        setHistorico(historicoAnterior => [snapshotAtual, ...historicoAnterior].slice(0, 10));
    };

    const handleAdicionarJogador = (timeId, nomeJogador) => {
        if(!nomeJogador.trim()) return;
        salvarHistorico();
        const novoJogador = {id: Date.now().toString(), nome: nomeJogador, pontuacao: 0}

        const atualizarTime = (timeAnterior) => ({
            ...timeAnterior,
            jogadores: [...timeAnterior.jogadores, novoJogador]
            .sort((a, b) => (b.pontuacao - a.pontuacao))
        })
        if(timeId === "A"){
            setTimeA(atualizarTime);
        }
        else{
            setTimeB(atualizarTime);
        }
    };

    const handleAdicionarPontuacao = (timeId, jogadorId, pontos) => {
        salvarHistorico();

        const atualizarTimeEPontuacao = (timeAnterior) => {
            let novaPontuacaoDoTime = timeAnterior.pontuacao;
            const jogadoresAtualizados = timeAnterior.jogadores.map((jogador) => {
                if(jogador.id === jogadorId){
                    novaPontuacaoDoTime += pontos;
                    return {
                        ...jogador, 
                        pontuacao: jogador.pontuacao + pontos
                    }
                }
                return jogador;
            })
            .sort((a, b) => b.pontuacao - a.pontuacao)

            return {
                ...timeAnterior,
                jogadores: jogadoresAtualizados,
                pontuacao: novaPontuacaoDoTime,
            };
        }

        if(timeId === "A"){
            setTimeA(atualizarTimeEPontuacao);
        }
        else{
            setTimeB(atualizarTimeEPontuacao);
        }
    };

    const handleAlterarNomeTime = (novoNometimeA, novoNometimeB) => {
        salvarHistorico();

        if(novoNometimeA && novoNometimeA.trim()){
            setTimeA(prev => {return {...prev, nome: novoNometimeA.trim()}})
        }
        if(novoNometimeB && novoNometimeB.trim()){
            setTimeB(prev => {return {...prev, nome: novoNometimeB.trim()}})
        }
    }

    const handleResetarPlacar = () => {
        salvarHistorico();

        setTimeA(prev => {return {...prev, jogadores: [], pontuacao: 0}})
        setTimeB(prev => {return {...prev, jogadores: [], pontuacao: 0}})

    }

    const handleDesfazerAcao = () => {
        if(historico.length > 0){
            const estadoAnterior = historico[0];
            const novoHistorico = historico.slice(1);

            setTimeA(estadoAnterior.timeA);
            setTimeB(estadoAnterior.timeB);

            setHistorico(novoHistorico);
        }
    }

    return(
        <PlacarContext.Provider 
        value={{
            timeA,
            timeB,
            handleAdicionarJogador,
            handleAdicionarPontuacao,
            handleAlterarNomeTime,
            handleDesfazerAcao,
            handleResetarPlacar,
        }}>
            {children}
        </PlacarContext.Provider>
    );
};