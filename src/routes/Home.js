import React, { useEffect, useState } from "react";
import Nweet from "components/Nweet";
import { dbService } from "fbase";
import NweetFactory from "components/NweetFactory";

//function component
const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);

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

  return (
    <div>
      <NweetFactory userObj={userObj} />
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
