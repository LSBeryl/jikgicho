import { useState } from "react";
import styled from "styled-components";
import jikgicho from "./data/jikgicho";
import Footer from "./Footer";

export default function App() {
  const [numQuestions, setNumQuestions] = useState(1);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quizList, setQuizList] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  const generateQuiz = () => {
    const generated = [];

    for (let i = 0; i < numQuestions; i++) {
      // 1. 랜덤으로 카테고리 하나 선택
      const categoryIndex = Math.floor(Math.random() * jikgicho.length);
      const [categoryName, skillsInCategory] = jikgicho[categoryIndex];

      // 2. 그 카테고리 내에서 랜덤 정답 선택
      const correct =
        skillsInCategory[Math.floor(Math.random() * skillsInCategory.length)];
      const isNameQuestion = Math.random() < 0.5;
      const question = isNameQuestion ? correct[1] : correct[0];
      const answer = isNameQuestion ? correct[0] : correct[1];

      // 3. 같은 카테고리 내 다른 선지 후보 추출 (정답 제외)
      let otherOptions = skillsInCategory
        .filter((item) =>
          isNameQuestion ? item[0] !== answer : item[1] !== answer
        )
        .map((item) => (isNameQuestion ? item[0] : item[1]));

      // 4. 부족하면 다른 카테고리에서 선지 채우기
      if (otherOptions.length < 2) {
        const needed = 2 - otherOptions.length;
        const otherCategories = jikgicho
          .filter((_, idx) => idx !== categoryIndex)
          .flatMap(([, skills]) =>
            skills
              .filter((item) =>
                isNameQuestion ? item[0] !== answer : item[1] !== answer
              )
              .map((item) => (isNameQuestion ? item[0] : item[1]))
          )
          .sort(() => 0.5 - Math.random());

        otherOptions = [...otherOptions, ...otherCategories.slice(0, needed)];
      } else {
        otherOptions = otherOptions.sort(() => 0.5 - Math.random()).slice(0, 2);
      }

      // 5. 답 포함해서 섞기
      const options = [...otherOptions, answer].sort(() => 0.5 - Math.random());

      generated.push({
        question,
        answer,
        options,
        isNameQuestion,
      });
    }

    setQuizList(generated);
    setQuizStarted(true);
    setCurrentIndex(0);
    setSelected(null);
    setShowAnswer(false);
  };

  const handleSelect = (choice) => {
    setSelected(choice);
    setShowAnswer(true);
  };

  const handleNext = () => {
    if (currentIndex < quizList.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelected(null);
      setShowAnswer(false);
    } else {
      setQuizStarted(false);
    }
  };

  return (
    <Wrapper>
      <Title>직업기초능력 외우기</Title>
      <WhoMadeThis>made by. 이서현</WhoMadeThis>

      {!quizStarted && (
        <QuizSetup>
          <label>
            문제 개수:
            <Input
              type="number"
              min={1}
              max={10}
              value={numQuestions}
              onChange={(e) => setNumQuestions(Number(e.target.value))}
            />
          </label>
          <QuizButton onClick={generateQuiz}>퀴즈 타임</QuizButton>
        </QuizSetup>
      )}

      {quizStarted && quizList.length > 0 && (
        <QuizBox>
          <QuestionLabel>
            {quizList[currentIndex].isNameQuestion
              ? "이 설명에 해당하는 능력은?"
              : "이 능력의 설명은?"}
          </QuestionLabel>
          <QuestionText>{quizList[currentIndex].question}</QuestionText>
          <Options>
            {quizList[currentIndex].options.map((opt, i) => (
              <Option
                key={i}
                onClick={() => handleSelect(opt)}
                $selected={selected === opt}
                $correct={showAnswer && opt === quizList[currentIndex].answer}
                $incorrect={
                  showAnswer &&
                  selected === opt &&
                  opt !== quizList[currentIndex].answer
                }
              >
                {opt}
                {showAnswer && (
                  <div style={{ fontWeight: "500" }}>
                    {" - "}
                    {(() => {
                      const flatList = jikgicho.flatMap(
                        ([_, skills]) => skills
                      );
                      const found = flatList.find((item) =>
                        quizList[currentIndex].isNameQuestion
                          ? item[0] === opt
                          : item[1] === opt
                      );
                      return quizList[currentIndex].isNameQuestion
                        ? found?.[1]
                        : found?.[0];
                    })()}
                  </div>
                )}
              </Option>
            ))}
          </Options>
          {showAnswer && (
            <NextButton onClick={handleNext}>
              {currentIndex < quizList.length - 1 ? "다음 문제" : "퀴즈 종료"}
            </NextButton>
          )}
        </QuizBox>
      )}

      <Divider />
      <SubTitle>직업 기초 능력 목록</SubTitle>
      {jikgicho.map(([category, skills]) => (
        <Section key={category}>
          <CategoryTitle>{category}</CategoryTitle>
          {skills.map(([name, description]) => (
            <SkillCard key={name}>
              <SkillName>{name}</SkillName>
              <SkillDesc>{description}</SkillDesc>
            </SkillCard>
          ))}
        </Section>
      ))}
      <Footer />
    </Wrapper>
  );
}

// 스타일 컴포넌트
const Wrapper = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const WhoMadeThis = styled.div`
  font-size: 0.9rem;
  font-weight: 300;
  color: #ccc;
  text-align: center;
  margin-bottom: 1.5rem;
`;

const SubTitle = styled.h2`
  font-size: 1.5rem;
  margin-top: 3rem;
  margin-bottom: 1rem;
  border-left: 4px solid #007acc;
  padding-left: 0.5rem;
`;

const Divider = styled.hr`
  margin: 3rem 0 1rem;
  border: none;
  border-top: 1px solid #ccc;
`;

const QuizSetup = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  margin-left: 0.5rem;
  width: 4rem;
  padding: 0.25rem;
  font-size: 1rem;
`;

const QuizButton = styled.button`
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  background-color: #007acc;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #005fa3;
  }
`;

const QuizBox = styled.div`
  background-color: #f0f8ff;
  border: 1px solid #cce;
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const QuestionLabel = styled.div`
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const QuestionText = styled.div`
  font-size: 1rem;
  display: inline-block;
  padding: 0.75rem;
  border-radius: 0.5rem;
  border: 1px solid #ccc;
  background-color: #fff;
  font-weight: 500;
  margin-bottom: 1rem;
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Option = styled.button`
  padding: 0.75rem;
  text-align: left;
  font-size: 0.9rem;
  font-weight: 200;
  border: 1px solid #ccc;
  background-color: ${({ $selected, $correct, $incorrect }) =>
    $correct
      ? "#d1ffd1"
      : $incorrect
      ? "#ffd1d1"
      : $selected
      ? "#e0f0ff"
      : "#fff"};
  color: ${({ $correct, $incorrect }) =>
    $correct ? "#0a5" : $incorrect ? "#a00" : "#333"};
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #f2f2f2;
  }
`;

const NextButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #444;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
`;

const Section = styled.section`
  margin-bottom: 2.5rem;
`;

const CategoryTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1a1a1a;
  border-left: 4px solid #007acc;
  padding-left: 0.5rem;
`;

const SkillCard = styled.div`
  margin-bottom: 1rem;
  padding: 0.75rem 1rem;
  background: #f5f5f5;
  border-radius: 0.5rem;
`;

const SkillName = styled.div`
  font-weight: 600;
  color: #333;
  margin-bottom: 0.25rem;
`;

const SkillDesc = styled.div`
  font-size: 0.95rem;
  color: #666;
  line-height: 1.4;
`;
