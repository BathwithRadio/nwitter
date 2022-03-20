import React, { useState } from "react";
import AppRouter from "./Router";
import { authService } from "fbase";

/*
왜 AppRouter를 여기에 사용하느냐
Router와 Footer같은 다른 요소를 넣어주기 위해
*/
function App() {
  // auth를 활용해서 user의 로그인 여부를 파악한다
  const [isLoggedIn, setInLoggedIn] = useState(authService.currentUser); 
  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>&copy; {new Date().getFullYear()}Nwitter</footer>
    </>
  );
}

export default App;
