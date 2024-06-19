export interface TUserName {
  firstName: string;
  middleName?: string;
  lastName: string;
}

export type TRole = "admin" | "user";

export interface TUser {
  name: TUserName;
  email: string;
  password: string;
  phone: string;
  role: TRole;
  address: string;
}
