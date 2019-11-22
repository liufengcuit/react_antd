import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Login from "./login";
import Main from "./main";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <Route path="/login" component={Login} exact></Route>
                <Route path="/main" component={Main}></Route>
            </Router>
        )
    }
}

export default App;