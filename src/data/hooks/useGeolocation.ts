import { useState, useEffect } from "react";
import ErrorMessageConstant from "../commons/constants/message/ErrorMessageConstant";

interface Position {
  lat: number | null;
  lng: number | null;
  error: string | null;
}

const useGeolocation = (): Position => {
  const [position, setPosition] = useState<Position>({
    lat: null,
    lng: null,
    error: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setPosition({
        lat: null,
        lng: null,
        error: ErrorMessageConstant.geoLocationNotSupported,
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          error: null,
        });
      },
      (err) => {
        let message = ErrorMessageConstant.unableRetrieveLocation;

        switch (err.code) {
          case err.PERMISSION_DENIED:
            message = ErrorMessageConstant.locationPermissionDenied;
            break;
          case err.POSITION_UNAVAILABLE:
            message = ErrorMessageConstant.locationPermissionUnavailable;
            break;
          case err.TIMEOUT:
            message = ErrorMessageConstant.locationRequestTimeOut;
            break;
        }

        setPosition({
          lat: null,
          lng: null,
          error: message,
        });
      }
    );
  }, []);

  return position;
};

export default useGeolocation;
