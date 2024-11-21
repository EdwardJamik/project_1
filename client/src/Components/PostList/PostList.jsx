import React, {useEffect, useState} from 'react';
import './style.scss'
import default_img from "../../Assets/tip_default_image.png";
import data from '../../tipps.json';
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
    const handleOpen = () => {
        openModal();
    };
    const getLocalizedValue = (localizedObject) => {

        return localizedObject[currentLanguage] || localizedObject['de'] || '';
    };

    useEffect(() => {

        const randomPosts = [];
        while (randomPosts.length < 3) {
            const randomIndex = Math.floor(Math.random() * data.length);
            const post = data[randomIndex];

            if (!randomPosts.some(p => p?.title === post?.title)) {
                randomPosts.push(post);
            }
        }
        setUniquePosts(randomPosts);
    }, [page]);

    return (
        <div className="post_list">
            <h2>{t('tips')}</h2>
            <div className="post_content">
                {uniquePosts.map((post, index) => (
                    <div key={index} className="card" onClick={handleOpen}>
                        <div className="image-placeholder">
                            <img src={post?.image || default_img} alt={getLocalizedValue(post?.title)}/>
                        </div>
                        <div className="content">
                            <p className="title">{getLocalizedValue(post?.title)}</p>
                            <p className="description">{getLocalizedValue(post?.description)}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostList;