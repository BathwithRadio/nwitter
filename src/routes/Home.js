import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

//function component
const Home = () => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const getNweets = async() => {
        // db에 있는 Nweet들을 가져옴
        const dbNweets = await dbService.collection("nweets").get()
        // 단 위의 get은 리턴이 QuerySnapshot이므로 그것을 data로 풀어준다
        dbNweets.forEach(document => {
            const nweetObject = {
                ...document.data(),
                id : document.id,
            };
            // set함수에 값 대신 함수를 전달할 때 
            // 리액트는 (dbNweets 안에 있는 모든 document에 대한)이전 값에 접근할 수 있도록 해준다
            // 이 때 리턴 값은 배열이다
            // 가장 최근 document - 그 뒤로 이전 document들을 붙임
            setNweets((prev) => [nweetObject, ...prev]);
        });
    };
    useEffect(() => {
        getNweets();
    }, []);
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("nweets").add({
            // nweet key에 nweet value를 넣는다
            nweet,
            createdAt: Date.now(),
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
    console.log(nweets);
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
                <h4>{nweet.nweet}</h4>
            </div>
          ))}
        </div>
      </div>
    );
};
export default Home;
