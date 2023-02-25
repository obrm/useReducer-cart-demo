import React, { useContext, useReducer, useEffect } from 'react';

import { CART_ACTIONS } from '../constants/cart.actions';

import cartItems from '../data';
import reducer from '../reducers/cart_reducer';

const url = 'https://course-api.com/react-useReducer-cart-project';

const AppContext = React.createContext();

const initialState = {
  loading: false,
  cart: cartItems,
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

  const increase = (id) => {
    dispatch({ type: CART_ACTIONS.INCREASE, payload: id });
  };

  const decrease = (id) => {
    dispatch({ type: CART_ACTIONS.DECREASE, payload: id });
  };

  const fetchData = async () => {
    dispatch({ type: CART_ACTIONS.LOADING });
    const response = await fetch(url);
    const cart = await response.json();
    dispatch({ type: CART_ACTIONS.DISPLAY_ITEMS, payload: cart });
  };

  const toggleAmount = (id, type) => {
    dispatch({ type: CART_ACTIONS.TOGGLE_AMOUNT, payload: { id, type } });
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
        increase,
        decrease,
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
