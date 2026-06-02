const LoadingScreen = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-mpesaLight to-white px-4 text-center">
      <div className="rounded-3xl border-2 border-mpesaGreen/20 bg-white p-8 shadow-lg shadow-mpesaGreen/10">
        <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-mpesaGreen border-t-mpesaRed mx-auto"></div>
        <p className="text-sm font-semibold text-mpesaGray">Carregando o SmartInfo...</p>
        <div className="mt-3 flex gap-1 justify-center">
          <div className="h-2 w-2 rounded-full bg-mpesaRed animate-pulse"></div>
          <div className="h-2 w-2 rounded-full bg-mpesaGreen animate-pulse animation-delay-100"></div>
          <div className="h-2 w-2 rounded-full bg-mpesaRed animate-pulse animation-delay-200"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
