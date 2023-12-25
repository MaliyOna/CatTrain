import React, { useEffect, useState } from 'react';
import './CreateUpdateCoursePage.scss';
import { PageHead } from '../../shared/components/PageHead/PageHead';
import { PageContent } from '../../shared/components/PageContent/PageContent';
import { Menu } from '../../shared/components/Menu/Menu';
import { Input } from '../../shared/components/Input/Input';
import { getCourseById } from '../../shared/api/courseApi';
import { useParams } from 'react-router-dom';

export function CreateUpdateCoursePage() {
    const[title, setTitle] = useState("");
    const [editorState, setEditorState] = useState(null);
    const [course, setCourse] = useState(null);
    const params = useParams();

    useEffect(() => {
        loadCourseInformation();
    }, [])

    const loadCourseInformation = async () => {
        const courseId = params.courseId;
        const data = await getCourseById(courseId);
        console.log(data.data);
        setCourse(data.data);
        setTitle(data.data.title);
    }

    return (
        <>
            <PageHead></PageHead>
            <Menu></Menu>
            <PageContent>
                {course && <div className='createCoursePage'>
                    <div className='createCoursePage__title'>
                        <div className='createCoursePage__title__name'>Название курса: </div>
                        <div className='createCoursePage__title__input'>
                        <Input
                            type="text"
                            border="border"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                            name="newLogin"
                            rules={{ required: "Required field" }} />
                        </div>
                    </div>
                    <div className='createCoursePage__description'>
                        <div className='createCoursePage__description__name'>Описание: </div>

                    </div>
                    <div className='createCoursePage__level'></div>
                    <div className='createCoursePage__language'></div>
                    <div className='createCoursePage__progLanguage'></div>
                    <div className='createCoursePage__topics'></div>
                </div>}
            </PageContent>
        </>
    );
}