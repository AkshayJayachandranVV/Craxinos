import axios from 'axios';
import { userEndpoints} from './endPoints';
import {IUser,personalInfo,FinancialInfoFormData,userId} from '../interface/IUser';

const userService = {

    createAccount: async (data:IUser) => {
        try {
            const result = await axios.post(userEndpoints.createAccount,data);
            console.log(result);
            return result
        } catch (error) {   
            console.log(error)
        }
    },
    

    personalInfo: async (data:personalInfo) => {
        try {
            const result = await axios.post(userEndpoints.personalInfo,data);
            console.log(result);
            return result
        } catch (error) {   
            console.log(error)
        }
    },
  
    financialInfo: async (data:FinancialInfoFormData) => {
        try {
            const result = await axios.post(userEndpoints.financialInfo,data);
            console.log(result);
            return result
        } catch (error) {   
            console.log(error)
        }
    },
   

    userData: async (data:userId) => {
        try {
            console.log("kitty ",data)
            const result = await axios.get(`${userEndpoints.userData}/${data.userId}`);
            console.log(result);
            return result
        } catch (error) {   
            console.log(error)
        }
    },

}

export default userService