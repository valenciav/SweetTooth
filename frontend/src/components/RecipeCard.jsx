import React, { useEffect } from 'react'
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import Tag from './Tag';
import { useUserStore } from '../store/user';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { PiStarBold, PiStarHalfFill, PiStarFill } from "react-icons/pi";
import { useBookmarkStore } from '../store/bookmark';

const RecipeCard = ({recipe}) => {
	const navigate = useNavigate();
	const { user, fetchUserData } = useUserStore();
	const { bookmarks, createBookmark, deleteBookmark } = useBookmarkStore();

	useEffect(() => {
		fetchUserData();
	}, [fetchUserData]);

	const averageReview = recipe.reviews.reduce((review, sum) => review.rating + sum, 0);

	const addBookmark = () => {
		if(!user) {
			navigate('/signIn');
			return;
		}
		const recipeId = recipe._id;
		bookmarks.find((bookmark) => bookmark.recipe._id == recipeId) ? deleteBookmark(recipeId) : createBookmark(recipeId);
	}

	return (
		<div className='min-w-60 h-60 group rounded-lg overflow-clip invertPalette flex flex-col justify-center items-center cursor-pointer' onClick={(e)=> {if(e.target.tagName == 'DIV') navigate(`/recipe/${recipe._id}`)}}>
			<img className = "h-2/3" src={recipe.thumbnail || '/SweetToothIcon.png'} alt={`Picture of ${recipe.name}`}/>
			<div className='invertPalette group-hover:bg-gradient-to-b from-transparent px-4 py-2 w-full'>
				<div className='flex justify-between items-center z-0'>
					<h3>{recipe.title}</h3>
					<button type='button' onClick={addBookmark} className='text-2xl z-10 hover:text-secondary'>{bookmarks.find((bookmark) => bookmark.recipe._id == recipe._id) ? <IoBookmark /> : <IoBookmarkOutline />}</button>
				</div>
				by <span className='hover:text-secondary'>{recipe.author.username}</span>
				<div className='flex items-center gap-2'>
					<span className='flex'>
						{
							[1,2,3,4,5].map((i) => {
								return(
									averageReview >= i ?
									<PiStarFill key={i}/> :
									averageReview >= i-0.5 ?
									<PiStarHalfFill key={i}/> :
									<PiStarBold key={i} />
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
	recipe: PropTypes.object,
	bookmarked: PropTypes.bool
}
export default RecipeCard