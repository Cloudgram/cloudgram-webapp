export const generateUserIcon = (username: string, className: string): JSX.Element => {
    const initials = username.charAt(0).toUpperCase();

    return <div className={className}>{initials}</div>;
};
