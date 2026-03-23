const STORAGE_KEY = 'geo_quiz_leaderboard';
const MAX_ENTRIES = 10;

export const getLeaderboard = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

export const saveScore = (nome, pontuacao) => {
  if (!nome || pontuacao === undefined) return;

  const leaderboard = getLeaderboard();
  const newEntry = {
    nome: nome.trim(),
    pontuacao,
    data: new Date().toISOString()
  };

  leaderboard.push(newEntry);
  leaderboard.sort((a, b) => {
    if (a.pontuacao !== b.pontuacao) return b.pontuacao - a.pontuacao;
    return new Date(b.data) - new Date(a.data);
  });

  const trimmed = leaderboard.slice(0, MAX_ENTRIES);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
};