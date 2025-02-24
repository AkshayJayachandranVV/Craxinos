import {useState} from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { IoMdInformationCircle } from "react-icons/io";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import Header from "./Header";
import userService from "../constraints/apiService";
import {IUser} from '../interface/IUser'
import { toast } from "react-toastify";
import {useDispatch} from "react-redux"
import {createAccount} from '../redux/userSlice'
function CreateAccount() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IUser>();
  const onSubmit = async (data: IUser) => {
    console.log("successs");
    try {
      const response = await userService.createAccount(data);
      console.log("Account Created:", response?.data);
      if(response?.data.success
        ){
            console.log("success")
            dispatch(createAccount(response.data))
            navigate("/info")
      }else{
        console.log("failure")
        console.log(response?.data.message)
        toast.error(response?.data.message)
      }
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };

  const password = watch("password");

  return (
    <div>
      <Header />
      <div className="flex justify-center items-center">
        <div className="text-center">
          <h1 className="font-extrabold text-3xl w-80 h-20 flex items-center justify-center text-center">
            Create your Account
          </h1>
          <p>Set up your RecentlyPass in as little as 2 minutes</p>
        </div>
      </div>

      <div className="flex flex-col items-center bg-white p-6 max-w-md w-full mx-auto">
        <p className="font-bold text-xl text-gray-700 text-center">
          Contact Details
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full space-y-4 mt-4"
        >
          <div className="flex flex-col relative">
            <label
              className={`absolute left-2 text-blue-700 text-sm bg-white px-1 transition-all duration-200 ${
                watch("email")
                  ? "top-[-12px] text-xs text-blue-700"
                  : "top-2 text-base text-gray-500"
              }`}
            >
              Email address
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
              className="border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            />

            {errors.email && (
              <p className="text-red-500 text-xs">
                {errors.email.message as string}
              </p>
            )}
          </div>

          <div className="relative flex flex-col">
            <label
              className={`absolute left-2 text-blue-700 text-sm bg-white px-1 transition-all duration-200 ${
                watch("mobile")
                  ? "top-[-12px] text-xs text-blue-700"
                  : "top-2 text-base text-gray-500"
              }`}
            >
              Mobile Number
            </label>
            <input
              type="text"
              {...register("mobile", {
                required: "Mobile number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Invalid mobile number",
                },
              })}
              className="border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            />
            {errors.mobile && (
              <p className="text-red-500 text-xs">
                {errors.mobile.message as string}
              </p>
            )}
            <IoMdInformationCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl cursor-pointer" />
          </div>

          <p className="font-bold text-gray-600">Set as password</p>

          <div className="relative flex flex-col mt-4">
            <label
              className={`absolute left-2 text-blue-700 text-sm bg-white px-1 transition-all duration-200 ${
                watch("password")
                  ? "top-[-12px] text-xs text-blue-700"
                  : "top-2 text-base text-gray-500"
              }`}
            >
              Create a Password
            </label>
            <input
              type={showPassword ? "text" : "password"} // Toggle input type
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*\d).{6,}$/,
                  message:
                    "Password must contain at least one uppercase letter and one number",
                },
              })}
              className="border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            />
            {errors.password && (
              <p className="text-red-500 text-xs">
                {errors.password.message as string}
              </p>
            )}
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>

          {/* Confirm Password Input */}
          <div className="relative flex flex-col mt-4">
            <label
              className={`absolute left-2 text-blue-700 text-sm bg-white px-1 transition-all duration-200 ${
                watch("confirmPassword")
                  ? "top-[-12px] text-xs text-blue-700"
                  : "top-2 text-base text-gray-500"
              }`}
            >
              Confirm your Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"} // Toggle input type
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className="border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs">
                {errors.confirmPassword.message as string}
              </p>
            )}
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          </div>
          <p className="text-sm text-gray-500 text-left">
            We need a password to keep your information safe. But don't
            <br />
            worry, we'll also send your custom RentlyPass URL via email.
          </p>

          <button
            className="bg-blue-500 text-white w-100 h-12 rounded-lg"
            type="submit"
          >
            Create your Account
          </button>

          <p className="text-sm text-gray-500 text-left">
            By clicking 'Create your account', you are agreeing to our Terms{" "}
            <br />& Conditions and Privacy Policy.
          </p>
        </form>
      </div>
    </div>
  );
}

export default CreateAccount;
