import { createContext, useReducer } from "react";

export const DialogContext = createContext();
export const dialogReducer = (state, action) => {
  switch (action.type) {
    case "USER_POST":
      return { userPost: !state.userPost };
    case "ADD_TO_WATCHLIST":
      return { addToWatchlist: !state.addToWatchlist };
    case "REMOVE_FROM_WATCHLIST":
      return { removeWatchlist: !state.removeWatchlist };
    case "LOGIN_MSSG":
      return { loginMssg: !state.loginMssg };
    case "SIGNUP_MSSG":
      return { signupMssg: !state.signupMssg };
    default:
      return state;
  }
};

export const DialogContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dialogReducer, {
    userPost: false,
    addToWatchlist: false,
    removeWatchlist: false,
    loginMssg: false,
    signupMssg: false
  });

  return (
    <DialogContext.Provider value={{ ...state, dispatch }}>
      {children}
    </DialogContext.Provider>
  );
};
