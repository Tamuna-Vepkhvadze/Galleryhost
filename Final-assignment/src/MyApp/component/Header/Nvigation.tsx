import { Link } from "react-router-dom";

interface NavType {
  name: string;
  url: string;
}

const Navigation = () => {
  const navigation: NavType[] = [
    { name: "Home", url: "/" },
    { name: "About", url: "/About" },
    { name: "Contact", url: "/ContactPage" },
  ];

  return (
    <nav className="hidden md:flex items-center space-x-2">
      {navigation.map((item) => (
        <Link
          key={item.url}
          to={item.url}
          className="relative px-4 py-2 text-xl font-semibold text-[#c7b7ff] tracking-wide transition-all duration-500 hover:text-[#e8deff] hover:scale-110"
        >
          <span className="relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[3px] after:w-0 after:bg-[#bda9ff] after:rounded-full after:transition-all after:duration-500 hover:after:w-full hover:after:shadow-[0_0_10px_#bda9ff]">
            {item.name}
          </span>
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
