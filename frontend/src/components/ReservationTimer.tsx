import { useEffect, useState } from 'react';
import { Clock, ChevronUp, ChevronDown } from 'lucide-react';

const ReservationTimer = ({ onExpire, minutes = 10 }: { onExpire: () => void; minutes?: number }) => {
  const [seconds, setSeconds] = useState(minutes * 60);
  const [displayMinutes, setDisplayMinutes] = useState(minutes);
  const [showTimeSelector, setShowTimeSelector] = useState(false);

  useEffect(() => {
    if (seconds <= 0) {
      onExpire();
      return;
    }
    const interval = window.setInterval(() => setSeconds(prev => prev - 1), 1000);
    return () => window.clearInterval(interval);
  }, [seconds, onExpire]);

  const minutesLeft = Math.floor(seconds / 60);
  const remaining = seconds % 60;

  const addTime = (amount: number) => {
    const newMinutes = Math.min(displayMinutes + amount, 30);
    setDisplayMinutes(newMinutes);
    setSeconds(newMinutes * 60);
  };

  return (
    <div className="rounded-3xl border-2 border-mpesaGreen bg-mpesaGreen/5 p-5 text-center shadow-sm">
      <div className="flex items-center justify-center gap-2 mb-3">
        <Clock className="h-5 w-5 text-mpesaGreen" />
        <p className="text-sm font-bold text-mpesaGreen uppercase tracking-wider">Reserva activa</p>
      </div>
      
      <p className="text-4xl font-black text-mpesaGreen mb-4">{minutesLeft}:{remaining.toString().padStart(2, '0')}</p>
      
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() => addTime(-5)}
          disabled={displayMinutes <= 1}
          className="flex-1 rounded-2xl bg-slate-100 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-3 font-bold text-slate-700 transition flex items-center justify-center gap-1"
        >
          <ChevronDown className="h-4 w-4" />
          Menos
        </button>
        
        <div className="flex-1 rounded-2xl bg-white border-2 border-mpesaGreen py-3 px-3 font-bold text-mpesaGreen text-center">
          {displayMinutes} min
        </div>
        
        <button
          type="button"
          onClick={() => addTime(5)}
          disabled={displayMinutes >= 30}
          className="flex-1 rounded-2xl bg-mpesaGreen hover:bg-mpesaGreen/90 disabled:opacity-50 disabled:cursor-not-allowed px-3 py-3 font-bold text-white transition flex items-center justify-center gap-1"
        >
          <ChevronUp className="h-4 w-4" />
          Mais
        </button>
      </div>
    </div>
  );
};

export default ReservationTimer;
