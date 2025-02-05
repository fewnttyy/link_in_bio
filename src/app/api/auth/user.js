import apiClient from "../apiClient";

const getUser = async (setUser, setLoadingUser, setErrorUser) => {
    try {
        setLoadingUser(true);
        await apiClient.get("/sanctum/csrf-cookie");

        const response = await apiClient.get("/user", {
            withCredentials: true,
        });

        console.log(response.data)

        setUser(response.data);

    } catch (error) {
        // console.error("Error fetching user:", error);
        // return null;
        console.error("Axios Error:", err);
        if (err.response) {
            console.error("Response Data:", err.response.data);
            console.error("Status Code:", err.response.status);
            setError(`Error ${err.response.status}: ${err.response.data.message}`);
        } else if (err.request) {
            console.error("No response received:", err.request);
            setError("Tidak ada respons dari server. Periksa koneksi.");
        } else {
            console.error("Error:", err.message);
            setError("Terjadi kesalahan tak terduga.");
        }
    } finally {
        setLoadingUser(false);
    }
}

export default getUser;