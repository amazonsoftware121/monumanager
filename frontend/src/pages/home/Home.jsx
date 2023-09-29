import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import { useState } from "react";
const Home = () => {
    return (
        <>
            <Header />
            <section className="hero-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-12">
                            <div className="text-center mb-5 pb-2">
                                <h1 className="text-white">GranitX</h1>
                                <p className="text-white">Hello.</p>
                                <Link to="login" className="btn custom-btn smoothscroll mt-3">Login</Link>
                            </div> 
                            <div className="owl-carousel owl-theme owl-loaded owl-drag">
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}
export default Home;