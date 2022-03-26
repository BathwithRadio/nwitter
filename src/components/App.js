import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from "fbase";

/*
왜 AppRouter를 여기에 사용하느냐
Router와 Footer같은 다른 요소를 넣어주기 위해
*/
function App() {
  const [init, setInit] = useState(false); //state

  // 사용자가 누구인지 파악하기위해 user 정보를 저장하게 해줄것
  const [userObj, setUserObj] = useState(null); //state

  // 컴포넌트가 mount될 때 실행
  // onAuthStateChanged로 - user의 상태를 확인하는 Observer
  // Create Account를 클릭하거나 Log In을 누르거나 이미 로그인 되어 있다면
  // firebase는 스스로 초기화 하는 것을 끝냈기 때문에 Observe를 해주어야 한다.
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          // 우리가 원하는 function을 얻기 위한 중간 function
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setUserObj(null);
      }
      // setInit(false)라면 router를 숨길 것이므로 true로 해준다
      setInit(true);
    });
  }, []);

  //fireBase쪽의 user정보를 업데이트 해줌
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      // 우리가 원하는 function을 얻기 위한 중간 function
      updateProfile: (args) => user.updateProfile(args),
    });
  };

  return (
    <>
      {init ? (
        // Boolean(userObj) : userObj가 있다면 로그인 한다
        <AppRouter
          refreshUser={refreshUser} // 업데이트 실행 function
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
      ) : (
        "Initializing...."
      )}
      <footer>&copy; {new Date().getFullYear()}Nwitter</footer>
    </>
  );
}

export default App;
