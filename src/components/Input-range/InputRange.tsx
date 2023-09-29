import React, { useState, ChangeEvent, useEffect } from 'react';
import recangleIcon from '../../assets/icons/Union.svg';

interface Props {
  sliderInputValue: (value: number) => void;
  resetValue: boolean;
}

export const RangeSlider: React.FC<Props> = ({
  sliderInputValue,
  resetValue,
}) => {
  const [sliderValue, setSliderValue] = useState<number>(8);

  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSliderValue(+e.target.value);
    sliderInputValue(+e.target.value);
  };

  useEffect(() => {
    setSliderValue(8);
  }, [resetValue]);

  const indicatorStyle = {
    left: `calc(${sliderValue}% - 1rem)`,
  };

  return (
    <div className='relative w-full'>
      <label htmlFor='range' className='text-textPrimary'>
        Age
      </label>
      <input
        type='range'
        min='8'
        max='100'
        value={sliderValue}
        onChange={handleSliderChange}
        className='w-full h-1 bg-inputDefault rounded-md appearance-none
        bg-transparent [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-inputDefault,
        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[16px] [&::-webkit-slider-thumb]:w-[16px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-inputFocus
        '
      />
      <div
        className={`${
          sliderValue < 70
            ? `w-10 text-white text-xs px-1 py-1 rounded absolute top-0 transform -translate-x-3/4  mt-12  ${
                sliderValue <= 32 ? 'ml-1   md:ml-[-3px] ' : 'md:ml-0'
              }`
            : 'w-10 text-white text-xs px-1 py-1 rounded absolute top-0 transform -translate-x-3/4  mt-12 xl:ml-4  ml-3'
        }`}
        style={indicatorStyle}
      >
        <div className='z-10 absolute pl-2 pt-3 h-[37px] w-[31px] text-center '>
          {sliderValue}
        </div>
        <img src={recangleIcon} className='absolute' alt='Rectangle Icon' />
      </div>
    </div>
  );
};
