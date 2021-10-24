import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Chart from "../components/Chart";
import Body from "../components/Body";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Routes = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Body} />
        <Route exact path="/chart" component={Chart} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default Routes;
