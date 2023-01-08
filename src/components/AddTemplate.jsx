import styled from "styled-components";

const StyledTemplate = styled.div`
  margin: 20px;
  height: 300px;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid #bababa33;
  box-shadow: #7799af 0px 8px 24px;
  /* box-shadow: #79808833 0px 8px 24px; */
  font-size: 5rem;
  cursor: default;
`;

const AddTemplate = (props) => {
  return (
    <div onClick={props.onClick}>
      <StyledTemplate>+</StyledTemplate>
    </div>
  );
};

export default AddTemplate;
