export const removeAuthorization = (
    userData?: UserData | null
): UserData | null | undefined => {
    if (!userData) return userData;
    const updatedUserData = { ...userData };
    delete updatedUserData.authorization;
    return updatedUserData;
};
