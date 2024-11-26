import React, {lazy} from 'react';
const Header = lazy(() => import('./Components/Header/Header.jsx'));
const TopSlider = lazy(() => import('./Components/Slider/TopSlider.jsx'));
const Blog = lazy(() => import('./Components/Blog/Blog.jsx'));
const PostList = lazy(() => import('./Components/PostList/PostList.jsx'));
const Category = lazy(() => import('./Components/Category/Category.jsx'));
const Footer = lazy(() => import('./Components/Footer/Footer.jsx'));

const ScrollButton = lazy(() => import('./Components/ScrollButton/ScrollButton.jsx'));

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
            <Footer/>
            <ScrollButton/>
        </>
    );
};

export default Home;