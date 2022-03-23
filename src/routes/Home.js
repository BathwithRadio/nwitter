import Nweet from "components/Nweet";
import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

//function component
const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState();
  //
  useEffect(() => {
    // onSnapshot Listner추가 - 데이터베이스에 뭔가(CRUD)를 하게 되면 알 수 있도록 해줌
    // 결국 nweets는 우리가 페이지를 불러올 때 snapshot에서 나오는 것
    dbService.collection("nweets").onSnapshot((snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });
  }, []);

  //
  const onSubmit = async (event) => {
    event.preventDefault();
    await dbService.collection("nweets").add({
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setNweet("");
  };

  // event 안에 있는 target 안에 있는 value를 달라고 하는 것
  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };

  // 사진 입력시 변화를 주도록
  const onFileChange = (event) => {
    const {
      target: { files },
    } = event;
    // 1. 파일을 가지고
    const theFile = files[0];
    // 2. reader를 만들어서
    const reader = new FileReader();
    // 4. 파일 읽기가 끝나면 finishedEvent를 갖는 것
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    }
    // 3. readAsDataURL를 이용해서 파일을 읽는 것
    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = () => setAttachment(null);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="Nweet" />
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachment}>Clear</button>
          </div>
        )}
      </form>
      <div>
        {nweets.map((nweet) => (
          //Nweet은 내가 만든 Component이고
          <Nweet
            key={nweet.id}
            //NweetObj는 전체의 Object이다 - 그리고 그것을 prop처럼 보내준다.
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
