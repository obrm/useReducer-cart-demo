import CartItem from '../components/CartItem';
import Navbar from '../components/Navbar';
import Button from './../components/Button';

import { useGlobalContext } from '../context/cart_context';

const CartContainer = () => {
  const { loading, cart, total } = useGlobalContext();
  console.log()
  return (
    <>
      <Navbar />
      {loading ? (
        <div className='loading'>
          <h1>Loading...</h1>
        </div>
      ) : cart.length === 0 ? (
        <section className='cart'>
            <header>
              <h2>your bag</h2>
              <h4 className='empty-cart'>is currently empty</h4>
            </header>
          </section>
        ) : (
          <section className='cart'>
              <header>
                <h2>your bag</h2>
              </header>
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
                <Button className='btn clear-btn'>
                  clear cart
                </Button>
              </footer>
            </section>
      )}
    </>
  );
};

export default CartContainer;
