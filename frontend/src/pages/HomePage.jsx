import { useEffect } from "react";
import { useRecipeStore } from "../store/recipe";
import RecipeCard from "../components/RecipeCard";
import Carousel from "../components/Carousel";
import { IoAddOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/user";

const HomePage = () => {
	const navigate = useNavigate();
	const { fetchRecipes, recipes } = useRecipeStore();
	const { fetchUserData, user } = useUserStore();
	useEffect(() => {
		fetchRecipes();
	}, [fetchRecipes]);
	useEffect(() => {
		fetchUserData();
	}, [fetchUserData])
	return (
		<div className="container py-6 px-12">
			<div id="trending">
				<h1>
					Trending
				</h1>
				<Carousel/>
			</div>
			<div id="explore">
				{
					recipes.map((recipe)=> {
						return (
							<RecipeCard key={recipe._id} recipe={recipe}/>
						)
					})
				}
			</div>
			<button onClick={() => {navigate(user ? '/createRecipe' : '/signIn') }} className="rounded-full absolute right-8 bottom-8 p-3 bg-secondary text-background text-3xl"><IoAddOutline /></button>
		</div>
	);
};

export default HomePage;