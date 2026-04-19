import Link from "next/link";

import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const socials = [
  { icon: <FaGithub />, path: "https://github.com/AdnanGhani07" },
  { icon: <FaLinkedin />, path: "https://www.linkedin.com/in/adnanghani07/" },
  { icon: <FaTwitter />, path: "https://x.com/Adnan_Ghani_7" },
];

const Socials = ({ containerStyles, iconStyles }) => {
  return (
    <div className={containerStyles}>
      {socials.map((item, index) => {
        return (
          <Link key={index} href={item.path} className={iconStyles}>
            {item.icon}
          </Link>
        );
      })}
    </div>
  );
};

export default Socials;
