import React, { useEffect, useState } from "react";
import AppRouter from "./Router";
import { authService } from "fbase";

/*
왜 AppRouter를 여기에 사용하느냐
Router와 Footer같은 다른 요소를 넣어주기 위해
*/
function App() {
  const [init, setInit] = useState(false);
  // auth를 활용해서 user의 로그인 여부를 파악한다
  // 단, 추가설정이 없으면 로그인 되는 즉시 로그아웃이 된다 - 
  // firebase가 초기화 되고 모든 것 로드할 때 까지 기다려줄 시간이 없기 때문
  const [isLoggedIn, setInLoggedIn] = useState(false);

  // 사용자가 누구인지 파악하기위해 user 정보를 저장하게 해줄것
  const [userObj, setUserObj] = useState(null);

  // 컴포넌트가 mount될 때 실행
  // onAuthStateChanged로 - user의 상태를 확인하는 Observer
  // Create Account를 클릭하거나 Log In을 누르거나 이미 로그인 되어 있다면
  // firebase는 스스로 초기화 하는 것을 끝냈기 때문에 Observe를 해주어야 한다.
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setInLoggedIn(true);
        setUserObj(user);
      } else {
        setInLoggedIn(false);
      }
      // setInit(false)라면 router를 숨길 것이므로 true로 해준다
      setInit(true);
    });
  }, [])
  // console.log(authService.currentUser);
  // setInterval(() => {
  //   console.log(authService.currentUser);
  // }, 2000)
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : "Initializing...."}
      <footer>&copy; {new Date().getFullYear()}Nwitter</footer>
    </>
  );
}

export default App;
