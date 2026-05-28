const LoadingScreen = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-mpesaLight px-4 text-center">
      <div className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-mpesaRed border-t-transparent"></div>
        <p className="text-sm font-semibold text-mpesaGray">Carregando o SmartInfo...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
