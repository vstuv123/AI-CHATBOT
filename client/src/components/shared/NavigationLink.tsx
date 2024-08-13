import { Link } from "react-router-dom";

type Props = {
  to: string;
  bg: string;
  text: string;
  textColor: string;
  onClick?: () => Promise<void>;
};

const NavigationLink = (props: Props) => {
  const { to, bg, text, textColor, onClick } = props;

  const handleClick = async (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (onClick) {
      event.preventDefault();
      await onClick();
    }
  };
  return (
    <Link
      className="nav-link"
      to={to}
      onClick={handleClick}
      style={{ background: bg, color: textColor }}
    >
      {text}
    </Link>
  );
};

export default NavigationLink;
