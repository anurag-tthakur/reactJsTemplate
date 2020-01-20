import React from 'react';
import {Router, Route} from 'react-router-dom';

import {history} from "./utils/history";
import {Redirect, Switch} from "react-router";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {connect} from "react-redux";

class App extends React.Component {

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <Router history={history}>
                    <Switch>
                        <Route exact path={'/'} component={Login}/>
                        <Redirect exact from='*' to="/"/>
                    </Switch>
                </Router>
            </MuiThemeProvider>
        )
    }
}

const Login = () => {
    return (<div>Hello World</div>)
}
export default App;