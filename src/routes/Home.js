import { dbService } from "fbase";
import React, { useState } from "react";

//function component
const Home = () => {
    const [nweet, setNweet] = useState("");
    const onSubmit = (event) => {
        event.preventDefault();
        dbService.collection("nweets").add({
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
      </div>
    );
};
export default Home;
