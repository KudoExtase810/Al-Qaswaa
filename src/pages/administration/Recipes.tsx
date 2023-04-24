import { useEffect, useState } from "react";
import RecipeList from "../../components/administration/RecipeList";
import { RxMagnifyingGlass } from "react-icons/rx";
import { TbSoup } from "react-icons/tb";
import { RiCake3Line } from "react-icons/ri";
import { MdFilterListOff } from "react-icons/md";
import { db } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
function Recipes() {
    const [recipes, setRecipes] = useState<recipe[] | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [typeFilter, setTypeFilter] = useState<recipe["type"]>();

    useEffect(() => {
        const getRecipes = async () => {
            let list: recipe[] = [];
            try {
                const querySnapshot = await getDocs(collection(db, "recipes"));
                querySnapshot.forEach((doc) =>
                    list.push({ id: doc.id, ...doc.data() } as recipe)
                );
                setRecipes(list);
            } catch (error) {
                toast.error("Failed to get data.");
            }
        };
        getRecipes();
    }, []);
    const handleSearch = (string: string) => {
        setSearchQuery(string);
    };

    const handleTypeFilter = (type: recipe["type"]) => {
        setTypeFilter(type);
    };

    const resetFilters = () => {
        setSearchQuery("");
        setTypeFilter(undefined);
    };

    let filteredRecipes = recipes;

    // Apply search filter
    if (searchQuery) {
        filteredRecipes = (filteredRecipes || []).filter((recipe) =>
            recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    // Apply type filter
    if (typeFilter) {
        filteredRecipes = (filteredRecipes || []).filter(
            (recipe) => recipe.type === typeFilter
        );
    }

    return (
        <>
            <h2 className="text-6xl font-bold mb-1">Our recipes</h2>
            <div className="relative w-max">
                <input
                    placeholder="Search for a recipe.."
                    onChange={(e) => handleSearch(e.target.value)}
                    type="text"
                    name="search"
                    className="my-3 px-2 py-1 text-zinc-900 border border-zinc-400 hover:border-zinc-800 dark:bg-gray-800 dark:border-gray-900 dark:text-gray-100 focus:outline-2 focus:outline-blue-600 focus:border-blue-600 dark:focus:outline-orange-500 dark:focus:border-orange-500 rounded-md w-[350px] md:w-[600px]"
                />
                <button className="absolute top-0 bottom-0 right-2">
                    <RxMagnifyingGlass className="text-zinc-500" size={23} />
                </button>
            </div>
            <div className="flex justify-between">
                <div className="flex gap-2 items-center">
                    <button
                        className={`${
                            typeFilter === "Salty"
                                ? "text-amber-900"
                                : "text-amber-700"
                        } hover:text-amber-900`}
                        type="button"
                        aria-label="show salty only"
                        onClick={() => handleTypeFilter("Salty")}
                    >
                        <abbr title="Show salty only">
                            <TbSoup size={42} />
                        </abbr>
                    </button>
                    <button
                        className={`${
                            typeFilter === "Sweet"
                                ? "text-pink-700"
                                : "text-pink-500"
                        } hover:text-pink-700`}
                        type="button"
                        aria-label="show sweet only"
                        onClick={() => handleTypeFilter("Sweet")}
                    >
                        <abbr title="Show sweet only">
                            <RiCake3Line size={42} />
                        </abbr>
                    </button>
                    <button
                        className="text-gray-500 hover:text-zinc-700"
                        type="button"
                        aria-label="clear"
                        onClick={resetFilters}
                    >
                        <abbr title="Clear filters">
                            <MdFilterListOff size={42} />
                        </abbr>
                    </button>
                </div>
                <Link to="/administration/addrecipe">
                    <IoMdAdd
                        size={42}
                        className="text-zinc-900 hover:text-zinc-600 dark:text-zinc-200 dark:hover:text-zinc-400"
                    />
                </Link>
            </div>
            <RecipeList recipes={filteredRecipes!} />
        </>
    );
}

export default Recipes;
