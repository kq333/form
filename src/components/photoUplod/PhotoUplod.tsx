import { useState, useCallback } from 'react';

import { useDropzone } from 'react-dropzone';
import fileIcon from '../../assets/icons/Vector.png';

interface Props {
  passPhotoFile: (file: string) => void;
}

export const PhotoUpload: React<Props> = ({ passPhotoFile }) => {
  const [fileName, setFileName] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const validateFileExtensions = (fileName) => {
    const validExtensions = ['.jpeg', '.jpg', '.png', '.gif'];
    const extension = fileName.slice(
      ((fileName.lastIndexOf('.') - 1) >>> 0) + 2,
    );

    return validExtensions.includes(`.${extension.toLowerCase()}`);
  };

  const onDrop = useCallback(
    (acceptedFiles) => {
      const filteredFiles = acceptedFiles.filter((file) => {
        if (validateFileExtensions(file.name)) {
          return true;
        } else {
          console.error(
            `Skipped '${file.name}' because it has an invalid file extension.`,
          );
          setErrorMessage(
            'Invalid file extension. Please upload only JPEG, JPG, PNG, or GIF files.',
          );
          return false;
        }
      });

      if (filteredFiles.length > 0) {
        passPhotoFile(filteredFiles[0].path);
        setFileName(filteredFiles[0].path);
        setErrorMessage('');
      }
    },
    [passPhotoFile, setErrorMessage],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const handleDeleteFile = (e) => {
    e.preventDefault();
    setFileName('');
    passPhotoFile('');
  };

  return (
    <div>
      <div>
        <div>Photo</div>
      </div>

      <div
        {...getRootProps()}
        className={`border-inputDefault border-2 rounded-lg flex justify-center items-center p-8 text-base bg-inputBG ${
          isDragActive ? 'bg-gray-100' : ''
        }`}
      >
        <input {...getInputProps()} />

        {!fileName.length ? (
          <>
            {errorMessage ? (
              <p className='text-inputError hover:cursor-pointer text-xs'>
                {errorMessage}
              </p>
            ) : (
              <>
                <p className='text-base text-[#761BE4] underline underline-offset-1 hover:cursor-pointer'>
                  Upload a file
                </p>
                <p className='pl-2 text-textSecond'>or drag and drop here</p>
              </>
            )}
          </>
        ) : (
          <p className='flex gap-2 items-center'>
            <img
              src={fileIcon}
              alt='icon'
              className='w-[20px] h-[20px] hover:cursor-pointer'
              onClick={handleDeleteFile}
            />

            {fileName}
          </p>
        )}
      </div>
    </div>
  );
};
