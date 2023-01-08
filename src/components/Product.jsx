import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import FormPopUp from "./FormPopUp";
import { useDispatch, useSelector } from "react-redux";
import {
  refreshCheckInCart,
  refreshProduct,
  setFormPopUpBool,
  setTypeUser,
} from "../stateManager/actions/actions";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const StyledProduct = styled.div`
  margin: 20px;
  height: 300px;
  width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 3px solid whitesmoke;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  > * {
    margin: 5px;
  }
  .eventBtns {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    gap: 10px;
    > .deleteBtn {
      align-self: end;
      color: tomato;
      cursor: pointer;
    }
    > .editBtn {
      color: #2578af;
      align-items: center;
      cursor: pointer;
    }
  }
  > .imgCont {
    height: 175px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    > img {
      /* display: block; */
      max-height: 100%;
      max-width: 100%;
      /* margin: auto; */
    }
  }
  > .name {
    overflow: hidden;
  }
  > .price {
    color: grey;
  }
`;

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  let location = useLocation();
  let [inCart, setInCart] = useState(false);

  const deleteProduct = async (id) => {
    let deletePro = await axios.delete(
      `http://localhost:3000/api/product/${id}`
    );
    console.log(deletePro);
    dispatch(refreshProduct());
  };

  useEffect(() => {
    const checkInCart = async () => {
      let check = await axios.get(
        `http://localhost:3000/api/cart?_where=(idPro,eq,${product.idPro})`
      );
      if (check.data.length !== 0) {
        setInCart(true);
      }
    };
    checkInCart();
  }, [state.refreshCheckInCart]);

  useEffect(() => {
    if (location.pathname === "/seller") {
      dispatch(setTypeUser("seller"));
    } else {
      dispatch(setTypeUser("custommer"));
    }
  }, []);
  return (
    <>
      <StyledProduct>
        {state.typeUser === "seller" ? (
          <div className="eventBtns">
            <div
              onClick={() => {
                deleteProduct(product.idPro);
              }}
              className="deleteBtn"
            >
              X
            </div>
            <div
              onClick={() => {
                dispatch(setFormPopUpBool(true, "edit", product.idPro));
              }}
              className="editBtn"
            >
              <FaEdit />
            </div>
          </div>
        ) : null}

        <div className="imgCont">
          <img src={product.srcPro} alt="300 x 200" />
        </div>
        <h6 className="name">{product.namePro}</h6>
        <h6 className="price">
          {product.pricePro}
          <span style={{ color: "tomato" }}> $</span>
        </h6>
        {state.typeUser === "custommer" ? (
          inCart === false ? (
            <button
              className="addBtn btn"
              onClick={() => {
                Swal.fire({
                  title: "Are you sure?",
                  text: "You want to add this product to cart!",
                  icon: "question",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, add it!",
                }).then(async (result) => {
                  if (result.isConfirmed) {
                    let addToCart = await axios.post(
                      `http://localhost:3000/api/cart`,
                      {
                        idPro: product.idPro,
                        idUser: state.loginUser.idUser,
                      }
                    );
                    if (addToCart.status === 200) {
                      Swal.fire(
                        "Added!",
                        "This product has been added successfully.",
                        "success"
                      );
                      dispatch(refreshCheckInCart());
                    } else {
                      Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                      });
                    }
                  }
                });
              }}
            >
              Add to cart
            </button>
          ) : (
            <div>In cart</div>
          )
        ) : null}
      </StyledProduct>
    </>
  );
};

export default Product;
