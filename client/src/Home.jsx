import React, {useState} from 'react';
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

                        <Category/>

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