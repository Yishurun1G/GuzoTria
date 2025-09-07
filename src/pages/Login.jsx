import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Login() {
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate() // for navigation

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('https://guzo-test-backend.onrender.com/api/user/login', {
        ...form,
      })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('role', res.data.user.role)
      alert('Login successful!')

      // redirect to home
      navigate('/')
    } catch (err) {
      alert(err.response?.data?.msg || 'Login failed')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-lg">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-navy mb-6 text-center">Login</h2>

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full mb-4 p-2 border border-skyblue rounded text-navy"
          required
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full mb-6 p-2 border border-skyblue rounded text-navy"
          required
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-navy transition"
        >
          Login
        </button>

        <p className="mt-4 text-center text-sm text-navy">
          Don&apos;t have an account?{' '}
          <Link to="/signup" className="text-teal underline hover:text-navy">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  )
}
