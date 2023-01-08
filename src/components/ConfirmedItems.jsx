import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Swal from "sweetalert2";
import { refreshCart } from "../stateManager/actions/actions";

const StyledCartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 700px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 14px;
  border-radius: 5px;
  padding-right: 10px;
  padding-left: 10px;
  > .pro-infos {
    display: flex;
    gap: 20px;
    > .img-frame {
      width: 80px;
      height: 80px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      /* background-color: yellow; */
      > .pro-img {
        max-height: 100%;
        max-width: 100%;
      }
    }

    > .pro-name {
      display: flex;
      flex-direction: column;
      justify-content: center;
      > p {
        margin: 0;
      }
    }
  }

  > .buying-infos {
    display: flex;
    gap: 10px;
    align-items: center;
  }
`;

export const CartItem = ({ cart }) => {
  let [cartProduct, setCartProduct] = useState("");
  let [totalPriceItem, setTotalPriceItem] = useState(0);
  let [qte, setQte] = useState(1);
  let [refresh, setRefresh] = useState(1);
  let dispatch = useDispatch();

  useEffect(() => {
    const getCartProduct = async () => {
      const cartProduct = await axios.get(
        `http://localhost:3000/api/product?_where=(idPro,eq,${cart.idPro})`
      );
      setCartProduct(cartProduct.data[0]);
      setRefresh(-refresh);
    };
    getCartProduct();
  }, []);

  const deleteCartItem = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to remove this product from your cart",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        let deletedCart = await axios.delete(
          `http://localhost:3000/api/cart/${cart.idCart})`
        );
        if (deletedCart.status === 200) {
          Swal.fire(
            "Deleted!",
            "This product has been deleted successfully.",
            "success"
          );
          dispatch(refreshCart());
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
          });
        }
      }
    });
  };

  useEffect(() => {
    if (cartProduct.pricePro !== undefined)
      setTotalPriceItem(qte * cartProduct.pricePro);
  }, [refresh]);

  return (
    <div>
      <StyledCartItem>
        <div className="pro-infos">
          <div className="img-frame">
            <img src={cartProduct.srcPro} alt="cart" className="pro-img" />
          </div>
          <div className="pro-name">
            <p>{cartProduct.namePro}</p>
          </div>
        </div>
        <div className="buying-infos">
          <div className="price">
            <span style={{ borderRight: "2px solid #198754" }}>
              <span className="price-count" id="price-count">
                {cartProduct.pricePro}
              </span>
              <span>$</span>
            </span>
            <span style={{ color: "#198754" }}>
              <span>{totalPriceItem}</span>
              <span>$</span>
            </span>
          </div>
          <div className="qte">
            <label htmlFor="qte-input" className="qte-text">
              Qte
            </label>
            <input
              type="number"
              onChange={(e) => {
                if (e.target.value >= 0) {
                  setQte(e.target.value);
                  setRefresh(-refresh);
                }
              }}
              value={qte}
              style={{ width: "50px" }}
            />
          </div>
          <button type="button" className="btn btn-outline-success">
            Confirm
          </button>
          <span
            onClick={deleteCartItem}
            style={{ color: "#fa2500", cursor: "pointer" }}
          >
            X
          </span>
        </div>
      </StyledCartItem>
    </div>
  );
};
