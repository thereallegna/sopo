import { IconLock } from "@tabler/icons-react";

export const resetPasswordConstant = {
    inputFields: [
        {
            label: "New Pass",
            placeholder: "Input your new password",
            start_icon: { icon: IconLock },
            type: "password",
        },
        {
            label: "Confirm Pass",
            placeholder: "Confirm your new password",
            start_icon: { icon: IconLock },
            type: "password",
        },
    ],
    button: {
        label: "Reset Password",
    },
};
