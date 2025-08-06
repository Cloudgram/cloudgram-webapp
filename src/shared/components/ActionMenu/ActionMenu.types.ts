export type ActionMenuItem = {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
};

export type ActionMenuProps = {
    items: ActionMenuItem[];
    isOpen: boolean;
};
