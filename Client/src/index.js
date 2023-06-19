import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './Styles/index.css';
import App from './App';
import Store from './Store/store';

export const store = new Store();

export const Context = createContext({
    store,
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Context.Provider
            value={{
                store,
            }}
        >
            <App />
        </Context.Provider>
        ,
    </React.StrictMode>,
);
