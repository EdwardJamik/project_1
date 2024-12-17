import React, { Suspense, lazy } from 'react';
import {Route, Routes} from "react-router-dom";
import {ModalProvider} from "./Components/Modal/ModalContext.jsx";
import Home from "./Home.jsx";
import Modal from "./Components/Modal/Modal.jsx";


function App() {

    // const searchParams = new URLSearchParams(location.search);
    //
    // let parameters = Array.from(searchParams.entries())
    //     .filter(([key]) => !['tag', 'monat', 'jahr', 'nick', 'clientIP', 'pass'].includes(key))
    //     .map(([key, value]) => {
    //         if (key === 'parameter[]') {
    //             const [subkey, subvalue] = value.split('|');
    //             return { key: subkey, value: subvalue }; // Розбиваємо на підключі та значення
    //         }
    //         return { key, value };
    //     });
    //
    // const parsedParams = parameters.map(param => `${param.key}|${param.value}`);
    //
    // let data = {
    //     "parameter[]": parsedParams,
    //     ...Object.fromEntries(
    //         Array.from(searchParams.entries())
    //             .filter(([key]) => key !== 'tag' && key !== 'monat' && key !== 'jahr' && key !== 'nick' && key !== 'clientIP' && key !== 'pass')
    //     )
    // };
    //
    // console.log(data)

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
