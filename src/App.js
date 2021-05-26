import OtpVer from "./OtpVer";
import Home from './HomePage'
import { BrowserRouter, Route } from "react-router-dom";
import NotFound from "./NotFound";


function App() {
  return (
    <div>
      <BrowserRouter>
        <OtpVer />
        {/* <Home /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
