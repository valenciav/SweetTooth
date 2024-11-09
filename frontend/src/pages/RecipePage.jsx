import { useNavigate, useParams } from 'react-router-dom'
import { useRecipeStore } from '../store/recipe.js';
import { useEffect, useState } from 'react';
import { GoKebabHorizontal } from "react-icons/go";
import { useUserStore } from '../store/user.js';
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5';
import { MdOutlineDelete, MdOutlineModeEdit } from "react-icons/md";
import { useBookmarkStore } from '../store/bookmark.js';

const RecipePage = () => {
	const navigate = useNavigate();
	const {id} = useParams();
	const {currentRecipe, fetchRecipeById} = useRecipeStore();
	const {user, fetchUserData} = useUserStore();
	const {bookmarks, createBookmark, fetchBookmarks} = useBookmarkStore();
	const [menuVisibility, setMenuVisibility] = useState(false);
	
	useEffect(() => {
		fetchRecipeById(id);
	}, [fetchRecipeById, id]);

	useEffect(() => {
		fetchUserData();
	}, [fetchUserData]);

	useEffect(() => {
		fetchBookmarks();
	}, [fetchBookmarks]);

	const toggleMenu = () => {
		setMenuVisibility(!menuVisibility);
	}

	const addBookmark = () => {
		if(!user) {
			navigate('/signIn');
			return;
		}
		const recipeId = currentRecipe._id
		createBookmark(recipeId);
	}

	return (
		<div className='flex flex-col justify-center items-center mx-[10%] md:mx-[15%] lg:mx-[20%] mb-6'>
			<div className="flex md:flex-row flex-col gap-6 lg:gap-12 justify-center items-center mb-14 w-full">
					<img src={currentRecipe.thumbnail || '/SweetToothIcon.png'} className={`w-1/3 rounded-lg bg-primary ${currentRecipe.thumbnail ? 'aspect-[3/2]' : 'h-1/2'}`} alt='Recipe Thumbnail'/>
					<div className="flex flex-col gap-6 w-5/6 md:w-1/2">
						<div className='flex flex-col'>
							<h2>{currentRecipe.title}</h2>
							<p>By <a href={`/user/${currentRecipe.author.username}`} className='text-secondary'>{currentRecipe.author.username}</a></p>
							<span className='flex items-center gap-2'>
								<button onClick={addBookmark}>{bookmarks?.find((bookmark) => bookmark._id == currentRecipe._id) ? <IoBookmark /> : <IoBookmarkOutline />}</button>
								{currentRecipe.bookmarks?.length}
							</span>
						</div>
							<div className='flex justify-center items-center gap-2'>
									{ user && user._id == currentRecipe.author._id &&
										<>
											<button className='text-3xl' onClick={toggleMenu}><GoKebabHorizontal /></button>
											<ul className={`${menuVisibility ? 'visible' : 'hidden'} dropdown translate-y-14 -translate-x-12`}>
												<li><button className='flex items-center gap-2'><MdOutlineModeEdit />Edit</button></li>
												<hr></hr>
												<li><button className='flex items-center gap-2'><MdOutlineDelete />Delete</button></li>
											</ul>
										</>
									}
							</div>
						<div className="flex justify-between">
							<div className="form-control">
								<label className="font-bold">Preparation Time:</label>
								<div className="flex gap-3">
									{Math.floor(currentRecipe.prepMinute/60) > 0 && <span>{Math.floor(currentRecipe.prepMinute/60)} hrs</span>}
									{currentRecipe.prepMinute%60 > 0 && <span>{currentRecipe.prepMinute%60} mins</span>}
								</div>
							</div>
							<div className="form-control w-1/2">
								<label className="font-bold">Portion:</label>
								<span>{currentRecipe.portion} servings</span>
							</div>
						</div>
						<div className="form-control">
							<label className="font-bold">Tags:</label>
							<div className="flex flex-wrap max-w-md gap-2">
								{currentRecipe.tags.map((tag, index) => {
									return(
										<div className="tag" key={index}>
											{tag}
										</div>
									)
								})}
							</div>
						</div>
					</div>
				</div>
				<div className="w-full flex flex-col gap-8">
				{currentRecipe.description && <div className="form-control">
						<p name="description">{currentRecipe.description}</p>
					</div>}
					<div className="flex flex-col sm:flex-row gap-8 justify-between">
						<div className="form-control">
							<label htmlFor="ingredients"><h5>Ingredients</h5></label>
							{currentRecipe.ingredients.map((ingredient, index) => {
								return (
									<span className="flex gap-2 group" key={`ingredient-${index}`}>
										{ingredient.quantity}{ingredient.unit != 'unit' && `${ingredient.unit} of`} {ingredient.ingredient}
									</span>
								)
							})}
						</div>
						<div className="form-control w-1/2">
							<label><h5>Equipments</h5></label>
							<ol>
								{currentRecipe.equipments.map((equipment, index) => {
									return (
										<li key={`equipment-${index}`} className="list-disc">
											{equipment}
										</li>
									)
								})}
							</ol>
						</div>
					</div>
					<div className="form-control">
						<label htmlFor="instructions"><h5>Instructions</h5></label>
						<div className="flex flex-col gap-4">
							<div className="flex flex-col gap-2">
								{currentRecipe.instructions.map((instruction, index) => {
									return(
										<span key={`instruction-${index}`} className="flex gap-2 group">
											{index+1}. {instruction}
										</span>
									)
								})}
							</div>
						</div>
					</div>
					{currentRecipe.tips && <div className="form-control">
						<label htmlFor="tips"><h5>Tips & Tricks</h5></label>
						{currentRecipe.tips}
					</div>}
				</div>
			</div>
	)
}

export default RecipePage