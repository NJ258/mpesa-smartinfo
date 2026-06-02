import type { ButtonHTMLAttributes } from 'react';

const PrimaryButton = ({ children, className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={`inline-flex w-full items-center justify-center rounded-3xl bg-gradient-to-r from-mpesaRed to-mpesaRed px-5 py-4 text-sm font-semibold text-white shadow-sm shadow-mpesaRed/20 transition hover:from-mpesaRed hover:to-mpesaRed hover:shadow-md hover:shadow-mpesaRed/30 active:scale-95 ${className}`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
