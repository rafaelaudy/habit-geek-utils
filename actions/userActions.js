export const SAVE_USER = "SAVE_USER";
export const saveUser = (name, avatar) => ({
  type: SAVE_USER,
  payload: {
    name,
    avatar
  }
});

export const SAVE_SESSION = "SAVE_SESSION";
export const saveSession = jwt => ({
  type: SAVE_SESSION,
  payload: {
    jwt
  }
});
