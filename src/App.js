import OtpVer from "./OtpVer";
import Home from './HomePage'
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import NotFound from "./NotFound";
import { Component } from "react";

class App extends Component{
  // const 
  render(){
  var loggedIn = localStorage.getItem("loggedIn");
  return (
    <div>
      <BrowserRouter>
       <Switch>
       <Route exact path="/" component={OtpVer} />
        <Route exact path="/home" >
          {loggedIn ? <Home /> : <OtpVer />}
        </Route>
        <Route exact path='/*' component={NotFound} />
       </Switch>
      </BrowserRouter>
    </div>
  );}
}

export default (App);
