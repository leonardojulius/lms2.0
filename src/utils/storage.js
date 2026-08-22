const STORAGE_KEY = 'premium_question_banks';

export const getQuestionBanks = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Failed to load question banks from storage', error);
    return [];
  }
};

export const saveQuestionBanks = (banks) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(banks));
  } catch (error) {
    console.error('Failed to save question banks to storage', error);
  }
};

export const addQuestionBank = (newBank) => {
  const banks = getQuestionBanks();
  const bankWithId = {
    ...newBank,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  banks.push(bankWithId);
  saveQuestionBanks(banks);
  return bankWithId;
};

export const deleteQuestionBank = (id) => {
  const banks = getQuestionBanks();
  const filtered = banks.filter(b => b.id !== id);
  saveQuestionBanks(filtered);
  return filtered;
};
