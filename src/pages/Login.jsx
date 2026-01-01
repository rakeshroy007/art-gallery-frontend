import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';


const Login = () => {
  const navigate = useNavigate();
  const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;


  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    // 1. Get data from form
    const formData = e.target;
    const loginData = {
      email: formData.elements.email.value,
      password: formData.elements.password.value
    }

    // const host = "http://localhost:5000"

    try {
      // 2. Call the Login API
      const response = await fetch(`${BACKEND_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
      })

      const data = await response.json();

      if (response.ok) {
        // 3. Handle Success
        toast.success("Login successful");

        // store 'username' to localstorage 
        localStorage.setItem("username", data.user.username)

        navigate("/dashboard")
      } else {
        // alert(data.error || "Login failed");
        toast.error(data.error || "Invalid credentials");
      }

    } catch (error) {
      console.error("Network error:", error)
      // alert("Cannot connect to server")
      toast.error("Cannot connect to server");
    }
  }

  return (
    <div className="min-h-screen top-30 flex items-center justify-center bg-gradient-to-br from-[#0b0f2a] via-[#0f1438] to-[#050716] px-4">

      <form
        onSubmit={handleLoginSubmit}
        className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-8 text-white"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          Welcome Back
        </h2>

        <div className="space-y-4">
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
                 hover:bg-gray-200 transition cursor-pointer"
        >
          Login
        </button>

        <p className="mt-6 text-center text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <a href="/signup" className="text-white hover:underline">
            Sign Up
          </a>
        </p>
      </form>
    </div>
  )
}

export default Login
