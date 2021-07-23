import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import Login from "./login/login"
import Signup from "./signup/signup"
import UserListing from "./admin/admin"
import Parking from "./user/parking"
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { ProtectedRoutes } from './protected.route'

const protectedRoutes = [
    {
        path: "/admin/user-listing",
        component: UserListing
    },
    {
        path: "/user/parking-slots",
        component: Parking
    }
]


const protectedRoutesFun = () => {
    const ele = protectedRoutes.map((el) => {
        return (
            <ProtectedRoutes
                exact
                path={el.path}
                component={el.component} />
        )
    })
    return ele
}
function App() {
    return (
        <div className="App">
            <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/signup" component={Signup} />
                {
                    protectedRoutesFun()
                 
                }

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
