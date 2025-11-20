import { useEffect, useState } from "react";
import axios from "axios";
import Lottie from "lottie-react";
import snowfall from "../assets/snowfall.json";
import loading from "../assets/loading3.json";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { axiosInstance } from "../lib/axios";
import { MdDelete } from "react-icons/md";
export default function Admin() {
    const [employees, setEmployees] = useState([]);
    const [loadingAnimation, setLoadingAnimation] = useState(false);

    const fetchEmployees = async () => {
        try {
            const res = await axiosInstance.get("/employees");
            setEmployees(res.data);
        } catch (err) {
            toast.error("Failed to load employees");
        }
    };

    useEffect(() => { fetchEmployees(); }, []);

    const handleMatch = async () => {
        setLoadingAnimation(true);
        try {
            await axiosInstance.post("/employees/match");
            toast.success("Secret Santa matching complete! Emails sented");
            fetchEmployees();
        } catch (err) {
            toast.error("Matching failed. Try again.");
        } finally {
            setLoadingAnimation(false);
        }
    };

    const deleteHandler = async (_id) => {
        try {
            await axiosInstance.delete(`/employees/${_id}`);
            toast.success('deleted successfully.');
            fetchEmployees();
        } catch (err) {
            toast.error(err.response?.data.message || err.message);
        }
    }

    return (
        <>
            {/* Subtle Snowfall on Pure Black */}
            <div className="fixed inset-0 -z-10 opacity-40 pointer-events-none">
                <Lottie animationData={snowfall} loop />
            </div>

            {/* Pure Black Background */}
            <div className="min-h-screen bg-black text-white px-4 py-12">

                {/* Header */}
                <motion.div
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="text-center mb-14"
                >
                    <h1 className="text-5xl md:text-6xl font-bold mb-2">🎅 Voicene Secret Santa 2025 🎄</h1>
                    <p className="text-xl text-gray-400">Spread joy, share surprises, and make someone's Christmas magical ✨</p>
                </motion.div>

                {/* Start Matching Button */}
                <div className="flex justify-center mb-16">
                    <button
                        onClick={handleMatch}
                        disabled={loadingAnimation}
                        className="px-12 py-3 cursor-pointer bg-gradient-to-r from-red-600 to-green-600 hover:from-red-500 hover:to-green-500 disabled:opacity-70 text-white font-bold text-xl rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-3"
                    >
                        {loadingAnimation ? "Matching in progress..." : "🎄 Generate Voicene Secret Santa Matches"}
                    </button>
                </div>

                {/* Employee Cards Grid */}
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
                        {employees.map((emp, index) => (
                            <motion.div
                                key={emp._id}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.07 }}
                                className="h-full"
                            >
                                {/* Card - Glassmorphism on Pure Black */}
                                <div className="h-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl hover:shadow-xl hover:bg-white/15 transition-all duration-400 flex flex-col relative group">
                                    {/* Delete Button - Top Right */}
                                    <button
                                        onClick={() => deleteHandler(emp._id)}  // Add your delete function here
                                        className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 
                   w-10 h-10 rounded-full bg-red-600/80 hover:bg-red-500 flex items-center justify-center 
                   shadow-lg hover:scale-110 active:scale-95 cursor-pointer"
                                        title="Delete employee"
                                    >
                                        <MdDelete />
                                    </button>

                                    {/* Header */}
                                    <div className="p-6 text-center border-b border-white/10">
                                        <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-red-500 to-green-500 
                        flex items-center justify-center text-3xl font-bold shadow-lg">
                                            {emp.name.charAt(0).toUpperCase()}
                                        </div>
                                        <h3 className="text-xl font-bold">{emp.name}</h3>
                                        <p className="text-sm text-gray-300 mt-1 flex items-center justify-center gap-2">
                                            Email {emp.email}
                                        </p>
                                    </div>

                                    {/* Body - Equal Height */}
                                    <div className="p-6 flex-1 space-y-5 text-sm">
                                        <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="font-semibold text-green-400">Interests</span>
                                            </div>
                                            <p className="text-gray-200">
                                                {emp.interests || "Not shared yet"}
                                            </p>
                                        </div>

                                        <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="font-semibold text-red-400">Gift Ideas</span>
                                            </div>
                                            <p className="text-gray-200">
                                                {emp.preferences || "Surprise me!"}
                                            </p>
                                        </div>
                                    </div>


                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Empty State */}
                    {employees.length === 0 && (
                        <div className="text-center py-32">
                            <p className="text-2xl text-gray-500 mb-6">No participants yet</p>
                            <p className="text-8xl">Santa Face</p>
                        </div>
                    )}
                </div>

                {/* Loading Overlay */}
                {loadingAnimation && (
                    <div className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center z-50">
                        <div className="text-center">
                            <Lottie animationData={loading} loop style={{ width: "300px" }} />
                            <p className="text-2xl font-bold text-white mt-6 animate-pulse">
                                Santa is working his magic...
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}