"use client";

import React from 'react';
import logoutUser from '../../../api/auth/logout';
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';

const PageSuperAdmin = () => {
    const router = useRouter();

    const handleLogout = async () => {

        const token = Cookies.get("token");

        if (!token) {
            console.error("Token tidak ditemukan. Pastikan sudah login.");
            toast.error("Anda belum login!");
            return;
        }

        try {
            const response = await logoutUser();

            if (response.success) {
                // Hapus token dari cookie atau localStorage
                Cookies.remove("role");
                Cookies.remove("token");
                Cookies.remove("XSRF-TOKEN");

                toast.success("Logout berhasil!");

                // Redirect ke halaman login
                router.push("/login");
            } else {
                toast.error(response.message || "Terjadi kesalahan saat logout.");
            }

        } catch (error) {
            console.error("Error:", error);
            toast.error("Gagal logout. Silakan coba lagi.");
        }
    }

    return (
        <div>super admin
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
                Logout
            </button>
        </div>
    )
}

export default PageSuperAdmin;