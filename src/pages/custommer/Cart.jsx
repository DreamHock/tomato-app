import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { CartItem } from "../../components/CartItem";
import { emptyProducts, getCart, getProducts } from "../../stateManager/actions/actions";
import { useEffect } from "react";
import axios from "axios";

const StyledCart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  > .first-div {
    width: 70%;
    display: flex;
    justify-content: space-between;
  }
  > .cart-items {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

export const Cart = () => {
  let state = useSelector((state) => state);
  let dispatch = useDispatch();

  useEffect(() => {
    const getC = async () => {
      const cart = await axios.get("http://localhost:3000/api/cart?_where=(confirmed,eq,0)");
      dispatch(getCart(cart.data));
    };
    getC();
    // return () => {
    //   dispatch(emptyProducts());
    // };
  }, [state.refreshCart]);

  return (
    <StyledCart>
      <div className="first-div">
        <div className="my-cart-text">My Cart:</div>
        <div className="total">Total:{state.totalCart}</div>
      </div>
      <div className="cart-items">
        {state.cart.map((c) => {
          return <CartItem cart={c} key={c.idCart}/>;
        })}
      </div>
    </StyledCart>
  );
};


