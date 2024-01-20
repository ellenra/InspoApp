import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App.jsx'
import store from './redux/store.js'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
)
