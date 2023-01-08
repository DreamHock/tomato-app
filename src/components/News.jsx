import styled from "styled-components";

const StyledNews = styled.section`
  background-color: #212529;
  display: flex;
  justify-content: center;
  align-items: center;
  > div {
    text-align: center;
    > :first-child {
      font-weight: bold;
      font-size:3rem;
      color: whitesmoke;
    }
    > :last-child {
      
      color: grey;
    }
  }
  height: 300px;
`;

const News = () => {
  return (
    <StyledNews>
      <div>
        <h1>Shop in style</h1>
        <h6>With this shop homepage template</h6>
      </div>
    </StyledNews>
  );
};

export default News;
