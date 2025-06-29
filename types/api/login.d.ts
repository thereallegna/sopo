type LoginFormBody = {
    companyId?: string;
    user_code: string;
    password: string;
    keepUserId?: boolean;
};

type ForgotPasswordBody = {
    email: string;
};

type ResetPasswordBody = {
    new_password: string;
    confirm_password: string;
};
