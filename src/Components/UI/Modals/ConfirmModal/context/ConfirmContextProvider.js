import React, { useReducer } from "react";
import ConfirmContext from "./context";
import { reducer, initialState } from "./Reducer";

export default function ConfirmContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const store = React.useMemo(() => [state, dispatch], [state]);

  return (
    <ConfirmContext.Provider value={store}>{children}</ConfirmContext.Provider>
  );
}
