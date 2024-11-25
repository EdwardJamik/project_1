import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import './blog.scss';
import Tag from "../Tag/Tag.jsx";
import rawData from '../../posts.json';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Pagination from "../Pagination/Pagination.jsx";
import { useTranslation } from "react-i18next";
import { useModal } from '../Modal/ModalContext.jsx';

const Blog = () => {
    const { i18n, t } = useTranslation();
    const currentLanguage = i18n.language;

    const blogListRef = useRef(null);

    const { page, category } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const currentPage = parseInt(page, 10) || 1;
    const [currentRecords, setCurrentRecords] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const recordsPerPage = 9;

    const { openModal } = useModal();
    const handleOpen = useCallback(() => {
        openModal();
    }, [openModal]);

    const getLocalizedValue = useCallback((localizedObject) => {
        if (!localizedObject) return '';
        return localizedObject[currentLanguage] || localizedObject['de'] || '';
    }, [currentLanguage]);

    const processedData = useMemo(() => {
        const filteredData = category
            ? rawData.filter((item) => item.category === category)
            : rawData;

        if (filteredData.length === 0) return [];

        const totalRecordsNeeded = 100 * recordsPerPage;

        let extendedData = [...filteredData];
        while (extendedData.length < totalRecordsNeeded) {
            const randomIndex = Math.floor(Math.random() * filteredData.length);
            extendedData.push(filteredData[randomIndex]);
        }

        return extendedData;
    }, [category, recordsPerPage]);

    useEffect(() => {
        const indexOfLastRecord = currentPage * recordsPerPage;
        const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
        const newRecords = processedData.slice(indexOfFirstRecord, indexOfLastRecord);

        setCurrentRecords(newRecords);
        setTotalPages(processedData.length > 0 ? 100 : 1);
    }, [currentPage, processedData, recordsPerPage]);

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

    const handlePageChange = useCallback((pageNumber) => {
        if (category) {
            navigate(`/category/${category}/${pageNumber}${location?.search ? location?.search : ''}`);
        } else {
            navigate(`/${pageNumber}${location?.search ? location?.search : ''}`);
        }
    }, [category, location, navigate]);

    const BlogItems = useMemo(() => {
        return currentRecords.map((record, index) => {
            if (!record) return null;

            const randomMinutes = Math.floor(Math.random() * (29 - 3 + 1)) + 3;

            return (
                <div key={index} className="list-item" onClick={handleOpen}>
                    <div className="image-placeholder">
                        <img
                            src={record?.photo || ''}
                            alt="Blog image"
                            loading="lazy"
                        />
                    </div>
                    {record?.badge && (
                        <div className="tags">
                            <Tag type={record?.badge}/>
                        </div>
                    )}
                    <div className="details">
                        <p className="title">
                            {getLocalizedValue(record?.title || {})}
                        </p>
                        <p className="description">
                            {getLocalizedValue(record?.description || {})}
                        </p>
                        <div className="side">
                            <p className="time">
                                Today, {randomMinutes} min ago
                                <span className="type_find">
                                    {getLocalizedValue(record?.looking || {})}
                                </span>
                            </p>
                            <p className="location">
                                {getLocalizedValue(record?.location || {})}
                            </p>
                        </div>
                    </div>
                </div>
            );
        }).filter(Boolean);
    }, [currentRecords, handleOpen, getLocalizedValue]);

    return (
        <div>
            {currentRecords.length > 0 ? (
                <>
                    <div className="blog_list" ref={blogListRef} key={'blog_full'}>
                        {BlogItems}
                    </div>
                    <Pagination
                        totalPages={Math.max(100, totalPages)}
                        currentPage={currentPage}
                        handlePageChange={handlePageChange}
                    />
                </>
            ) : (
                <div className="blog_list" key={'blog_empty'}>
                    <h4>{t('record_not_found')}</h4>
                </div>
            )}
        </div>
    );
};

export default React.memo(Blog);