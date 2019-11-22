import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Provider } from "react-redux";
import Login from "./login";
import Main from "./main";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Provider>
                <Router>
                    <Route path="/login" component={Login} exact></Route>
                    <Route path="/main" component={Main}></Route>
                </Router>
            </Provider>
        )
    }
}

export default App;