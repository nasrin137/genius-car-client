import { Link, useLocation, useNavigate } from 'react-router-dom';
import img from '../../assets/images/login/login.svg'
import { useContext } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import axios from 'axios';

const Login = () => {
   
    const {signinUser} = useContext(AuthContext);
    const location =useLocation();
    const navigate = useNavigate();
    console.log(location)


    const handleLogin = e =>{
          e.preventDefault();
        const form = e.target;
       
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email,password);



        signinUser(email,password)
        .then(result =>{
            const loggedInUser = result.user;
            console.log(loggedInUser);
            const user = {email};
            
            // get access token
            axios.post('http://localhost:5000/jwt',user,{withCredentials:true})
            .then(res =>{
                console.log(res.data)
                if(res.data.success){
                    navigate(location?.state ? location?.state : '/')
                }
            })

        })
        .catch(error =>{
            console.log(error)
        })
        
    }
    return (
        <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <div className="text-center lg:text-left w-1/2 mr-12">
            
            <img src={img} alt="" />
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleLogin} className="card-body">
            <h1 className="text-3xl text-center font-bold">Login</h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name='email' placeholder="email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
            <p className='text-center my-3'>New Here?<Link className='text-lg font-bold text-orange-500' to='/signup'>Sign Up</Link></p>
          </div>
        </div>
      </div>
    );
};

export default Login;