import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  refreshLogin,
  // setLogin,
  setUserFormPopUpBool,
} from "../stateManager/actions/actions";

const StyledUserFormPopUp = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  > .form {
    background-color: #f8f9fa;
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    padding: 20px;
    > .header-title {
      margin: 0;
      color: #2578af;
    }

    > .infos {
      display: flex;
      justify-content: space-between;
      height: 150px;
      > .labels {
        padding: 6px;
        width: 100px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      > .inputs {
        width: 300px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
    }
    > .message-sign-cont {
      > * {
        margin: 0;
      }
      display: flex;
      flex-direction: column;
      align-items: center;
      > .sign-btn {
        color: #2578af;
        border: 2px solid #2578af;
        :hover {
          background-color: #2578af;
          color: #f8f9fa;
        }
      }
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

export const UserFormPopUp = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [formInputs, setFormInputs] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const signInHandler = async () => {
    if (formInputs.email !== "" && formInputs.password !== "") {
      let testSignIn = await axios.get(
        `http://localhost:3000/api/user?_where=(email,eq,${formInputs.email})~and(password,eq,${formInputs.password})`
      );
      if (testSignIn.data !== []) {
        let data = JSON.stringify(testSignIn.data[0]);
        window.sessionStorage.setItem("loginUser", data);
        window.sessionStorage.setItem("loginState", "true");
        navigate("/custommer");
        dispatch(refreshLogin());
      }
    }
  };

  const signUpHandler = async () => {
    if (
      formInputs.name !== "" &&
      formInputs.email !== "" &&
      formInputs.password !== ""
    ) {
      let testSignUp = await axios.post(
        "http://localhost:3000/api/user",
        formInputs
      );
    }
  };

  const inputsHandler = (input, e) => {
    setFormInputs({ ...formInputs, [input]: e.target.value });
  };

  return (
    <StyledUserFormPopUp>
      <form className="form rounded" action="">
        {state.typeUserForm === "sign-up" ? (
          <h4 className="header-title">Sign up</h4>
        ) : (
          <h4 className="header-title">Sign in</h4>
        )}
        <div className="infos">
          <div className="labels">
            <label htmlFor="email">Email</label>
            {state.typeUserForm === "sign-up" ? (
              <label htmlFor="name">Name</label>
            ) : null}
            <label htmlFor="password">Password</label>
          </div>
          <div className="inputs">
            <input
              type="text"
              id="email"
              className="form-control me-2"
              placeholder="Email"
              value={formInputs.email}
              onChange={(e) => inputsHandler("email", e)}
            />

            {state.typeUserForm === "sign-up" ? (
              <input
                type="text"
                id="username"
                className="form-control me-2"
                placeholder="name"
                value={formInputs.name}
                onChange={(e) => inputsHandler("name", e)}
              />
            ) : null}
            <input
              type="password"
              id="password"
              className="form-control me-2"
              placeholder="Password"
              value={formInputs.password}
              onChange={(e) => inputsHandler("password", e)}
            />
          </div>
        </div>
        <div className="message-sign-cont">
          {state.typeUserForm === "sign-up" ? (
            <button
              onClick={() => {
                signUpHandler();
              }}
              type="button"
              className="btn sign-btn"
            >
              Sign up
            </button>
          ) : (
            <button
              onClick={() => {
                signInHandler();
              }}
              type="button"
              className="btn sign-btn"
            >
              Sign in
            </button>
          )}
          <h6 className="message">
            {state.typeUserForm === "sign-up" ? (
              <>
                Already have an account?
                <a
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(setUserFormPopUpBool(true, "sign-in"));
                  }}
                >
                  Sign in
                </a>
              </>
            ) : (
              <>
                Create an account
                <a
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(setUserFormPopUpBool(true, "sign-up"));
                  }}
                >
                  Sign up
                </a>
              </>
            )}
          </h6>
        </div>
      </form>
      <div
        className="popUpOverlay"
        onClick={() => {
          // on click hide the popup
          dispatch(setUserFormPopUpBool(false));
        }}
      ></div>
    </StyledUserFormPopUp>
  );
};
