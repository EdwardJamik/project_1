import React, { createContext, useState, useContext } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [isActive, setIsActive] = useState(false);

    const openModal = () => {
        setIsActive(true);
    };

    const closeModal = () => {
        setIsActive(false);
    };

    return (
        <ModalContext.Provider value={{ isActive, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
};

export const useModal = () => useContext(ModalContext);
