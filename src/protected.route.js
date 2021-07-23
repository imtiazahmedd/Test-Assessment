import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import auth from './auth'

export const ProtectedRoutes = ({component : Component, ...rest}) => {
    return( 
        <Route {...rest} render={
            (props) => {
                console.log(auth(),"aiuiii")
                if(auth()){
                    return <Component {...props}/>                                        
                }else{
                    console.log(props,"ppp")
                    return(
                        <Redirect to={
                            {
                                pathname: "/",
                                state: {
                                    from: props.location
                                }
                            }
                        }/>
                    )
                }
               
            }
        }/>
    )
}