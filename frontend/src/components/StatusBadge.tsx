import type { ReactNode } from 'react';

const StatusBadge = ({ status, children }: { status: 'online' | 'offline' | 'waiting' | 'success'; children: ReactNode }) => {
  const classes = {
    online: 'bg-mpesaGreen text-white',
    offline: 'bg-mpesaError text-white',
    waiting: 'bg-mpesaYellow text-mpesaGray',
    success: 'bg-[#1d4ed8] text-white'
  };

  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${classes[status]}`}>{children}</span>;
};

export default StatusBadge;
