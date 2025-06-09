import styled from "styled-components";

export default function Rank() {
  // 예시 랭킹 데이터
  const rankingData = [
    { name: "김하늘", score: 9 },
    { name: "이서현", score: 8 },
    { name: "박지후", score: 7 },
    { name: "최유진", score: 6 },
    { name: "정윤호", score: 5 },
  ];

  return (
    <Wrapper>
      <Title>퀴즈 랭킹</Title>

      <RankBox>
        {rankingData.map((user, index) => (
          <RankItem key={user.name}>
            <RankPosition
              style={{
                color: index < 3 ? "#007acc" : "#888",
                fontWeight: index < 3 ? "700" : "400",
              }}
            >
              {index + 1}위
            </RankPosition>
            <UserInfo>
              <UserName>{user.name}</UserName>
              <UserScore>{user.score}점</UserScore>
            </UserInfo>
          </RankItem>
        ))}
      </RankBox>
    </Wrapper>
  );
}

// 스타일 컴포넌트
const Wrapper = styled.div`
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
`;

const WhoMadeThis = styled.div`
  font-size: 0.9rem;
  font-weight: 300;
  color: #ccc;
  text-align: center;
  margin-bottom: 2rem;
`;

const RankBox = styled.div`
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 0.75rem;
  padding: 1.5rem;
`;

const RankItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
`;

const RankPosition = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: #007acc;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const UserName = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #333;
`;

const UserScore = styled.div`
  font-size: 0.9rem;
  color: #666;
`;
