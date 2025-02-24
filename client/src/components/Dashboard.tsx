import  { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import userService from "../constraints/apiService";

const UserProfile = () => {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: null,
    dob: null,
    currentAddress: null,
    livingDuration: null,
    about: null,
  });

  const [financialInfo, setFinancialInfo] = useState({
    employmentStatus: null,
    additionalSavings: null,
  });

  const [contactInfo, setContactInfo] = useState({
    email: null,
    mobile: null,
  });

  const { userId } = useParams<{ userId: string }>(); 


  useEffect(() => {
    async function fetchData() {
      try {
        if (!userId) return;
        const response = await userService.userData({userId});
        console.log(response?.data.data);
        const output = response?.data.data;
        
        const { email, mobile } = output;
        setContactInfo({ email, mobile });
        
        const { fullName, dob, currentAddress, livingDuration, about } = output.personalInfo;
        setPersonalInfo({
          fullName,
          dob: dob && new Date(dob).toLocaleDateString() ,
          currentAddress,
          livingDuration,
          about
        });
        
        const { employmentStatus, additionalSavings } = output.financialInfo;
        setFinancialInfo({ employmentStatus, additionalSavings });
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [userId]); 

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6">
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-[#9380fe] mb-4">User Information</h2>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(contactInfo).map(([key, value]) => (
              <div key={key} className="bg-gray-50 p-4 rounded-lg shadow-sm border">
                <p className="text-gray-600 capitalize font-medium">
                  {key.replace(/([A-Z])/g, " $1").toLowerCase()}:
                </p>
                <p className="text-gray-800 font-semibold">{value || "N/A"}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(personalInfo).map(([key, value]) => (
              <div key={key} className="bg-gray-50 p-4 rounded-lg shadow-sm border">
                <p className="text-gray-600 capitalize font-medium">
                  {key.replace(/([A-Z])/g, " $1").toLowerCase()}:
                </p>
                <p className="text-gray-800 font-semibold">{value || "N/A"}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Financial Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(financialInfo).map(([key, value]) => (
              <div key={key} className="bg-gray-50 p-4 rounded-lg shadow-sm border">
                <p className="text-gray-600 capitalize font-medium">
                  {key.replace(/([A-Z])/g, " $1").toLowerCase()}:
                </p>
                <p className="text-gray-800 font-semibold">{value || "N/A"}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;