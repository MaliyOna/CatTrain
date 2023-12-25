import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RegistrationPage } from './pages/RegistrationPage/RegistrationPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { MainPage } from './pages/MainPage/MainPage';
import { CreateUpdateCoursePage } from './pages/CreateUpdateCoursePage/CreateUpdateCoursePage';
import { CoursesPage } from './pages/CoursesPage/CoursesPage';

export class App extends React.Component {
  render() {
    return (
      <>
        <div className='app__page'>
          <BrowserRouter>
            <Routes>
              <Route path="/registration" element={<RegistrationPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path='/mainpage' element={<MainPage/>} />
              <Route path='/courses' element={<CoursesPage/>} />
              <Route path='/courses/:courseId' element={<CreateUpdateCoursePage/>} />
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