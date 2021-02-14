import { BrowserRouter, Route } from "react-router-dom";

import Home from "../pages/Home";
import Checkout from "../pages/Checkout";

function Routers() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/checkout" component={Checkout} />
    </BrowserRouter>
  );
}

export default Routers;
