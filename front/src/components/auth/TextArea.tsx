import { Text } from 'lucide-react';
import React from 'react';

type TextAreaProps = {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  label: string;
  error?: string;
};

const TextArea: React.FC<TextAreaProps> = ({
  id,
  value,
  onChange,
  label,
  error,
}) => {
  return (
    <div className="mb-4 relative">
      <label htmlFor={id} className="block text-sm font-medium text-white">
        {label}
      </label>
      <div className="mt-1 relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <Text size={20} className="text-indigo-500" />
        </div>
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          className={`mt-1 block w-full px-4 py-2 pl-10 border rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-gray-100 bg-gray-800 border-gray-700 transition-all duration-200 ease-in-out ${error ? 'border-red-600' : 'border-gray-600'}`}
        />
      </div>
      <p className="text-red-500 text-xs h-1 mt-1">{error}</p>
    </div>
  );
};

export default TextArea;
