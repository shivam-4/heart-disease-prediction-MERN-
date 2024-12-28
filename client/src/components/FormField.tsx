import React from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  type?: 'number' | 'select';
  options?: Array<{ value: number; label: string }>;
  step?: string;
}

export default function FormField({ 
  label, 
  name, 
  value, 
  onChange, 
  type = 'number',
  options = [],
  step
}: FormFieldProps) {
  return (
    <div className="form-group space-y-2">
      <label className="block text-white text-sm md:text-base font-medium">
        {label}
      </label>
      {type === 'select' ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full px-3 py-2 md:px-4 md:py-2 rounded-lg bg-white/10 border border-white/30 
                   text-white text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          {options.map(option => (
            <option key={option.value} value={option.value} className='bg-white text-black '>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type="number"
          name={name}
          value={value}
          onChange={onChange}
          step={step}
          className="w-full px-3 py-2 md:px-4 md:py-2 rounded-lg bg-white/10 border border-white/30 
                   text-white text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      )}
    </div>
  );
}