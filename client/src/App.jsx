import {Route, Routes} from "react-router-dom";
import Home from "./Home.jsx";
import {ModalProvider} from "./Components/Modal/ModalContext.jsx";
import Modal from "./Components/Modal/Modal.jsx";

function App() {
    return (
        <ModalProvider>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:page" element={<Home />} />
                <Route path="/category/:category" element={<Home />} />
                <Route path="/category/:category/:page" element={<Home />} />
            </Routes>
            <Modal/>
        </ModalProvider>
    )
}

export default App
