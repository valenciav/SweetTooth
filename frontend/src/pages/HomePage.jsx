import { useEffect } from "react";
import { useRecipeStore } from "../store/recipe";
import RecipeCard from "../components/RecipeCard";
import Carousel from "../components/Carousel";
import { IoAddOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useBookmarkStore } from '../store/bookmark';

const HomePage = () => {
	const navigate = useNavigate();
	const { fetchRecipes, recipes } = useRecipeStore();
	const { fetchBookmarks } = useBookmarkStore();

	useEffect(() => {
		fetchRecipes();
	}, [fetchRecipes]);

	useEffect(() => {
		fetchBookmarks();
	}, [fetchBookmarks])

	return (
		<div className="container py-6 px-12">
			<div id="trending">
				<h1>
					Trending
				</h1>
				<Carousel/>
			</div>
			<div id="explore" className="flex gap-4">
				{
					recipes.map((recipe)=> {
						return (
							<RecipeCard key={recipe._id} recipe={recipe}/>
						)
					})
				}
			</div>
			<button onClick={() => {navigate('/createRecipe') }} className="rounded-full fixed right-8 bottom-8 p-3 bg-secondary text-background text-3xl"><IoAddOutline /></button>
		</div>
	);
};

export default HomePage;