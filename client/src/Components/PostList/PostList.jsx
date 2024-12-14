import React, {useEffect, useState} from 'react';
import './style.scss'
import default_img from "../../Assets/tip_default_image.png";

import {useParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {useModal} from "../Modal/ModalContext.jsx";

const PostList = () => {
    const { i18n } = useTranslation();
    const { t } = useTranslation();
    const currentLanguage = i18n.language;

    const [uniquePosts, setUniquePosts] = useState([]);
    const { page } = useParams();

    const { openModal } = useModal();

    const [data, setData] = useState(null);
    const basePath = window.location.pathname.split('/').slice(0, -1).join('/') || '/';

    useEffect(() => {
        fetch(`${basePath ? `${basePath}/` : ''}/tipps.json`)
            .then(response => response.json())
            .then(data => setData(data));
    }, []);

    const handleOpen = () => {
        openModal();
    };
    const getLocalizedValue = (localizedObject) => {

        return localizedObject[currentLanguage] || localizedObject['de'] || '';
    };

    useEffect(() => {
        if(data) {
            const randomPosts = [];
            while (randomPosts.length < 3) {
                const randomIndex = Math.floor(Math.random() * data.length);
                const post = data[randomIndex];

                if (!randomPosts.some(p => p?.title === post?.title)) {
                    randomPosts.push(post);
                }
            }
            setUniquePosts(randomPosts);
        }
    }, [page,data]);

    return (
        <div className="post_list">
            <h2>{t('tips')}</h2>
            <div className="post_content">
                {uniquePosts ? uniquePosts.map((post, index) => (
                    <div key={index} className="card" onClick={handleOpen}>
                        <div className="image-placeholder">
                            <img src={post?.photo || default_img} alt={getLocalizedValue(post?.title)}/>
                        </div>
                        <div className="content">
                            <p className="title">{getLocalizedValue(post?.title)}</p>
                            <p className="description">{getLocalizedValue(post?.description)}</p>
                        </div>
                    </div>
                )) : <></>}
            </div>
        </div>
    );
};

export default PostList;