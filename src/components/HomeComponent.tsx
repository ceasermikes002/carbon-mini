import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const HomeComponent: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [loginPin, setLoginPin] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); 

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileNumber.trim() === "" || loginPin.trim() === "") {
      alert("Please fill out all fields.");
      return;
    }

    setLoading(true);

    // Simulate an API call or async operation
    setTimeout(() => {
      console.log("Submitted Mobile Number:", mobileNumber);
      console.log("Submitted Login Pin:", loginPin);
      setLoading(false);
      navigate('/verify'); // Navigate to /verify on success
    }, 1000); // Simulating async operation with setTimeout
  };

  // Handle phone number input
  const handleMobileNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{0,11}$/.test(value)) {
      setMobileNumber(value);
    }
  };

  // Handle login pin input
  const handleLoginPinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setLoginPin(value);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-between p-4">
      {/* Question Mark Icon */}
      <div className="absolute top-4 right-4 w-8 h-8 text-2xl cursor-pointer rounded-full flex items-center justify-center">
        <QuestionMarkCircleIcon className="h-6 w-6 text-gray-600" />
      </div>

      {/* Main Content */}
      <div className="flex flex-col gap-10 max-w-md mx-auto bg-white p-6">
        <h1 className="text-3xl font-bold text-center">Sign in to Carbon!</h1>
        <div className="flex flex-row gap-4 items-center justify-center">
          <span className="text-gray-500 text-xs sm:text-sm">
          </span>
          <p className="text-gray-700 text-xs sm:text-sm text-center">
            Complete your details below to continue to your Carbon account.
          </p>
        </div>
        <hr className="my-4" />
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 sm:gap-9">
          <label htmlFor="mobileNumber" className="flex flex-col">
            <span className="text-sm font-semibold mb-1 flex">Mobile number</span>
            <input
              type="text"
              id="mobileNumber"
              placeholder="XXXXXXXXXXX"
              value={mobileNumber}
              onChange={handleMobileNumberChange}
              className="border rounded-lg p-2 bg-gray-200 text-sm sm:text-base"
              maxLength={11} // Ensure no more than 11 digits
              required // Make this field required
            />
          </label>
          <label htmlFor="loginPin" className="relative flex flex-col">
            <span className="text-sm font-semibold mb-1 flex">Login PIN</span>
            <input
              type={showPassword ? "text" : "password"}
              id="loginPin"
              value={loginPin}
              onChange={handleLoginPinChange}
              className="border rounded-lg p-2 pr-10 bg-gray-200 text-sm sm:text-base"
              maxLength={6} // Assuming pin length of 6 digits
              required // Make this field required
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer pt-5"
            >
              {showPassword ? (
                <EyeSlashIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-500" />
              )}
            </div>
          </label>
          <button
            type="submit"
            className={`bg-[#a3a3a3] text-white py-2 rounded-lg font-semibold transition text-sm sm:text-base ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
          <button className="text-[#5f40b0] hover:border-2 border-[#5f40b0] font-semibold transition-all p-2 rounded-lg text-sm sm:text-base">
            Forgot PIN
          </button>
        </form>
      </div>

      {/* Sign Up Button */}
      <div className="text-center py-4">
        <button className="py-2 w-full text-black hover:bg-[#5f40b0] hover:text-white sm:w-[40%] rounded-lg border-[3px] border-[#5f40b0] mb-8 px-10 text-sm sm:text-base">
          Sign up to Carbon
        </button>
      </div>
    </div>
  );
};

export default HomeComponent;
