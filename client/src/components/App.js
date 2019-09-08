import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from '../redux/store';

import '../assets/stylesheets/App.scss';

import Landing from './pages/Landing';
import Footer from './layout/Footer';
import BoardPage from './pages/BoardPage';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App wrapper">
                        <Switch>
                            <Route exact path="/" component={Landing} />
                            <Route exact path="/:id" component={BoardPage} />
                        </Switch>
                        <Footer />
                    </div>
                </Router>
            </Provider>
        );
    }
}
export default App;
