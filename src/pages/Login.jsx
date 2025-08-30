import { useState } from 'react' 
import { Link } from 'react-router-dom'

export default function Login() {
  const [role, setRole] = useState('user')

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-lg">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md ">
        <h2 className="text-2xl font-bold text-navy mb-6 text-center">Login</h2>

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full mb-4 p-2 border border-skyblue rounded text-navy "
        >
          <option value="user">User</option>
          <option value="owner">Scooter Owner</option>
        </select>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 border border-skyblue rounded text-navy"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-2 border border-skyblue rounded text-navy"
        />

        <button className="w-full bg-black text-white py-2 rounded hover:bg-navy transition">
          Login
        </button>

        <p className="mt-4 text-center text-sm text-navy">
          Don't have an account?{' '}
          <Link to="/signup" className="text-teal underline hover:text-navy">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
