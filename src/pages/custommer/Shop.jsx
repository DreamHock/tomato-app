import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Products from "../../components/Products";
import { emptyProducts, getProducts } from "../../stateManager/actions/actions";

export const Shop = () => {
  let state = useSelector((state) => state);
  let dispatch = useDispatch();

  useEffect(() => {
    const getPros = async () => {
      const products = await axios.get("http://localhost:3000/api/product");
      dispatch(getProducts(products.data));
    };
    getPros();
    return () => {
      dispatch(emptyProducts());
    };
  }, [state.refreshPro]);
  return <Products />;
};
