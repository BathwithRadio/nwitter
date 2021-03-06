import { authService } from "fbase";
import React, { useState } from "react";

const AuthForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (event) => {
    //1. input을 변경할 때마다 onChange function을 호출한다.
    //2. onChange function은 내가 input에 입력한 값들을 토대로 저장시킨다.
    //⭐️ input은 글자를 추가하는 것이 아니라 value를 받아오는 것이다.
    //⭐️ input의 value는 state에 저장된다 => input이 변할때마다 state도 변한다
    const {
      target: { name, value },
    } = event;
    // console.log(value);
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (event) => {
    //⭐️ 아래 preventDefault가 없으면 로그인 버튼을 누를 때마다 새로고침이 되어 버린다
    //  => 우리가 입력한 아이디 비밀번호가 사라진다.
    //⭐️ preventDefault : 기본행위가 실행되는 걸 원하지 않는다
    //  => 디폴트행위(새로고침 등)를 내가 컨트롤 할 수 있게 해달라
    event.preventDefault();
    let data;
    try {
      if (newAccount) {
        //Create Account
        //createUserWithEmailAndPassword 특징
        //사용자 계정을 성공적으로 만들면 어플리케이션에 바로 로그인도 된다
        data = await authService.createUserWithEmailAndPassword(
          email,
          password
        );
      } else {
        //Log In
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  // setNewAccount를 하되 newAccount의 이전 값을 가져와서 그 값에 반대되는 것을 리턴할 것
  // 지금 버튼이 Sign In 이면 Create Account로 변경 - 그 역도 성립
  const toggleAccount = () => setNewAccount((prev) => !prev);

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange} //반드시 사용해야 한다.
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange} //반드시 사용해야 한다.
        />
        <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
        {error}
      </form>
      <span onClick={toggleAccount}>
        {newAccount ? "Sign in" : "Create Account"}
      </span>
    </>
  );
};
export default AuthForm;
