import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";

const AppRouter = ({isLoggedIn, userObj}) => { // 왜 Destructuring이 필요하지??
  //Hooks
  return (
    <Router>
      {isLoggedIn && <Navigation/>}
      <Switch>
        {isLoggedIn ? (
          <>
            <Route exact path="/">
                {/* userObj={userObj} : 내가 누구인지 알 수 있도록 정보 주입 */}
                <Home userObj={userObj} />
            </Route>
            <Route exact path="/Profile">
                <Profile userObj={userObj} />
            </Route>
             {/* "/"이 route에 있으면 상관 없는데  그 외의 route로 가게되면 "/"로 돌아가라는 뜻*/}
            {/* <Redirect from="*" to="/" /> */}
          </>
        ) : (
          <>
            <Route exact path="/">
              <Auth />
            </Route>
            {/* <Redirect from="*" to="/" /> */}
          </>
        )}
      </Switch>
    </Router>
  );
};

export default AppRouter;