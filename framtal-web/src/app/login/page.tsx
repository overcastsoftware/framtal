"use client";
import Image from "next/image";
import dynamic from 'next/dynamic';
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
function LoginForm() {
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

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen pb-20 sm:p-1 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] w-full row-start-2 items-center sm:items-start">
        <div className="flex flex-row gap-2 w-full justify-between items-center sm:items-center">
          <div className="flex flex-col gap-10 max-w-3xl">
            <div data-level="3" className="h-8 inline-flex justify-start items-center gap-2 overflow-hidden">
              <div data-state="Default" className="flex justify-start items-center gap-2.5">
                <div className="justify-center text-blue-600 text-sm font-semibold leading-none">Ísland.is</div>
              </div>
              <div className="w-1 h-1 bg-blue-600 rounded-full" />
              <div data-state="Default" className="flex justify-start items-center gap-2.5">
                <div className="justify-center text-blue-600 text-sm font-semibold leading-none">Skatturinn</div>
              </div>
              <div className="w-1 h-1 bg-blue-600 rounded-full" />
              <div data-color="Blue" data-filled="True" data-state="Default" className="p-2 bg-sky-50 rounded-lg flex justify-start items-center overflow-hidden">
                <div className="justify-end text-blue-600 text-sm font-semibold leading-none">skil á skattframtali</div>
              </div>
            </div>
            <h1 className="text-5xl text-color-primary-dark-400 font-bold">RSK 1.01 Skattframtal einstaklinga</h1>
            <p className="text-lg">Þú getur farið yfir, bætt við, breytt og skilað þegar þú ert tilbúin.</p>

            {/* Replace the alert box with the LoginForm component */}
            <LoginForm />
          </div>

          <button data-icon="True" data-size="Small" data-state="Default" data-type="Back button" className="py-1 max-w-fit bg-white shadow-[inset_0px_-1px_0px_0px_rgba(0,97,255,1.00)] inline-flex justify-start items-center gap-1 overflow-hidden">
            <div className="justify-end text-blue-600 text-sm font-semibold leading-none">Eldri framtöl</div>
          </button>
        </div>
      </main>
    </div>
  );
}