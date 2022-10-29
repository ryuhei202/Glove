const DEFAULT_API_LOCALHOST: string = 'http://localhost:3000/api/v1';

export const usersIndex: string = `${DEFAULT_API_LOCALHOST}/users`;
export const usersShow = (userid: number) => `${DEFAULT_API_LOCALHOST}/users/${userid}`;
export const usersSignUp: string = `${DEFAULT_API_LOCALHOST}/users`;
export const usersLogin: string =  `${DEFAULT_API_LOCALHOST}/login`;
export const usersLogout: string =  `${DEFAULT_API_LOCALHOST}/logout`;
export const usersLoggedin: string = `${DEFAULT_API_LOCALHOST}/logged_in`;

export const groupChat = (language: any)  => `${DEFAULT_API_LOCALHOST}/message/${language}`;
export const roomsIndex: string = `${DEFAULT_API_LOCALHOST}/rooms`;


