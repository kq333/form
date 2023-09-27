import { useState, useEffect } from 'react';

import errorIcon from '../../assets/icons/error-icon.png';
import { PhotoUpload } from '../photoUplod';

export const PersonalInfo = () => {
  const [nameValue, setNameValue] = useState('');
  const [lastNameValue, setLastNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');

  const [sliderValue, setSliderValue] = useState(0);
  const [popupPosition, setPopupPosition] = useState(0);

  const handlerNameValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
  };

  const handlerLastNameValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastNameValue(e.target.value);
  };

  const handlerEmailValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };

  const handlerRangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setSliderValue(value);
  };

  useEffect(() => {
    const sliderWidth = 400;
    const offsetLeft = (sliderValue / 100) * sliderWidth;

    setPopupPosition(offsetLeft);
  }, [sliderValue]);

  return (
    <div className='bg-[#F0EAF8] h-screen w-screen flex justify-center'>
      <div className='max-w-[426px] w-full  pl-6 pr-6 md:pr-0 md:pl-0'>
        <h2 className='text-2xl font-medium mt-[120px]'>Personal info</h2>
        <form className='mt-12'>
          <div>
            <div>
              <label htmlFor='name'>First Name</label>
            </div>
            <div className='w-[100%] sm:w-[426px]'>
              <input
                type='text'
                id='name'
                name='name'
                minLength={3}
                value={nameValue}
                onChange={handlerNameValue}
                className='border-inputDefault border-2 focus:border-inputFocus focus:outline-none error:border-inputError rounded-lg w-full h-12 pl-4'
              />
            </div>
          </div>

          <div className='mt-6'>
            <div>
              <label htmlFor='name'>last Name</label>
            </div>
            <div className='w-[100%] sm:w-[426px]'>
              <input
                type='text'
                id='name'
                name='name'
                minLength={3}
                value={lastNameValue}
                onChange={handlerLastNameValue}
                className='border-inputDefault border-2 focus:border-inputFocus focus:outline-none error:border-inputError rounded-lg w-full h-12 pl-4'
              />
            </div>
          </div>

          <div className='mt-6'>
            <div>
              <label htmlFor='name'>Email Adress</label>
            </div>
            <div className='w-[100%] sm:w-[426px]'>
              <input
                type='text'
                id='name'
                name='name'
                minLength={3}
                value={emailValue}
                onChange={handlerEmailValue}
                className='border-inputDefault border-2 focus:border-inputFocus focus:outline-none error:border-inputError rounded-lg w-full h-12 pl-4'
              />
            </div>
            <p className='flex pt-2'>
              <span className='pt-1'>
                {' '}
                <img src={errorIcon} alt='error icon' />
              </span>

              <span className='pl-2 text-sm'>
                Please use correct formatting. <br /> Example: address@email.com
              </span>
            </p>
          </div>

          <div className='mt-6 relative'>
            <div>
              <label htmlFor='name'>Age</label>
            </div>
            <div className='w-[100%] sm:w-[426px] '>
              <div className='flex justify-between text-xs pt-7'>
                <div>8</div>
                <div>100</div>
              </div>
              <input
                type='range'
                id='name'
                name='name'
                minLength={8}
                maxLength={100}
                step={1}
                value={sliderValue}
                onChange={handlerRangeValue}
                className='border-inputDefault border-2 focus:border-inputFocus focus:outline-none error:border-inputError rounded-lg w-full h-12 pl-4 range  accent-[#CBB6E5]  '
              />
            </div>

            <div
              className='bg-gray-800 red-white   rounded-lg absolute max-w-[426px]'
              style={{ left: `${popupPosition}px` }}
            >
              {sliderValue}
            </div>
          </div>

          <div className='mt-12'>
            <PhotoUpload />
       
          </div>
        </form>
      </div>
    </div>
  );
};
