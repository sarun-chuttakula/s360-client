import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
};

// Enhanced root reducer with persist support
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Export the store and persistor
export { store };
export const persistor = persistStore(store);
