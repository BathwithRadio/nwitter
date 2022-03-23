import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

//function component
const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
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

    //
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("nweets").add({
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
        });
        setNweet("");
    }

    // event 안에 있는 target 안에 있는 value를 달라고 하는 것
    const onChange = (event) => {
        const {
          target: { value },
        } = event;
        setNweet(value);
    }
    
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
          <input type="submit" value="Nweet" />
        </form>
        <div>
          {nweets.map((nweet) => (
            <div key={nweet.id}>
                <h4>{nweet.text}</h4>
            </div>
          ))}
        </div>
      </div>
    );
};
export default Home;
