import React, { useEffect, useState } from 'react';
import './ProfilePage.scss';
import { PageHead } from '../../shared/components/PageHead/PageHead';
import { PageContent } from '../../shared/components/PageContent/PageContent';
import { Menu } from '../../shared/components/Menu/Menu';
import { getUser } from '../../shared/api/userProfileApi';
import { getAllCourses } from '../../shared/api/courseApi';
import { BlockProfile } from '../../shared/components/BlockProfile/BlockProfile';
import { Button } from '../../shared/components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { removeToken } from '../../shared/helpers/token';
import { Loader } from '../../shared/components/Loader/Loader';
import toast from 'react-hot-toast';

export function ProfilePage() {
    const [courses, setCourses] = useState();
    const [user, setUser] = useState();
    const [userTopics, setUserTopics] = useState();
    const [isLoaded, setIsLoader] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        loadInformation();
    }, [])

    async function loadInformation() {
        setIsLoader(true);

        try {
            const user = await getUser(localStorage.getItem("userName"));
            setUser(user.data);

            const filteredUserTopics = user.data.userTopics.filter(userTopic => userTopic.completedExercises.length !== 0);
            setUserTopics(filteredUserTopics);

            const courses = await getAllCourses();
            setCourses(courses.data);
        } catch (error) {
            toast.error("Ошибка сервера");
        }
        finally {
            setIsLoader(false);
        }
    }

    async function logout() {
        removeToken();
        navigate(`/login`);
    }

    return (
        <>
            <PageHead></PageHead>
            <Menu></Menu>
            <PageContent>
                {
                    <div className='profilePage'>
                        <div className='profilePage__courses'>
                            {userTopics && courses && userTopics.map(userTopic =>
                                <BlockProfile key={userTopic._id} title={courses.find(course => course._id.toString() === userTopic.courseId).title} engTitle={courses.find(course => course._id.toString() === userTopic.courseId).englishTitle} completed={`${userTopic.completedExercises.length}/${userTopic.countOfAllExercises}`} completedAll={userTopic.completedExercises.length === userTopic.countOfAllExercises} />
                            )}
                        </div>

                        <div className='profilePage__logout'>
                            <Button value="Выход" onClick={() => logout()} />
                        </div>
                    </div>
                }
            </PageContent>
            <Loader show={isLoaded} />
        </>
    );
}