const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const isValid = (email) => {
  return emailRegex.test(email);
};
