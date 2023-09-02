import React from 'react';
import { createRoot } from 'react-dom/client'; // Importa createRoot desde react-dom/client
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './context/user/UserProvider.jsx';
import { ReservationProvider } from './context/reservation/ReservationProvider.jsx';
import App from './App.jsx';

const rootElement = document.getElementById('root');

const app = (
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ReservationProvider>
          <App />
        </ReservationProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// Utiliza createRoot desde react-dom/client
const root = createRoot(rootElement);
root.render(app);
