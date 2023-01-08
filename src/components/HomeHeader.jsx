import styled from "styled-components";
import { GiTomato } from "react-icons/gi";
import { Link, Outlet } from "react-router-dom";
import { UserFormPopUp } from "./UserFormPopUp";
import { useDispatch, useSelector } from "react-redux";
import {
  refreshLogin,
  setLogin,
  // setLogin,
  setUserFormPopUpBool,
} from "../stateManager/actions/actions";
import { useEffect } from "react";

// const StyledHomeHeader = styled.header`
//   max-width: 100%;
//   display: flex;
//   justify-content: flex-start;
//   > .logo {
//     margin: 0px 20px;
//     color: #1b1b3aff;
//     font-size: 4em;
//     display: flex;
//     flex-direction: column;
//     justify-content: flex-end;
//   }
//   > .logo-text {
//     display: flex;
//     flex-direction: column;
//     justify-content: flex-end;
//     font-size: 2.5em;
//     position: relative;
//     right: 20px;
//     font-weight: bold;
//     color: #FA2500;
//   }
// `;

const StyledLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #2578af;
  font-size: 2.5em;
  font-weight: bold;
`;

const StyledNav = styled.nav`
  .cont {
    display: flex;
    > .btns {
      justify-content: flex-end;
      .btn {
        color: #2578af;
        border: 2px dashed #2578af;
        :hover {
          background-color: #2578af;
          color: #f8f9fa;
        }
      }
    }
  }
`;

const HomeHeader = () => {
  let state = useSelector((state) => state);
  let dispatch = useDispatch();
  let loginState = state.loginState;

  useEffect(() => {
    if (window.sessionStorage.getItem("loginState") !== null) {
      dispatch(
        setLogin(
          JSON.parse(window.sessionStorage.getItem("loginState")),
          JSON.parse(window.sessionStorage.getItem("loginUser"))
        )
      );
    } else {
      dispatch(setLogin(false, ""));
    }
  }, [state.refreshLog]);

  return (
    <>
      <StyledNav className="navbar navbar-expand-sm bg-light">
        <div className="container-fluid cont">
          <Link to="/" className="navbar-brand" href="#">
            <StyledLogo>
              <span className="text-dark">Sh</span>
              <GiTomato />
              <span className="text-dark">p</span>
            </StyledLogo>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse btns"
            id="navbarSupportedContent"
          >
            {loginState == false || loginState == null ? (
              <div className="buttons">
                <button
                  onClick={() => {
                    dispatch(setUserFormPopUpBool(true, "sign-up"));
                  }}
                  className="btn me-2"
                >
                  Sign up
                </button>

                <button
                  onClick={() => {
                    dispatch(setUserFormPopUpBool(true, "sign-in"));
                    dispatch(refreshLogin());
                  }}
                  className="btn"
                >
                  Sign in
                </button>
              </div>
            ) : (
              <div
                onClick={() => {
                  window.sessionStorage.removeItem("loginState");
                  window.sessionStorage.removeItem("loginUser");
                  dispatch(refreshLogin());
                }}
                className="text-light rounded d-flex align-items-center justify-content-center text-light user-logo-cont"
                style={{ width: "70px", height: "35px" }}
              >
                <div className="user-logo">{state.loginUser.name}</div>
                <div className="user-logo-logout">Logout</div>
              </div>
            )}
          </div>
        </div>
        {state.UserFormPopUpBool ? <UserFormPopUp /> : null}
      </StyledNav>
      <Outlet />
    </>
  );
};

export default HomeHeader;
