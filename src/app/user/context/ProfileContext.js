import { getProfile } from '@/app/api/profile/Profile';
import React, { createContext, useState, useContext } from 'react';

// Buat context
const ProfileContext = createContext();

// Hook untuk menghapus context
export const useProfile = () => useContext(ProfileContext);

// Provider untuk membungkus komponen yang membutuhkan akses ke state profile
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

    const refreshProfile = async () => {
        const data = await getProfile();
        if (data && data.status && data.profile.length > 0) {
            setProfile(data.profile[0]); // update profile ke state
        }
    };

    return (
        <ProfileContext.Provide value={{ profile, refreshProfile }}>
            {children}
        </ProfileContext.Provide>
    )
};

