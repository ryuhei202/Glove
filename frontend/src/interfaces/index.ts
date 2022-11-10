//サインアップ
export interface SignUpData  {
  name: string
  gender: string
  language: string
  email: string
  password: string
};

//ログイン
export interface LogIn {
  email: string
  password: string
}

export interface LogInback {
  logged_in:boolean
  status:string
  user:User
}


//ログアウト
export interface LogOut {
  logged_in: boolean
  user: null
  status: number
}

//ユーザー
export interface User {
  id: number
  name: string
  email: string
  gender: string
  password: string
  self_introduction?: string
  profile_image?: string
  language: string
  created_at?: Date
  updated_at?: Date
}

// 現在のユーザー
export interface CurrentUser {
  data: {
    logged_in:boolean
    status:string
    user:User
  }
}

//編集
export interface UpDateUser  {
  name: string
  gender: string
  self_introduction?: string
};

export interface ChatRoom {
  room:Room
  other_users: Array<User>
  last_message: Message
}

export interface  Room {
  id:number
  room_name?:string
  created_at?: Date
  updated_at?: Date
} 

export interface Message {
  id:number
  room_id:number
  user_id:number
  message:string
  created_at?: Date
  updated_at?: Date
}
