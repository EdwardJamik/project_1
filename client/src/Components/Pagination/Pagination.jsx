import React, {useEffect, useState} from 'react';
import './pagination.scss';
import {useTranslation} from "react-i18next";

const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
    const { t } = useTranslation();

    const [maxOffset, setMaxOffset] = useState(4);

    useEffect(() => {
        const updateOffset = () => {
            setMaxOffset(window.innerWidth < 768 ? 1 : 4);
        };

        updateOffset();
        window.addEventListener('resize', updateOffset);

        return () => window.removeEventListener('resize', updateOffset);
    }, []);

    const renderPagination = () => {
        const pages = [];

        pages.push(
            <button
                key="1"
                onClick={() => handlePageChange(1)}
                className={currentPage === 1 ? 'active' : ''}
            >
                1
            </button>
        );

        if (currentPage > 4) {
            pages.push(
                <button
                    key="dots-left"
                    disabled
                    className="dots"
                >
                    ...
                </button>
            );
        }

        for (let i = Math.max(2, currentPage - maxOffset); i <= Math.min(totalPages - 1, currentPage + maxOffset); i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={currentPage === i ? 'active' : ''}
                >
                    {i}
                </button>
            );
        }

        if (currentPage < totalPages - 3) {
            pages.push(
                <button
                    key="dots-right"
                    disabled
                    className="dots"
                >
                    ...
                </button>
            );
        }

        if (totalPages > 1) {
            pages.push(
                <button
                    key={totalPages}
                    onClick={() => handlePageChange(totalPages)}
                    className={currentPage === totalPages ? 'active' : ''}
                >
                    {totalPages}
                </button>
            );
        }

        return pages;
    };

    return (
        <div className="pagination">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={'prev'}
            >
                {t('back_page')}
            </button>
            {renderPagination()}
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={'next'}
            >
                {t('next_page')}
            </button>
        </div>
    );
};


export default Pagination;
