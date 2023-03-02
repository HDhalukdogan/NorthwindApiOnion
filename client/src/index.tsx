import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/layout/App';
import { Provider } from 'react-redux';
import { store } from './app/store/configureStore';
import { RouterProvider } from 'react-router-dom';
import { router } from './app/router/Routes';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>
  </React.StrictMode>
);

