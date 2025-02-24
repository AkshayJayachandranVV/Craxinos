import  { useState, useEffect } from "react";
import Header from "./Header";
import { FaCircleInfo } from "react-icons/fa6";
import userService from "../constraints/apiService";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {useDispatch} from "react-redux"
import {personalInfo} from '../redux/userSlice'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FormEvent } from "react";
function PersonalInformation() {
  const [title, setTitle] = useState("Mr");
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [residenceDuration, setResidenceDuration] = useState("");
  const [about, setAbout] = useState("");
  const [valid, setValid] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const validateForm = () => {
    return (
      fullName.trim() !== "" &&
      dob !== "" &&
      address.trim() !== "" &&
      residenceDuration.trim() !== "" &&
      about.trim() !== ""
    );
  };

  useEffect(() => {
    setValid(validateForm());
  }, [fullName, dob, address, residenceDuration, about]);

  const userId  = useSelector((state:RootState)=>state.user.id)

  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    try {
   
      e.preventDefault();
      if (valid) {
        const data = {
          userId,
          title,
          fullName,
          dob,
          address,
          residenceDuration,
          about,
        };
        const response = await userService.personalInfo(data);
        console.log("Account Created:", response?.data);
        if(response?.data.success){
               console.log("success")
               dispatch(personalInfo(response.data.data))
               navigate("/finance")
        }else{
                  console.log("failure")
                  console.log(response?.data.message)
                  toast.error(response?.data.message)
        }
      }
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center py-5">
        <div className="text-center mb-6">
          <div className="flex justify-center gap-x-6 mb-4">
            <div className="rounded-full w-8 h-8 bg-blue-500 text-white pt-1">
              1
            </div>
            <div className="rounded-full w-8 h-8 bg-gray-400 text-white pt-1">
              2
            </div>
          </div>
          <h1 className="font-bold text-3xl tracking-tight">
            Personal Information
          </h1>
          <p className="text-gray-500 mt-2">
            Please answer questions as accurately as possible
          </p>
        </div>
        <div className="justify-center items-center w-full max-w-lg">
          <form
            className="flex flex-col gap-4 items-center w-full"
            onSubmit={handleSubmit}
          >
            <div className="flex items-center gap-2 w-full">
              <select
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border rounded border-slate-300 px-3 py-2 focus:outline-none"
              >
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
              </select>
              <div className="flex flex-col relative w-full">
                <label
                  htmlFor="fullName"
                  className={`absolute left-2 bg-white px-1 transition-all duration-200 pointer-events-none ${
                    fullName
                      ? "top-[-12px] text-xs text-blue-700"
                      : "top-2 text-base text-gray-500"
                  }`}
                >
                  Full Name as per your passport
                </label>
                <input
                  id="fullName"
                  type="text"
                  className="border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full Name as per your passport"
                />
              </div>
            </div>

            <div className="flex flex-col relative w-full">
              <label
                htmlFor="dob"
                className={`absolute left-2 bg-white px-1 transition-all duration-200 pointer-events-none ${
                  dob
                    ? "top-[-12px] text-xs text-blue-700"
                    : "top-2 text-base text-gray-500"
                }`}
              >
                Date of Birth
              </label>
              <input
                id="dob"
                type="date"
                className="border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={dob}
                onChange={(e) => {
                  const selectedDate = new Date(e.target.value);
                  const today = new Date();
                  const age = today.getFullYear() - selectedDate.getFullYear();
                  const monthDiff = today.getMonth() - selectedDate.getMonth();
                  const dayDiff = today.getDate() - selectedDate.getDate();

                
                  const actualAge =
                    monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)
                      ? age - 1
                      : age;

                  if (actualAge >= 18) {
                    setDob(e.target.value);
                    setValid(validateForm());
                  } else {
                    setDob(""); 
                    alert(
                      "You must be at least 18 years old to create an account."
                    );
                  }
                }}
              />
            </div>

            <div className="flex flex-col relative w-full">
              <label
                htmlFor="address"
                className={`absolute left-2 bg-white px-1 transition-all duration-200 pointer-events-none ${
                  address
                    ? "top-[-12px] text-xs text-blue-700"
                    : "top-2 text-base text-gray-500"
                }`}
              >
                Current Address
              </label>
              <input
                id="address"
                type="text"
                className="border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Current Address"
              />
            </div>

            <div className="flex flex-col relative w-full">
              <label
                htmlFor="residenceDuration"
                className={`absolute left-2 bg-white px-1 transition-all duration-200 pointer-events-none ${
                  residenceDuration
                    ? "top-[-12px] text-xs text-blue-700"
                    : "top-2 text-base text-gray-500"
                }`}
              >
                How long have you lived at this address?
              </label>
              <input
                id="residenceDuration"
                type="text"
                className="border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={residenceDuration}
                onChange={(e) => setResidenceDuration(e.target.value)}
                placeholder="How long have you lived at this address?"
              />
            </div>

            <div className="flex flex-col relative w-full">
              <label
                htmlFor="about"
                className={`absolute left-2 bg-white px-1 transition-all duration-200 pointer-events-none ${
                  about
                    ? "top-[-12px] text-xs text-blue-700"
                    : "top-2 text-base text-gray-500"
                }`}
              >
                Tell us a bit about yourself (hobbies, interests, etc.)
              </label>
              <textarea
                id="about"
                className="border rounded px-4 py-2 w-full h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="Tell us a bit about yourself (hobbies, interests, etc.)"
              />
            </div>

            <div className="flex items-center gap-2">
              <FaCircleInfo className="text-gray-500 text-lg" />
              <p className="text-gray-600 font-light text-sm">
                All Information can be edited once you have created your account
              </p>
            </div>

            <button
              className={`w-full h-12 rounded-lg text-white ${
                valid ? "bg-blue-500" : "bg-gray-400 cursor-not-allowed"
              }`}
              type="submit"
              disabled={!valid}
            >
              Create your Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PersonalInformation;
