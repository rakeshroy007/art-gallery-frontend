import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';


const Signup = () => {
  const navigate = useNavigate();
  const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get form data directly from the form
    const form = e.target;
    const formData = {
      username: form.elements.username.value,
      email: form.elements.email.value,
      password: form.elements.password.value
    }


    // 📌📌📌 customfetch can be tried here which available on Github...
    try {
      const response = await fetch(`${BACKEND_BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        toast.success("Signup successful");

        localStorage.setItem("username", data.user.username);

        navigate("/dashboard")

      } else {
        console.error("Signup failed:", data.error)
        toast.error(data.error || "Signup failed");
      }
    } catch (error) {
      console.error("Network error:", error)
      toast.error("Network error");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0b0f2a] via-[#0f1438] to-[#050716] px-4">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8 text-white"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          Create Account
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            className="w-full rounded-lg bg-white/10 border border-white/10 px-4 py-3 text-sm
                   text-white placeholder-gray-400 focus:outline-none
                   focus:border-white/30 transition"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full rounded-lg bg-white/10 border border-white/10 px-4 py-3 text-sm
                   text-white placeholder-gray-400 focus:outline-none
                   focus:border-white/30 transition"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full rounded-lg bg-white/10 border border-white/10 px-4 py-3 text-sm
                   text-white placeholder-gray-400 focus:outline-none
                   focus:border-white/30 transition"
          />
        </div>

        <button
          type="submit"
          className="mt-6 w-full rounded-full bg-white py-3 text-sm font-medium text-black
                 hover:bg-gray-200 transition"
        >
          Sign Up
        </button>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-white hover:underline">
            Login
          </a>
        </p>
      </form>

    </div>

  )
}

export default Signup
