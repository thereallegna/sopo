type LoginFormBody = {
  companyId?: string;
  user_code: string;
  password: string;
  keepUserId?: boolean;
};

type ResetPasswordBody = {
  new_password: string;
  confirm_password: string;
};
