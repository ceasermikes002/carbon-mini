import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import { QuestionMarkCircleIcon, PhoneIcon } from '@heroicons/react/24/outline';

const OtpComponent = () => {
  const [seconds, setSeconds] = useState(60);
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setInterval(() => {
        setSeconds(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setIsResendEnabled(true);
    }
  }, [seconds]);

  const handleResendCode = () => {
    setSeconds(60);
    setIsResendEnabled(false);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = event.target.value;
    
    // Ensure only numbers are allowed
    if (/^\d*$/.test(value)) {
      if (value.length > 0 && index < inputs.current.length - 1) {
        inputs.current[index + 1]?.focus();
      } else if (value.length === 0 && index > 0) {
        inputs.current[index - 1]?.focus();
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (event.key === 'Backspace' && index > 0 && !event.currentTarget.value) {
      inputs.current[index - 1]?.focus();
    }
  };

  const formatTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative min-h-screen p-4 space-y-14">
      {/* Question Mark Icon */}
      <div className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center">
        <QuestionMarkCircleIcon className="h-6 w-6 text-gray-600" />
      </div>

      {/* Main Content */}
      <div className="max-w-md mx-auto bg-white p-6 mt-12 gap-9 flex flex-col">
        <h1 className="text-3xl font-bold mb-4 flex">Enter OTP code to verify</h1>
        <div className="flex items-start mb-6 gap-4">
          {/* Phone Icon */}
          <PhoneIcon className="h-6 w-6 text-gray-500" />
          {/* Text */}
          <p className="text-gray-700 flex-1">
            Enter the 6-digit code we just sent to your SMS<span className="text-[#5f40b0] font-semibold cursor-pointer">(Change)</span>
          </p>
        </div>
        <hr className="mb-6" />

        {/* OTP Input Fields */}
        <div className="flex justify-center gap-2 mb-6">
          {[...Array(6)].map((_, index) => (
            <input
              key={index}
              type="text"
              maxLength={1}
              ref={el => inputs.current[index] = el}
              className="w-12 h-12 text-center bg-gray-100 border rounded-lg focus:outline-none"
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              inputMode="numeric"
              pattern="[0-9]*"
              onInput={(e) => {
                const input = e.target as HTMLInputElement;
                // Remove non-numeric characters
                input.value = input.value.replace(/\D/g, '');
              }}
            />
          ))}
        </div>

        {/* Resend Code Section */}
        <div className="text-center mt-6">
          <p className="text-gray-700">
            {isResendEnabled ? (
              <button
                onClick={handleResendCode}
                className=""
              >
                Didn&apos;t receive the code? <span className='font-bold'>Resend</span>
              </button>
            ) : (
              `Resend in ${formatTime(seconds)}`
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default OtpComponent;
