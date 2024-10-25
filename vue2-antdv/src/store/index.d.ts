export type I_LOGIN_FORM_STATE = Partial<{
  username: string | null;
  password: string | null;
}>;

export type I_STORE_LOGIN_FORM_STATE = Partial<{
  ADMIN_STORAGE_TIME: string;
  ADMIN_IS_REMEMBER: boolean;
  ADMIN_LOGIN_FORM_STATE: I_LOGIN_FORM_STATE;

  TENANT_STORAGE_TIME: string;
  TENANT_IS_REMEMBER: boolean;
  TENANT_LOGIN_FORM_STATE: I_LOGIN_FORM_STATE;
}>;

export type I_USER_TOKENS = Partial<{
  mgToken: string;
  token: string;
}>;
export type I_USER_INFO_ROLE = Partial<{
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

export type I_USER_INFO = Partial<{
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
  roles: Role[];
  parentUserId: number;
  streetNo: string;
  admin: boolean;
}>;

export type I_STORE_USER_INFO = Partial<{
  USER_TOKENS: I_USER_TOKENS;
  USER_INFO: I_USER_INFO;
  USER_PERMISSIONS: string[];
}>;

export type I_ROUTER = any;
export type I_ROUTER_TAB = any;
export type I_STORE_SYSTEM = Partial<{
  COLLAPSED: boolean;
  ROUTERS: I_ROUTER[];
  ROUTER_TABS: I_ROUTER_TAB[];
  ACTIVE_ROUTER_TAB: I_ROUTER_TAB;
}>;
