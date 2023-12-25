import React, { useEffect, useState } from 'react';
import './CoursesPage.scss';
import { PageHead } from '../../shared/components/PageHead/PageHead';
import { PageContent } from '../../shared/components/PageContent/PageContent';
import { Menu } from '../../shared/components/Menu/Menu';
import { Input } from '../../shared/components/Input/Input';
import { Button } from '../../shared/components/Button/Button';
import { PopupWindow } from '../../shared/components/PopupWindow/PopupWindow';
import { Dropdown } from '../../shared/components/Dropdown/Dropdown';
import { createCourse, getAllCourses } from '../../shared/api/courseApi';
import { Block } from '../../shared/components/Block/Block';

export function CoursesPage() {
    const [findTitle, setFindTitle] = useState("");
    const [showCreateCourse, setShowCreateCourse] = useState(false);
    const progLanguages = [{ value: "html" }, { value: "css" }, { value: "javaScript" }];

    const [progLanguage, setProgLanguage] = useState(progLanguages[0].value);
    const [newTitle, setNewTitle] = useState("");

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        loadGetAllCourses();
    }, [])

    function findByName() {

    }

    function handleLanguageSelected(value) {
        setProgLanguage(value);
    }

    const loadGetAllCourses = async() => {
        const data = await getAllCourses();
        console.log(data.data);
        setCourses(data.data);
    }

    const createCourseClick = async() => {
        await createCourse(newTitle, progLanguage);
        loadGetAllCourses();
        setShowCreateCourse(false);
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
                        <div className='coursesPage__find__buttonCreate'>
                            <Button onClick={() => setShowCreateCourse(true)} value='Создать' />
                        </div>
                    </div>
                    <div className='coursesPage__filter'>2</div>
                    <div className='coursesPage__result'>
                        {courses && courses.map(x => 
                            <Block key={x._id} type="course" title={x.title} level={x.level} progLanguage={x.progLanguage}/>
                        )}
                    </div>
                </div>
            </PageContent>

            <PopupWindow title="Добавить курс" open={showCreateCourse}>
                <div className='coursesPage__popupWindow__input'>
                    <Input
                        label="Введите название курса"
                        type="text"
                        border="border"
                        value={newTitle}
                        onChange={(event) => setNewTitle(event.target.value)}
                        name="newLogin" />
                </div>

                <div className='coursesPage__popupWindow__dropdown'>
                <Dropdown
                    options={progLanguages.map(x => ({ value: x.value, text: x.value }))}
                    onSelected={handleLanguageSelected}
                    value={progLanguage}
                    label="Выберите язык" />
                </div>

                <Button onClick={() => createCourseClick(false)} value='Создать' />
                <Button onClick={() => setShowCreateCourse(false)} color='red' value='Отмена' />
            </PopupWindow>
        </>
    );
}