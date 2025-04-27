  // src/app/SignIn/page.tsx
  "use client";

  import { signIn } from "next-auth/react";
  import { useRouter } from "next/navigation"; // ✅ correct import for app router
  import { useState } from "react";

  export default function SignInPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      const result = await signIn("credentials", {
        email,
        password,
        redirect: true,
        callbackUrl: "/",
      });

      // If you want to manually navigate (optional if redirect: true)
      // router.push("/");
    };

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Sign In</h1>

          {/* Google Sign In Button */}
          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-full flex items-center justify-center bg-red-500 text-white p-2 rounded-lg mb-4 hover:bg-red-600 transition duration-300"
          >
            Continue with Google
          </button>

          <div className="flex items-center justify-between mb-4">
            <hr className="w-full border-gray-300" />
            <span className="text-gray-600 text-sm px-2">OR</span>
            <hr className="w-full border-gray-300" />
          </div>

          {/* Custom Sign In Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Sign In
            </button>
          </form>

          {/* Additional Links */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a href="/SignUp" className="text-blue-500 hover:underline">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
