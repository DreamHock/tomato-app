import styled from "styled-components";
import { useEffect, useState } from "react";
import { GiTomato } from "react-icons/gi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setTypeUser, setUserFormPopUpBool } from "../stateManager/actions/actions";
import { UserFormPopUp } from "./UserFormPopUp";

const StyledCustommerBody = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
  > .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    > .brand-logo {
      font-weight: bold;
      display: flex;
      margin-left: auto;
      margin-right: auto;
      font-size: 4em;
      position: relative;
      > .tomato-logo {
        color: #fa2500;
        position: relative;
        top: 9px;
      }
    }
    > .choice-links {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
      * {
        color: #2578af;
      }
    }

    button {
      border: 0;
      background-color: transparent;
    }

    .btn {
      text-decoration: none;
      border: 2px dashed #2578af;
      background-color: transparent;
      padding: 6px;
      width: 150px;
      height: 50px;
      font-size: 1.3em;
      display: flex;
      justify-content: center;
      color: #2578af;
    }

    > .choice-btns {
      display: flex;
      gap: 10px;
    }

    .btn:hover {
      background-color: #2578af;
      color: #f8f9fa;
    }

    /*
      .seller {
        border-color: #2578af;
        color: #2578af;
      }
      .custommer {
        border-color: #fa2500;
      }
      > .seller:hover {
        cursor: pointer;
        color: white;
        background-color: #2578af;
        border-color: #2578af;
      }
      > .seller > .seller-link {
        text-decoration: none;
        color: red;
      }
      > .seller:hover > .seller-link {
        color: white;
      }
      > .custommer > .custommer-link {
        text-decoration: none;
        color: #fa2500;
      }
      > .custommer:hover > .custommer-link {
        
        background-color: #fa2500;
        color: white;
      }
      > .custommer:hover {
       
        background-color: #fa2500;
      }
    } */
  }
`;

const HomeBody = () => {
  let dispatch = useDispatch();
  let state = useSelector((state) => state);
  let navigate = useNavigate();
  let loginState = state.loginState

  const clickChoice = (type) => {
    if (type === "custommer") {
      if (loginState == true) {
        navigate("/custommer");
      }
      else {
        dispatch(setUserFormPopUpBool(true, "sign-up"));
      }
      
    } else if (type === "seller") {
      if (loginState == true) {
        navigate("/seller");
      } else {  
        dispatch(setUserFormPopUpBool(true, "sign-up"));
      }
    }
  };

  return (
    <StyledCustommerBody>
      <div className="container">
        <div className="brand-logo text-dark">
          T<GiTomato className="tomato-logo" />
          mato shop
        </div>
        <div className="choice-btns">
          <button
            onClick={() => {
              clickChoice("custommer");
            }}
            className="custommer-btn btn"
          >
            {/* <button className="custommer-btn">Custommer</button> */}
            Custommer
          </button>
          <button
            onClick={() => {
              clickChoice("seller");
            }}
            className="seller-btn btn"
          >
            {/* <button className="seller-btn">Seller</button> */}
            Seller
          </button>
        </div>
      </div>
      {state.UserFormPopUpBool ? <UserFormPopUp /> : null}
    </StyledCustommerBody>
  );
};

export default HomeBody;
