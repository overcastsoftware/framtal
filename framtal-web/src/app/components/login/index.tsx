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
      <div className="w-full bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Sign In with Phone Number</h2>
        
        {error && (
          <div className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
            <p>{error}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-700">
              Phone Number
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
          
          <button
            type="submit"
            disabled={loading}
            className={`w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    );
  }
  