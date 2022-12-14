const DEFAULT_API_LOCALHOST: string = 'http://54.249.2.212/api/v1';

export const usersIndex: string = `${DEFAULT_API_LOCALHOST}/users`;
export const usersShow = (userid: number) => `${DEFAULT_API_LOCALHOST}/users/${userid}`;
export const usersSignUp: string = `${DEFAULT_API_LOCALHOST}/users`;
export const usersLogin: string =  `${DEFAULT_API_LOCALHOST}/login`;
export const usersLogout: string =  `${DEFAULT_API_LOCALHOST}/logout`;
export const usersLoggedin: string = `${DEFAULT_API_LOCALHOST}/logged_in`;

export const groupChat = (language: any)  => `${DEFAULT_API_LOCALHOST}/message/${language}`;
export const roomsIndex = `${DEFAULT_API_LOCALHOST}/rooms`;
export const roomsCreateIndex = `${DEFAULT_API_LOCALHOST}/rooms`;
export const eachRoomsIndex = (userid: number) => `${DEFAULT_API_LOCALHOST}/rooms/${userid}`;
export const groupChatsIndex = (language:string) => `${DEFAULT_API_LOCALHOST}/rooms/groupchat/${language}`;

export const messageIndex: string = `${DEFAULT_API_LOCALHOST}/messages`;


