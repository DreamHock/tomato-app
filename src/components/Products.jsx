import Product from "./Product";
import styled from "styled-components";
import AddTemplate from "./AddTemplate";
import FormPopUp from "./FormPopUp";
import { useSelector, useDispatch } from "react-redux";
import { setFormPopUpBool } from "../stateManager/actions/actions";
import { useEffect } from "react";

const StyledProducts = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 100px;
`;

const Products = () => {
  let state = useSelector((state) => state);
  let dispatch = useDispatch();

  return (
    <StyledProducts>
      {state.products.length !== 0
        ? state.products.map((product) => {
            return <Product key={product.idPro} product={product} />;
          })
        : null}
      {state.typeUser === "seller" ? (
        <AddTemplate
          onClick={() => {
            dispatch(setFormPopUpBool(true, "add"));
          }}
        />
      ) : null}

      {
        // formPopUpBool is a boolean that accept either true or false (true=appear popup), (false=nothing)
        state.formPopUpBool && <FormPopUp />
      }
    </StyledProducts>
  );
};

export default Products;
