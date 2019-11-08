import { REGISTER_USER } from "../../actions/userActions";

const defaulState = {
  name: "",
  avatar: ""
};

const userReducer = (state = defaulState, { type, payload }) => {
  switch (type) {
    case REGISTER_USER: {
      const { name, avatar } = payload;
      return {
        ...state,
        name,
        avatar
      };
    }

    default: {
      return state;
    }
  }
};

export default userReducer;
