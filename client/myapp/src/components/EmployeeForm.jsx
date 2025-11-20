import { useState } from "react";
import Lottie from "lottie-react";
import loading from "../assets/loading3.json";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export default function EmployeeForm() {
    const [loadingAnimation, setLoadingAnimation] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        interests: "",
        preferences: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post("/employees/add", form);
            toast.success("Added to the Nice List! 🎁");
            setForm({ name: "", email: "", interests: "", preferences: "" });
        } catch (err) {
            toast.error(err.response?.data?.error || "Something went wrong");
        }
    };

    const handleMatch = async () => {
        setLoadingAnimation(true);
        try {
            const res = await axiosInstance.post("/employees/match");
            toast.success(res.data.msg || "Secret Santa matches sent! 🎄");
        } catch (err) {
            toast.error(err.response?.data?.error || err.message);
        } finally {
            setLoadingAnimation(false);
        }
    };

    return (
        <>
            {/* Layout Container */}
            <div className="min-h-screen flex items-center justify-center px-4 py-6 bg-black">
                <div className="w-full max-w-xl">

                    {/* Main Glass Card */}
                    <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-3xl px-8 py-10">

                        {/* Header */}
                        <div className="text-center mb-8">
                            <h1 className="text-3xl  font-extrabold text-white drop-shadow-lg tracking-wide">
                                🎅 Voicene Secret Santa 2025 🎄
                            </h1>

                            <p className="text-sm text-white/80 mt-3 leading-relaxed">
                                Spread joy, share surprises, and make someone's Christmas magical ✨
                            </p>

                            {/* Festival Icons */}
                            <div className="flex justify-center gap-6 mt-6 text-4xl md:text-5xl opacity-90">
                                <span className="animate-wiggle-slow">🎄</span>
                                <span className="animate-wiggle-slow delay-150">🎅</span>
                                <span className="animate-wiggle-slow delay-300">🎁</span>
                                <span className="animate-wiggle-slow delay-450">❄️</span>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Full Name */}
                                <div>
                                    <label className="label">Full Name</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="John Doe"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        className="input"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="label">Email</label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="example@email.com"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        className="input"
                                    />
                                </div>
                            </div>

                            {/* Interests */}
                            <div>
                                <label className="label">Your Interests</label>
                                <input
                                    type="text"
                                    placeholder="Books, Music, Coffee..."
                                    value={form.interests}
                                    onChange={(e) => setForm({ ...form, interests: e.target.value })}
                                    className="input"
                                />
                            </div>

                            {/* Gift Preferences */}
                            <div>
                                <label className="label">Gift Preferences</label>
                                <textarea
                                    placeholder="Anything special they should know?"
                                    value={form.preferences}
                                    onChange={(e) => setForm({ ...form, preferences: e.target.value })}
                                    className="input h-24 resize-none"
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <button className="btn-green">
                                Add Me to the Voicene Nice List 🎁
                            </button>
                        </form>

                        {/* Match Button */}
                        <div className="mt-8">
                            <button onClick={handleMatch} className="btn-red">
                                🎄 Generate Voicene Secret Santa Matches
                            </button>

                            <p className="text-white/70 text-center mt-3 text-sm">
                                Auto-pairs all participants & sends secret emails!
                            </p>
                        </div>

                        {/* Footer Text */}
                        <p className="text-center text-white/60 mt-8 text-sm italic">
                            Crafted with ❤️ by Team Voicene • Spreading Christmas cheer ✨
                        </p>
                    </div>
                </div>
            </div>

            {/* Loading Overlay */}
            {loadingAnimation && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50">
                    <div className="bg-white/10 p-6 rounded-2xl border border-white/20 shadow-xl">
                        <Lottie animationData={loading} loop style={{ width: "180px" }} />
                    </div>
                </div>
            )}

            {/* Custom Styles */}
            <style jsx>{`
        .label {
          color: #f8fafc;
          font-weight: 600;
          margin-bottom: 6px;
          font-size: 0.95rem;
          display: block;
        }

        .input {
          width: 100%;
          padding: 10px 14px; /* Reduced height */
          border-radius: 10px;
          border: 1.5px solid rgba(255,255,255,0.35);
          background: rgba(255,255,255,0.12);
          color: white;
          font-size: 0.95rem;
          backdrop-filter: blur(6px);
          transition: 0.25s ease;
        }

        .input:focus {
          border-color: #22c55e;
          box-shadow: 0 0 10px rgba(34,197,94,0.4);
          background: rgba(255,255,255,0.18);
          outline: none;
        }

        .btn-green {
          width: 100%;
          padding: 12px;     /* Reduced button height */
          border-radius: 10px;
          background: linear-gradient(90deg, #16a34a, #15803d);
          color: white;
          font-weight: 700;
          font-size: 1.05rem;
          transition: 0.2s ease;
        }

        .btn-green:hover {
          transform: scale(1.03);
        }

        .btn-red {
          width: 100%;
          padding: 12px;    /* Reduced button height */
          border-radius: 10px;
          background: linear-gradient(90deg, #dc2626, #b91c1c);
          color: white;
          font-weight: 800;
          font-size: 1.1rem;
          transition: 0.2s ease;
        }

        .btn-red:hover {
          transform: scale(1.04);
        }

        @keyframes wiggle-slow {
          0%, 100% { transform: rotate(0deg); }
          50% { transform: rotate(12deg); }
        }
        .animate-wiggle-slow {
          animation: wiggle-slow 2.5s infinite;
        }
      `}</style>
        </>
    );
}
