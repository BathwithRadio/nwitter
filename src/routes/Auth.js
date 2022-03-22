import { authService } from "fbase";
import React, { useState } from "react";

//function component
const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const onChange = (event) => {
        //1. input을 변경할 때마다 onChange function을 호출한다.
        //2. onChange function은 내가 input에 입력한 값들을 토대로 저장시킨다.
        //⭐️ input은 글자를 추가하는 것이 아니라 value를 받아오는 것이다.
        //⭐️ input의 value는 state에 저장된다 => input이 변할때마다 state도 변한다
        const {target: {name, value}} = event;
        // console.log(value);
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };
    const onSubmit = async(event) => {
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
            data = await authService.createUserWithEmailAndPassword(email, password);
          } else {
            //Log In
            data = await authService.signInWithEmailAndPassword(email, password);
          }
          console.log(data);
        } catch (error) {
          console.log(error);
        }
    }
    return (
      <div>
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
        </form>
        <div>
          <button>Continue with Google</button>
          <button>Continue with GitHub</button>
        </div>
      </div>
    );
}
export default Auth;