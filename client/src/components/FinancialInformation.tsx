import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Header from "./Header";
import userService from "../constraints/apiService";
import { RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { financialInfo } from "../redux/userSlice";
import { toast } from "react-toastify";
import { FinancialInfoFormData } from "../interface/IUser";

function FinancialInformation() {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.user.id);
  const [modalOpen, setModalOpen] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FinancialInfoFormData>();

  const onSubmit = async (data: FinancialInfoFormData) => {
    console.log("Form submitted:", data);
    const formData = {
      ...data,
      userId,
    };
    try {
      const response = await userService.financialInfo(formData);
      console.log("Account Created:", response?.data);
      if (response?.data.success) {
        console.log("success");
        dispatch(financialInfo(response.data.data));
        setGeneratedUrl(`https://craxinos-khaki.vercel.app/dashboard/${userId}`); 
        setModalOpen(true);
      } else {
        console.log("failure");
        console.log(response?.data.message);
        toast.error(response?.data.message);
      }
    } catch (error) {
      console.error("Error creating account:", error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedUrl);
    toast.success("URL copied to clipboard");
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center py-30">
        <div className="text-center mb-6">
          <div className="flex justify-center gap-x-6 mb-4">
            <div className="rounded-full w-8 h-8 bg-blue-500 text-white pt-1">1</div>
            <div className="rounded-full w-8 h-8 bg-gray-400 text-white pt-1">2</div>
          </div>
          <h1 className="font-bold text-3xl tracking-tight">Financial Information</h1>
          <p className="text-gray-500 mt-2">All your information is stored securely.</p>
        </div>
        <div className="justify-center items-center w-full max-w-lg">
          <form className="flex flex-col gap-4 items-center w-full" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col relative min-w-2xs w-full">
              <label className="absolute left-2 text-blue-700 text-sm bg-white px-1 top-[-12px]">
                What is your current employment status?
              </label>
              <select className="border rounded px-4 py-2 w-full" {...register("status", { required: "Employment status is required" })}>
                <option value="">Select your employment status</option>
                <option value="employed">Employed</option>
                <option value="unemployed">Unemployed</option>
                <option value="student">Student</option>
              </select>
              {errors.status && <p className="text-red-500 text-xs mt-1">{String(errors.status.message)}</p>}
            </div>

            <div className="flex flex-col relative min-w-2xs w-full">
              <label className="absolute left-2 text-blue-700 text-sm bg-white px-1 top-[-12px]">
                Additional savings/investments
              </label>
              <Controller
                name="savings"
                control={control}
                defaultValue=""
                rules={{ required: "This field is required" }}
                render={({ field }) => (
                  <input type="text" className="border rounded px-4 py-2 w-full" placeholder="Enter savings/investments amount" {...field} />
                )}
              />
              {errors.savings && <p className="text-red-500 text-xs mt-1">{String(errors.savings.message)}</p>}
            </div>

            <button className="bg-blue-500 text-white w-2xs h-12 rounded-lg" type="submit">
              Save and Continue
            </button>
          </form>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Success!</h2>
            <p className="text-sm mb-4">Your financial information has been saved. Copy the URL below:</p>
            <div className="flex items-center border p-2 rounded mb-4">
              <input type="text" value={generatedUrl} readOnly className="flex-1 border-none outline-none" />
              <button className="ml-2 bg-blue-500 text-white px-3 py-1 rounded" onClick={copyToClipboard}>
                Copy
              </button>
            </div>
            <button className="bg-red-500 text-white px-4 py-2 rounded w-full" onClick={() => setModalOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FinancialInformation;
