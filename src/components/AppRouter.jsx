import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { privateRoute, publicRoute } from '../router';


const AppRouter = () => {

    return (
        // isAuth
        //     ?
            <Switch>
                {publicRoute.map(route => 
                    <Route
                    component={route.component}
                    path={route.path}
                    exact={route.exact}
                    key={route.path}
                    />
                )}
            </Switch>
            // :
            // <Switch>
            // {privateRoute.map(route => 
            //     <Route
            //     component={route.component}
            //     path={route.path}
            //     exact={route.exact}
            //     key={route.path}
            //     />
            // )}
            // </Switch>
    );
};

export default AppRouter;