import styled from "styled-components"

const StyledFooter = styled.footer`
  position: absolute;
  left:0;
  background-color: #212529;
  height: 100px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  >:first-child {
    color: white;
  }
`

const Footer = () => {
  return (
    <StyledFooter>
      <h5>&copy; 2022 styledShop.com</h5>
    </StyledFooter>
    );
}

export default Footer;