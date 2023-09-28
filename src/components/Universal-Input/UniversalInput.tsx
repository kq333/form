import React from 'react';
import errorIcon from '../../assets/icons/error-icon.png';

interface Props {
  id: string;
  label: string;
  type: string;
  minLength?: number;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: boolean;
  errorMessage: string;
}

export const UniversalInput: React.FC<Props> = ({
  id,
  label,
  type,
  minLength,
  value,
  onChange,
  error,
  errorMessage,
}) => {
  const inputClasses = `border-2 focus:border-inputFocus focus:outline-none rounded-lg w-full h-12 pl-4 ${
    error ? 'border-inputError bg-errorBG' : 'border-inputDefault bg-inputBG'
  }`;

  return (
    <div>
      <div>
        <label htmlFor={id} className='text-textPrimary uppercase'>
          {label}
        </label>
      </div>
      <div className='w-[100%] sm:w-[426px] pt-2'>
        <input
          type={type}
          id={id}
          name={id}
          minLength={minLength}
          value={value}
          onChange={onChange}
          className={inputClasses}
        />
      </div>
      {error && errorMessage && (
        <p className='flex pt-2'>
          <img src={errorIcon} alt='error icon' className='h-[18px]' />
          <span className='pl-2 text-sm w-[260px] text-textPrimary'>
            {' '}
            {errorMessage}
          </span>
        </p>
      )}
    </div>
  );
};
