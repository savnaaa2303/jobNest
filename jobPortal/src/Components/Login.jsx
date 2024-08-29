// src/Components/Login.jsx

import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import app from '../firebase/firebase.config';
import AuthContext from '../context/AuthContext';

const Login = () => {
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        navigate('/home'); // Redirect to the home page
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.error(errorMessage);
      });
  };

  const buttonVariants = {
    hover: {
      scale: 1.1,
      textShadow: "0px 0px 8px rgb(255,255,255)",
      boxShadow: "0px 0px 8px rgb(255,255,255)",
      transition: {
        duration: 0.3,
        yoyo: Infinity
      },
    },
  };

  if (user) {
    navigate('/home'); // Redirect if already logged in
  }

  return (
    <motion.div className='h-screen w-full flex items-center justify-center'>
      <motion.button
        variants={buttonVariants}
        whileHover="hover"
        className='bg-blue px-8 py-2 text-white'
        onClick={handleLogin}
      >
        Login
      </motion.button>
    </motion.div>
  );
};

export default Login;
