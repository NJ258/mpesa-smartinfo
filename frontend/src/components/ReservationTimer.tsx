import { useEffect, useState } from 'react';

const ReservationTimer = ({ onExpire }: { onExpire: () => void }) => {
  const [seconds, setSeconds] = useState(600);

  useEffect(() => {
    if (seconds <= 0) {
      onExpire();
      return;
    }
    const interval = window.setInterval(() => setSeconds(prev => prev - 1), 1000);
    return () => window.clearInterval(interval);
  }, [seconds, onExpire]);

  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 text-center shadow-sm">
      <p className="text-sm font-semibold text-mpesaGray">Reserva activa por 10 minutos</p>
      <p className="mt-2 text-2xl font-bold text-mpesaRed">{minutes}:{remaining.toString().padStart(2, '0')}</p>
    </div>
  );
};

export default ReservationTimer;
