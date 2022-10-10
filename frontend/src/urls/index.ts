const DEFAULT_API_LOCALHOST = 'http://localhost:3000/api/v1';

export const usersIndex = `${DEFAULT_API_LOCALHOST}/users`;
export const usersShow = (userid: number) => `${DEFAULT_API_LOCALHOST}/users/${userid}`;
