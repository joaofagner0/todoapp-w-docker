import React from 'react';
import { Mail, User, Lock, Text } from 'lucide-react';

type FieldInputProps = {
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  error?: string;
  icon?: 'mail' | 'user' | 'lock' | 'text';
};

const FieldInput: React.FC<FieldInputProps> = ({
  id,
  type,
  value,
  onChange,
  label,
  error,
  icon,
}) => {
  const renderIcon = () => {
    switch (icon) {
      case 'mail':
        return <Mail size={20} className="text-indigo-500" />;
      case 'user':
        return <User size={20} className="text-indigo-500" />;
      case 'lock':
        return <Lock size={20} className="text-indigo-500" />;
      case 'text':
        return <Text size={20} className="text-indigo-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="mb-6 relative">
      <label htmlFor={id} className="block text-sm font-medium text-white">
        {label}
      </label>
      <div className="mt-1 relative">
        {icon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            {renderIcon()}
          </div>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          className={`mt-1 block w-full px-4 py-2 pl-10 border rounded-lg shadow-lg focus:ring-indigo-500 focus:border-indigo-500 text-gray-100 bg-gray-800 border-gray-700 transition-all duration-200 ease-in-out ${error ? 'border-red-500' : 'hover:border-indigo-400'}`}
        />
      </div>
      <p className="text-red-500 text-xs h-1 mt-1">{error}</p>
    </div>
  );
};

export default FieldInput;
