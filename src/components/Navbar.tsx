import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { GiKnifeFork } from "react-icons/gi";
import { FaBars, FaTimes } from "react-icons/fa";

interface props {
    useDarkMode: boolean;
    setUseDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

function Navbar({ useDarkMode, setUseDarkMode }: props) {
    const location = useLocation();
    const { pathname } = location;

    const [showMenu, setShowMenu] = useState(false);

    return (
        <nav className="flex items-center justify-around p-10 max-md:justify-between">
            <div>
                <Link to="/" className="flex gap-2 items-center">
                    <GiKnifeFork
                        size={50}
                        className="text-blue-500 dark:text-orange-500"
                    />
                    <span className="text-2xl font-semibold">Al-Qaswaa</span>
                </Link>
            </div>
            <div className="relative ">
                <div className="flex gap-2 md:hidden">
                    <button
                        type="button"
                        onClick={() => setUseDarkMode(!useDarkMode)}
                    >
                        {useDarkMode ? <span>☀️</span> : <span>🌙</span>}
                    </button>
                    <button
                        type="button"
                        onClick={() => setShowMenu(!showMenu)}
                    >
                        {showMenu ? (
                            <FaTimes size={32} />
                        ) : (
                            <FaBars size={32} />
                        )}
                    </button>
                </div>
                <ul
                    onClick={() => setShowMenu(false)}
                    className={`flex items-center max-md:rounded-sm md:gap-8 max-md:flex-col max-md:absolute max-md:z-50 max-md:top-0 max-md:right-0 max-md:bg-zinc-300 max-md:mt-[48px] max-md:py-3 max-md:text-xl max-md:font-bold max-md:dark:bg-zinc-500 max-md:${
                        !showMenu && "hidden"
                    }`}
                >
                    <li className="max-md:py-2 max-md:px-3">
                        <Link
                            to="/recipes"
                            className={`hover:text-blue-600 dark:hover:text-orange-500 ${
                                pathname === "/recipes" &&
                                "text-blue-600 dark:text-orange-500"
                            }`}
                        >
                            Home
                        </Link>
                    </li>
                    {pathname.includes("/administration") && (
                        <li className="max-md:py-2 max-md:px-3">
                            <Link
                                to="/administration/recipes"
                                className={`hover:text-blue-600 dark:hover:text-orange-500 ${
                                    pathname === "/administration/recipes" &&
                                    "text-blue-600 dark:text-orange-500"
                                }`}
                            >
                                Home (As Admin)
                            </Link>
                        </li>
                    )}

                    {pathname.includes("administration") || (
                        <li className="max-md:py-2 max-md:px-3">
                            <button
                                onClick={() =>
                                    window.scrollTo(
                                        0,
                                        document.body.scrollHeight
                                    )
                                }
                            >
                                <a className="hover:text-blue-600 dark:hover:text-orange-500">
                                    Contact
                                </a>
                            </button>
                        </li>
                    )}
                    <li className="max-md:hidden">
                        <button
                            type="button"
                            onClick={() => setUseDarkMode(!useDarkMode)}
                        >
                            {useDarkMode ? <span>☀️</span> : <span>🌙</span>}
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
