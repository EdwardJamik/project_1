import React, { useEffect, useState } from 'react';
import './blog.scss';
import Tag from "../Tag/Tag.jsx";
import data from '../../posts.json';
import { useNavigate, useParams } from "react-router-dom";
import Pagination from "../Pagination/Pagination.jsx";
import { useTranslation } from "react-i18next";

const Blog = () => {
    const { i18n } = useTranslation();
    const currentLanguage = i18n.language;
    const { t } = useTranslation();
    const { page, category } = useParams();
    const navigate = useNavigate();

    const currentPage = parseInt(page, 10) || 1;
    const [currentRecords, setCurrentRecords] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const recordsPerPage = 9;

    const getLocalizedValue = (localizedObject) => {
        return localizedObject[currentLanguage] || localizedObject['de'] || '';
    };

    useEffect(() => {
        const fetchRecords = () => {
            // Фільтруємо за категорією, якщо вона вказана
            const filteredData = category
                ? data.filter((item) => item.category === category)
                : data;

            // Пагінація
            const indexOfLastRecord = currentPage * recordsPerPage;
            const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
            const newRecords = filteredData.slice(indexOfFirstRecord, indexOfLastRecord);

            // Оновлюємо відображувані записи
            setCurrentRecords(newRecords);

            // Оновлюємо кількість сторінок
            setTotalPages(Math.ceil(filteredData.length / recordsPerPage));
        };

        fetchRecords();
    }, [currentPage, category, recordsPerPage]);

    useEffect(() => {
        window.scrollTo(0, 0);
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
        <div>


            {currentRecords?.length >= 1 ?
                <>
                    <div className="blog_list">
                        {currentRecords.map((record) => (
                            <div key={record.id} className="list-item">
                                <div className="image-placeholder">
                                    <img src={record.photo} alt="Blog image"/>
                                </div>
                                <div className="tags">
                                    <Tag type={record.badge}/>
                                </div>
                                <div className="details">
                                    <p className="title">{getLocalizedValue(record.title)}</p>
                                    <p className="description">{getLocalizedValue(record.description)}</p>
                                    <div className="side">
                                        <p className="time">
                                            {getLocalizedValue(record.time)} <span
                                            className="type_find">{getLocalizedValue(record.looking)}</span>
                                        </p>
                                        <p className="location">{getLocalizedValue(record.location)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Pagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        handlePageChange={handlePageChange}
                    />
                </>
                :
                <div className="blog_list">
                    <h4>{t('record_not_found')}</h4></div>
            }

        </div>
    );
};

export default Blog;
