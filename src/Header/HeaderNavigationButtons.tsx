import './Header.css';

export interface HeaderNavigationButtonProps {
    label: string;
    isSelected?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const HeaderNavigationButton = ({ label, isSelected, onClick }: HeaderNavigationButtonProps) => {
    return (
        <button
            type="button"
            className={`HeaderNavButton${isSelected ? ' HeaderNavButton--selected' : ''}`}
            onClick={onClick}
        >
            <span className="NavigationItemLabel">{label}</span>
        </button>
    );
};

export default HeaderNavigationButton;
