import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RegistrationPage } from './pages/RegistrationPage/RegistrationPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { CreateUpdateCoursePage } from './pages/CreateUpdateCoursePage/CreateUpdateCoursePage';
import { FactoryCoursesPage } from './pages/FactoryCoursesPage/FactoryCoursesPage';
import { CreateUpdateTopicPage } from './pages/CreateUpdateTopicPage/CreateUpdateTopicPage';
import { CreateUpdateExamplePage } from './pages/CreateUpdateExamplePage/CreateUpdateExamplePage';
import { CreateUpdateExercisePage } from './pages/CreateUpdateExercisePage/CreateUpdateExercisePage';
import { CoursesPage } from './pages/CoursesPage/CoursesPage';
import { CoursePage } from './pages/CoursePage/CoursePage';
import { TopicPage } from './pages/TopicPage/TopicPage';
import { ExamplePage } from './pages/ExamplePage/ExamplePage';
import { ExercisePage } from './pages/ExercisePage/ExercisePage';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { Toaster } from 'react-hot-toast';

export class App extends React.Component {
  render() {
    return (
      <>
        <Toaster />
        <div className='app__page'>
          <BrowserRouter>
            <Routes>
              <Route path="/registration" element={<RegistrationPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path='/factorycourses' element={<FactoryCoursesPage />} />
              <Route path='/factorycourses/:courseId' element={<CreateUpdateCoursePage />} />
              <Route path='/factorycourses/:courseId/topic/:topicId' element={<CreateUpdateTopicPage />} />
              <Route path='/factorycourses/:courseId/topic/:topicId/example/:exampleId' element={<CreateUpdateExamplePage />} />
              <Route path='/factorycourses/:courseId/topic/:topicId/exercise/:exerciseId' element={<CreateUpdateExercisePage />} />
              <Route path='/courses' element={<CoursesPage />} />
              <Route path='/courses/:courseId' element={<CoursePage />} />
              <Route path='/courses/:courseId/topics/:topicId' element={<TopicPage />} />
              <Route path='/courses/:courseId/topics/:topicId/examples/:exampleId' element={<ExamplePage />} />
              <Route path='/courses/:courseId/topics/:topicId/exercises/:exerciseId' element={<ExercisePage />} />
              <Route path='/userProfile' element={<ProfilePage />} />
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