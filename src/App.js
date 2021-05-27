import OtpVer from "./OtpVer";
import Home from './HomePage'
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
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
       <Route exact path="/tinkerr-web-challenge" >
         <Redirect to='/' />
       </Route>
        <Route exact path="/home" >
          {loggedIn ? <Home /> : <OtpVer />}
        </Route>
        <Route exact path='/*' component={NotFound} />
       </Switch>
      </BrowserRouter>
    </div>
  );}
}

export default App;