import { Link } from "react-router-dom";
import { db } from "../../firebase-config";
import { deleteDoc, doc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { storage } from "../../firebase-config";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";

interface props {
    recipe: recipe;
}

const handleDelete = async (recipeId: string, imageName: string) => {
    try {
        //delete the recipe from the db
        const recipeDoc = doc(db, "recipes", recipeId);
        await deleteDoc(recipeDoc);

        //delete the recipe image from storage

        const imgRef = ref(storage, imageName);
        await deleteObject(imgRef);

        toast.success("Recipe deleted successfully!");
    } catch {
        toast.error("Failed to delete recipe.");
    }
};

function SingleRecipe({ recipe }: props) {
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    useEffect(() => {
        if (showDeleteConfirmation) {
            document.body.classList.add("overflow-y-hidden");
        } else {
            document.body.classList.remove("overflow-y-hidden");
        }
    }, [showDeleteConfirmation]);

    return (
        <li>
            {showDeleteConfirmation && (
                <div className="bg-zinc-600 dark:bg-zinc-400 opacity-80 fixed h-screen w-screen inset-0 z-10"></div>
            )}
            <div className="flex justify-between md:hidden">
                <h3 className="text-2xl font-bold ">
                    <Link to={`/recipes/${recipe.id}`}>{recipe.name}</Link>
                </h3>
                <button
                    type="button"
                    aria-label="delete recipe"
                    onClick={() =>
                        setShowDeleteConfirmation(!showDeleteConfirmation)
                    }
                >
                    <MdDeleteForever
                        size={36}
                        className="text-red-600 dark:text-red-500 hover:text-red-400"
                    />
                </button>
            </div>
            <span className="text-blue-600 dark:text-orange-500 md:hidden">
                {recipe.type}
            </span>
            <Link to={`/recipes/${recipe.id}`}>
                <img
                    src={recipe.imageURL}
                    alt={recipe.name}
                    className="md:float-left w-full rounded-md md:mr-4 md:w-[250px] max-md:mt-1 max-md:mb-3 max-md:mx-auto"
                    width={250}
                    height={160}
                />
            </Link>
            <div>
                <div className="flex justify-between">
                    <h3 className="text-2xl font-bold max-md:hidden">
                        <Link to={`/recipes/${recipe.id}`}>{recipe.name}</Link>
                    </h3>
                    <button
                        type="button"
                        aria-label="delete recipe"
                        onClick={() =>
                            setShowDeleteConfirmation(!showDeleteConfirmation)
                        }
                    >
                        <MdDeleteForever
                            size={36}
                            className="text-red-600 hover:text-red-400 max-md:hidden"
                        />
                    </button>
                </div>
                <span className="text-blue-600 dark:text-orange-500 max-md:hidden">
                    {recipe.type}
                </span>
                <p className="text-gray-500 dark:text-gray-400">
                    {recipe.description}
                </p>
            </div>
            {showDeleteConfirmation && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4 py-8 flex flex-col justify-center items-center gap-5 bg-zinc-300 w-fit h-fit max-w-[95vw] text-lg rounded-lg z-20 dark:bg-zinc-800">
                    <p>
                        Are you sure you want to delete{" "}
                        <span className="font-bold text-black">
                            "{recipe.name}"
                        </span>
                        ?
                    </p>
                    <div className="flex gap-3">
                        <button
                            className="rounded-md px-3 py-2 text-gray-50 bg-blue-500 hover:bg-blue-700"
                            onClick={() => setShowDeleteConfirmation(false)}
                        >
                            Cancel
                        </button>
                        <button
                            className="rounded-md px-3 py-2 text-gray-50 bg-red-500 hover:bg-red-600"
                            onClick={async () => {
                                await handleDelete(recipe.id, recipe.imageName);
                                setShowDeleteConfirmation(false);
                                location.reload();
                            }}
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            )}
        </li>
    );
}

export default SingleRecipe;
