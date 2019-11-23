import userReducer from "./userReducer";
import { saveUser, saveSession } from "../../actions/userActions";

describe("userReducer", () => {
  it("saves the user", () => {
    const state = userReducer({}, saveUser("rafa", "avatar"));
    expect(state).toEqual({ name: "rafa", avatar: "avatar" });
  });

  it("saves the jwt", () => {
    const state = userReducer({}, saveSession("jwt"));
    expect(state).toEqual({ jwt: "jwt" });
  });

  it("returns state when no recognized action is provided", () => {
    const initialState = { works: true };
    const state = userReducer(initialState, { type: "NOT_RECOGNIZED" });
    expect(state).toEqual(initialState);
  });
});
