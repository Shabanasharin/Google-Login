
import React, { useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function LoginPage() {

    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const [userInputs, setUserInputs] = useState({ email: "", password: "" })
    console.log(userInputs);


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = (e) => {
        e.preventDefault()

        const emailRegex = /\b[A-Za-z0-9._%+-]+@gmail\.com\b/;
        const minLength = 8;

        if (userInputs.email && userInputs.password) {
            if (!emailRegex.test(userInputs.email)) {
                toast.warning("Enter a valid Gmail address.");
                return;
            }

            if (userInputs.password.length < minLength) {
                toast.warning("Password must be at least 8 characters long.");
                return;

            }
            // sessionStorage.setItem('userEmail', userInputs.email);
            setTimeout(() => {
                navigate('/dash')
            }, 2000)
            setUserInputs({ email: '', password: '' });

        }
        else {
            toast.warning("Please fill form Completely")
        }
    }

    return (
        <>
        <div className='text-center ' ><h2>Log in</h2></div>
           <div className='d-flex align-items-center justify-content-center ' >

                <div className='mb-5' id='brdr'  style={{ height: '550px', width:'60%' }}>
                    <div className="row ">
                    <div className="col-lg-5">
                            {/* <img src="https://cdni.iconscout.com/illustration/premium/thumb/login-3305943-2757111.https://cdni.iconscout.com/illustration/premium/thumb/user-loghttps://https://chttps://cdni.iconscout.com/illustration/premium/thumb/login-security-7467180-6110966.pngdni.iconscout.com/illustration/premium/thumb/user-login-6299866-5295188.png.iconscout.com/illustration/premium/thumb/user-login-6299866-5295188.pngin-6299866-5295188.png" width={'100%'} height={'550px'}></img> */}
                            <img className='mt-5' src="https://cdni.iconscout.com/illustration/premium/thumb/login-security-7467180-6110966.png" alt="no image" />
                    </div>
                       
                        <div  className="col-lg-6">
                            <div   className="d-flex flex-column align-items-center mt-5">
                                
                                {/* <h2   className='mt-5 ' style={{ fontFamily: "Playfair Display" }}>Log In</h2> */}
                                
    
                                <Form>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label style={{ fontFamily: 'PT Sans',width:"350px" }}>Email</Form.Label>
                                        <Form.Control style={{ borderColor: '#2b2b2b' }} type="email" placeholder="Enter your email" value={userInputs.email} onChange={e => setUserInputs({ ...userInputs, email: e.target.value })} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label style={{ fontFamily: 'PT Sans' }}>Password</Form.Label>
                                        <InputGroup>
                                            <Form.Control
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Enter your password"
                                                style={{ borderColor: '#2b2b2b' }}
                                                value={userInputs.password}
                                                onChange={e => setUserInputs({ ...userInputs, password: e.target.value })}
                                            />
                                           
                                        </InputGroup>
                                    </Form.Group>
                                </Form>
                                <div className="forgetDiv d-flex justify-content-between align-items-center w-50 mt-1">
                                    <label className="mb-1" style={{ fontSize: '12px', fontFamily: 'PT Sans' }}>
                                        <input type="checkbox" className="me-2" />
                                        Remember me
                                    </label>
                                    <label className="mb-1" style={{ fontSize: '12px', fontFamily: 'PT Sans' }}>
                                        Forget password?
                                    </label>
    
                                </div>
    
                                <div className="btnDiv w-100 justify-content-center d-flex mt-5">
                                    <button onClick={handleLogin} className='w-25 rounded' style={{ backgroundColor: 'blue', color: 'white', height: '40px',border:"1px" }}>Sign In</button>
    
                                </div>
                                <div className="btnDiv w-100  justify-content-center d-flex mt-4 " >
                                    
                                    <GoogleLogin
                                    
                                        onSuccess={credentialResponse => {
                                            const credentialResponseDecoded = jwtDecode(credentialResponse.credential);
                                            console.log(credentialResponseDecoded);
                                            sessionStorage.setItem("userName", credentialResponseDecoded.name);
                                            setTimeout(() => {
                                                navigate('/dash')
                                            }, 2000)
                                            toast.success("Login Success")
                                        }}
                                        onError={() => {
                                            console.log('Login Failed');
                                        }}
                                    />
    
                                </div>
    
                                <div className="SignUpDiv">
                                    <p className='mt-lg-5'>Don't have an account yet?<b> SignUp</b> </p>
                                </div>
    
                            </div>
    
                        </div> 
                       
                        <div className="col-lg-1"></div>
                    </div>
           </div>
                <ToastContainer position='top-center' theme='colored' autoClose={3000} />
            </div>
        </>
    );
}

export default LoginPage;
