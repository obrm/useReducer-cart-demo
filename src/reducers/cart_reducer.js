import { CART_ACTIONS } from '../constants/cart.actions';

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTIONS.CLEAR_CART:
      return { ...state, cart: [] };
    case CART_ACTIONS.REMOVE:
      return {
        ...state,
        cart: state.cart.filter((cartItem) => cartItem.id !== payload),
      };
    case CART_ACTIONS.GET_TOTALS:
      let { total, amount } = state.cart.reduce(
        (cartTotal, cartItem) => {
          const { price, amount } = cartItem;
          const itemTotal = price * amount;
          cartTotal.total += itemTotal;
          cartTotal.amount += amount;
          return cartTotal;
        },
        {
          total: 0,
          amount: 0,
        }
      );
      total = parseFloat(total.toFixed(2));
      return { ...state, total, amount };
    case CART_ACTIONS.LOADING:
      return { ...state, loading: true };
    case CART_ACTIONS.DISPLAY_ITEMS:
      return { ...state, cart: payload, loading: false };
    case CART_ACTIONS.TOGGLE_AMOUNT:
      const { id, type } = payload;
      const tempCart = state.cart
        .map((cartItem) => {
          if (cartItem.id === id) {
            if (type === 'inc') {
              return { ...cartItem, amount: cartItem.amount + 1 };
            }
            if (type === 'dec') {
              return { ...cartItem, amount: cartItem.amount - 1 };
            }
          }
          return cartItem;
        })
        .filter((cartItem) => cartItem.amount !== 0);
      return { ...state, cart: tempCart };

    default:
      return state;
  }
};

export default reducer;
