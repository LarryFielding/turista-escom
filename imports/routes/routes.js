import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Router, Route, Redirect } from 'react-router-dom'
import { Switch } from "react-router";
import { createBrowserHistory } from 'history'

import Login from '../ui/Login';
import Signup from '../ui/Signup';
import NotFound from '../ui/NotFound';
import Tablero from "../ui/Tablero";

const history = createBrowserHistory();
const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/operator', '/test'];

const onEnterPublicPage = () => {
    if (!Meteor.loggingIn()) {
        if (Meteor.user().profile.role === 'c4-web-user') {
            return (<Redirect to={'/operator'}/>);
        } else {
            return (<Redirect to={'/test'}/>);
        }
    }
};

const onRejectPrivatePage = () => {
    history.push('/');
    return <Login/>;
};

export const onAuthChange = (isAuthenticated) => {
    const pathName = history.location.pathname;
    const isUnauthenticatedPage = unauthenticatedPages.includes(pathName);
    const isAuthenticatedPage = authenticatedPages.includes(pathName);
    if (isAuthenticated) {
        if (!Meteor.loggingIn()) {
            if (Meteor.user().profile.role === 'c4-web-user') {
                history.push('/operator');
            } else {
                history.push('/test');
            }
        }
    } else if (isAuthenticatedPage && !isAuthenticated) {
        history.push('/');
    }
};
export const routes = (
    // TODO: revisar la validación de rutas privadas y navegación (ver replace)
    <Router history={history}>
        <Switch>
            <Route exact path="/" render={() => (
                Meteor.userId() ? onEnterPublicPage(): (<Tablero/>)
            )}/>
            <Route exact path="/signup" render={() => (
                Meteor.userId() ? onEnterPublicPage(): (<Signup history={history}/>)
            )}/>
            <Route component={NotFound}/>
        </Switch>
    </Router>
);
