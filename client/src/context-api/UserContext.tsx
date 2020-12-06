import React, { useContext, createContext, Dispatch, useReducer } from "react";

interface IUser {
  _id: { $oid: string };
  email: string;
}

type Action =
  | { type: "SET_LOADING" }
  | { type: "LOG_IN"; payload: IUser }
  | { type: "REGISTER"; payload: IUser }
  | { type: "LOG_OUT" }
  | { type: "ERROR"; payload: string };

const initalState = {
  user: {} as IUser,
  isAuth: false,
  error: "",
  loading: false,
};

const UserStateContext = createContext(initalState);
const UserDispatchContext = createContext<Dispatch<Action>>(() => null);

const reducer = (
  state: typeof initalState,
  action: Action
): typeof initalState => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: true, error: "" };
    case "REGISTER":
    case "LOG_IN":
      return { ...state, loading: false, isAuth: true, user: action.payload };
    case "LOG_OUT":
      return { ...state, isAuth: false, user: {} as IUser };
    case "ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const UserContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initalState);

  return (
    <UserDispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={state}>
        {children}
      </UserStateContext.Provider>
    </UserDispatchContext.Provider>
  );
};

export const useUserStateContext = () => useContext(UserStateContext);
export const useUserDispatchContext = () => useContext(UserDispatchContext);
