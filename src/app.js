import React from "react";
import ReactDom from "react-dom";
import {HashRouter as Router, Switch, Route} from 'react-router-dom';
import routes from "./routes";

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      // render={()=>route.component()}
      render={props => (
        <route.component {...props} />
      )}
    />
  );
}

ReactDom.render(
  <Router>
    <div>路由</div>
    <Switch>
      {routes.map((route, i) => {
        console.log('eee', route);
        return <RouteWithSubRoutes key={i} {...route} />
      })}
    </Switch>
</Router>, document.getElementById("root"));
