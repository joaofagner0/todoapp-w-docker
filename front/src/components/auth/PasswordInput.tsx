import React, { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

type PasswordInputProps = {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  error?: string;
};

const PasswordInput: React.FC<PasswordInputProps> = ({
  id,
  value,
  onChange,
  label,
  error,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <div className="mb-6 relative">
      <label htmlFor={id} className="block text-sm font-medium text-gray-100">
        {label}
      </label>
      <div className="mt-1 relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <Lock size={20} className="text-indigo-500" />
        </div>

        <input
          id={id}
          type={isPasswordVisible ? "text" : "password"}
          value={value}
          onChange={onChange}
          className={`mt-1 block w-full px-4 py-2 pl-10 pr-10 border rounded-lg shadow-lg focus:ring-indigo-500 focus:border-indigo-500 text-gray-100 bg-gray-800 border-gray-700 transition-all duration-200 ease-in-out ${error ? "border-red-500" : "hover:border-indigo-400"}`}
        />

        <div
          className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          onClick={togglePasswordVisibility}
          aria-label={isPasswordVisible ? "Ocultar senha" : "Mostrar senha"}
        >
          {isPasswordVisible ? (
            <EyeOff size={20} className="text-indigo-500" />
          ) : (
            <Eye size={20} className="text-indigo-500" />
          )}
        </div>
      </div>

      <p className="text-red-500 text-xs h-1 mt-1">{error}</p>
    </div>
  );
};

export default PasswordInput;
