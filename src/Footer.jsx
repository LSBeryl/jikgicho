import { useRef } from "react";
import emailjs from "@emailjs/browser";
import styled from "styled-components";

export default function Footer() {
  const formRef = useRef();

  function onSubmitForm(e) {
    e.preventDefault();

    try {
      emailjs.sendForm(
        import.meta.env.VITE_SERVICE_KEY,
        import.meta.env.VITE_TEMPLATE_KEY,
        formRef.current,
        import.meta.env.VITE_PUBLIC_KEY
      );
      alert("방명록 써주셔서 감사합니다!!");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Wrapper>
      <GuestBook ref={formRef} onSubmit={onSubmitForm}>
        <MessageIpt
          type="text"
          name="message"
          placeholder="방명록 남기기 (개발자만 봄)"
          required
        />
        <SubmitBtn type="submit" value="남기기" />
        <input type="hidden" name="from_name" value="직기초 외우기" />
      </GuestBook>
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

const GuestBook = styled.form`
  display: flex;
  gap: 1rem;
`;

const MessageIpt = styled.input`
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  outline: none;
  border: 1px solid #ccc;
`;

const SubmitBtn = styled.input`
  padding: 0.5rem 1rem;
  background: #fff;
  font-size: 0.8rem;
  cursor: pointer;
  border-radius: 0.5rem;
  outline: none;
  border: 1px solid #ccc;

  transition: all 0.2s ease;

  &:hover {
    background: #eee;
  }
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
