export const BASE_URL = `${import.meta.env.VITE_BACKEND_URL}`


export const userEndpoints = {
    createAccount:`${BASE_URL}/createAccount`,
    personalInfo:`${BASE_URL}/personalInfo`,
    financialInfo: `${BASE_URL}/financialInfo`,
    userData: `${BASE_URL}/dashboard`,
}