import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import snowfall from "../assets/snowfall.json";
import { toast } from "react-hot-toast";

export default function AdminLogin() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const handleLogin = (e) => {
        e.preventDefault();

        if (form.username === "admin" && form.password === "voicene123") {
            localStorage.setItem("admin", "true")
            toast.success("Welcome Admin! 🎅✨");
            navigate("/my-admin");
        } else {
            toast.error("Wrong Credentials ❌");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">

            {/* Snowfall Background */}
            <div className="fixed inset-0 -z-10 w-full h-full pointer-events-none bg-black">
                {/* <Lottie
                    animationData={snowfall}
                    loop
                    style={{ width: "100%", height: "100%" }}
                /> */}
            </div>

            {/* Login Card */}
            <div className="bg-white/15 backdrop-blur-2xl p-10 rounded-3xl shadow-2xl border border-white/20 w-full max-w-md text-center">

                {/* Title */}
                <h1 className="text-4xl font-extrabold text-white">
                    Admin Login 🎅
                </h1>
                <p className="text-white/80 mt-2">
                    Access Santa's Secret Dashboard
                </p>

                {/* Form */}
                <form onSubmit={handleLogin} className="mt-10 space-y-6">

                    {/* Username */}
                    <div className="text-left">
                        <label className="text-white font-medium">Username</label>
                        <input
                            required
                            type="text"
                            placeholder="e.g. SantaBoss"
                            value={form.username}
                            onChange={(e) =>
                                setForm({ ...form, username: e.target.value })
                            }
                            className="w-full p-3 mt-1 rounded-lg bg-white/20 border border-white/30 text-white outline-none focus:border-green-400 shadow-sm"
                        />
                    </div>

                    {/* Password */}
                    <div className="text-left">
                        <label className="text-white font-medium">Password</label>
                        <input
                            required
                            type="password"
                            placeholder="••••••••"
                            value={form.password}
                            onChange={(e) =>
                                setForm({ ...form, password: e.target.value })
                            }
                            className="w-full p-3 mt-1 rounded-lg bg-white/20 border border-white/30 text-white outline-none focus:border-green-400 shadow-sm"
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        className="w-full py-2 cursor-pointer bg-gradient-to-r from-red-600 to-green-600 hover:from-red-700 hover:to-green-700 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-105 shadow-xl mt-4"
                    >
                        🎄 Login to Admin
                    </button>
                </form>

                {/* Footer */}
                <p className="mt-6 text-xs text-white/60">
                    © Voicene — Christmas Edition 🎁
                </p>
            </div>
        </div>
    );
}
