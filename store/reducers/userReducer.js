import { SAVE_USER, SAVE_SESSION } from "../../actions/userActions";

const defaulState = {
  name: "",
  avatar: "",
  jwt: undefined
};

const userReducer = (state = defaulState, { type, payload }) => {
  switch (type) {
    case SAVE_USER: {
      const { name, avatar } = payload;
      return {
        ...state,
        name,
        avatar
      };
    }

    case SAVE_SESSION: {
      const { jwt } = payload;
      return {
        ...state,
        jwt
      };
    }

    default: {
      return state;
    }
  }
};

export default userReducer;
