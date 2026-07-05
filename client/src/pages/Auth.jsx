import React, { useEffect } from "react";
import { BsRobot } from "react-icons/bs";
import { IoSparkles } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { motion } from "motion/react";
import {
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
} from "firebase/auth";
import { auth, provider } from "../utils/firebase";
import axios from "axios";
import { SERVER_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
function Auth({ isModal = false }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );
  };
  const handleGoogleAuth = async () => {
    // console.log("Button Clicked");

    try {
      // if (isMobileDevice()) {
      //   console.log("Mobile Device");
      //   await signInWithRedirect(auth, provider);
      //   return;
      // }

      // console.log("Desktop");

      // Desktop
      const res = await signInWithPopup(auth, provider);

      let User = res.user;
      let name = User.displayName;
      let email = User.email;
      let photoUrl = User.photoURL || "";

      const result = await axios.post(
        `${SERVER_URL}/api/auth/google`,
        {
          name,
          email,
          photoUrl,
        },
        {
          withCredentials: true,
        },
      );

      dispatch(
        setUserData({
          name,
          email,
          photoUrl,
          credits: result.data.credits,
        }),
      );

      navigate("/");
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
    }
  };
  // useEffect(() => {
  //   const handleRedirect = async () => {
  //     try {
  //       const res = await getRedirectResult(auth);

  //       if (!res) return;

  //       let User = res.user;
  //       let name = User.displayName;
  //       let email = User.email;
  //       let photoUrl = User.photoURL || "";

  //       const result = await axios.post(
  //         `${SERVER_URL}/api/auth/google`,
  //         {
  //           name,
  //           email,
  //           photoUrl,
  //         },
  //         {
  //           withCredentials: true,
  //         },
  //       );

  //       dispatch(
  //         setUserData({
  //           name,
  //           email,
  //           photoUrl,
  //           credits: result.data.credits,
  //         }),
  //       );

  //       navigate("/");
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   handleRedirect();
  // }, []);
  return (
    <div
      className={`w-full ${isModal ? "py-4" : "min-h-screen bg-[#f3f3f3]"}   flex items-center justify-center px-6 py-20`}
    >
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: isModal ? 1.01 : 1.05 }}
        className={`w-full  ${isModal ? "max-w-md p-8 rounded-3xl" : "max-w-lg p-12 rounded-4xl"}  bg-white shadow-2xl border border-gray-200`}
      >
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="bg-black text-white p-2 rounded-lg">
            <BsRobot size={18} />
          </div>
          <h2 className="font-semibold text-lg">InterviewAI</h2>
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold text-center leading-snug mb-4">
          Continue with
          <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full inline-flex items-center gap-2">
            <IoSparkles size={16} />
            AI Smart Interview
          </span>
        </h1>
        <p className="text-gray-500 text-center text-sm md:text-base leading-relaxed mb-8">
          Sign in to start AI-powered mock interviews, track your progress, and
          unlock detailed performance insights.
        </p>

        <motion.button
          onClick={handleGoogleAuth}
          whileHover={{ opacity: 0.9, scale: 1.03 }}
          whileTap={{ opacity: 1, scale: 0.98 }}
          className="w-full flex items-center justify-center gap-3 py-3 bg-black text-white rounded-full shadow-md"
        >
          <FcGoogle size={20} />
          Continue with Google
        </motion.button>
      </motion.div>
    </div>
  );
}

export default Auth;
