import React from 'react';
import { Control, Controller, FieldError, FieldValues, Path, RegisterOptions } from 'react-hook-form';

type FormFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  control: Control<T>;
  rules?: RegisterOptions;
  error?: FieldError;
  type?: string;
  placeholder?: string;
  className?: string;
  onChange?: (value: any) => void;
  options?: { value: string; label: string }[];
};

const FormField = <T extends FieldValues>({
  name,
  label,
  control,
  rules,
  error,
  type = 'text',
  placeholder = '',
  className = '',
  onChange,
  options
}: FormFieldProps<T>) => {
  const baseInputClassName = "w-full px-3 py-2 border-2 border-blue-200 font-bold rounded-md bg-blue-50";
  const inputClassName = className ? `${baseInputClassName} ${className}` : baseInputClassName;

  return (
    <div>
      <label className="block text-sm font-bold text-blue-600 mb-1">
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => {
          if (type === 'select' && options) {
            return (
              <select
                className={inputClassName}
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  onChange && onChange(e.target.value);
                }}
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            );
          }
          
          return (
            <input
              type={type}
              placeholder={placeholder}
              className={inputClassName}
              {...field}
              onChange={(e) => {
                // For numeric fields, convert to number
                if (type === 'tel' || type === 'number') {
                  field.onChange(parseInt(e.target.value) || 0);
                } else {
                  field.onChange(e.target.value);
                }
                onChange && onChange(field.value);
              }}
            />
          );
        }}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error.message}</p>
      )}
    </div>
  );
};

export default FormField;