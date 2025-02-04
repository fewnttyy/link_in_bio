import { getProfile } from '../../api/profile/Profile';
import React, { createContext, useState, useContext, useEffect } from 'react';

//1. Buat context
const ProfileContext = createContext();

// Hook untuk menghapus context
export const useProfile = () => useContext(ProfileContext);

// 2. Provider untuk membungkus komponen yang membutuhkan akses ke state profile
export const ProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState({
        username: "",
        name: "",
        bio: "",
        phone: "",
        province: "",
        city: "",
        subdistrict: "",
        avatar: "",
        user: {
            id: null,
            username: "",
            email: "",
            phone: "",
        }
    });

    const [previewAvatar, setPreviewAvatar] = useState(""); // menambahkan setPreviewAvatar
    const [loadingProfile, setLoadingProfile] = useState(false);

    // 3. Fungsi untuk mengambil data profile dari API
    const refreshProfile = async () => {
        setLoadingProfile(true);
        const data = await getProfile();
        if (data && data.status && data.profile.length > 0) {
            setProfile(data.profile[0]); // update profile ke state

            //update avatar
            if (data.profile[0].avatar) {
                setPreviewAvatar(data.profile[0].avatar);
            }
        }
        setLoadingProfile(false);
    };

    // 4. Ambil data saat pertama kali aplikasi berjalan
    useEffect(() => {
        refreshProfile();
    }, []);

    return (
        <ProfileContext.Provider value={{ profile, previewAvatar, setPreviewAvatar, refreshProfile, setProfile }}>
            {children}
        </ProfileContext.Provider>
    )
};



