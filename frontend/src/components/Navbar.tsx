import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="sticky top-0 z-30 border-b border-white/80 bg-white/95 px-4 py-3 backdrop-blur-sm sm:px-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-gray-500">SmartInfo</p>
          <p className="text-base font-semibold text-mpesaGray">Antes de sair.</p>
        </div>
        <Link to="/login" className="rounded-2xl border border-mpesaRed px-4 py-2 text-xs font-semibold text-mpesaRed transition hover:bg-mpesaRed/5">
          Agente/Admin
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
