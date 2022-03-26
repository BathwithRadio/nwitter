import React, { useState } from "react";
import { dbService, storageService } from "fbase";
import { v4 as uuidv4 } from "uuid";

const NweetFactory = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [attachment, setAttachment] = useState("");
  //
  const onSubmit = async (event) => {
    event.preventDefault();
    let attachmentUrl = "";
    // 사진이 있다면 사진을 보여줌
    if (attachment !== "") {
      // ref :  오브젝트를 업로드 다운로드 삭제 할 수 있게 해준다
      // child : path를 받아서 reference를 반환한다
      const attachmentRef = storageService
        .ref()
        .child(`${userObj.uid}/${uuidv4()}`);
      // reader.readAsDataURL이기 때문에 putString의 format은 "data_url"가 된다
      const response = await attachmentRef.putString(attachment, "data_url");
      attachmentUrl = await response.ref.getDownloadURL();
    }
    // 사진이 있든 없든 작성글을 볼 수 있음
    const nweetObj = {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    await dbService.collection("nweets").add(nweetObj);
    setNweet("");
    setAttachment("");
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
    };
    // 3. readAsDataURL를 이용해서 파일을 읽는 것
    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = () => setAttachment(null);

  return (
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
  );
};

export default NweetFactory;
