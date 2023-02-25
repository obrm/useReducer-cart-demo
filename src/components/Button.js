import { useGlobalContext } from '../context/cart_context';

const Button = ({ className, children, id, type }) => {
  const { clearCart, remove, toggleAmount } = useGlobalContext();

  const onClickHandler = () => {
    switch (type) {
      case 'remove':
        return remove(id);
      case 'inc':
        return toggleAmount(id, 'inc');
      case 'dec':
        return toggleAmount(id, 'dec');
      default:
        return clearCart();
    }
  };

  return (
    <button className={className} onClick={onClickHandler}>
      {children}
    </button>
  );
};

export default Button;