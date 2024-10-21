import React, { useEffect } from 'react'
import { useUserStore } from '../store/user'
import { useBookmarkStore } from '../store/bookmark';
import RecipeCard from '../components/RecipeCard';
import { useRecipeStore } from '../store/recipe';

const BookmarkPage = () => {
	const { user, fetchUserData } = useUserStore();
	const {bookmarks, fetchBookmarks} = useBookmarkStore();
	const {recipes, fetchRecipes} = useRecipeStore();
	useEffect(() => {
		fetchUserData()
	}, [fetchUserData, user]);
	useEffect(() => {
		fetchRecipes();
	}, [fetchRecipes]);
	useEffect(() => {
		fetchBookmarks();
	}, [fetchBookmarks]);

	return (
		<div className='flex flex-wrap'>
			{recipes.map((recipe) => {
				<RecipeCard key={recipe._id} recipe={recipe}/>
			})}
		</div>
	)
}

export default BookmarkPage