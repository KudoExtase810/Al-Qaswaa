import { HiPlus } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-hot-toast";

interface props {
    ingredients: string[];
    setIngredients: React.Dispatch<React.SetStateAction<string[]>>;
    currentIngredient: string;
    setCurrentIngredient: React.Dispatch<React.SetStateAction<string>>;
}

function Ingredients({
    ingredients,
    setIngredients,
    currentIngredient,
    setCurrentIngredient,
}: props) {
    return (
        <div className="flex flex-col">
            <label htmlFor="ing">
                Ingredients <span className="text-red-600">*</span>
            </label>
            <div className="flex items-center gap-1">
                <input
                    onChange={(e) => setCurrentIngredient(e.target.value)}
                    value={currentIngredient}
                    type="text"
                    id="ing"
                    placeholder="3 eggs"
                    className="px-2 py-1 text-zinc-900 border border-zinc-400 hover:border-zinc-800 focus:outline-2 focus:outline-blue-600 dark:focus:outline-orange-500 rounded-md min-w-[300px] max-[550px]:w-4/5"
                />
                <button
                    type="button"
                    onClick={() => {
                        if (!currentIngredient) return;
                        if (currentIngredient.length < 3)
                            return toast.error("This ingredient is too short.");
                        setIngredients([...ingredients, currentIngredient]);
                        setCurrentIngredient("");
                    }}
                >
                    <HiPlus
                        className="text-zinc-800 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-orange-500"
                        size={34}
                    />
                </button>
            </div>
            <div className="mt-3">
                <ul className="list-disc text-zinc-800 dark:text-zinc-400 list-inside">
                    {ingredients.length === 0
                        ? "No ingeredients added yet."
                        : ingredients.map((ingredient, index) => (
                              <div className="flex justify-between gap-2 w-[31rem] max-[550px]:w-full hover:line-through">
                                  <li key={index}>{ingredient}</li>
                                  <button
                                      type="button"
                                      onClick={() => {
                                          const filtered = ingredients.filter(
                                              (ing) => ing !== ingredient
                                          );
                                          setIngredients(filtered);
                                      }}
                                  >
                                      <IoMdClose
                                          size={18}
                                          className="text-red-600"
                                      />
                                  </button>
                              </div>
                          ))}
                </ul>
            </div>
        </div>
    );
}

export default Ingredients;
