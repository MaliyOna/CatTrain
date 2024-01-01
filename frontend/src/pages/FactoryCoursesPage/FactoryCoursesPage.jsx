import React, { useEffect, useState } from 'react';
import './FactoryCoursesPage.scss';
import { PageHead } from '../../shared/components/PageHead/PageHead';
import { PageContent } from '../../shared/components/PageContent/PageContent';
import { Menu } from '../../shared/components/Menu/Menu';
import { Input } from '../../shared/components/Input/Input';
import { Button } from '../../shared/components/Button/Button';
import { PopupWindow } from '../../shared/components/PopupWindow/PopupWindow';
import { Dropdown } from '../../shared/components/Dropdown/Dropdown';
import { createCourse, getAllCourses } from '../../shared/api/courseApi';
import { BlockCourse } from '../../shared/components/BlockCourse/BlockCourse';
import { Loader } from '../../shared/components/Loader/Loader';
import toast from 'react-hot-toast';

export function FactoryCoursesPage() {
    const [findTitle, setFindTitle] = useState("");
    const [showCreateCourse, setShowCreateCourse] = useState(false);
    const progLanguages = [{ value: "html" }, { value: "css" }];

    const [progLanguage, setProgLanguage] = useState(progLanguages[0].value);
    const [newTitle, setNewTitle] = useState("");
    const [englishTitle, setEnglishTitle] = useState("");
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

    function handleLanguageSelected(value) {
        setProgLanguage(value);
    }

    async function loadGetAllCourses() {
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

    async function createCourseClick() {
        try {
            setIsLoader(true);

            await createCourse(newTitle, progLanguage, englishTitle);
            await loadGetAllCourses();
            setShowCreateCourse(false);
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
                <div className='factoryCoursesPage'>
                    <div className='factoryCoursesPage__find'>
                        <div className='factoryCoursesPage__find__input'>
                            <Input
                                type="text"
                                border="border"
                                value={findTitle}
                                onChange={(event) => setFindTitle(event.target.value)}
                                name="newLogin" />
                        </div>
                        <div className='factoryCoursesPage__find__buttonFind'>
                            <Button onClick={() => findByName()} value='Найти' />
                        </div>
                        <div className='factoryCoursesPage__find__buttonCreate'>
                            <Button onClick={() => setShowCreateCourse(true)} value='Создать' />
                        </div>
                    </div>
                    <div className='factoryCoursesPage__result'>
                        {filterCourses && filterCourses.map(x =>
                            <BlockCourse key={x._id} navigate={`/factorycourses/${x._id}`} title={x.title} level={x.level} progLanguage={x.progLanguage} />
                        )}
                    </div>
                </div>
            </PageContent>

            <PopupWindow title="Добавить курс" open={showCreateCourse}>
                <div className='factoryCoursesPage__popupWindow__input'>
                    <Input
                        label="Введите название курса"
                        type="text"
                        border="border"
                        value={newTitle}
                        onChange={(event) => setNewTitle(event.target.value)}
                        name="title" />
                </div>

                <div className='factoryCoursesPage__popupWindow__input__eng'>
                    <Input
                        label="Введите название курса на английском"
                        type="text"
                        border="border"
                        value={englishTitle}
                        onChange={(event) => setEnglishTitle(event.target.value)}
                        name="englishTitle" />
                </div>

                <div className='factoryCoursesPage__popupWindow__dropdown'>
                    <Dropdown
                        options={progLanguages.map(x => ({ value: x.value, text: x.value }))}
                        onSelected={handleLanguageSelected}
                        value={progLanguage}
                        label="Выберите язык" />
                </div>

                <Button onClick={() => createCourseClick(false)} value='Создать' />
                <Button onClick={() => setShowCreateCourse(false)} color='red' value='Отмена' />
            </PopupWindow>

            <Loader show={isLoaded} />
        </>
    );
}