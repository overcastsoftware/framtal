"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, gql } from "@apollo/client";


// Define the login mutation
const LOGIN_MUTATION = gql`
  mutation Login($phoneNumber: String!) {
    login(phoneNumber: $phoneNumber)
  }
`;

// Login component
export default function LoginForm() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    
    // Initialize the login mutation
    const [login, { loading }] = useMutation(LOGIN_MUTATION, {
      onCompleted: (data) => {
        if (data.login) {
          // Redirect on successful login
          router.push("/yfirlit");
        } else {
          setError("Login failed. Please try again.");
        }
      },
      onError: (error) => {
        setError(`Error: ${error.message}`);
      }
    });
  
    // Handle form submission
    const handleSubmit = (e) => {
      e.preventDefault();
      
      // Simple validation
      if (!phoneNumber || phoneNumber.trim() === "") {
        setError("Please enter a phone number");
        return;
      }
      
      // Remove any non-digit characters
      const cleanPhoneNumber = phoneNumber.replace(/\D/g, "");
      
      // Validate phone number format (basic check)
      if (cleanPhoneNumber.length < 7) {
        setError("Please enter a valid phone number");
        return;
      }
      
      // Clear any previous errors
      setError("");
      
      // Call the login mutation
      login({ variables: { phoneNumber: cleanPhoneNumber } });
    };
  
    return (
      <div className="w-[460px] mx-auto mt-20 p-6 border border-blue-100 rounded-xl shadow-sm">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full" />
        </div>

        {/* Header */}
        <h2 className="text-center text-sm text-blue-600 font-semibold mb-1">Rafræn skilríki í síma</h2>
        <h1 className="text-center text-2xl font-bold text-gray-900 mb-1">Skráðu þig inn</h1>
        <p className="text-center text-sm text-gray-500 mb-6">Ísland.is - Mínar síður</p>
        {error && (
          <div className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
            <p>{error}</p>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-blue-600 mb-1">
              Símanúmer
            </label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your phone number"
              disabled={loading}
            />
          </div>
          <div className="flex items-center mb-6">
            <input id="remember" type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
            <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">Muna símanúmer</label>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-400 text-white font-semibold py-3 rounded-md hover:bg-blue-500 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-200" />
          <span className="mx-3 text-sm text-gray-400">Eða skráðu þig inn með</span>
          <div className="flex-grow h-px bg-gray-200" />
        </div>

        {/* Secondary Buttons */}
        <button className="w-full border border-blue-600 text-blue-600 font-semibold py-3 rounded-md mb-3 hover:bg-blue-50">
          Auðkennisappinu
        </button>
        <button className="w-full border border-blue-600 text-blue-600 font-semibold py-3 rounded-md hover:bg-blue-50">
          Skilríki á korti
        </button>

        {/* Footer Links */}
        <div className="flex justify-between items-center text-sm text-blue-600 mt-6">
          <a href="#" className="hover:underline">Skilmálar</a>
          <div className="flex space-x-4">
            <a href="#" className="hover:underline">English</a>
            <a href="#" className="hover:underline">Aðstoð</a>
          </div>
        </div>
      </div>

    );
  }
  
  