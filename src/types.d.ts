type recipe = {
    id: string;
    name: string;
    imageURL: string;
    imageName: string;
    description: string | undefined;
    type: "Salty" | "Sweet";
    ingredients: string[];
    instructions: string[];
    createdAt: string;
};
