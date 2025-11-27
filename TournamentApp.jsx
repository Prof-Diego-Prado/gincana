import React, { useState, useEffect } from 'react';
import { Trophy, Users, Award, Shuffle, Save, RotateCcw, CheckCircle, Calculator } from 'lucide-react';

// Dados iniciais
const DATA_EM = [
  { id: 'em1', name: '[1º FDA] RAFAELLA SIMON DIAS & MARIA ISABEL TURMINA WILLMS' },
  { id: 'em2', name: '[1º EMB] FLAVIA GABRIELA MENDES FELIPES & ISABELLE TAUANY RATEIRO BARBOSA' },
  { id: 'em3', name: '[1º EMC] CIBELY GOMES PIRES & ALEXANDRE VALADAO DA SILVA' },
  { id: 'em4', name: '[1º EMB] LAVINIA VITORIA LOPEZ FERNANDEZ & GEOVANA ANTONYELI LOPEZ PEREIRA' },
  { id: 'em5', name: '[3º EMC] MATHEUS ADRIAN SERVIN GIROLOMETO & ANDRE LUIZ MARQUES' },
  { id: 'em6', name: '[1º EMC] LUKAS HENRIQUE LIMA MILANEZ & BERNARDO DA SILVA DOS SANTOS' },
  { id: 'em7', name: '[2º EMC] DAVID EDUARDO NEVES DE OLIVEIRA & PEDRO EMANUEL DOS SANTOS REGO' },
  { id: 'em8', name: '[2º EMD] AUANI GABRIELA ALVES BATISTA DE ALMEIDA & MARIA VITORIA FERNANDES DA COSTA' },
  { id: 'em9', name: '[1º EMC] RUAN GABRIEL BARBOSA SANTOS & FELIPE INACIO' },
  { id: 'em10', name: '[2º EMC] ANNIAH JULIA ALVES MARTINS & LUISA CAMILA ORLANDINI LEONARDO' }
];

const DATA_EF = [
  { id: 'ef1', name: '[6º B] GABRIEL DE OLIVEIRA BETTAZZA & MAYCON DAVID ALVES MORAIS DOS SANTOS' },
  { id: 'ef2', name: '[6º B] IZADORA FRITZ DOS REIS & ISADORA CENTURIAO BRUM' },
  { id: 'ef3', name: '[6º B] NICOLE STANISLAWSKI BRITO & LUANA SOARES TEIXEIRA' },
  { id: 'ef4', name: '[7º B] EMANUELY CRISTINA NUNES & ANA LIVIA RANGEL DE SOUZA' },
  { id: 'ef5', name: '[7º B] GABRIELE DE SOUZA CLARO DA COSTA & NICOLLY GERULINA LIMA FRANZONI PERPETUO' },
  { id: 'ef6', name: '[7º B] RAFAELA ITO MARCANZONI & DANIELLY ANSELMO RODRIGUES' },
  { id: 'ef7', name: '[7º B] JOSE ANTONIO MOREIRA SOUZA & RYAN DIAS CLARO DA COSTA' },
  { id: 'ef8', name: '[6º A] EDUARDO DA SILVA BIFI & SARAH MANUELLA COELHO MACHADO' },
  { id: 'ef9', name: '[9º B] FELIPE FALCI PACHECO & FRANCISCO ESTEVAN DE SOUSA' },
  { id: 'ef10', name: '[6º A] SARAH PLACIDO FERREIRA & HELOIZA GABRIELLY ZUTTION FERREIRA' },
  { id: 'ef11', name: '[7º B] LAURA MAYSA MAXIMO DA SILVA & FERNANDA CAROLINA ALVAREZ GONZALEZ' },
  { id: 'ef12', name: '[6º C] AGHATA FERNANDA DA SILVA & LYVIA DA SILVA OLIVEIRA' },
  { id: 'ef13', name: '[9º D] MIKAEL GONCALVES PEREIRA DA SILVA & LORENZO LOPEZ CANDIDO DA SILVA' },
  { id: 'ef14', name: '[9º C] EVELLYN CHRISTINI PERETTO MOISES & REBECA VITORIA DE AZEVEDO ALONSO' },
  { id: 'ef15', name: '[6º D] ARTHUR DIAS DO NASCIMENTO & VICTOR OTAVIO NASCIMENTO RIBEIRO' },
  { id: 'ef16', name: '[6º A] VALENTINA MELLO & RAFAELA BEATRIZ BARAGATE PULEZA' },
  { id: 'ef17', name: '[8º A] THALISON TELESTE & LARA ISABELLY DA ROSA GESSER' },
  { id: 'ef18', name: '[6º C] ANTHONY GABRIEL LOPEZ PEREIRA & JOAO MIGUEL DOS SANTOS DOMINGUES' },
  { id: 'ef19', name: '[6º C] NICOLAS RAMON SUTIL VARGAS & NICOLLAS LORENZO GOMES DOS SANTOS' },
  { id: 'ef20', name: '[6º C] HELOISA VITORIA MESSIAS RIBEIRO & ISADORA GABRIELA DE OLIVEIRA DIAS' }
];

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Componente para um card de Jogo
const MatchCard = ({ match, onUpdateScore, onFinishMatch, matchIndex, roundName }) => {
  const [scores, setScores] = useState(match.scores || [{ a: '', b: '' }, { a: '', b: '' }, { a: '', b: '' }]);
  
  useEffect(() => {
    if(match.scores) setScores(match.scores);
  }, [match.scores]);

  const handleScoreChange = (setIndex, team, value) => {
    const newScores = [...scores];
    newScores[setIndex][team] = value;
    setScores(newScores);
    onUpdateScore(match.id, newScores);
  };

  const calculateWinner = () => {
    let winsA = 0;
    let winsB = 0;
    scores.forEach(set => {
      const a = parseInt(set.a) || 0;
      const b = parseInt(set.b) || 0;
      if (a > b && a >= 15) winsA++; 
      if (b > a && b >= 15) winsB++;
    });
    return { winsA, winsB };
  };

  const { winsA, winsB } = calculateWinner();
  const isFinished = match.winner !== null;
  const canFinish = !isFinished && (winsA === 2 || winsB === 2);

  return (
    <div className={`border rounded-lg p-4 mb-4 shadow-sm ${isFinished ? 'bg-gray-50 border-green-200' : 'bg-white border-gray-200'}`}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-bold text-gray-500 uppercase">{roundName} - Jogo {matchIndex + 1}</span>
        {isFinished && <span className="text-xs font-bold text-green-600 flex items-center"><CheckCircle size={12} className="mr-1"/> Finalizado</span>}
      </div>

      <div className="flex flex-col gap-3">
        {/* Time A */}
        <div className={`flex justify-between items-center ${match.winner === match.teamA?.id ? 'font-bold text-green-700' : ''}`}>
          <div className="text-sm w-2/3 truncate" title={match.teamA?.name || 'Aguardando...'}>
             {match.teamA ? match.teamA.name : <span className="text-gray-400 italic">A definir</span>}
          </div>
          <div className="flex gap-1">
            {[0, 1, 2].map(i => (
              <input 
                key={`a-${i}`}
                type="number" 
                className="w-10 h-8 border text-center text-sm rounded disabled:bg-gray-100"
                placeholder="0"
                value={scores[i].a}
                onChange={(e) => handleScoreChange(i, 'a', e.target.value)}
                disabled={isFinished || !match.teamA || !match.teamB}
              />
            ))}
          </div>
        </div>

        {/* Time B */}
        <div className={`flex justify-between items-center ${match.winner === match.teamB?.id ? 'font-bold text-green-700' : ''}`}>
          <div className="text-sm w-2/3 truncate" title={match.teamB?.name || 'Aguardando...'}>
            {match.teamB ? match.teamB.name : <span className="text-gray-400 italic">A definir</span>}
          </div>
          <div className="flex gap-1">
            {[0, 1, 2].map(i => (
              <input 
                key={`b-${i}`}
                type="number" 
                className="w-10 h-8 border text-center text-sm rounded disabled:bg-gray-100"
                placeholder="0"
                value={scores[i].b}
                onChange={(e) => handleScoreChange(i, 'b', e.target.value)}
                disabled={isFinished || !match.teamA || !match.teamB}
              />
            ))}
          </div>
        </div>
      </div>

      {!isFinished && canFinish && (
        <button 
          onClick={() => onFinishMatch(match, winsA > winsB ? match.teamA : match.teamB, scores)}
          className="mt-3 w-full py-2 bg-green-600 text-white text-sm font-bold rounded hover:bg-green-700 transition-colors flex justify-center items-center gap-2"
        >
          <Save size={14} /> Confirmar Vencedor
        </button>
      )}
    </div>
  );
};

const BracketColumn = ({ title, matches, onUpdateScore, onFinishMatch }) => (
  <div className="min-w-[350px] flex-1 bg-gray-50 p-4 rounded-xl">
    <h3 className="text-center font-bold text-gray-700 mb-4 sticky top-0 bg-gray-50 py-2 border-b">{title}</h3>
    <div className="space-y-4">
      {matches.map((match, idx) => (
        <MatchCard 
          key={match.id} 
          match={match} 
          matchIndex={idx}
          roundName={title}
          onUpdateScore={onUpdateScore}
          onFinishMatch={onFinishMatch}
        />
      ))}
      {matches.length === 0 && <p className="text-center text-gray-400 text-sm italic">Nenhum jogo nesta fase</p>}
    </div>
  </div>
);

export default function TournamentApp() {
  const [activeTab, setActiveTab] = useState('EM');
  const [brackets, setBrackets] = useState({ EM: [], EF: [] });
  const [initialized, setInitialized] = useState(false);

  // Lógica de Pontuação para Melhores Perdedores
  const calculateBestLosers = (roundMatches, countNeeded) => {
    const losers = roundMatches
      .filter(m => m.winner) // Só jogos terminados
      .map(m => {
        const loserId = m.winner === m.teamA.id ? m.teamB.id : m.teamA.id;
        const loserTeam = m.winner === m.teamA.id ? m.teamB : m.teamA;
        
        // Calcular stats
        let setsWon = 0;
        let pointsWon = 0;
        let pointsLost = 0;
        
        m.scores.forEach(s => {
          const ptsA = parseInt(s.a) || 0;
          const ptsB = parseInt(s.b) || 0;
          pointsWon += (loserId === m.teamA.id) ? ptsA : ptsB;
          pointsLost += (loserId === m.teamA.id) ? ptsB : ptsA;
          
          if (loserId === m.teamA.id && ptsA > ptsB) setsWon++;
          if (loserId === m.teamB.id && ptsB > ptsA) setsWon++;
        });

        return {
          team: loserTeam,
          setsWon,
          pointDiff: pointsWon - pointsLost,
          pointsWon
        };
      });

    // Ordenar: Mais sets vencidos > Melhor saldo de pontos > Mais pontos feitos
    losers.sort((a, b) => {
      if (b.setsWon !== a.setsWon) return b.setsWon - a.setsWon;
      if (b.pointDiff !== a.pointDiff) return b.pointDiff - a.pointDiff;
      return b.pointsWon - a.pointsWon;
    });

    return losers.slice(0, countNeeded).map(l => l.team);
  };

  const initializeBrackets = (randomize = true) => {
    const teamsEM = randomize ? shuffleArray(DATA_EM) : [...DATA_EM];
    
    // --- EM: 10 times -> 5 jogos (Todos jogam) ---
    // Fase 1: Classificatória
    const r1EM = [];
    for(let i=0; i<5; i++) {
      r1EM.push({ 
        id: `em_r1_${i}`, round: '1ª Fase', 
        teamA: teamsEM[i*2], teamB: teamsEM[i*2+1], 
        winner: null, nextMatchId: null, scores: null 
      });
    }

    // Fase 2: Quartas (8 times: 5 Vencedores + 3 Melhores Perdedores)
    // Estrutura fixa para receber os vencedores e perdedores
    const qEM = [
      { id: 'em_q_1', round: 'Quartas', teamA: null, teamB: null, winner: null, nextMatchId: 'em_s_1', scores: null, sourceA: 'win_r1_0', sourceB: 'best_loser_0' },
      { id: 'em_q_2', round: 'Quartas', teamA: null, teamB: null, winner: null, nextMatchId: 'em_s_1', scores: null, sourceA: 'win_r1_1', sourceB: 'best_loser_1' },
      { id: 'em_q_3', round: 'Quartas', teamA: null, teamB: null, winner: null, nextMatchId: 'em_s_2', scores: null, sourceA: 'win_r1_2', sourceB: 'best_loser_2' },
      { id: 'em_q_4', round: 'Quartas', teamA: null, teamB: null, winner: null, nextMatchId: 'em_s_2', scores: null, sourceA: 'win_r1_3', sourceB: 'win_r1_4' },
    ];

    const sEM = [
      { id: 'em_s_1', round: 'Semifinal', teamA: null, teamB: null, winner: null, nextMatchId: 'em_f_1', scores: null },
      { id: 'em_s_2', round: 'Semifinal', teamA: null, teamB: null, winner: null, nextMatchId: 'em_f_1', scores: null },
    ];
    const fEM = [{ id: 'em_f_1', round: 'Final', teamA: null, teamB: null, winner: null, nextMatchId: null, scores: null }];

    // --- EF: 20 times -> 10 jogos (Todos jogam) ---
    const teamsEF = randomize ? shuffleArray(DATA_EF) : [...DATA_EF];
    
    // Fase 1: Classificatória
    const r1EF = [];
    for(let i=0; i<10; i++) {
      r1EF.push({ 
        id: `ef_r1_${i}`, round: '1ª Fase', 
        teamA: teamsEF[i*2], teamB: teamsEF[i*2+1], 
        winner: null, nextMatchId: null, scores: null 
      });
    }

    // Fase 2: Oitavas (16 times: 10 Vencedores + 6 Melhores Perdedores)
    const oEF = [
      { id: 'ef_o_1', round: 'Oitavas', teamA: null, teamB: null, winner: null, nextMatchId: 'ef_q_1', scores: null, sourceA: 'win_r1_0', sourceB: 'best_loser_0' },
      { id: 'ef_o_2', round: 'Oitavas', teamA: null, teamB: null, winner: null, nextMatchId: 'ef_q_1', scores: null, sourceA: 'win_r1_1', sourceB: 'best_loser_1' },
      { id: 'ef_o_3', round: 'Oitavas', teamA: null, teamB: null, winner: null, nextMatchId: 'ef_q_2', scores: null, sourceA: 'win_r1_2', sourceB: 'best_loser_2' },
      { id: 'ef_o_4', round: 'Oitavas', teamA: null, teamB: null, winner: null, nextMatchId: 'ef_q_2', scores: null, sourceA: 'win_r1_3', sourceB: 'best_loser_3' },
      { id: 'ef_o_5', round: 'Oitavas', teamA: null, teamB: null, winner: null, nextMatchId: 'ef_q_3', scores: null, sourceA: 'win_r1_4', sourceB: 'best_loser_4' },
      { id: 'ef_o_6', round: 'Oitavas', teamA: null, teamB: null, winner: null, nextMatchId: 'ef_q_3', scores: null, sourceA: 'win_r1_5', sourceB: 'best_loser_5' },
      { id: 'ef_o_7', round: 'Oitavas', teamA: null, teamB: null, winner: null, nextMatchId: 'ef_q_4', scores: null, sourceA: 'win_r1_6', sourceB: 'win_r1_7' },
      { id: 'ef_o_8', round: 'Oitavas', teamA: null, teamB: null, winner: null, nextMatchId: 'ef_q_4', scores: null, sourceA: 'win_r1_8', sourceB: 'win_r1_9' },
    ];

    const qEF = [
      { id: 'ef_q_1', round: 'Quartas', teamA: null, teamB: null, winner: null, nextMatchId: 'ef_s_1', scores: null },
      { id: 'ef_q_2', round: 'Quartas', teamA: null, teamB: null, winner: null, nextMatchId: 'ef_s_1', scores: null },
      { id: 'ef_q_3', round: 'Quartas', teamA: null, teamB: null, winner: null, nextMatchId: 'ef_s_2', scores: null },
      { id: 'ef_q_4', round: 'Quartas', teamA: null, teamB: null, winner: null, nextMatchId: 'ef_s_2', scores: null },
    ];
    
    const sEF = [
      { id: 'ef_s_1', round: 'Semifinal', teamA: null, teamB: null, winner: null, nextMatchId: 'ef_f_1', scores: null },
      { id: 'ef_s_2', round: 'Semifinal', teamA: null, teamB: null, winner: null, nextMatchId: 'ef_f_1', scores: null },
    ];
    const fEF = [{ id: 'ef_f_1', round: 'Final', teamA: null, teamB: null, winner: null, nextMatchId: null, scores: null }];

    setBrackets({
      EM: [...r1EM, ...qEM, ...sEM, ...fEM],
      EF: [...r1EF, ...oEF, ...qEF, ...sEF, ...fEF]
    });
    setInitialized(true);
  };

  useEffect(() => {
    if (!initialized) initializeBrackets(false);
  }, [initialized]);

  const handleUpdateScore = (matchId, newScores) => {
    const category = activeTab;
    const newBracket = brackets[category].map(m => {
      if (m.id === matchId) return { ...m, scores: newScores };
      return m;
    });
    setBrackets({ ...brackets, [category]: newBracket });
  };

  const handleFinishMatch = (match, winnerTeam, finalScores) => {
    if (!window.confirm(`Confirmar vitória para: ${winnerTeam.name}?`)) return;

    const category = activeTab;
    const currentBracket = [...brackets[category]];
    
    // 1. Atualiza o vencedor e scores
    const matchIndex = currentBracket.findIndex(m => m.id === match.id);
    currentBracket[matchIndex] = { ...currentBracket[matchIndex], winner: winnerTeam.id, scores: finalScores };

    // 2. Tenta mover o vencedor para o próximo jogo, se for slot direto
    if (match.nextMatchId) {
      const nextMatchIndex = currentBracket.findIndex(m => m.id === match.nextMatchId);
      if (nextMatchIndex !== -1) {
        let newNextMatch = { ...currentBracket[nextMatchIndex] };
        if (!newNextMatch.teamA) newNextMatch.teamA = winnerTeam;
        else if (!newNextMatch.teamB) newNextMatch.teamB = winnerTeam;
        currentBracket[nextMatchIndex] = newNextMatch;
      }
    }
    
    // Se não tiver nextMatchId direto, ele espera a lógica de repescagem (sourceA/B)
    
    setBrackets({ ...brackets, [category]: currentBracket });
  };

  // Função mágica de Repescagem
  const runRepechage = () => {
    const category = activeTab;
    const currentBracket = [...brackets[category]];
    
    const r1Matches = currentBracket.filter(m => m.round === '1ª Fase');
    const allFinished = r1Matches.every(m => m.winner);
    
    if (!allFinished) {
      alert("Atenção: Finalize todos os jogos da 1ª Fase antes de gerar a repescagem.");
      return;
    }

    // Identificar vencedores e melhores perdedores
    const winners = r1Matches.map(m => m.winner === m.teamA.id ? m.teamA : m.teamB);
    const countLosersNeeded = category === 'EM' ? 3 : 6;
    const bestLosers = calculateBestLosers(r1Matches, countLosersNeeded);

    alert(`Repescagem calculada!\nClassificados: ${winners.length} Vencedores + ${bestLosers.length} Melhores Perdedores.`);

    // Preencher a próxima fase (Quartas EM ou Oitavas EF)
    // A lógica mapeia sources (win_r1_x ou best_loser_x) para os slots
    const nextRoundName = category === 'EM' ? 'Quartas' : 'Oitavas';
    
    currentBracket.forEach((match, idx) => {
      if (match.round === nextRoundName) {
        // Preencher Team A
        if (match.sourceA) {
           if (match.sourceA.startsWith('win_r1_')) {
             const index = parseInt(match.sourceA.split('_').pop());
             if (winners[index]) match.teamA = winners[index];
           } else if (match.sourceA.startsWith('best_loser_')) {
             const index = parseInt(match.sourceA.split('_').pop());
             if (bestLosers[index]) match.teamA = bestLosers[index];
           }
        }
        // Preencher Team B
        if (match.sourceB) {
           if (match.sourceB.startsWith('win_r1_')) {
             const index = parseInt(match.sourceB.split('_').pop());
             if (winners[index]) match.teamB = winners[index];
           } else if (match.sourceB.startsWith('best_loser_')) {
             const index = parseInt(match.sourceB.split('_').pop());
             if (bestLosers[index]) match.teamB = bestLosers[index];
           }
        }
      }
    });

    setBrackets({ ...brackets, [category]: currentBracket });
  };

  // Move vencedor de rodadas normais (Quartas em diante)
  // Como a lógica acima só roda no botão, precisamos garantir que o fluxo normal de winners continue funcionando
  // para as fases subsequentes (ex: Quartas -> Semi). 
  // O handleFinishMatch já faz isso via `nextMatchId`.
  
  const getMatchesByRound = (category) => {
    const list = brackets[category];
    const groups = {};
    list.forEach(m => {
      if (!groups[m.round]) groups[m.round] = [];
      groups[m.round].push(m);
    });
    return groups;
  };

  const currentMatches = getMatchesByRound(activeTab);
  const roundOrder = activeTab === 'EM' 
    ? ['1ª Fase', 'Quartas', 'Semifinal', 'Final']
    : ['1ª Fase', 'Oitavas', 'Quartas', 'Semifinal', 'Final'];

  // Verificar se precisa mostrar botão de repescagem
  const showRepechageBtn = currentMatches['1ª Fase']?.every(m => m.winner) && 
                           currentMatches[activeTab === 'EM' ? 'Quartas' : 'Oitavas']?.some(m => !m.teamA || !m.teamB);

  // Campeão
  const finalMatch = brackets[activeTab].find(m => m.round === 'Final');
  const championName = finalMatch?.winner ? (finalMatch.teamA.id === finalMatch.winner ? finalMatch.teamA.name : finalMatch.teamB.name) : null;

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans text-slate-800">
      <header className="bg-blue-700 text-white p-6 rounded-xl shadow-lg mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Trophy className="text-yellow-400" /> Torneio Escolar
            </h1>
            <p className="opacity-90 mt-1">Gestão de Chaveamento - Repescagem Automática</p>
          </div>
          <button 
            onClick={() => {
              if(window.confirm("Reiniciar tudo e sortear novamente?")) {
                initializeBrackets(true);
              }
            }}
            className="bg-blue-800 hover:bg-blue-900 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-semibold transition-colors border border-blue-500"
          >
            <Shuffle size={16} /> Sortear & Reiniciar
          </button>
        </div>
      </header>

      {/* Navegação */}
      <div className="flex gap-2 mb-6 bg-white p-2 rounded-lg shadow-sm w-fit mx-auto">
        <button 
          onClick={() => setActiveTab('EM')}
          className={`px-6 py-2 rounded-md font-bold transition-all ${activeTab === 'EM' ? 'bg-blue-600 text-white shadow' : 'text-gray-500 hover:bg-gray-100'}`}
        >
          Ensino Médio
        </button>
        <button 
          onClick={() => setActiveTab('EF')}
          className={`px-6 py-2 rounded-md font-bold transition-all ${activeTab === 'EF' ? 'bg-blue-600 text-white shadow' : 'text-gray-500 hover:bg-gray-100'}`}
        >
          Ensino Fundamental
        </button>
      </div>

      {/* Área de Repescagem */}
      {showRepechageBtn && (
        <div className="mb-6 p-4 bg-orange-100 border border-orange-300 rounded-lg flex justify-between items-center animate-in fade-in slide-in-from-top-4">
          <div>
            <h3 className="font-bold text-orange-800">1ª Fase Concluída!</h3>
            <p className="text-sm text-orange-700">Clique para calcular os melhores perdedores e montar a próxima fase.</p>
          </div>
          <button 
            onClick={runRepechage}
            className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded shadow flex items-center gap-2"
          >
            <Calculator size={18} /> Gerar Chaves Finais
          </button>
        </div>
      )}

      {championName && (
        <div className="mb-8 bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded shadow-sm flex items-center gap-4 animate-pulse">
          <Award className="text-yellow-600 w-12 h-12" />
          <div>
            <h3 className="font-bold text-yellow-800 text-lg">Campeão Definido!</h3>
            <p className="text-yellow-900 text-xl font-bold">{championName}</p>
          </div>
        </div>
      )}

      {/* Chaves */}
      <div className="flex gap-6 overflow-x-auto pb-8 custom-scrollbar">
        {roundOrder.map(round => (
          currentMatches[round] && currentMatches[round].length > 0 && (
            <BracketColumn 
              key={round} 
              title={round} 
              matches={currentMatches[round]} 
              onUpdateScore={handleUpdateScore}
              onFinishMatch={handleFinishMatch}
            />
          )
        ))}
      </div>
    </div>
  );
}