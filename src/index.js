import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import Login from "./login/login"
import Home from "./home"
import { BrowserRouter, Route, Switch } from 'react-router-dom'

function App() {
    return (
        <div className="App">
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/home" component={Home} />
                <Route path="*" component={() => "404 Not Found"} />
            </Switch>
        </div>
    )
}


const rootElement = document.getElementById("root");
ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    rootElement);
