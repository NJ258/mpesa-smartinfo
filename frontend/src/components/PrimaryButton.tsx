import type { ButtonHTMLAttributes } from 'react';

const PrimaryButton = ({ children, className = '', ...props }: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      {...props}
      className={`inline-flex w-full items-center justify-center rounded-3xl bg-mpesaRed px-5 py-4 text-sm font-semibold text-white shadow-sm transition hover:bg-[#bf0000] ${className}`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
