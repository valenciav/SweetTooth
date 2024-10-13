/* eslint-disable react/prop-types */
import React from 'react'
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { CiStar } from "react-icons/ci";
import Tag from './Tag';

const RecipeCard = ({recipe}) => {
	return (
		<div className='w-60 h-60 rounded-lg overflow-clip invertPalette flex flex-col justify-center items-center'>
			<img className = "h-2/3" src={recipe.picture || '/SweetToothIcon.png'} alt={`Picture of ${recipe.name}`}/>
			<div className='invertPalette px-4 py-2 w-full'>
				<div className='flex justify-between items-center'>
					<h3>{recipe.name}</h3>
					<button type='button' className='text-2xl'>{1<3 ? <IoBookmark /> : <IoBookmarkOutline /> }</button>
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

export default RecipeCard