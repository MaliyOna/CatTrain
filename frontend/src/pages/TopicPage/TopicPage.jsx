import React, { useEffect, useState } from 'react';
import './TopicPage.scss';
import { PageHead } from '../../shared/components/PageHead/PageHead';
import { PageContent } from '../../shared/components/PageContent/PageContent';
import { Menu } from '../../shared/components/Menu/Menu';
import { checkOrAddConnectionTopic } from '../../shared/api/courseApi';
import { useParams } from 'react-router-dom';
import { EditorState, convertFromRaw } from 'draft-js';
import { EditorBlock } from '../../shared/components/EditorBlock/EditorBlock';
import { Block } from '../../shared/components/Block/Block';
import { getTopicById } from '../../shared/api/topicApi';

export function TopicPage() {
    const [topic, setTopic] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [editorDescription, setEditorDescription] = useState();
    const [examples, setExamples] = useState(null);
    const [exercises, setExercises] = useState(null);
    const params = useParams();

    useEffect(() => {
        loadCourseInformation();
        checkConnection();

    }, [])

    async function checkConnection() {
        await checkOrAddConnectionTopic(params.courseId, params.topicId, localStorage.getItem("userName"));
    }

    const loadCourseInformation = async () => {
        const topicId = params.topicId;
        const data = await getTopicById(topicId);
        console.log(data.data);
        setTopic(data.data);
        setTitle(data.data.title);
        setDescription(data.data.description);
        setExamples(data.data.examples);
        setExercises(data.data.exercises);
        const descriptionData = data.data.description;
        loadDescriptionEditor(descriptionData);
    }

    async function loadDescriptionEditor(descriptionData) {
        if (descriptionData) {
            const content = convertFromRaw(JSON.parse(descriptionData));

            const state = EditorState.createWithContent(content);
            setEditorDescription(state);
        }
        else {
            setEditorDescription(EditorState.createEmpty());
        }
    }

    return (
        <>
            <PageHead></PageHead>
            <Menu></Menu>
            <PageContent>
                {topic &&
                    <div className='topicPage'>
                        <div className='topicPage__title'>Название: {title}</div>
                        <div className='topicPage__description'>
                            <EditorBlock editorState={editorDescription} />
                        </div>

                        <div className='topicPage__examples'>
                            <div className='topicPage__examples__title'>Примеры</div>
                            {examples && examples.map(example =>
                                <Block key={example._id} navigate={`/courses/${params.courseId}/topics/${params.topicId}/examples/${example._id}`} title={example.title} />
                            )}
                        </div>

                        <div className='topicPage__exercises'>
                            <div className='topicPage__examples__title'>Упражнения</div>
                            {exercises && exercises.map(exercise =>
                                <Block key={exercise._id} navigate={`/courses/${params.courseId}/topics/${params.topicId}/exercises/${exercise._id}`} title={exercise.title} />
                            )}
                        </div>
                    </div>
                }
            </PageContent>
        </>
    );
}