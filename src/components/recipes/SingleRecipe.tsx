import { Link } from "react-router-dom";

interface props {
    recipe: recipe;
}

function SingleRecipe({ recipe }: props) {
    return (
        <li className="">
            <h3 className="text-2xl font-bold md:hidden">
                <Link to={`/recipes/${recipe.id}`}>{recipe.name}</Link>
            </h3>
            <span className="text-blue-600 dark:text-orange-500 md:hidden">
                {recipe.type}
            </span>
            <Link to={`/recipes/${recipe.id}`}>
                <img
                    src={recipe.imageURL}
                    alt={recipe.name}
                    className="md:float-left w-full rounded-md md:mr-4 md:w-[250px] max-md:mt-1 max-md:mb-3 max-md:mx-auto"
                    // width={250}
                    // height={160}
                />
            </Link>

            <h3 className="text-2xl font-bold max-md:hidden">
                <Link to={`/recipes/${recipe.id}`}>{recipe.name}</Link>
            </h3>
            <span className="text-blue-600  dark:text-orange-500 max-md:hidden">
                {recipe.type}
            </span>
            <p className="text-gray-500 dark:text-gray-400">
                {recipe.description}
            </p>
        </li>
    );
}

export default SingleRecipe;
