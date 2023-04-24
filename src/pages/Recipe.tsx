import { useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config";
import { useEffect, useState, useRef } from "react";
import { FcPrint } from "react-icons/fc";
import ReactToPrint from "react-to-print";
import Loading from "../components/Loading";
function Recipe() {
    const [recipe, setRecipe] = useState<recipe>();

    const { id } = useParams();

    const recipeRef = useRef();

    useEffect(() => {
        const getRecipe = async () => {
            const recipeDoc = doc(db, "recipes", id!);
            const res = await getDoc(recipeDoc);
            setRecipe(res.data() as recipe);
        };
        getRecipe();
    }, []);
    if (!recipe)
        return (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Loading />
            </div>
        );
    return (
        <>
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14 border-b border-zinc-200 pb-4">
                {recipe.name}
            </h1>
            <article ref={recipeRef as any} className="print:ml-1 w-fit">
                <div className="flex justify-between py-4 items-center">
                    <h1 className="text-xl font-extrabold leading-9 tracking-tight dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-4xl md:leading-10">
                        {recipe.name}
                    </h1>
                    <ReactToPrint
                        trigger={() => (
                            <button type="button" className="print:hidden">
                                <FcPrint size={64} />
                            </button>
                        )}
                        content={() => recipeRef.current!}
                    />
                </div>
                <div>
                    <figure>
                        <img
                            src={recipe.imageURL}
                            alt={recipe.name}
                            className="rounded-md w-full max-w-[780px] "
                        />
                    </figure>
                    <p className="text-zinc-600 dark:text-zinc-400 w-[750px] my-3 print:hidden max-lg:w-full">
                        {recipe.description}
                    </p>
                </div>

                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-3">Ingredients</h2>
                    <ul className="list-disc list-inside text-gray-500 dark:text-gray-400 flex flex-col gap-2">
                        {recipe.ingredients.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                </div>
                <div>
                    <h2 className="text-2xl font-bold mb-3">Instructions</h2>
                    <ul className="list-disc list-inside text-gray-500 dark:text-gray-400 flex flex-col gap-2">
                        {recipe.instructions.map((instruction, index) => (
                            <li key={index}>{instruction}</li>
                        ))}
                    </ul>
                </div>
            </article>
        </>
    );
}

export default Recipe;
