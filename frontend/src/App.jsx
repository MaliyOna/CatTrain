import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RegistrationPage } from './pages/RegistrationPage/RegistrationPage';

export class App extends React.Component {
  render() {
    return (
      <>
        <div className='app__page'>
          <BrowserRouter>
            <Routes>
              <Route path="/registration" element={<RegistrationPage />} />
              <Route
                path="*"
                element={<Navigate to="/registration" />}
              />
            </Routes>
          </BrowserRouter>
        </div>
      </>
    );
  }
}