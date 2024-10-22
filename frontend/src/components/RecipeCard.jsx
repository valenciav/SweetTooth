import React, { useEffect } from 'react'
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { CiStar } from "react-icons/ci";
import Tag from './Tag';
import { useUserStore } from '../store/user';
import PropTypes from 'prop-types';
import { useBookmarkStore } from '../store/bookmark';
import { useNavigate } from 'react-router-dom';

const RecipeCard = ({recipe}) => {
	const navigate = useNavigate();
	const { user, fetchUserData } = useUserStore();
	const {bookmarks, createBookmark, fetchBookmarks} = useBookmarkStore();
	useEffect(() => {
		fetchUserData();
	}, [fetchUserData]);

	useEffect(() => {
		fetchBookmarks();
	}, [fetchBookmarks])

	const addBookmark = () => {
		if(!user) {
			navigate('/signIn');
			return;
		}
		const recipeId = recipe._id
		createBookmark(recipeId);
	}

	return (
		<div className='w-60 h-60 rounded-lg overflow-clip invertPalette flex flex-col justify-center items-center'>
			<img className = "h-2/3" src={recipe.picture || '/SweetToothIcon.png'} alt={`Picture of ${recipe.name}`}/>
			<div className='invertPalette px-4 py-2 w-full'>
				<div className='flex justify-between items-center'>
					<h3>{recipe.name}</h3>
					<button type='button' onClick={addBookmark} className='text-2xl'>{bookmarks?.find((bookmark) => bookmark._id == recipe._id) ? <IoBookmark /> : <IoBookmarkOutline /> }</button>
				</div>
				<div className='flex items-center'>
					<CiStar /><CiStar /><CiStar /><CiStar /><CiStar />{recipe.reviews.length} reviews
				</div>
				<div className='flex gap-2'>
					{recipe.tags.map((tag) => {
						<Tag tag={tag.name}/>
					})}
				</div>
			</div>
		</div>
	)
}

RecipeCard.propTypes = {
	recipe: PropTypes.object
}
export default RecipeCard