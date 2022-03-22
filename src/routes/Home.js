import React, { useState } from "react";

//function component
const Home = () => {
    const [nweet, setNweet] = useState("");
    const onSubmit = (event) => {
        event.preventDefault();
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
