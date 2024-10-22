import React, { useEffect, useState } from 'react'
import RecipeCard from "../components/RecipeCard";
import { useBookmarkStore } from '../store/bookmark';

const BookmarkPage = () => {
	const { bookmarks, fetchBookmarks } = useBookmarkStore();
	useEffect(() => {
		fetchBookmarks();
	}, [fetchBookmarks]);

	return (
		<div className='flex flex-wrap m-5'>
			{bookmarks.map((bookmark) => {
					return (
						<RecipeCard key={bookmark._id} recipe={bookmark} />
					)
			})}
		</div>
	)
}

export default BookmarkPage