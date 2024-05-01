interface HeaderProps {
  name: string;
}

const Header = (props: HeaderProps) => {
  return (
    <div>
      {" "}
      <h1>{props.name}</h1>
    </div>
  );
};

export default Header;
