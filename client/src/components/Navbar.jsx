import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "motion/react";
import { BsRobot, BsCoin } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import { FaUserAstronaut } from "react-icons/fa";
import {useNavigate} from "react-router-dom"
import axios from "axios";
import { SERVER_URL } from "../utils/constants";
import { setUserData } from "../redux/slices/userSlice";
import AuthModal from "./AuthModal";
function Navbar() {
  const user = useSelector((state) => state.user.userData);
  
  const [isShowCreditPopup,setIsShowCreditPopup] = useState(false);
  const [isShowUserPopup,setIsShowUserPopup] = useState(false);
    const [isShowAuth,setisShowAuth] = useState(false)
  const navigate = useNavigate()
  const dispath = useDispatch()
  const handleLogout = async ()=>{
    try {
        await axios.get(`${SERVER_URL}/api/auth/logout`,{
            withCredentials:true
        })
        dispath(setUserData(null))
        setIsShowCreditPopup(false)
        setIsShowUserPopup(false)
        navigate("/")
    } catch (error) {
        console.log(error)
    }
  }
  return (
    <div className="bg-[#f3f3f3] flex justify-center px-4 pt-6">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-6xl bg-white rounded-3xl shadow-sm border border-gray-200 px-8 py-4 flex justify-between items-center relative"
      >
        <div className="flex items-center cursor-pointer gap-3">
          <div className="bg-black text-white p-2 rounded-lg">
            <BsRobot size={18} />
          </div>
          <h1 className="font-semibold hidden md:block text-lg">InterviewAI</h1>
        </div>

        <div className="flex items-center gap-6 relative">
          <div className="relative">
            <button
            onClick={()=>{
               if(!user){
                setisShowAuth(true)
                return
               }
                setIsShowCreditPopup(!isShowCreditPopup);
                setIsShowUserPopup(false)
            }}
              className="flex items-center gap-2 
                bg-gray-100 px-4 py-2 rounded-full text-md hover:bg-gray-200 transition"
            >
              <BsCoin size={20} />
              {user?.credits || 0}
            </button>

            {
                isShowCreditPopup && (
                    <div className="absolute -right-[50px]
                    mt-3 w-64 bg-white shadow-xl border border-gray-200 rounded p-5 z-50
                    ">
                        <p className="text-sm text-gray-600 mb-4">
                            Need more credits to continue interviews?
                        </p>
                        <button 
                        onClick={()=>navigate("/pricing")}
                        className="w-full bg-black text-white py-2 rounded-lg text-sm cursor-pointer">
                            Buy more credits
                        </button>
                    </div>
                )
            }
          </div>

          <div className="relative">
            <button
                onClick={()=>{
                   if(!user){
                    setisShowAuth(true)
                    return
                   }
                    setIsShowUserPopup(!isShowUserPopup);
                    setIsShowCreditPopup(false)
                }}
              className="w-9 h-9 bg-black text-white rounded-full flex items-center justify-center font-semibold
              overflow-hidden
              "
            >
              {user?.photoUrl ? user?.photoUrl == "" ? user.name.slice(0,1).toUpperCase : <img src={user?.photoUrl} alt="User-Image"/> : <FaUserAstronaut size={16} />}
            </button>

            {
                isShowUserPopup && (
                    <div className="absolute right-0 mt-3 w-48 bg-white shadow-xl border border-gray-200 rounded-xl p-4 z-50">
                        <p className="text-md text-blue-500 font-medium mb-1">{user?.name || ""}</p>

                        <button 
                        onClick={()=>{
                          navigate("/history")
                        }}
                        className="w-full text-left text-sm py-2 hover:text-black text-gray-600 cursor-pointer">

                            Interview History
                        </button>
                        <button 
                        onClick={handleLogout}
                        className="w-full text-left text-sm py-2 flex items-center gap-2 text-red-500 cursor-pointer">
                            <HiOutlineLogout size={16}/>
                            Logout
                        </button>
                    </div>
                )
            }
          </div>
        </div>
      </motion.div>

      {
        isShowAuth && <AuthModal onClose={()=>setisShowAuth(false)} />
      }
    </div>
  );
}

export default Navbar;
