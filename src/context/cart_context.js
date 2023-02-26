import React, { useContext, useReducer, useEffect } from 'react';

import { CART_ACTIONS } from '../constants/cart.actions';
import { URL } from './../constants/index';

import reducer from '../reducers/cart_reducer';

const AppContext = React.createContext();

const initialState = {
  loading: false,
  cart: [],
  total: 0,
  amount: 0,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  const remove = (id) => {
    dispatch({ type: CART_ACTIONS.REMOVE, payload: id });
  };

  const toggleAmount = (id, type) => {
    dispatch({ type: CART_ACTIONS.TOGGLE_AMOUNT, payload: { id, type } });
  };

  const fetchData = async () => {
    dispatch({ type: CART_ACTIONS.LOADING });
    const response = await fetch(URL);
    const data = await response.json();
    dispatch({ type: CART_ACTIONS.DISPLAY_ITEMS, payload: data });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    dispatch({ type: CART_ACTIONS.GET_TOTALS });
  }, [state.cart]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        remove,
        toggleAmount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
