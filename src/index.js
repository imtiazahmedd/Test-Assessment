import React from 'react';
import { Layout } from 'antd';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import {LandingPage} from './landingpage'
import {AppLayout} from './app.layout'
import Login from "./login/login"
import Signup from "./signup/signup"
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {ProtectedRoutes} from './protected.route'
    
function App(){
    return(
        <div className="App" style={{margin: "80px"}}>
            <Switch>
            <Route exact path="/" component={Signup}/>
            <ProtectedRoutes 
            exact
            path="/app"
            component={AppLayout}/>
            <Route path="*" component={()=> "404 Not Found"}/>
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
