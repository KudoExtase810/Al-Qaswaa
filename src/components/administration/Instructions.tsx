import { HiPlus } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-hot-toast";

interface props {
    instructions: string[];
    setInstructions: React.Dispatch<React.SetStateAction<string[]>>;
    currentInstruction: string;
    setCurrentInstruction: React.Dispatch<React.SetStateAction<string>>;
}

function Instructions({
    instructions,
    setInstructions,
    currentInstruction,
    setCurrentInstruction,
}: props) {
    return (
        <div className="flex flex-col">
            <label htmlFor="ins">
                Instructions <span className="text-red-600">*</span>
            </label>
            <div className="flex items-center gap-1">
                <input
                    onChange={(e) => setCurrentInstruction(e.target.value)}
                    value={currentInstruction}
                    type="text"
                    id="ins"
                    placeholder="Bake for 45 minutes"
                    className="px-2 py-1 text-zinc-900 border border-zinc-400 hover:border-zinc-800 focus:outline-2 focus:outline-blue-600 dark:focus:outline-orange-500 rounded-md min-w-[300px] max-[550px]:w-4/5"
                />
                <button
                    type="button"
                    onClick={() => {
                        if (!currentInstruction) return;
                        if (currentInstruction.length < 6)
                            return toast.error(
                                "This instruction is too short."
                            );
                        setInstructions([...instructions, currentInstruction]);
                        setCurrentInstruction("");
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
                    {instructions.length === 0
                        ? "No instructions added yet."
                        : instructions.map((instruction, index) => (
                              <div className="flex justify-between gap-2 w-[31rem] max-[550px]:w-full hover:line-through">
                                  <li key={index}>{instruction}</li>
                                  <button
                                      type="button"
                                      onClick={() => {
                                          const filtered = instructions.filter(
                                              (ins) => ins !== instruction
                                          );
                                          setInstructions(filtered);
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

export default Instructions;
