/** @format */
// apis
// hooks
// utils
// stores
// mixins
// configs
// components
// 登陆信息
export type ILoginFormState = Partial<{
  username: string;
  password: string;
  [key: string]: any;
}>;
// 用户的token等信息
export type ILoginToken = Partial<{
  token: string;
  mgToken: string;
  regionNo: string;
  [key: string]: any;
}>;
// 用户权限
type IRole = Partial<{
  roleId: number;
  roleName: string;
  roleKey: string;
  roleSort: number;
  dataScope: string;
  menuCheckStrictly: boolean;
  deptCheckStrictly: boolean;
  status: string;
  flag: boolean;
  admin: boolean;
}>;
// 用户的个人信息
export type IUserinfo = Partial<{
  createBy: string;
  createTime: string;
  userId: number;
  userName: string;
  nickName: string;
  userType: string;
  email: string;
  phonenumber: string;
  sex: string;
  avatar: string;
  password: string;
  status: string;
  delFlag: string;
  loginIp: string;
  loginDate: number;
  admin: boolean;
  roles: Role[];
  [key: String]: any;
}>;
