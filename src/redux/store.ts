import { configureStore, combineReducers } from "@reduxjs/toolkit"
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist"
import storage from "redux-persist/lib/storage"
import userReducer from "./slices/user"
import sellerReducer from "./slices/seller"

const userPersistConfig = {
  key: "user",
  version: 1,
  storage,
}

const sellerPersistConfig = {
  key: "seller",
  version: 1,
  storage,
}

const userPersistedReducer = persistReducer(userPersistConfig, userReducer)
const sellerPersistedReducer = persistReducer(sellerPersistConfig, sellerReducer)

const rootReducer = combineReducers({
  user: userPersistedReducer,
  seller: sellerPersistedReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

