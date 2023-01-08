import styled from "styled-components";
import { GiTomato } from "react-icons/gi";
import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterBy, refreshLogin } from "../stateManager/actions/actions";
import axios from "axios";
import Swal from "sweetalert2";

const StyledLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #2578af;
  font-size: 2.5em;
`;

const SellerHeader = () => {
  let [filter, setFilter] = useState("all");
  let [search, setSearch] = useState(false);
  let [searchValue, setSearchValue] = useState("");
  let dispatch = useDispatch();
  let state = useSelector((state) => state);

  useEffect(() => {
    const searchProducts = async () => {
      if (searchValue !== "") {
        let pros = await axios.get(
          `http://localhost:3000/api/product?_where=(namePro,eq,${searchValue})`
        );
        if (pros.data.length !== 0) {
          dispatch(filterBy(pros.data));
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `Can't found ${searchValue}!`,
          });
        }
      }
    };
    searchProducts();
  }, [search]);

  useEffect(() => {
    const filterProducts = async () => {
      let filteredPros;
      let pros;
      if (filter === "all") {
        pros = await axios.get(
          `http://localhost:3000/api/product?_where=(idUserMan,eq,${state.loginUser.idUser})`
        );
        filteredPros = pros.data;
      } else {
        pros = await axios.get(
          `http://localhost:3000/api/product?_where=(categoryPro,eq,${filter})`
        );
        filteredPros = pros.data;
      }

      dispatch(filterBy(filteredPros));
    };
    filterProducts();
  }, [filter]);
  return (
    <>
      <nav className="navbar navbar-expand-md bg-light">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand" href="#">
            <StyledLogo>
              <GiTomato />
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
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  value={filter}
                  id="categorie"
                  onChange={(e) => {
                    setFilter(e.target.value);
                  }}
                >
                  <option defaultValue value="all">
                    Type of products
                  </option>
                  <option value="phone">Phones</option>
                  <option value="pc">Pcs</option>
                  <option value="camera">Cameras</option>
                </select>
              </li>
            </ul>
            <div className="me-4">
              <Link
                to="/custommer"
                className="nav-link"
                href="#"
                style={{ textDecoration: "underline" }}
              >
                Custommer
              </Link>
            </div>
            <form
              className="d-flex"
              role="search"
              style={{ marginRight: "13px" }}
            >
              <input
                className="form-control me-2"
                type="search"
                value={searchValue}
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => {
                  setSearchValue(e.target.value);
                }}
              />
              <button
                className="btn btn-outline-success"
                type="button"
                onClick={() => setSearch(!search)}
              >
                Search
              </button>
            </form>
            <div
              onClick={() => {
                window.sessionStorage.removeItem("loginState");
                window.sessionStorage.removeItem("loginUser");
                dispatch(refreshLogin());
              }}
              className="text-light rounded d-flex align-items-center justify-content-center text-light user-logo-cont"
              style={{ width: "70px", height: "35px", marginRight: "13px" }}
            >
              <div className="user-logo">{state.loginUser.name}</div>
              <div className="user-logo-logout">Logout</div>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default SellerHeader;
