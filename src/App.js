import Index from "./Components/Index";
import { HashRouter as Router } from "react-router-dom";
import { Switch, Route } from 'react-router-dom';
import "./App.css";
function App() {
  return (
    <div className="App ">
      <Router>
        <Switch>
          <Route exact component={Index} path="/" />
          {/* <Layout> */}
            {/* <Route exact component={Admin} path="/admin/login" /> */}
          {/* </Layout> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
