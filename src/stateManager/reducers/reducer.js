const initialState = {
  products: [],
  cart: [],
  refreshPro: 1,
  refreshLog: 1,
  refreshCart: 1,
  refreshCheckInCart: 1,
  formPopUpBool: false,
  typeForm: "",
  typeUser: "",
  editProductId: "",
  filterBy: "all",
  searchFor: "",
  totalCart: 0,
  errorType: "",
  error: "",
  UserFormPopUpBool: false,
  typeUserForm: "",
  loginState: false,
  loginUser: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PRODUCT":
      return {
        ...state,
        products: action.payload,
      };
    case "GET_CART":
      return {
        ...state,
        cart: action.payload,
      };
    case "SET_FORM_POPUP_BOOL":
      return {
        ...state,
        formPopUpBool: action.payload.to,
        typeForm: action.payload.typeForm,
        editProductId: action.payload.editProductId,
      };
    case "REFRESH_PRODUCT":
      return {
        ...state,
        refreshPro: -state.refreshPro,
      };
    case "REFRESH_LOGIN":
      return {
        ...state,
        refreshLog: -state.refreshLog,
      };
    case "REFRESH_CART":
      return {
        ...state,
        refreshCart: -state.refreshCart,
      };
    case "REFRESH_CHECK_IN_CART":
      return {
        ...state,
        refreshCheckInCart: -state.refreshCheckInCart,
      };
    case "SET_TYPE_USER":
      return {
        ...state,
        typeUser: action.payload.typeUser,
      };
    case "EMPTY_PRODUCTS":
      return {
        ...state,
        products: [],
      };
    case "FILTER_BY":
      return {
        ...state,
        products: action.payload.filterdProduct,
      };
    case "SET_ERRORS":
      return {
        ...state,
        error: action.payload.error,
        errorType: action.payload.errorType,
      };
    case "SET_USER_FORM_POPUP_BOOL":
      return {
        ...state,
        UserFormPopUpBool: action.payload.to,
        typeUserForm: action.payload.typeUserForm,
      };
    case "SET_LOGIN_STATE":
      return {
        ...state,
        loginState: action.payload.loginTo,
        loginUser: action.payload.userTo
      }
    
    default:
      return state;
  }
};

export default reducer;
