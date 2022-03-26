import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

//function component
const Profile = ({ userObj }) => {
  // Hook 사용
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  const getMyNweets = async () => {
    const nweets = await dbService
      .collection("nweets")
      //`${userObj.uid}`로 해야 동작되었었다.
      .where("creatorId", "==", `${userObj.uid}`)
      .orderBy("createdAt")
      .get();
    console.log(nweets.docs.map((doc) => doc.data()));
  };

  useEffect(() => {
    getMyNweets();
  }, []);

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      // userProfile을 가지는 새로운 컬렉션을 만들거나
      // fireStore에서 제공하는 profile을 사용해도 된다 - 단 id, photoUrl정도밖에 없음
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="Display Name"
          value={newDisplayName}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};
export default Profile;
