class ErrorMessageConstant {
  static errorDefault: string =
    "Something went wrong. Please try again shortly.";
  static geoLocationNotSupported: string =
    "Geolocation is not supported by your browser.";
  static unableRetrieveLocation: string = "Unable to retrieve your location.";
  static locationPermissionDenied: string =
    "Location permission was denied. Please allow access.";
  static locationPermissionUnavailable: string =
    "Location information is unavailable.";
  static locationRequestTimeOut: string =
    "The request to get your location timed out.";
  static noUserFound: string = "No users found.";
}

export default ErrorMessageConstant;
