import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import app from "../../firebase/firebase.config";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {


    const auth = getAuth(app);
    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('')
    const emailRef = useRef(null);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log('handle form submit', email, password);

        // clear state
        setRegisterError("")
        setSuccess("");

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user);
                if (result.user.emailVerified) {
                    setSuccess("User Login successfully")
                }
                else {
                    alert("please verify your account")
                }

            })
            .catch(error => {
                console.error(error.code, error.message);
                setRegisterError(error.message)
            })
    }

    const handleForgetPassword = () => {
        const email = emailRef.current.value;
        if (!email) {
            console.log('Please provide a email address', emailRef.current.value)
            return
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            console.log('Invalid Email Address')
        }

        sendPasswordResetEmail(auth, email)
            .then(() => alert('please check your email'))
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleFormSubmit} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email" name="email"
                                placeholder="email"
                                className="input input-bordered"
                                ref={emailRef}
                                required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a onClick={handleForgetPassword} href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <p>You are new to our website? Please <Link to='/signUp'>Sign Up Here</Link>.</p>
                        <div className="form-control mt-6">
                            <input className="btn btn-secondary text-white" type="submit" value="Hero Register" />
                        </div>
                    </form>
                    {
                        registerError && <p className="text-red-600">{registerError}</p>
                    }
                    {
                        success && <p className="text-green-600">{success}</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default Login;