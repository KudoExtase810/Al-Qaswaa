import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddRecipe from "./pages/administration/AddRecipe";
import Footer from "./components/Footer";
import Recipes from "./pages/Recipes";
import AdminRecipes from "./pages/administration/Recipes";
import { Toaster } from "react-hot-toast";
import Login from "./pages/administration/Login";
import Recipe from "./pages/Recipe";

function App() {
    const [authorize, setAuthorize] = useState<boolean | "yes">(
        (localStorage.getItem("authorize") as "yes") || false
    );

    const RequireAuth = ({ children }: any) => {
        return authorize ? children : <Navigate to="/administration/login" />;
    };

    const [useDarkMode, setUseDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );

    useEffect(() => {
        useDarkMode
            ? localStorage.setItem("theme", "dark")
            : localStorage.setItem("theme", "light");
    }, [useDarkMode]);

    useEffect(() => {
        switch (localStorage.getItem("theme")) {
            case "dark":
                document.querySelector("html")!.classList.add("dark");
                break;
            default:
                document.querySelector("html")!.classList.remove("dark");
                break;
        }
    }, [useDarkMode]);

    return (
        <>
            <Navbar useDarkMode={useDarkMode} setUseDarkMode={setUseDarkMode} />
            <main className="mx-24 max-md:mx-4">
                <Toaster />
                <Routes>
                    <Route path="/" element={<Navigate to="/recipes" />} />
                    <Route path="/recipes" element={<Recipes />} />
                    <Route path="/recipes/:id" element={<Recipe />} />
                    <Route
                        path="/administration"
                        element={<Navigate to="/administration/recipes" />}
                    />
                    <Route
                        path="/administration/recipes"
                        element={
                            <RequireAuth>
                                <AdminRecipes />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/administration/addrecipe/"
                        element={
                            <RequireAuth>
                                <AddRecipe />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/administration/login"
                        element={
                            localStorage.getItem("authorize") === "yes" ? (
                                <Navigate to="/administration" />
                            ) : (
                                <Login setAuthorize={setAuthorize} />
                            )
                        }
                    />
                </Routes>
            </main>

            <Footer />
        </>
    );
}

export default App;
