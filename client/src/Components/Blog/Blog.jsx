import React, {useEffect, useRef, useState} from 'react';
import './blog.scss';
import Tag from "../Tag/Tag.jsx";
import data from '../../posts.json';
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "../Pagination/Pagination.jsx";
import { useTranslation } from "react-i18next";
import { useModal } from '../Modal/ModalContext.jsx';

const Blog = () => {
    const { i18n } = useTranslation();
    const currentLanguage = i18n.language;

    const { t } = useTranslation();

    const blogListRef = useRef(null);

    const { page, category } = useParams();
    const navigate = useNavigate();

    const currentPage = parseInt(page, 10) || 1;
    const [currentRecords, setCurrentRecords] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const recordsPerPage = 9;

    const { openModal } = useModal();
    const handleOpen = () => {
        openModal();
    };

    const getLocalizedValue = (localizedObject) => {
        return localizedObject[currentLanguage] || localizedObject['de'] || '';
    };

    useEffect(() => {
        const fetchRecords = () => {

            const filteredData = category
                ? data.filter((item) => item.category === category)
                : data;

            const indexOfLastRecord = currentPage * recordsPerPage;
            const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
            const newRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);

            setCurrentRecords(newRecords);

            setTotalPages(Math.ceil(filteredData.length / recordsPerPage));
        };

        fetchRecords();
    }, [currentPage, category, recordsPerPage]);

    useEffect(() => {
        if (blogListRef.current) {
            blogListRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        const pagination = document.getElementById('pagination');
        if (pagination) {
            pagination.blur();
        }
    }, [page]);

    const handlePageChange = (pageNumber) => {
        if (category) {
            navigate(`/category/${category}/${pageNumber}`);
        } else {
            navigate(`/${pageNumber}`);
        }
    };

    return (
        <>
        <div>
            {currentRecords?.length >= 1 ?
                <>
                    <div className="blog_list" ref={blogListRef} key={'blog_full'}>
                        {currentRecords.map((record, index) => {
                            const randomMinutes = Math.floor(Math.random() * (29 - 3 + 1)) + 3;

                            return (
                                <div key={index} className="list-item" onClick={handleOpen}>
                                    <div className="image-placeholder">
                                        <img src={record.photo} alt="Blog image"/>
                                    </div>
                                    {record.badge ?
                                        <div className="tags">
                                            <Tag type={record.badge}/>
                                        </div>
                                        :
                                        <></>
                                    }
                                    <div className="details">
                                        <p className="title">{getLocalizedValue(record?.title)}</p>
                                        <p className="description">{getLocalizedValue(record?.description)}</p>
                                        <div className="side">
                                            <p className="time">
                                                Today, {randomMinutes} min ago
                                                <span className="type_find">{getLocalizedValue(record?.looking)}</span>
                                            </p>
                                            <p className="location">{getLocalizedValue(record?.location)}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        handlePageChange={handlePageChange}
                    />
                </>
                :
                <div className="blog_list" key={'blog_empty'}>
                    <h4>{t('record_not_found')}</h4></div>
            }
        </div>

        </>
    );
};

export default Blog;
