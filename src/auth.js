// src/auth.js
export const isLoggedIn = () => {
    return localStorage.getItem('authToken') !== null;
  };
  