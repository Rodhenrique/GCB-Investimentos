import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { parseJWT } from './services/auth';
import Panel from './views/Administrador';
import Login from './views/Login';

function Routers() {
    interface RouteProps {
        component: any;
        path: any;
    }

    const RotaAdm: React.FC<RouteProps> = ({ component: Component, path, ...rest }) => {
        var token = localStorage.getItem("Gcb-Caren-Token");
        return (
            <Route
                render={props => ((token !== undefined || token !== null) && parseJWT() == 1) ?
                    (
                        <Component path={path}  {...rest} {...props} />
                    ) : (
                        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
                    )
                } />
        )
    }

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <RotaAdm path="/Panel" component={Panel}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routers;