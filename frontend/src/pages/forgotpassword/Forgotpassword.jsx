import React, { useState } from "react";
import Header from "../../components/header/Header";
import PageHeader from "../../components/PageHeader";
import { makeRequest } from "../../axios";

const formWrapper = {
    width: "330px"
}

const Forgotpassword = () => {
    const [email, setEmail] = useState("");

    const handleClick = async (e) => {
        e.preventDefault();
        try {
            const response = await makeRequest.post("/auth/send-reset-email", {email:email});
                alert('Reset email sent');
        } catch (error) {
            console.error('Error sending reset email:', error);
            alert('Error sending reset email');
        }
    }


    console.log(email);
    return (
        <>
            <Header />
            <PageHeader title="Forgot Password" />
            <div className="container mt-5">
                <div className="loginPage d-flex aligns-items-center justify-content-center">

                    <div className="formWrapper" style={formWrapper}>

                        <form>
                            <label htmlFor="email">Enter your Email: </label>
                            <input type="email" id="email" className="form-control mt-2" onChange={(e) => setEmail(e.target.value)} />
                            <input type="submit" value={"Submit"} className="btn btn-primary mt-3" onClick={handleClick} />
                        </form>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Forgotpassword;