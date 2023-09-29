import { useState } from 'react';

import { PhotoUpload } from '../photoUplod';
import { Calendar } from '../Calendar';
import { RangeSlider } from '../Input-range';
import { UniversalInput } from '../Universal-Input';

import { nameAndFornameValidator, emailValidator } from './helper';

export const PersonalInfo = () => {
  const [nameValue, setNameValue] = useState<string>('');
  const [lastNameValue, setLastNameValue] = useState<string>('');
  const [emailValue, setEmailValue] = useState<string>('');
  const [photoFile, setPhotoFile] = useState<string>('');
  const [sliderValue, setSliderValue] = useState<number>(8);
  const [appointment, setAppointment] = useState<Record<string, string>>({
    hour: '',
    date: '',
  });

  const [errorName, setErrorName] = useState<boolean>(false);
  const [errorLastName, setErrorLastName] = useState<boolean>(false);
  const [errorEmail, setErrorEmail] = useState<boolean>(false);

  const [resetChildValue, setResetChildValue] = useState<boolean>(false);

  const handlerNameValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNameValue(e.target.value);
    setErrorName(false);
  };

  const handlerLastNameValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastNameValue(e.target.value);
    setErrorLastName(false);
  };

  const handlerEmailValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
    setErrorEmail(false);
  };

  const resetForm = () => {
    setNameValue('');
    setLastNameValue('');
    setEmailValue('');
    setPhotoFile('');
    setSliderValue(8);
    setAppointment({ hour: '', date: '' });
    setErrorName(false);
    setErrorLastName(false);
    setErrorEmail(false);
    setResetChildValue(!resetChildValue);
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const isEmailValid = emailValidator(emailValue);
    setErrorEmail(!isEmailValid);

    const isNameValid = nameAndFornameValidator(nameValue);
    setErrorName(!isNameValid);

    const isLastNameValid = nameAndFornameValidator(lastNameValue);
    setErrorLastName(!isLastNameValid);

    if (
      !errorEmail &&
      !errorName &&
      !errorLastName &&
      nameValue &&
      lastNameValue &&
      emailValue
    ) {
      try {
        const dataToSend = {
          photo: photoFile,
          age: sliderValue,
          date: appointment,
          name: nameValue,
          forname: lastNameValue,
          email: emailValue,
        };

        const response = await fetch(
          'https://jsonplaceholder.typicode.com/posts',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
          },
        );

        if (response.ok) {
          console.log('Form submitted successfully');

          resetForm();

          setTimeout(() => {
            setResetChildValue(true);
          }, 1000);
        } else {
          console.error('Form submission failed');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };

  const passPhotoFile = (file: string) => {
    setPhotoFile(file);
  };

  const sliderInputValue = (value: number) => {
    setSliderValue(value);
  };

  const handleAppointmentChange = (calendarData: { hour: string }) => {
    setAppointment(calendarData);
  };

  return (
    <div className='bg-[#F0EAF8] h-auto  flex justify-center pb-4'>
      <div className='max-w-[426px] w-full  pl-6 pr-6 md:pr-0 md:pl-0'>
        <h2 className='text-2xl font-medium mt-24 md:mt-[120px] text-textPrimary'>
          Personal info
        </h2>
        <form className='mt-8' onSubmit={handleFormSubmit}>
          <div className='mt-6'>
            <UniversalInput
              id='name'
              label='First Name'
              type='text'
              value={nameValue}
              onChange={handlerNameValue}
              error={errorName}
              errorMessage={
                errorName ? 'Name have to contains min 3 letters' : ''
              }
            />
          </div>

          <div className='mt-6'>
            <UniversalInput
              id='lastName'
              label='Last Name'
              type='text'
              value={lastNameValue}
              onChange={handlerLastNameValue}
              error={errorLastName}
              errorMessage={
                errorLastName ? 'Last Name have to contains min 3 letters' : ''
              }
            />
          </div>

          <div className='mt-6'>
            <UniversalInput
              id='email'
              label='Email Address'
              type='text'
              value={emailValue}
              onChange={handlerEmailValue}
              error={errorEmail}
              errorMessage={
                errorEmail
                  ? `Please use correct formatting. \n
                     Example: address@email.com`
                  : ''
              }
            />
          </div>

          <div className='mt-6'>
            <RangeSlider
              sliderInputValue={sliderInputValue}
              resetValue={resetChildValue}
            />
          </div>

          <div className='mt-12'>
            <PhotoUpload
              passPhotoFile={passPhotoFile}
              resetValue={resetChildValue}
            />
          </div>

          <div className='mt-12'>
            <h3 className='text-2xl text-textPrimary font-medium'>
              Your workout
            </h3>

            <div className='mt-8'>
              <Calendar
                appointmentDate={handleAppointmentChange}
                resetValue={resetChildValue}
              />
            </div>
          </div>

          <input
            type='submit'
            value='Send Application'
            className={`text-inputBG text-[18px] w-full p-2 flex items-center justify-center rounded mt-12  ${
              nameValue &&
              lastNameValue &&
              emailValue &&
              photoFile &&
              appointment.data &&
              sliderValue >= 0 &&
              !errorEmail &&
              !errorName &&
              !errorLastName
                ? 'bg-submitActive hover:bg-submitHover cursor-pointer'
                : 'bg-submitInactive cursor-default'
            }`}
            disabled={
              !(
                nameValue &&
                lastNameValue &&
                emailValue &&
                photoFile &&
                appointment.data &&
                sliderValue >= 0 &&
                !errorEmail &&
                !errorName &&
                !errorLastName
              )
            }
          />
        </form>
      </div>
    </div>
  );
};
