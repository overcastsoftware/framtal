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
        setError(`${error.message}`);
      }
    });
  
    // Handle form submission
    const handleSubmit = (e) => {
      e.preventDefault();
      
      // Simple validation
      if (!phoneNumber || phoneNumber.trim() === "") {
        setError("Símanúmer er ekki gilt.");
        return;
      }
      
      // Remove any non-digit characters
      const cleanPhoneNumber = phoneNumber.replace(/\D/g, "");
      
      // Validate phone number format (basic check)
      if (cleanPhoneNumber.length < 7) {
        setError("Símanúmer er ekki gilt.");
        return;
      }
      
      // Clear any previous errors
      setError("");
      
      // Call the login mutation
      login({ variables: { phoneNumber: cleanPhoneNumber } });
    };
  
    return (
      <div className="w-[460px] mx-auto mt-20">
        <div className="p-6 border border-blue-100 rounded-xl shadow-sm">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="bg-white" style={{ marginTop: "-55px", padding: "10px" }}>
          <svg width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#a)"><path fill="#fff" d="M0 0h40v40H0z"/><path d="M8.223 16.233v22.813c0 .53-.266.796-.796.796H2.015c-.53 0-.796-.266-.796-.796V16.233c0-.53.266-.796.796-.796h5.412c.53 0 .796.266.796.796ZM20 30.558c-2.65 0-4.721 2.072-4.721 4.721C15.279 37.929 17.351 40 20 40c2.65 0 4.721-2.072 4.721-4.721 0-2.65-2.07-4.721-4.721-4.721Zm15.279 0c-2.65 0-4.721 2.072-4.721 4.721 0 2.65 2.072 4.721 4.721 4.721C37.929 40 40 37.928 40 35.279c0-2.65-2.072-4.721-4.721-4.721ZM20 15.279c-2.65 0-4.721 2.072-4.721 4.721 0 2.65 2.072 4.721 4.721 4.721 2.65 0 4.721-2.072 4.721-4.721 0-2.65-2.07-4.721-4.721-4.721Zm15.279 0c-2.65 0-4.721 2.072-4.721 4.721 0 2.65 2.072 4.721 4.721 4.721C37.929 24.721 40 22.649 40 20c0-2.65-2.072-4.721-4.721-4.721ZM20 0c-2.65 0-4.721 2.072-4.721 4.721 0 2.65 2.072 4.721 4.721 4.721 2.65 0 4.721-2.072 4.721-4.721C24.721 2.071 22.651 0 20 0Zm15.279 9.442C37.929 9.442 40 7.37 40 4.721 40 2.071 37.928 0 35.279 0c-2.65 0-4.721 2.072-4.721 4.721 0 2.65 2.07 4.721 4.721 4.721ZM4.721 0C2.071 0 0 2.072 0 4.721c0 2.65 2.072 4.721 4.721 4.721 2.65 0 4.721-2.072 4.721-4.721C9.442 2.071 7.372 0 4.721 0Z" fill="url(#b)"/></g><defs><linearGradient id="b" x1="1.128" y1="1.606" x2="38.394" y2="38.873" gradientUnits="userSpaceOnUse"><stop stopColor="#0161FD"/><stop offset=".246" stopColor="#3F46D2"/><stop offset=".508" stopColor="#812EA4"/><stop offset=".773" stopColor="#C21578"/><stop offset="1" stopColor="#FD0050"/></linearGradient><clipPath id="a"><path fill="#fff" d="M0 0h40v40H0z"/></clipPath></defs></svg>
        </div>
        </div>

        {/* Header */}
        <div className="text-center text-sm text-blue-600 font-semibold mb-1">Rafræn skilríki í síma</div>
        <h1 className="text-center text-2xl font-bold text-gray-900 mb-1">Skráðu þig inn</h1>
        <p className="text-center  mb-6">Mínar síður - skatturinn</p>
        {error && (
          <div className="mb-4 bg-red-50 border-1 rounded border-red-200 font-bold p-4" role="alert">
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
            className={`w-full bg-blue-400 text-white font-semibold py-5 rounded-md hover:bg-blue-500 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Auðkenni..." : "Auðkenna"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-blue-200" />
          <span className="mx-3 text-sm">Eða skráðu þig inn með</span>
          <div className="flex-grow h-px bg-blue-200" />
        </div>

        {/* Secondary Buttons */}
        <button className="w-full border border-blue-600 text-blue-600 font-semibold py-3 rounded-md mb-3 hover:bg-blue-50">
          Auðkennisappinu
        </button>
        <button className="w-full border border-blue-600 text-blue-600 font-semibold py-3 rounded-md hover:bg-blue-50">
          Skilríki á korti
        </button>
        </div>
        {/* Footer Links */}
        <div className="flex justify-between items-center text-blue-600 mt-3">
          <a href="#" className="hover:underline font-bold">Skilmálar</a>
          <div className="flex space-x-4">
            <a href="#" className="hover:underline font-bold">English</a>
            |
            <a href="#" className="hover:underline font-bold pl-6">Aðstoð</a>
          </div>
        </div>
      </div>

    );
  }
  
  