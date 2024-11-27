import React, { Suspense, lazy } from 'react';
import {Route, Routes} from "react-router-dom";
import {ModalProvider} from "./Components/Modal/ModalContext.jsx";
import Home from "./Home.jsx";
import Modal from "./Components/Modal/Modal.jsx";


function App() {
    return (
        <ModalProvider>
            <Suspense fallback={<div></div>}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/:page" element={<Home />} />
                    <Route path="/category/:category" element={<Home />} />
                    <Route path="/category/:category/:page" element={<Home />} />
                </Routes>
            </Suspense>
            <Modal />
        </ModalProvider>
    );
}

export default App
