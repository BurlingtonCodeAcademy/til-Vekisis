//imports
//css for the page
import "./styles/App.css";
//Switch and Route to move cleanly between components
import { Switch, Route } from "react-router-dom";
import Facts from "./components/Facts";
import Home from "./components/Home";
import NavBar from "./components/NavBar";

// App to display the webpage
function App() {
  return (
    <div>
      <h1 class="header-container">Today I Learned:</h1>
      <NavBar />
      <Switch>
        {/* Routes for each component's page */}
        <Route exact path={"/"} component={Home} />
        <Route path={"/facts"} component={Facts} />
      </Switch>
    </div>
  );
}

export default App;
