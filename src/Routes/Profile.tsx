import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import { authService } from "../Firebase";

const Profile = () => {
  const navigate = useNavigate();
  const hanldeClickLogout = () => {
    signOut(authService);
    navigate("/");
  };
  return (
    <Wrapper>
      <h1>Profile</h1>
      <Button onClick={hanldeClickLogout}>로그아웃</Button>
    </Wrapper>
  );
};

export default Profile;

const Wrapper = styled.div``;
