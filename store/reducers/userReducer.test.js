import userReducer from "./userReducer";
import { registerUser } from "../../actions/userActions";

describe("userReducer", () => {
  it("registers the user", () => {
    const state = userReducer(undefined, registerUser("rafa", "avatar"));
    expect(state).toEqual({ name: "rafa", avatar: "avatar" });
  });

  it("returns state when no recognized action is provided", () => {
    const initialState = { works: true };
    const state = userReducer(initialState, { type: "NOT_RECOGNIZED" });
    expect(state).toEqual(initialState);
  });
});
