import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://apexdiag.vercel.app',
})

const useAxiosPublic = () => {
    return axiosPublic;
}

export default useAxiosPublic;