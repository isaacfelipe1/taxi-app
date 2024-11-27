import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="bg-[#00b780] text-white p-2 rounded mb-4">{message}</div>
  );
};

export default ErrorMessage;
