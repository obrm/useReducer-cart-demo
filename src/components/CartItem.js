import Button from './Button';

const CartItem = ({ id, img, title, price, amount }) => {
  return (
    <article className='cart-item'>
      <img src={img} alt={title} />
      <div>
        <h4>{title}</h4>
        <h4 className='item-price'>${price}</h4>
        <Button className='remove-btn' type='remove' id={id}>
          remove
        </Button>
      </div>
      <div>
        <Button className='amount-btn' type='inc' id={id}>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
            <path d='M10.707 7.05L10 6.343 4.343 12l1.414 1.414L10 9.172l4.243 4.242L15.657 12z' />
          </svg>
        </Button>
        <p className='amount'>{amount}</p>
        <Button className='amount-btn' type='dec' id={id}>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'>
            <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
          </svg>
        </Button>
      </div>
    </article>
  );
};

export default CartItem;
