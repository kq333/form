export const nameAndFornameValidator = (word: string): boolean => {
  return word.length >= 3;
};

export const emailValidator = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
};
