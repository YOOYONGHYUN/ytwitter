import { Button, TextField } from "@mui/material";
import { addDoc, collection, DocumentData, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { dbService } from "../Firebase";

const Home = () => {
  const [tweet, setTweet] = useState<string>("");
  const [tweets, setTweets] = useState<DocumentData>([]);

  useEffect(() => {
    handleGetTweets();
  }, []);

  const handleChangeTweet = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTweet(e.target.value);
  };
  const handleClickTweet = async () => {
    await addDoc(collection(dbService, "tweets"), {
      tweet,
      createdAt: Date.now(),
    });
    setTweet("");
    handleGetTweets();
  };

  const handleGetTweets = async () => {
    const tweets = await getDocs(collection(dbService, "tweets"));
    setTweets(tweets.docs.map((doc) => doc.data()));
  };

  console.log(tweets);

  return (
    <Wrapper>
      <h1>일일회고</h1>
      <MoodContainer>
        <MoodTitle>
          <h2>오늘의 기분은 어떠신가요?</h2>
        </MoodTitle>
        <MoodContent></MoodContent>
      </MoodContainer>
      <CreateTweets>
        <TextField
          type="text"
          value={tweet}
          onChange={handleChangeTweet}
        ></TextField>
        <Button onClick={handleClickTweet}>Tweet</Button>
      </CreateTweets>
      {tweets.map((v: DocumentData) => (
        <ShowTweets>{v.tweet}</ShowTweets>
      ))}
    </Wrapper>
  );
};

export default Home;

const Wrapper = styled.div``;

const MoodContainer = styled.div``;

const MoodTitle = styled.div``;

const MoodContent = styled.div``;

const CreateTweets = styled.div`
  display: flex;
  align-items: center;
`;
const ShowTweets = styled.div`
  margin-top: 20px;
`;
