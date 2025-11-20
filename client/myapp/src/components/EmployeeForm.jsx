import { useState } from "react";
import Lottie from "lottie-react";
import loading from "../assets/loading3.json";
import snowfall from "../assets/snowfall.json";
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
            toast.error("Error: " + (err.response?.data?.error || "Something went wrong"));
        }
    };

    const handleMatch = async () => {
        setLoadingAnimation(true);
        try {
            const res = await axiosInstance.post("/employees/match");
            toast.success(res.data.msg || "Secret Santa matches sent! Check your email 🎄");
        } catch (err) {
            toast.error("Error: " + (err.response?.data?.error || err.message));
        } finally {
            setLoadingAnimation(false);
        }
    };

    return (
        <>

            {/* FESTIVE BACKGROUND (NO IMAGE) */}

            {/* MAIN LAYOUT */}
            <div className="min-h-screen flex items-center justify-center px-6 py-1">
                <div className="w-full max-w-2xl">

                    {/* GLASS CARD */}
                    <div className="relative bg-white/10 backdrop-blur-xl border border-white/30 shadow-2xl rounded-3xl p-10 overflow-hidden">

                        {/* Decorative Glow Border */}
                        <div className="absolute inset-0 rounded-3xl ring-2 ring-red-400/20 pointer-events-none" />

                        {/* HEADER SECTION */}
                        <div className="text-center mb-10">
                            <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-xl">
                                Secret Santa 2025
                            </h1>

                            <p className="text-xl text-white/80 mt-3">
                                Join the magic, spread the cheer and surprise someone special 🎄✨
                            </p>

                            {/* Holiday Icons */}
                            <div className="flex justify-center gap-6 mt-6 text-5xl">
                                <span className="animate-wiggle-slow">🎄</span>
                                <span className="animate-wiggle-slow delay-150">🎅</span>
                                <span className="animate-wiggle-slow delay-300">🎁</span>
                                <span className="animate-wiggle-slow delay-450">❄️</span>
                            </div>
                        </div>

                        {/* FORM SECTION */}
                        <form onSubmit={handleSubmit} className="space-y-7">

                            <div className="grid md:grid-cols-2 gap-7">

                                {/* Full Name */}
                                <div>
                                    <label className="label">Full Name *</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="e.g. John Doe"
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        className="input"
                                    />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="label">Email *</label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="john@example.com"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        className="input"
                                    />
                                </div>
                            </div>

                            {/* Interests */}
                            <div>
                                <label className="label">Interests</label>
                                <input
                                    type="text"
                                    placeholder="Books, Music, Coffee, Plants, Gadgets..."
                                    value={form.interests}
                                    onChange={(e) => setForm({ ...form, interests: e.target.value })}
                                    className="input"
                                />
                            </div>

                            {/* Gift Preferences */}
                            <div>
                                <label className="label">Gift Preferences</label>
                                <textarea
                                    placeholder="Write any special notes or gift preferences…"
                                    value={form.preferences}
                                    onChange={(e) => setForm({ ...form, preferences: e.target.value })}
                                    className="input h-28 resize-none"
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <button className="btn-green">Add Me to the Nice List 🎁</button>
                        </form>

                        {/* MATCH BUTTON */}
                        <div className="mt-10 text-center">
                            <button onClick={handleMatch} className="btn-red">
                                🎄 Reveal Secret Santa Matches
                            </button>
                            <p className="text-white/80 mt-3 text-sm">
                                This will automatically pair everyone and send email notifications.
                            </p>
                        </div>

                        <p className="text-center text-white/60 mt-10 text-sm">
                            Made with ❤️ and Christmas magic ✨
                        </p>
                    </div>
                </div>
            </div>

            {/* 🔥 FULLSCREEN LOADING OVERLAY WITH LOTTIE */}
            {loadingAnimation && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 transition-all duration-300 w-screen h-screen">
                    <div className="bg-white/10 p-6 rounded-2xl border border-white/20 shadow-2xl">
                        <Lottie animationData={loading} loop={true} style={{ width: "200px" }} />
                    </div>
                </div>
            )}

            {/* GLOBAL STYLES */}
            <style jsx>{`
        

        @keyframes snowfall {
          from { background-position: 0 0; }
          to { background-position: 0 1500px; }
        }

        .label {
          color: white;
          font-size: 1.1rem;
          font-weight: bold;
          margin-bottom: 5px;
          display: block;
        }

        .input {
          width: 100%;
          padding: 14px 16px;
          border-radius: 12px;
          border: 2px solid rgba(255,255,255,0.35);
          background: rgba(255,255,255,0.15);
          color: white;
          font-size: 1rem;
          backdrop-filter: blur(8px);
          transition: 0.25s ease;
        }

        .input::placeholder {
          color: #ffffffaa;
        }

        .input:focus {
          border-color: #22c55e;
          background: rgba(255,255,255,0.25);
          box-shadow: 0 0 10px rgba(34,197,94,0.5);
          outline: none;
        }

        .btn-green {
          width: 100%;
          padding: 16px;
          border-radius: 12px;
          background: linear-gradient(to right, #16a34a, #15803d);
          color: white;
          font-weight: 700;
          font-size: 1.2rem;
          transition: 0.3s;
        }

        .btn-green:hover {
          transform: scale(1.05);
        }

        .btn-red {
          width: 100%;
          padding: 16px;
          background: linear-gradient(to right, #dc2626, #b91c1c);
          color: white;
          font-weight: 800;
          font-size: 1.3rem;
          border-radius: 12px;
          transition: 0.3s;
        }

        .btn-red:hover {
          transform: scale(1.07);
        }

        @keyframes wiggle-slow {
          0%, 100% { transform: rotate(0); }
          50% { transform: rotate(10deg); }
        }

        .animate-wiggle-slow {
          animation: wiggle-slow 2s infinite;
        }
      `}</style>
        </>
    );
}
