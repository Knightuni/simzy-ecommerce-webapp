import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";

const Container = styled.div``;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px 30px 0px;
`;
const Image = styled.img`
  height: 40%;
  width: 40%;
`;

const TextWrapper = styled.div`
  height: 40%;
  width: 40%;
  display: block;
`;

const Title = styled.h2`
  color: #eda3b5;
  font-size: 48px;
`;

const Text = styled.div`
  color: black;
  font-size: 20px;
`;

const ButtonText = styled.div``;

// const Button = styled.button`
//   color: #eda3b5;
//   background-color: white;
//   font-size: 18px;
//   padding: 10px 18px;
//   border: 0.5px lightgray solid;
//   border-radius: 10px;

//   :hover {
//     pointer: cursor;
//     color: white;
//     background-color: #eda3b5;
//     border-color: black;
//   }
// `;

const styles = {
  customButton: {
    backgroundColor: "#eda3b5",
    borderColor: "#eda3b5",
    color: "white",
    borderRadius: "5px",
    marginTop: "30px",
    padding: "10px 20px",
  },
};

const ProductNotFound = ({ filtered }) => {
  const navigate = useNavigate();
  const fontSize = useSelector((state) => state.fontSize);

  return (
    <Container>
      <Wrapper>
        <Image src={process.env.PUBLIC_URL + "img/no-result.png"} />
        <TextWrapper>
          <Title style={{ fontSize: `${40 + fontSize.fontSize}px` }}>
            No Results Found!
          </Title>
          {filtered ? (
            <>
              <Text style={{ fontSize: `${18 + fontSize.fontSize}px` }}>
                We’re sorry, there's no product matching your selected filters.
              </Text>
              <Button
                onClick={() => window.location.reload()}
                style={styles.customButton}
              >
                <ButtonText
                  style={{
                    fontSize: `${18 + fontSize.fontSize}px`,
                  }}
                >
                  Clear selected filters
                </ButtonText>
              </Button>
            </>
          ) : (
            <>
              <Text style={{ fontSize: `${18 + fontSize.fontSize}px` }}>
                We’re sorry, there's no product with the name you provided.
              </Text>
              <Button onClick={() => navigate("/")} style={styles.customButton}>
                <ButtonText
                  style={{
                    fontSize: `${16 + fontSize.fontSize}px`,
                  }}
                >
                  Explore more at homepage
                </ButtonText>
              </Button>
            </>
          )}
        </TextWrapper>

        {/* <h1 onClick={window.location.reload()}>Clear filter</h1> */}
      </Wrapper>
    </Container>
  );
};

export default ProductNotFound;
