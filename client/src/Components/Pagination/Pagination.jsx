import React, { useEffect, useState } from 'react';
import './pagination.scss';
import { useTranslation } from 'react-i18next';

const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
    const { t } = useTranslation();

    const [maxOffset, setMaxOffset] = useState(4);
    const [randomPages, setRandomPages] = useState([]);

    useEffect(() => {
        const updateOffset = () => {
            setMaxOffset(window.innerWidth < 768 ? 1 : 4);
        };

        updateOffset(); // Перевірка при завантаженні
        window.addEventListener('resize', updateOffset); // Перевірка при зміні розміру

        return () => window.removeEventListener('resize', updateOffset);
    }, []);

    useEffect(() => {
        // Генерація випадкових сторінок, якщо вони більше 1
        if (totalPages > 1) {
            let pages = [];
            // Генеруємо випадкові сторінки для демонстрації
            for (let i = 2; i <= totalPages - 1; i++) {
                if (Math.random() > 0.5) { // 50% шанс для кожної сторінки бути виведеною
                    pages.push(i);
                }
            }
            setRandomPages([1, ...pages, totalPages]); // Додаємо першу і останню сторінки
        }
    }, [totalPages]);

    const renderPagination = () => {
        const pages = [];

        // Перша сторінка
        pages.push(
            <button
                key="1"
                onClick={() => handlePageChange(1)}
                className={currentPage === 1 ? 'active' : ''}
            >
                1
            </button>
        );

        // Якщо потрібно, додаємо "..."
        if (currentPage > 4) {
            pages.push(
                <button key="dots-left" disabled className="dots">
                    ...
                </button>
            );
        }

        // Виводимо сторінки
        randomPages.forEach(page => {
            if (page !== currentPage) {
                pages.push(
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={currentPage === page ? 'active' : ''}
                    >
                        {page}
                    </button>
                );
            }
        });

        // Якщо потрібно, додаємо "..."
        if (currentPage < totalPages - 3) {
            pages.push(
                <button key="dots-right" disabled className="dots">
                    ...
                </button>
            );
        }

        // Остання сторінка
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
