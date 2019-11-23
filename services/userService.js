export const signUp = (email, password) => Promise.resolve("jwt");
export const login = (email, password) => Promise.resolve("jwt");
export const forgotPassword = email => Promise.resolve();
export const changePassword = (email, oldPassword, newPassword) =>
  Promise.resolve("jwt");
