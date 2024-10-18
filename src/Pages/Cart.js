import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantityInCart } from "../redux/actions"; // Убедитесь, что путь правильный
import "./Cart.css";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    if (window.confirm("Ви впевнені, що хочете видалити цей товар?")) {
      dispatch(removeFromCart(id));
    }
  };

  const calculateTotalPrice = () => {
    const total = cartItems.reduce(
      (total, item) => total + (item.price || 0) * (item.quantity || 0),
      0,
    );
    return total.toFixed(2);
  };

  const handleQuantityChange = (id, value) => {
    const newQuantity = parseInt(value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      dispatch(updateQuantityInCart(id, newQuantity));
    }
  };

  return (
    <div className="cart-container">
      <h2>«Кошик»</h2>
      <div className="cart-items">
        <h3>Які книги Ви обрали: ({cartItems.length})</h3>
        {cartItems.length === 0 ? (
          <p>Кошик порожній</p>
        ) : (
          <table className="cart-table">
            <thead>
              <tr>
                <th>№</th>
                <th>Обкладинка</th>
                <th>Назва товару</th>
                <th>Ціна за одиницю товару</th>
                <th>Кількість</th>
                <th>Видалити</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="cart-item-image"
                    />
                  </td>
                  <td>{item.title}</td>
                  <td>
                    <p> {item.price} грн</p>
                  </td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, e.target.value)
                      }
                      className="quantity-input"
                      onBlur={(e) => {
                        if (!e.target.value) {
                          handleQuantityChange(item.id, 1);
                        }
                      }}
                    />
                  </td>
                  <td>
  <button onClick={() => handleRemove(item.id)} className="remove-button">
    <img 
      src="https://img.icons8.com/?size=100&id=1942&format=png&color=000000" 
      alt="Видалити" 
      className="remove-icon" 
    />
  </button>
</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {cartItems.length > 0 && (
          <div className="cart-summary">
            <h3>Сума: {calculateTotalPrice()} грн</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
