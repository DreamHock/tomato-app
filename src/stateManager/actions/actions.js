import axios from "axios";

// import { ADD_PRODUCT, DELETE_PRODUCT } from "../actionTypes/actionTypes";
const getProducts = (products) => {
  return {
    type: "GET_PRODUCT",
    payload: products,
  };
};

const getCart = (cart) => {
  return {
    type: "GET_CART",
    payload: cart,
  };
};

// editProductId helps when it commes to edit the product
// to means either true or false
// typeForm means either (form with add button) or (form with edit button)
const setFormPopUpBool = (to, typeForm, editProductId = null) => {
  return {
    type: "SET_FORM_POPUP_BOOL",
    payload: { to: to, typeForm: typeForm, editProductId: editProductId },
  };
};

const refreshProduct = () => {
  return {
    type: "REFRESH_PRODUCT",
  };
};

const refreshLogin = () => {
  return {
    type: "REFRESH_LOGIN",
  };
};

const refreshCart = () => {
  return {
    type: "REFRESH_CART",
  };
};

const refreshCheckInCart = () => {
  return {
    type: "REFRESH_CHECK_IN_CART",
  };
};

const setTypeUser = (typeUser) => {
  return {
    type: "SET_TYPE_USER",
    payload: { typeUser: typeUser },
  };
};

const emptyProducts = () => {
  return {
    type: "EMPTY_PRODUCTS",
  };
};

const filterBy = (filterdProduct) => {
  return {
    type: "FILTER_BY",
    payload: { filterdProduct: filterdProduct },
  };
};

const setErrors = (errorType, error) => {
  return {
    type: "SET_ERRORS",
    payload: { errorType: errorType, error: error },
  };
};

const setUserFormPopUpBool = (to, typeUserForm) => {
  return {
    type: "SET_USER_FORM_POPUP_BOOL",
    payload: { to: to, typeUserForm: typeUserForm },
  };
};

const setLogin = (loginTo, userTo) => {
  return {
    type: "SET_LOGIN_STATE",
    payload: { loginTo: loginTo, userTo: userTo },
  };
};

export {
  setFormPopUpBool,
  getProducts,
  refreshProduct,
  setTypeUser,
  emptyProducts,
  filterBy,
  setErrors,
  setUserFormPopUpBool,
  setLogin,
  refreshLogin,
  getCart,
  refreshCart,
  refreshCheckInCart,
};
