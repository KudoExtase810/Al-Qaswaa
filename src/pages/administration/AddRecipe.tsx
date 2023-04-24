import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Ingredients from "../../components/administration/Ingredients";
import Instructions from "../../components/administration/Instructions";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../../firebase-config";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { toast } from "react-hot-toast";

function AddRecipe() {
    const [name, setName] = useState<string>("");

    const [image, setImage] = useState<File>();
    const [imageName, setImageName] = useState<string>();
    const [imageURL, setImageURL] = useState<string>("");
    const [imgUploadPercentage, setImgUploadPercentage] = useState<
        null | number
    >(null);

    const [description, setDescription] = useState<string | undefined>();
    const [type, setType] = useState<recipe["type"]>();

    const [currentIngredient, setCurrentIngredient] = useState<string>("");
    const [ingredients, setIngredients] = useState<string[]>([]);

    const [currentInstruction, setCurrentInstruction] = useState<string>("");
    const [instructions, setInstructions] = useState<string[]>([]);

    useEffect(() => {
        const uploadImage = () => {
            // GET A UNIQUE FILE NAME
            const fileName = new Date().getTime() + name;
            setImageName(fileName);
            const storageRef = ref(storage, fileName);

            const uploadTask = uploadBytesResumable(storageRef, image!);

            // Register three observers:
            // 1. 'state_changed' observer, called any time the state changes
            // 2. Error observer, called on failure
            // 3. Completion observer, called on successful completion
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // Observe state change events such as progress, pause, and resume
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                    setImgUploadPercentage(progress);
                },
                // Handle any errors
                () => {
                    toast.error("Failed to upload image.");
                },
                () => {
                    // Handle successful uploads on complete
                    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                    getDownloadURL(uploadTask.snapshot.ref).then(
                        (downloadURL) => {
                            setImageURL(downloadURL);
                        }
                    );
                }
            );
        };
        image && uploadImage();
    }, [image]);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (name.includes("/"))
            return toast.error('The recipe name cannot contain "/"!');

        if (!imageURL || !imageName)
            return toast.error(
                "The recipe image didn't upload correctly, please try wating, re-upload, or refresh the page if the error occurs again."
            );

        if (ingredients.length === 0)
            return toast.error("A recipe must contain ingredients!");

        if (instructions.length === 0)
            return toast.error("This recipe has no instructions!");
        try {
            await addDoc(collection(db, "recipes"), {
                name,
                description,
                type,
                ingredients,
                instructions,
                imageURL,
                imageName,
                createdAt: serverTimestamp(),
            });
            toast.success("A new recipe has been added successfully!");

            navigate("/administration/recipes");
        } catch (error) {
            toast.error("Failed to add recipe.");
        }
    };
    return (
        <>
            <h2 className="text-3xl font-semibold mb-4">Add a recipe</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 ">
                <div className="flex gap-4 max-[550px]:flex-col max-[550px]:gap-3 ">
                    <div className="flex flex-col w-72 max-[550px]:w-full">
                        <label htmlFor="name">
                            Name <span className="text-red-600">*</span>
                        </label>
                        <input
                            required
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            type="text"
                            id="name"
                            placeholder="Apple pie"
                            className="px-2 py-1 text-zinc-900 border border-zinc-400 hover:border-zinc-800 focus:outline-2 focus:outline-blue-600 dark:focus:outline-orange-500 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col w-48 max-[550px]:w-full">
                        <label htmlFor="type">
                            Type <span className="text-red-600">*</span>
                        </label>
                        <select
                            required
                            id="type"
                            onChange={(e) =>
                                setType(e.target.value as recipe["type"])
                            }
                            className="px-2 h-[38px] text-zinc-900 border border-zinc-400 hover:border-zinc-800 focus:outline-2 focus:outline-blue-600 dark:focus:outline-orange-500 rounded-md "
                        >
                            <option value="" selected disabled hidden>
                                Select a type
                            </option>
                            <option value="Salty">Salty</option>
                            <option value="Sweet">Sweet</option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-col w-[31rem] max-[550px]:w-full">
                    <label htmlFor="desc">Description</label>
                    <textarea
                        onChange={(e) => setDescription(e.target.value)}
                        value={description}
                        id="desc"
                        placeholder="A brief description goes here.."
                        className="px-2 py-1 text-zinc-900 border border-zinc-400 hover:border-zinc-800 focus:outline-2 focus:outline-blue-600 dark:focus:outline-orange-500 rounded-md h-32"
                    />
                </div>
                <Ingredients
                    ingredients={ingredients}
                    setIngredients={setIngredients}
                    currentIngredient={currentIngredient}
                    setCurrentIngredient={setCurrentIngredient}
                />
                <Instructions
                    instructions={instructions}
                    setInstructions={setInstructions}
                    currentInstruction={currentInstruction}
                    setCurrentInstruction={setCurrentInstruction}
                />
                <div className="flex flex-col w-max">
                    <label htmlFor="image" className="w-max">
                        Image <span className="text-red-600">*</span>
                    </label>
                    <input
                        required
                        type="file"
                        accept="image/*"
                        name="image"
                        id="image"
                        onChange={(e) => setImage(e.target.files![0])}
                    />
                </div>
                <button
                    disabled={
                        (imgUploadPercentage !== null &&
                            imgUploadPercentage < 100) ||
                        !imageURL ||
                        !imageName
                    }
                    type="submit"
                    className="bg-blue-600 dark:bg-orange-500 text-white px-4 py-2 w-max rounded-lg font-medium mt-3 disabled:bg-blue-300 dark:disabled:bg-orange-200"
                >
                    SUBMIT
                </button>
                <span className="text-red-600 text-sm">
                    The submit button will be disabled until the image is
                    successfully uploaded (this may take more than a minute).
                </span>
            </form>
        </>
    );
}

export default AddRecipe;
