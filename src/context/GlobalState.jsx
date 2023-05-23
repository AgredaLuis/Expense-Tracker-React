import {
  createContext,
  useContext,
  useReducer,
  useEffect,
} from "react";
import AppReducer from "./AppReducer";

const initialState = {
  transactions: [],
};

export const Context = createContext(initialState);

/* creo un custom hook  de contexto para no tener que escribir varias importaciones en todos los componentes */
/* Aqui me ahorro de import useContext y guardarlos en un contexto o instancia */
export const useGlobalState = () => {
  const context = useContext(Context);
  if (!context)
    throw new Error("useGlobalState must be used within a GlobalState");
  return context;
};

/* creo que context provider para enviar mis props a los distintos componetnes */
export const GlobalProvider = ({ children }) => {
  /* useReducer es como un useState con funciones extras estas estan enmarcadas en un archivo aparte */
  const [state, dispatch] = useReducer(AppReducer, initialState, () => {
    const localData = localStorage.getItem("transactions");
    return localData ? JSON.parse(localData) : initialState;
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(state));
  }, [state]);

  const addTransaction = (transaction) => {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction,
    });
  };

  const deleteTransaction = (id) => {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id,
    });
  };
  return (
    <Context.Provider
      value={{
        transactions: state.transactions,
        addTransaction,
        deleteTransaction,
      }}
    >
      {children}
    </Context.Provider>
  );
};
