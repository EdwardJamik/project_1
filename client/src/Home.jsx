import React from 'react';
import Header from "./Components/Header/Header.jsx";
import TopSlider from "./Components/Slider/TopSlider.jsx";
import Blog from "./Components/Blog/Blog.jsx";
import PostList from "./Components/PostList/PostList.jsx";
import Category from "./Components/Category/Category.jsx";

const Home = () => {
    return (
        <>
            <Header/>
            <div className="container">
                <div className="content">
                    <aside className="sidebar">
                        <Category/>
                    {/*    <div className="age-warning">*/}
                    {/*        <span>18+</span>*/}
                    {/*    </div>*/}
                    {/*    <div className="practices">*/}
                    {/*        <h2>Praktiken</h2>*/}
                    {/*        <ul className="menu-list">*/}
                    {/*            {['Vaginalverkehr', 'Analverkehr', 'Oralverkehr'].map((item, index) => (*/}
                    {/*                <li key={index} className="menu-item">*/}
                    {/*                    <span>{item}</span>*/}
                    {/*                </li>*/}
                    {/*            ))}*/}
                    {/*        </ul>*/}
                    {/*    </div>*/}
                    </aside>

                    <main className="main-content">

                        <section>
                            <TopSlider/>
                        </section>

                        <section>
                            <Blog/>
                        </section>

                        <section>
                            <PostList/>
                        </section>
                    </main>
                </div>
            </div>
        </>
    );
};

export default Home;