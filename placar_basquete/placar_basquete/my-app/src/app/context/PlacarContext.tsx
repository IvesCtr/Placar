import { useState, useCallback, createContext, useContext } from "react";

export const PlacarContext = createContext();

const dadosIniciaisTimes = (nomeTime) => ({
    nome: nomeTime,
    jogadores: [],
    pontuacao: 0,
})

export const PlacarProvider = ({children}) => {
    const [teamA, setTeamA] = useState(() => dadosIniciaisTimes("Ceará"));
    const [teamB, setTeamB] = useState(() => dadosIniciaisTimes("Fortaleza"));
    const [historico, setHistorico] = useState([]);

    const salvarHistorico = useCallback(() => {
        const snapshotAtual = {
            teamA: JSON.parse(JSON.stringify(teamA)),
            teamB: JSON.parse(JSON.stringify(teamB)),
        };
        setHistorico(historicoAnterior => [snapshotAtual, ...historicoAnterior].slice(0, 10));
    }, [teamA, teamB]);

    const handleAdicionarJogador = useCallback((teamId, nomeJogador) => {
        if(!nomeJogador.trim()) return;
        salvarHistorico();
        const novoJogador = {id: Date.now().toString(), nome: nomeJogador, pontuacao: 0}

        const atualizarTime = (timeAnterior) => ({
            ...timeAnterior,
            jogadores: [...timeAnterior.jogadores, novoJogador]
            .sort((a, b) => (b.pontuacao - a.pontuacao))
        })

        if(teamId === "teamA"){
            setTeamA(atualizarTime);
        }
        else{
            setTeamB(atualizarTime);
        }
    }, [salvarHistorico]);

    const handleAdicionarPontuacao = useCallback((teamId, jogadorId, pontos) => {
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

        if(teamId === "teamA"){
            setTeamA(atualizarTimeEPontuacao);
        }
        else{
            setTeamB(atualizarTimeEPontuacao);
        }
    }, [salvarHistorico]);

    const handleAlterarNomeTime = useCallback((novoNomeTeamA, novoNomeTeamB) => {
        salvarHistorico();

        if(novoNomeTeamA && novoNomeTeamA.trim()){
            setTeamA(prev => {return {...prev, nome: novoNomeTeamA.trim()}})
        }
        if(novoNomeTeamB && novoNomeTeamB.trim()){
            setTeamB(prev => {return {...prev, nome: novoNomeTeamB.trim()}})
        }
    }, [salvarHistorico])

    const handleResetarPlacar = useCallback(() => {
        salvarHistorico();

        setTeamA(prev => {return {...prev, jogadores: [], pontuacao: 0}})
        setTeamB(prev => {return {...prev, jogadores: [], pontuacao: 0}})

    }, [salvarHistorico])

    const handleDesfazerAcao = useCallback(() => {
        if(historico.length > 0){
            const estadoAnterior = historico[0];
            const novoHistorico = historico.slice(1);

            setTeamA(estadoAnterior.teamA);
            setTeamB(estadoAnterior.teamB);

            setHistorico(novoHistorico);
        }
    }, [historico])

    const contextValue = {
        teamA,
        teamB,
        handleAdicionarJogador,
        handleAdicionarPontuacao,
        handleAlterarNomeTime,
        handleDesfazerAcao,
        handleResetarPlacar,
    }

    return(
        <PlacarContext.Provider value={contextValue}>
            {children}
        </PlacarContext.Provider>
    );
};

export const usePlacar = () => {
    const context = useContext(PlacarContext);
    if(context === undefined){
        throw new Error("usePlacar deve ser usado dentro de um PlacarProvider")
    }
    return context;
};