export const REGISTER_USER = "REGISTER_USER";
export const registerUser = (name, avatar) => ({
  type: REGISTER_USER,
  payload: {
    name,
    avatar
  }
});
