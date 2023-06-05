import React, { useContext } from 'react'
import { CartContext } from '../global/CartContext';

const CardModal = ({active, setActive}) => {
    const cartContext = useContext(CartContext);
    console.log(cartContext);
  return (
    <div className={active ? "cart-modal active" : "cart-modal"} onClick={() => setActive(false)}>
        <div className='cart-modal-content' onClick={e => e.stopPropagation()}>
            {cartContext.cart.map((product) => (
                 <div className='cart-product-wrapper'>
                     <div className="cart-product-card">
                  <div className="cart-product-img">
                    <img src={product.productImg} alt="not found" />
                  </div>
                  <div className="cart-product-name">
                    <h3>{product.productName}</h3>
                  </div>
                  <div className="cart-product-desc">
                    <p>{product.productDescription}</p>
                  </div>
                  <div className="cart-product-price">
                    <b>{product.productPrice} ₴</b>
                  </div>
                  <button onClick={() => cartContext.dispatch({type: 'remove', payload: product})}>Зєбав</button>
                </div>
                 </div>
            ))}
        </div>
    </div>
  )
}


export default CardModal;
