import styled from "styled-components";

export default function Footer() {
  return (
    <Wrapper>
      <div>&copy; 2025. 이서현 All rights reserved.</div>
      <div>
        여러분들의 성공적인 직업생활 50점을 기원하며 (GPT와 함께)
        개발하였습니다.
      </div>
      <div>저도 50점이 나왔으면 좋겠네요.</div>
      <Sns>
        <div
          onClick={() => {
            window.open("https://github.com/LSBeryl");
          }}
        >
          <img src="github.png" alt="github.png" style={{ height: "1.5rem" }} />
        </div>
        <div
          onClick={() => {
            window.open("https://www.instagram.com/seohyxn._.13");
          }}
        >
          <img
            src="instagram.png"
            alt="github.png"
            style={{ height: "1.3rem" }}
          />
        </div>
      </Sns>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 5rem 0 2rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  font-size: 0.9rem;
  font-weight: 300;
  color: #ccc;
`;

const Sns = styled.div`
  margin: 0 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  & > div {
    cursor: pointer;
    & > img {
      opacity: 0.4;
    }
  }
`;
