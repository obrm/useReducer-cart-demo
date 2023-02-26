import React, { useContext, useReducer, useEffect, useCallback, useMemo } from 'react';

import { CART_ACTIONS } from '../constants/cart.actions';

import reducer from '../reducers/cart_reducer';

const url = 'https://course-api.com/react-useReducer-cart-project';

const AppContext = React.createContext();

const initialState = {
  loading: false,
  cart: [],
  total: 0,
  amount: 0,
};

const fetchData = async () => {
  const response = await fetch(url);
  const cart = await response.json();
  return cart;
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const clearCart = useCallback(() => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  }, []);

  const remove = useCallback((id) => {
    dispatch({ type: CART_ACTIONS.REMOVE, payload: id });
  }, []);

  const increase = useCallback((id) => {
    dispatch({ type: CART_ACTIONS.INCREASE, payload: id });
  }, []);

  const decrease = useCallback((id) => {
    dispatch({ type: CART_ACTIONS.DECREASE, payload: id });
  }, []);

  const memoizedFetchData = useCallback(async () => {
    dispatch({ type: CART_ACTIONS.LOADING });
    const cart = await fetchData();
    dispatch({ type: CART_ACTIONS.DISPLAY_ITEMS, payload: cart });
  }, []);

  const toggleAmount = useCallback((id, type) => {
    dispatch({ type: CART_ACTIONS.TOGGLE_AMOUNT, payload: { id, type } });
  }, []);

  useEffect(() => {
    memoizedFetchData();
  }, [memoizedFetchData]);

  useEffect(() => {
    dispatch({ type: CART_ACTIONS.GET_TOTALS });
  }, [state.cart]);

  // Memoize the value of the context object using useMemo
  const contextValue = useMemo(() => ({
    ...state,
    clearCart,
    remove,
    increase,
    decrease,
    toggleAmount,
  }), [state, clearCart, remove, increase, decrease, toggleAmount]);

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
