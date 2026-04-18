export const getUserRole = () => {
  const email = localStorage.getItem('email');

  if (email === 'ndevani894@rku.ac.in') return 'admin';
  return 'user';
};