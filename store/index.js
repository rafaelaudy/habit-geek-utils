import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer, createMigrate } from "redux-persist";
import storage from "redux-persist/lib/storage";

import habitsReducer from "./reducers/habitsReducer";
import userReducer from "./reducers/userReducer";
import migrations from "./migrations";

const rooReducer = combineReducers({
  habits: habitsReducer,
  user: userReducer
});

const persistConfig = {
  key: "root",
  storage,
  version: 0,
  migrate: createMigrate(migrations)
};

const persistedReducer = persistReducer(persistConfig, rooReducer);

const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const persistor = persistStore(store);

export { store, persistor };
