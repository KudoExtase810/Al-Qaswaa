import SingleRecipe from "./SingleRecipe";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Loading from "../Loading";

interface props {
    recipes: recipe[] | null;
}

function RecipeList({ recipes }: props) {
    if (recipes?.length === 0) return <div>No recipes to show.</div>;
    if (!recipes)
        return (
            <div className="mx-auto h-72 flex justify-center items-center">
                <Loading />
            </div>
        );

    const [parent] = useAutoAnimate();

    return (
        <ul
            ref={parent}
            className="flex flex-col gap-12 pt-4 mt-6 border-t border-zinc-400"
        >
            {recipes!.map((recipe: recipe) => (
                <SingleRecipe recipe={recipe} key={recipe.id} />
            ))}
        </ul>
    );
}

export default RecipeList;
