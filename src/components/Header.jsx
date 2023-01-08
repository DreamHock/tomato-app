import { FaShoppingCart } from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { GiTomato } from "react-icons/gi";

const StyledNavBar = styled.nav`
  display: flex;
  padding: 5px;
  align-items: center;
  color: #434343;
  height: 30px;

  > .logo {
    display: flex;
    flex-direction: column;
    .tomato-icon {
      color: #1b1b3aff;
      font-size: 2rem;
    }
  }

  > ul {
    display: flex;
    gap: 10px;
    list-style: none;
    > :nth-child(-n + 2) {
    }
    > li {
      > select {
        background-color: transparent;
        color: grey;
        border: 0;
        > option {
          border: 0;
        }
      }
    }
  }
`;

const StyledHeader = styled.header`
  max-width: 100%;
  display: flex;
  justify-content: space-between;
  margin: 10px 20px;
`;

const StyledCart = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: 1px solid #434343;
  padding: 0px 5px;
`;

const Header = () => {
  return (
    <StyledHeader>
      <StyledNavBar>
        <div className="logo">
          <GiTomato className="tomato-icon" />
        </div>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>
            <select>
              <option value="all">All Products</option>
              <option value="phones">Phones</option>
              <option value="laptops">Laptops</option>
              <option value="cameras">Cameras</option>
            </select>
          </li>
        </ul>
      </StyledNavBar>
      <StyledCart>
        <FaShoppingCart />
        <div>Cart</div>
        <FaBell />
      </StyledCart>
    </StyledHeader>
  );
};

export default Header;
