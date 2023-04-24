import { Link } from "react-router-dom";
import { RiInstagramFill } from "react-icons/ri";
import { IoLogoYoutube } from "react-icons/io";
import { FaTiktok, FaTelegram } from "react-icons/fa";
import { SiFacebook } from "react-icons/si";
import socials from "../data/socials.json";
import { useLocation } from "react-router-dom";

function Footer() {
    const { pathname } = useLocation();
    if (pathname.includes("login")) return null;
    return (
        <footer className="print:hidden">
            <div className="flex flex-col items-center mt-16">
                <div className="flex mb-3 space-x-4">
                    <a href={socials.facebook} target="_blank">
                        {" "}
                        <SiFacebook
                            size={30}
                            className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-orange-500"
                        />{" "}
                    </a>
                    <a href={socials.youtube} target="_blank">
                        {" "}
                        <IoLogoYoutube
                            size={30}
                            className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-orange-500"
                        />{" "}
                    </a>
                    <a href={socials.telegram} target="_blank">
                        {" "}
                        <FaTelegram
                            size={30}
                            className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-orange-500"
                        />{" "}
                    </a>
                    <a href={socials.instagram} target="_blank">
                        {" "}
                        <RiInstagramFill
                            size={30}
                            className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-orange-500"
                        />{" "}
                    </a>

                    <a href={socials.tiktok} target="_blank">
                        {" "}
                        <FaTiktok
                            size={30}
                            className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-orange-500"
                        />{" "}
                    </a>
                </div>
                <div className="flex mb-2 space-x-2 text-sm text-gray-500 dark:text-gray-400">
                    <div>Made by AlaaKudo</div>
                    <div>{` • `}</div>
                    <div>{`© ${new Date().getFullYear()}`}</div>
                    <div>{` • `}</div>
                    <Link to="/">Al-Qaswaa</Link>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
