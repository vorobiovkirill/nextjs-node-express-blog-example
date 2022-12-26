import { useRouter } from "next/router"
import { useState } from "react"
import { useLogin } from "../src/hooks/auth/useLogin"

export default function Login() {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const { login } = useLogin()
    const router = useRouter()

    const onSubmit = () => {
        if (!name || !password) {
            alert("Please enter information")
        } else {
            login(name, password)
                .then((res) => router.push("/posts"))
                .catch((e) => alert(e))
        }
    };

    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <div className="h-fit flex flex-col gap-2">
                <p className="text-2xl font-bold">Login Form</p>
                <div className="bg-blue-100 rounded-lg py-5 px-6 mb-4 text-base text-blue-700 mb-3" role="alert">
                    Use this credentials to login:
                    Username: devit@test.com
                    Password: devit
                </div>

                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
                <input
                    id="username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="username"
                />
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                <input
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="password"
                    type="password"
                />
                <button
                    onClick={onSubmit}
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                    Login
                </button>
            </div>
        </div>
    )
}