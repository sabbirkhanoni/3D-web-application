import React, { useState } from 'react';
import {FaRegEnvelope, FaLock, FaRegEye, FaRegEyeSlash, FaGoogle } from 'react-icons/fa';
import toast from 'react-hot-toast';
import AxiosToastError from '../utils/AxiosToastError';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import logo from "/vrsb.png";

const LoginPage = () => {

  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  //which help me to redirect to login page after successful registration
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Send the data to the backend using Custom Axios
    try{
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
      email: data.email,
      password: data.password,
    },{ withCredentials: true });

    if(response.data.error){
      toast.error(response.data.message)
    }

    if(response.data.success){
      toast.success(response.data.message)

      setData({
        email: "",
        password: "",
      })
      navigate('/dashboard');
    }
    } catch (error) {
      AxiosToastError(error)
    }
  }


  //check all the filds are filled then change the color of the Create Account button
  const validValueOfEveryInput = Object.values(data).every((item) => item);

  return (
    <section className="mt-[-60px] min-h-screen bg-gradient-to-br from-[#05060f] via-[#222965] to-[#05060f]">
      {/* Main Content */}
      <div className="container mx-auto px-4 pt-2 pb-5 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md">
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-xl p-8 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-200 rounded-full opacity-20 animate-pulse"></div>

            <div className="relative">
                  {/* Logo added at the top */}
                  <div className="flex justify-center mb-6">
                    <img
                      src={logo}
                      width={80}
                      height={40}
                      alt="logo"
                      className="lg:hidden"
                    />
                  </div>
              </div>

            <div className="relative">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Login Account</h1>
                <p className="text-gray-600">Join our community of VR enthusiasts</p>
              </div>

              <form className="space-y-3" onSubmit={handleSubmit}>
                <div>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <FaRegEnvelope className="w-5 h-5 animate-pulse" />
                    </div>
                    <input
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-800 bg-white/50 hover:bg-white/80"
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email Address"
                      value={data.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      <FaLock className="w-5 h-5 animate-pulse" />
                    </div>
                    <input
                      className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-gray-800 bg-white/50 hover:bg-white/80"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="Password"
                      value={data.password}
                      onChange={handleChange}
                      required
                      minLength={8}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FaRegEyeSlash className="h-5 w-5" />
                      ) : (
                        <FaRegEye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>


                <div>
                  <Link to={"/forgot-password"} className="block text-lg text-right text-gray-600 hover:text-blue-700 font-medium mt-0">
                    Forgot Password?
                  </Link>
                </div>

                <button disabled={!validValueOfEveryInput}
                  type="submit"
                  className= {` ${validValueOfEveryInput ? "from-blue-500 via-indigo-600 to-purple-600 text-white" : "bg-gray-400 hover:bg-gray-500"} w-full bg-gradient-to-r py-3 px-4 rounded-xl hover:opacity-90 focus:ring-4 focus:ring-blue-200 transition-all duration-200 font-medium transform hover:scale-[1.02] active:scale-[0.98] shadow-lg`}
                >
                  Sign In
                </button>
              </form>

              <p className="text-center text-sm mt-7 text-gray-600">
                  Are You New Here? Create New Account{" "}
                  <Link to={"/signup"} className="text-[#1370ebfa] hover:text-blue-900 font-medium">
                    Sign Up
                  </Link>
              </p>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
