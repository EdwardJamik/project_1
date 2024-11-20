import {Route, Routes} from "react-router-dom";
import Home from "./Home.jsx";

function App() {
    return (
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:page" element={<Home />} />
                <Route path="/category/:category" element={<Home />} />
                <Route path="/category/:category/:page" element={<Home />} />
            </Routes>
    )
}

export default App
