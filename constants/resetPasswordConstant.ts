import { IconLock } from '@tabler/icons-react';

export const resetPasswordConstant = {
  inputFields: [
    {
      label: 'New Password',
      placeholder: 'Input your new password',
      start_icon: { icon: IconLock },
      type: 'password',
    },
    {
      label: 'Confirm Password',
      placeholder: 'Confirm your new password',
      start_icon: { icon: IconLock },
      type: 'password',
    },
  ],
  button: {
    label: 'Reset Password',
  },
};
