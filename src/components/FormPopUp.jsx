import { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  setFormPopUpBool,
  refreshProduct,
} from "../stateManager/actions/actions";
import axios from "axios";

const StyledPopUp = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  > .form {
    position: relative;
    z-index: 2;
    background-color: white;
    width: 500px;
    padding: 15px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    .eventBtns {
      display: flex;
      justify-content: flex-end;
      width: 100%;
      gap: 10px;
      > .deleteBtn {
        align-self: end;
        color: tomato;
        cursor: default;
      }
    }
    > .infos {
      display: flex;
      justify-content: space-around;
      align-items: center;
      > .labels {
        width: 25%;
        display: flex;
        flex-direction: column;
        gap: 13px;
      }
      > .inputs {
        display: flex;
        width: 50%;
        flex-direction: column;
        gap: 5px;
      }
    }
    > .btn {
      margin-left: auto;
      margin-right: auto;
      color: tomato;
      border: 2px solid tomato;
      background-color: white;
    }
  }
  > .popUpOverlay {
    position: relative;
    z-index: 1;
    background-color: #00000055;
    position: absolute;
    width: 100%;
    height: 100%;
  }
`;

const FormPopUp = (idPro) => {
  let dispatch = useDispatch();
  let state = useSelector((state) => state);

  let [form, setForm] = useState({
    srcPro: "",
    namePro: "",
    descPro: "",
    pricePro: "",
    categoryPro: "",
  });

  useEffect(() => {
    const getCurrentProduct = async () => {
      let currentProduct = await axios.get(
        `http://localhost:3000/api/product/${state.editProductId}`
      );
      let data = currentProduct.data[0];
      setForm({
        srcPro: data.srcPro,
        namePro: data.namePro,
        descPro: data.descPro,
        pricePro: data.pricePro,
        categoryPro: data.categoryPro,
      });
    };
    getCurrentProduct();
  }, [state.editProductId]);

  const editProduct = async () => {
    let editPro = await axios.patch(
      `http://localhost:3000/api/product/${state.editProductId}`,
      form
    );
    dispatch(refreshProduct());
    dispatch(setFormPopUpBool(false));
  };

  const formHandler = (e, key) => {
    setForm({ ...form, [key]: e.target.value });
  };

  const addProduct = async () => {
    const addNewProduct = await axios.post(
      "http://localhost:3000/api/product",
      form
    );
    // console.log(addNewProduct.status);
    dispatch(refreshProduct());
    dispatch(setFormPopUpBool(false));
  };

  return (
    <StyledPopUp>
      <form className="form">
        <div className="eventBtns">
          <div
            onClick={() => {
              dispatch(setFormPopUpBool(false));
            }}
            className="deleteBtn"
          >
            X
          </div>
        </div>
        <div className="infos">
          <div className="labels">
            <label htmlFor="name">Name:</label>
            <label htmlFor="desc">Desc:</label>
            <label htmlFor="price">Price:</label>
            <label htmlFor="category">Category:</label>
            <label htmlFor="source">Source:</label>
          </div>
          <div className="inputs">
            <input
              autoFocus
              onChange={(e) => {
                formHandler(e, "namePro");
              }}
              value={form.namePro}
              type="text"
              id="name"
            />
            <input
              onChange={(e) => {
                formHandler(e, "descPro");
              }}
              value={form.descPro}
              type="text"
              id="desc"
            />
            <input
              onChange={(e) => {
                formHandler(e, "pricePro");
              }}
              value={form.pricePro}
              type="text"
              id="price"
            />
            <select
              className="form-select"
              aria-label="Default select example"
              value={form.categoryPro}
              id="categorie"
              onChange={(e) => {
                formHandler(e, "categoryPro");
              }}
            >
              <option defaultValue>Type of product</option>
              <option value="phone">Phone</option>
              <option value="pc">Pcs</option>
              <option value="camera">Camera</option>
            </select>
            {/* <input
              onChange={(e) => {
                formHandler(e, "categoryPro");
              }}
              value={form.categoryPro}
              type="text"
              id="categorie"
            /> */}
            <input
              onChange={(e) => {
                formHandler(e, "srcPro");
              }}
              value={form.srcPro}
              type="text"
              id="source"
            />
          </div>
        </div>
        {state.typeForm === "add" ? (
          <button
            type="button"
            onClick={() => {
              addProduct();
            }}
            className="addBtn btn"
          >
            Add product
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              editProduct();
            }}
            className="editBtn btn"
          >
            Edit product
          </button>
        )}
      </form>
      <div
        className="popUpOverlay"
        onClick={() => {
          // on click hide the popup
          dispatch(setFormPopUpBool(false));
        }}
      ></div>
    </StyledPopUp>
  );
};

export default FormPopUp;
