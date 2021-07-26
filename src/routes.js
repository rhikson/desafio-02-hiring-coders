import { BrowserRouter, Route, Switch } from "react-router-dom";
import client from "./pages/Client";
import product from "./pages/Product";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/client" component={client} />
        <Route path="/" component={product} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
