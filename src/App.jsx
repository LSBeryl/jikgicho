import { Route, Routes, BrowserRouter, Outlet } from "react-router-dom";
import Main from "./Pages/Main";
import Rank from "./Pages/Rank";
import styled from "styled-components";
import Footer from "./Footer";

function Layout() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Main />} />
          <Route path="/rank" element={<Rank />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  padding-block: 5rem;
`;
