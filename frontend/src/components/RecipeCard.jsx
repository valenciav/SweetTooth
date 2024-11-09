import React, { useEffect } from 'react'
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import Tag from './Tag';
import { useUserStore } from '../store/user';
import PropTypes from 'prop-types';
import { useBookmarkStore } from '../store/bookmark';
import { useNavigate } from 'react-router-dom';
import { PiStarBold, PiStarHalfFill, PiStarFill } from "react-icons/pi";

const RecipeCard = ({recipe}) => {
	const navigate = useNavigate();
	const { user, fetchUserData } = useUserStore();
	const {bookmarks, createBookmark, fetchBookmarks} = useBookmarkStore();
	const averageReview = recipe.reviews.reduce((review, sum) => review.rating + sum, 0);
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

	console.log(recipe.thumbnail)


	return (
		<div className='w-60 h-60 rounded-lg overflow-clip invertPalette flex flex-col justify-center items-center cursor-pointer'>
			<img className = "h-2/3" src={recipe.thumbnail || '/SweetToothIcon.png'} alt={`Picture of ${recipe.name}`}/>
			<div className='invertPalette px-4 py-2 w-full'>
				<div className='flex justify-between items-center' onClick={()=>navigate(`/recipe/${recipe._id}`)}>
					<h3>{recipe.title}</h3>
					<button type='button' onClick={addBookmark} className='text-2xl'>{bookmarks?.find((bookmark) => bookmark._id == recipe._id) ? <IoBookmark /> : <IoBookmarkOutline /> }</button>
				</div>
				<div className='flex items-center gap-2'>
					<span className='flex'>
						{
							[1,2,3,4,5].map((i) => {
								return(
									averageReview >= i ?
									<PiStarFill /> :
									averageReview >= i-0.5 ?
									<PiStarHalfFill /> :
									<PiStarBold />
								)
							})
						}
					</span>
					{recipe.reviews.length} reviews
				</div>
				<div className='flex gap-2'>
					{recipe.tags.map((tag) => {
						return (
							<Tag key={tag} tag={tag.name}/>
						)
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