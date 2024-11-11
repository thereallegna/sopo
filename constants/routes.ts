export const PATH_API = '/api';
export const PATH_BACKEND_URL = process.env.BACKEND_URL;
export const PATH_BACKEND_URL_VERSION = '/v1';

export const PATH_CONFIGURATION_GENERAL = `${PATH_API}/configuration/general`;

// login
export const PATH_AUTH_LOGIN = `${PATH_API}/login`;
export const PATH_AUTH_LOGIN_BE = `${PATH_BACKEND_URL}/login`;

// Logout
export const PATH_AUTH_LOGOUT = `${PATH_API}/logout`;
export const PATH_AUTH_LOGOUT_BE = `${PATH_BACKEND_URL}/logout`;

// country
export const PATH_COUNTRY = `${PATH_CONFIGURATION_GENERAL}/country`;
export const PATH_COUNTRY_BE = `${PATH_BACKEND_URL}${PATH_BACKEND_URL_VERSION}/country`;

// forgot password
export const PATH_AUTH_FORGOT_PASSWORD = `${PATH_API}/forgot-password`;
export const PATH_AUTH_FORGOT_PASSWORD_BE = `${PATH_BACKEND_URL}/forgot-password`;

// reset password
export const PATH_AUTH_RESET_PASSWORD = `${PATH_API}/reset-password`;
export const PATH_AUTH_RESET_PASSWORD_BE = `${PATH_BACKEND_URL}/reset-password`;
