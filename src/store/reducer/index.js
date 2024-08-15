import { combineReducers } from "redux";

import { authConfigsSlice } from "./AuthConfig";
import { usersSlice } from "./usersSlice";
import { chatSlice } from "./ChatSlice";
import { unseenNotiSlice } from "./unseenNotiSlice";

export const rootReducer = combineReducers({
  users: usersSlice.reducer,
  authConfigs: authConfigsSlice.reducer,
  chat: chatSlice.reducer,
  noti: unseenNotiSlice.reducer,
});
