import React, { useEffect } from 'react'
import RecipeCard from "../components/RecipeCard";
import { useBookmarkStore } from '../store/bookmark';

const BookmarkPage = () => {
	const { bookmarks, fetchBookmarks } = useBookmarkStore();
	useEffect(() => {
		fetchBookmarks();
	}, [fetchBookmarks]);

	return (
		<>
		{bookmarks.length > 0 ?
			<div className='flex flex-wrap m-5 gap-4'>
				{
					bookmarks.map((bookmark) => {
							return (
								<RecipeCard key={bookmark._id} recipe={bookmark.recipe} bookmarked={true}/>
							)
					})
				}
			</div>
		:
			<div className='flex flex-col justify-center items-center'>
				<h2>Nothing to see here :/</h2>
				<h4>You haven&apos;t bookmarked any recipe.</h4>
			</div>}
		</>
	)
}

export default BookmarkPage