import {
    IconBuildingSkyscraper,
    IconLock,
    IconUser,
} from "@tabler/icons-react";

export const authConstant = {
    inputField: [
        {
            label: "Company ID",
            placeholder: "Input your company ID",
            start_icon: { icon: IconBuildingSkyscraper },
        },
        {
            label: "Usercode",
            placeholder: "Input your usercode",
            start_icon: { icon: IconUser },
        },
        {
            label: "Password",
            placeholder: "Input your password",
            start_icon: { icon: IconLock },
            type: "password",
        },
    ],
    checkbox: {
        label: "Keep User ID",
    },
};
