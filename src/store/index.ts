import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import clientReducer from './slices/clientSlice';
import adminReducer from './slices/adminSlice';
import uiReducer from './slices/uiSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    client: clientReducer,
    admin: adminReducer,
    ui: uiReducer,
    user: userReducer
  },
});

store.subscribe(() => {
  const urlParams = new URLSearchParams(window.location.search);
  const param = 'Logs';
  // const shouldLog = urlParams.has(param.toLowerCase());

  // const isLogsEnabled = new URLSearchParams(window.location.search).get('logs') === 'true';

  // if (isLogsEnabled) {
  //   console.log('[Redux State]:', store.getState());
  // }
  console.log('[Redux State]:', store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export * from './slices/authSlice';
export * from './slices/adminSlice';
export * from './slices/clientSlice';
export * from './slices/uiSlice';
export * from './slices/userSlice';
