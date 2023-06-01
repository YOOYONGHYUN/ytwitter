import { Button, FormLabel, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { authService } from "../Firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [newAccount, setNewAccount] = useState<boolean>(false);

  const handleSubmit = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.target.name === "email"
      ? setEmail(e.target.value)
      : setPassword(e.target.value);
  };

  const handleClickLogin = async () => {
    try {
      newAccount
        ? await createUserWithEmailAndPassword(authService, email, password)
        : await signInWithEmailAndPassword(authService, email, password);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNewAccount = () => {
    setNewAccount((prev) => !prev);
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(authService, provider);
  };

  return (
    <Wrapper>
      <SignIn>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <TextField
            name="email"
            required
            label="e-mail"
            type="email"
            value={email}
            onChange={handleSubmit}
          ></TextField>
          <TextField
            name="password"
            required
            label="Password"
            type="password"
            value={password}
            style={{ marginTop: 10 }}
            onChange={handleSubmit}
          ></TextField>
          <Button
            size="large"
            style={{ marginTop: 10 }}
            onClick={handleClickLogin}
          >
            {newAccount ? "회원가입" : "로그인"}
          </Button>
          <div
            onClick={handleNewAccount}
            style={{ cursor: "pointer", marginTop: 10 }}
          >
            {newAccount
              ? "계정이 있으신가요? 로그인하기"
              : "계정이 없으신가요? 회원가입하기"}
          </div>
        </div>

        <Button
          size="large"
          style={{ marginTop: 30 }}
          onClick={handleGoogleLogin}
        >
          구글 로그인
        </Button>
      </SignIn>
    </Wrapper>
  );
};

export default Auth;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SignIn = styled.div`
  display: flex;
  flex-direction: column;
`;
