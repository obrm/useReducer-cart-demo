import CartItem from '../components/CartItem';
import Navbar from '../components/Navbar';

import { useGlobalContext } from '../context/cart_context';

const CartContainer = () => {
  const { loading, cart, total, clearCart } = useGlobalContext();


  if (loading) {
    return (
      <div className='loading'>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <section className='cart'>
        {/* cart header */}
        <header>
          <h2>your bag</h2>
          <h4 className='empty-cart'>is currently empty</h4>
        </header>
      </section>
    );
  }

  return (
    <>
      <Navbar />
      <section className='cart'>
        {/* cart header */}
        <header>
          <h2>your bag</h2>
        </header>
        {/* cart items */}
        <div>
          {cart.map((item) => {
            return <CartItem key={item.id} {...item} />;
          })}
        </div>
        {/* cart footer */}
        <footer>
          <hr />
          <div className='cart-total'>
            <h4>
              total <span>${total}</span>
            </h4>
          </div>
          <button className='btn clear-btn' onClick={clearCart}>
            clear cart
          </button>
        </footer>
      </section>
    </>
  );
};

export default CartContainer;
