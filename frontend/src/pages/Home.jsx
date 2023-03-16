import { Link } from "react-router-dom";
import Header from "../components/Header";
const Home = () => {
  return (
    <>
    <Header />
    <section class="hero-section">
            <div class="container">
                <div class="row">

                    <div class="col-lg-12 col-12">
                        <div class="text-center mb-5 pb-2">
                            <h1 class="text-white">Monument Manager</h1>

                            <p class="text-white">Lorem Ipsum is simply dummy text of the printing.

</p>

                            <Link to="login" className="btn custom-btn smoothscroll mt-3">Login</Link>
                        </div>

                        <div class="owl-carousel owl-theme owl-loaded owl-drag">
                            

                            

                            

                            

                            

                            
                       
                    </div>
                    </div>

                </div>
            </div>
        </section>
    </>
  )
}
export default Home;