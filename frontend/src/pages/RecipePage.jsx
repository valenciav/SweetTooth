import { Link, useNavigate, useParams } from 'react-router-dom'
import { useRecipeStore } from '../store/recipe.js';
import { useContext, useEffect, useState } from 'react';
import { GoKebabHorizontal } from "react-icons/go";
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5';
import { MdOutlineDelete, MdOutlineModeEdit } from "react-icons/md";
import { useBookmarkStore } from '../store/bookmark.js';
import { PiStarBold, PiStarFill, PiStarHalfFill } from 'react-icons/pi';
import Review from '../components/Review.jsx';
import { AuthContext } from '../util/AuthContext.jsx';

const RecipePage = () => {
	const navigate = useNavigate();
	const {id} = useParams();
	const {currentRecipe, fetchRecipeById} = useRecipeStore();
	const { authenticated } = useContext(AuthContext);
	const {bookmarks, createBookmark, fetchBookmarks, deleteBookmark} = useBookmarkStore();
	const [menuVisibility, setMenuVisibility] = useState(false);
	const [bookmarkCount, setBookmarkCount] = useState(currentRecipe.bookmarkCount);
	const [rating, setRating] = useState(0);
	const ratingStatus = ['Not for me :/', 'Meh', 'Okay', 'Good', 'Awesome!'];
	const averageReview = currentRecipe.reviews.reduce((review, sum) => review.rating + sum, 0);
	
	useEffect(() => {
		fetchRecipeById(id);
	}, [fetchRecipeById, id]);

	useEffect(() => {
		fetchBookmarks();
	}, [fetchBookmarks]);

	const toggleMenu = () => {
		setMenuVisibility(!menuVisibility);
	}

	const addBookmark = () => {
		if(!authenticated) {
			navigate('/signIn');
			return;
		}
		const recipeId = currentRecipe._id
		if(bookmarks.find((bookmark) => bookmark.recipe._id == currentRecipe._id)) { 
			deleteBookmark(recipeId);
			setBookmarkCount(bookmarkCount-1);
		}
		else {
			createBookmark(recipeId);
			setBookmarkCount(bookmarkCount+1);
		}
	}

	return (
		currentRecipe ?
			<div className='flex flex-col justify-center items-center mx-[10%] md:mx-[15%] lg:mx-[20%] mb-6'>
				<div className="flex md:flex-row flex-col gap-6 lg:gap-12 justify-center items-center mb-14 w-full">
						<img src={currentRecipe.thumbnail || '/SweetToothIcon.png'} className={`w-1/3 rounded-lg bg-primary ${currentRecipe.thumbnail ? 'aspect-[3/2]' : 'h-1/2'}`} alt='Recipe Thumbnail'/>
						<div className="flex flex-col gap-6 w-5/6 md:w-1/2">
							<div className='flex justify-between items-center'>
								<div className='flex flex-col'>
									<h2>{currentRecipe.title}</h2>
									<p>By <Link href={`/user/${currentRecipe.author.username}`} className='text-secondary'>{currentRecipe.author.username}</Link></p>
									<button className='flex items-center text-xl' onClick={addBookmark}>
										<span className='text-secondary'>{bookmarks.length > 0 && bookmarks.find((bookmark) => bookmark.recipe._id == currentRecipe._id) ? <IoBookmark /> : <IoBookmarkOutline />}</span>
										{bookmarkCount}
									</button>
								</div>
								{ currentRecipe.reviews && currentRecipe.reviews.length > 0 &&
									<div className='flex flex-col items-end cursor-pointer' onClick={() => window.scrollTo({top:document.getElementById('reviews').offsetTop, behavior:'smooth'})}>
										<span className='flex text-3xl text-secondary'>
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
										{currentRecipe.reviews.length} reviews
									</div>
								}
							</div>
							{ authenticated && authenticated._id == currentRecipe.author._id &&
								<div className='flex justify-center items-center gap-2'>
										<button className='text-3xl' onClick={toggleMenu}><GoKebabHorizontal /></button>
										<ul className={`${menuVisibility ? 'list-item' : 'hidden'} dropdown translate-y-14 -translate-x-12`}>
											<li><button className='flex items-center gap-2'><MdOutlineModeEdit />Edit</button></li>
											<hr></hr>
											<li><button className='flex items-center gap-2'><MdOutlineDelete />Delete</button></li>
										</ul>
								</div>
							}
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
						<label><h5>Description</h5></label>
							<p name="description">{currentRecipe.description}</p>
						</div>}
						<div className="flex flex-col sm:flex-row gap-8 justify-between">
							<div className="form-control">
								<label><h5>Ingredients</h5></label>
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
							<label><h5>Instructions</h5></label>
							<div className="flex flex-col gap-4">
								<ol className="list-decimal ml-4">
									{currentRecipe.instructions.map((instruction, index) => {
										return(
											<li key={`instruction-${index}`} className="mb-2">
												{instruction}
											</li>
										)
									})}
								</ol>
							</div>
						</div>
						{currentRecipe.tips && <div className="form-control">
							<label><h5>Tips & Tricks</h5></label>
							{currentRecipe.tips}
						</div>}
					</div>
					<div id='reviews' className='mt-8 flex flex-col justify-center items-center w-full'>
						<form className='flex flex-col justify-center items-center w-full'>
							<h5>Have you tried this recipe?</h5>
							<p>Share your thoughts below!</p>
							<span className='flex text-3xl gap-2 text-secondary' onMouseLeave={()=>setRating(0)}>
								{
									[1,2,3,4,5].map((i) => {
										return(
											<button type='button' key={`star-${i}`} onMouseEnter={()=>setRating(i)}>
												{
													rating >= i ?
													<PiStarFill/> :
													<PiStarBold />
												}
											</button>
										)
									})
								}
							</span>
							{rating > 0 && <h5>{ratingStatus[rating-1]}</h5>}
							<textarea className='mt-2 w-2/5' placeholder='(Optional) Describe your experience with this recipe.'></textarea>
							<button className='btn mt-4' type='button'>Submit</button>
						</form>
						<div className='w-full'>
							<h4>Reviews ({currentRecipe.reviews.length})</h4>
								{
									!currentRecipe.reviews || currentRecipe.reviews.length > 0 ?
									currentRecipe.reviews.map((review) => {
										<Review review={review}/>
									})
									:
									<p>No review yet</p>
								}
						</div>
					</div>
				</div>
			:
				<div className='flex flex-col justify-center items-center'>
							<h1>Oops! Recipe not found!</h1>
							<h4>This recipe may have been removed</h4>
				</div>
	)
}

export default RecipePage