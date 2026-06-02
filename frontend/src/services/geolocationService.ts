/**
 * Serviço de Geolocalização - obtém a localização exata do dispositivo
 */

export interface Location {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

export const getDeviceLocation = (): Promise<Location> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocalização não é suportada neste dispositivo'));
      return;
    }

    // Configurações para precisão alta
    const options = {
      enableHighAccuracy: true, // Usar GPS para melhor precisão
      timeout: 10000, // 10 segundos de timeout
      maximumAge: 0, // Não usar cache, obter localização em tempo real
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        resolve({
          latitude,
          longitude,
          accuracy,
          timestamp: position.timestamp,
        });
      },
      (error) => {
        let errorMessage = 'Erro desconhecido ao obter localização';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Permissão para acessar localização foi negada. Ative em Configurações > Privacidade.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Localização não disponível. Verifique o GPS e a conexão à internet.';
            break;
          case error.TIMEOUT:
            errorMessage = 'Timeout ao obter localização. Tente novamente.';
            break;
        }
        reject(new Error(errorMessage));
      },
      options
    );
  });
};

/**
 * Monitora a localização do dispositivo em tempo real
 * Útil para rastrear movimento contínuo
 */
export const watchDeviceLocation = (
  onLocationChange: (location: Location) => void,
  onError: (error: string) => void
): number | null => {
  if (!navigator.geolocation) {
    onError('Geolocalização não é suportada neste dispositivo');
    return null;
  }

  const options = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0,
  };

  const watchId = navigator.geolocation.watchPosition(
    (position) => {
      const { latitude, longitude, accuracy } = position.coords;
      onLocationChange({
        latitude,
        longitude,
        accuracy,
        timestamp: position.timestamp,
      });
    },
    (error) => {
      let errorMessage = 'Erro desconhecido ao obter localização';
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = 'Permissão para acessar localização foi negada.';
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = 'Localização não disponível.';
          break;
        case error.TIMEOUT:
          errorMessage = 'Timeout ao obter localização.';
          break;
      }
      onError(errorMessage);
    },
    options
  );

  return watchId;
};

/**
 * Para de monitorar a localização
 */
export const stopWatchingLocation = (watchId: number): void => {
  if (watchId !== null) {
    navigator.geolocation.clearWatch(watchId);
  }
};

/**
 * Calcula a distância entre duas coordenadas (em metros)
 * Usa a fórmula de Haversine
 */
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371000; // Raio da Terra em metros
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distância em metros
};
