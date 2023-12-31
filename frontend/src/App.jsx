import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RegistrationPage } from './pages/RegistrationPage/RegistrationPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { MainPage } from './pages/MainPage/MainPage';
import { CreateUpdateCoursePage } from './pages/CreateUpdateCoursePage/CreateUpdateCoursePage';
import { FactoryCoursesPage } from './pages/FactoryCoursesPage/FactoryCoursesPage';
import { CreateUpdateTopicPage } from './pages/CreateUpdateTopicPage/CreateUpdateTopicPage';
import { CreateUpdateExamplePage } from './pages/CreateUpdateExamplePage/CreateUpdateExamplePage';
import { CreateUpdateExercisePage } from './pages/CreateUpdateExercisePage/CreateUpdateExercisePage';
import { CoursesPage } from './pages/CoursesPage/CoursesPage';
import { CoursePage } from './pages/CoursePage/CoursePage';

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
              <Route path='/factorycourses' element={<FactoryCoursesPage/>} />
              <Route path='/factorycourses/:courseId' element={<CreateUpdateCoursePage/>} />
              <Route path='/factorycourses/:courseId/topic/:topicId' element={<CreateUpdateTopicPage/>} />
              <Route path='/factorycourses/:courseId/topic/:topicId/example/:exampleId' element={<CreateUpdateExamplePage/>} />
              <Route path='/factorycourses/:courseId/topic/:topicId/exercise/:exerciseId' element={<CreateUpdateExercisePage/>} />
              <Route path='/courses' element={<CoursesPage/>} />
              <Route path='/courses/:courseId' element={<CoursePage/>} />
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