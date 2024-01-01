import React, { useEffect, useState } from 'react';
import './CoursesPage.scss';
import { PageHead } from '../../shared/components/PageHead/PageHead';
import { PageContent } from '../../shared/components/PageContent/PageContent';
import { Menu } from '../../shared/components/Menu/Menu';
import { Input } from '../../shared/components/Input/Input';
import { Button } from '../../shared/components/Button/Button';
import { getAllCourses } from '../../shared/api/courseApi';
import { BlockCourse } from '../../shared/components/BlockCourse/BlockCourse';
import { Loader } from '../../shared/components/Loader/Loader';
import toast from 'react-hot-toast';

export function CoursesPage() {
    const [findTitle, setFindTitle] = useState("");

    const [isLoaded, setIsLoader] = useState(false);

    const [courses, setCourses] = useState([]);
    const [filterCourses, setFilterCourses] = useState([]);

    useEffect(() => {
        loadGetAllCourses();
    }, [])

    function findByName() {
        setIsLoader(true);

        const searchTerm = findTitle.toLowerCase();

        const filteredCourses = courses.filter(course =>
          course.title.toLowerCase().includes(searchTerm)
        );
      
        setFilterCourses(filteredCourses);
        setIsLoader(false);
    }

    const loadGetAllCourses = async() => {
        try {
            setIsLoader(true);

            const data = await getAllCourses();
            setCourses(data.data);
            setFilterCourses(data.data);
        } catch (error) {
            toast.error("Ошибка сервера");
        }
        finally {
            setIsLoader(false);
        }

    }

    return (
        <>
            <PageHead></PageHead>
            <Menu></Menu>
            <PageContent>
                <div className='coursesPage'>
                    <div className='coursesPage__find'>
                        <div className='coursesPage__find__input'>
                            <Input
                                type="text"
                                border="border"
                                value={findTitle}
                                onChange={(event) => setFindTitle(event.target.value)}
                                name="newLogin" />
                        </div>
                        <div className='coursesPage__find__buttonFind'>
                            <Button onClick={() => findByName()} value='Найти' />
                        </div>
                    </div>
                    <div className='coursesPage__result'>
                        {filterCourses && filterCourses.map(x => 
                            <BlockCourse key={x._id} navigate={`/courses/${x._id}`} title={x.title} level={x.level} progLanguage={x.progLanguage}/>
                        )}
                    </div>
                </div>
            </PageContent>

            <Loader show={isLoaded} />
        </>
    );
}