import { useState } from "react";
import { FiX } from "react-icons/fi";

const CreateRecipePageGrid = () => {
	const [ recipe, setRecipe ] = useState({
		title: '',
		thumbnail: '',
		prepHour: null,
		prepMin: null,
		portion: null,
		tags: [],
		description: '',
		ingredients: [
			{
				quantity: null,
				unit: '',
				item: ''
			}
		],
		equipments: ['Bowl'],
		instructions: [''],
		tips: ''
	});

	const handleChange = async (e) => {
		const { name, value} = e.target;
		setRecipe({ ...recipe, [name]: value});
	}

	const handleArrayChange = async (e) => {
		const { name, value, id } = e.target;
		let list = recipe[name];
		if(id > list.length) list.push('');
		list[id] = value;
		setRecipe({...recipe, [name]: list});
	}

	const handleTagChange = async (e) => {
		const { value } = e.target;
		let list = recipe.tags;
		if(e.key == ' ' || e.key == 'Enter') {
			if(value.trim().length == 0) return;
			list.push(value.trim());
			e.target.value = '';
			setRecipe({...recipe, 'tags': list});
		}
		else if(e.key == 'Backspace' && value.trim().length == 0) {
			setRecipe({...recipe, 'Tags':list.pop()});
		}
	}

	const handlePictureChange = async (e) => {
		const { files } = e.target;
		const url = URL.createObjectURL(files[0]);
		setRecipe({...recipe, 'thumbnail': url});
	}

	const handleIngredientChange = async (e) => {
		const { name, value, id } = e.target;
		let list = recipe['ingredients'];
		if(id > list.length) list.push({quantity:null, unit:'', item:''});
		list[id][name] = value;
		setRecipe({...recipe, 'ingredients': list});
	}

	const addToArray = async (name) => {
		let list = recipe[name];
		if(name == 'ingredients') list.push({quantity:null, unit:'', item:''});
		else list.push('');
		setRecipe({...recipe, [name]:list});
	}

	const deleteMember = async (name, idx) => {
		let list = recipe[name];
		list.splice(idx,1);
		setRecipe({...recipe, [name]: list})
	}

	return (
		<form className="grid grid-flow-row-dense mx-[10%] md:mx-[15%] lg:mx-[20%] mb-6" onKeyDown={(e) => {if(e.key == 'Enter' && !e.target.toString().includes('TextArea')) {e.preventDefault(); return false}}}>
			<div className="grid sm:grid-cols-2 gap-8 mb-14">
				<div className="bg-primary aspect-[3/2] rounded-lg overflow-hidden bg-opacity-60 flex justify-center items-center text-background">
					{recipe.thumbnail ?
						<img src={recipe.thumbnail} className="relative object-cover"/>
						:
						<div className="relative">Upload Picture*</div>
					}
					<input type="file" name="thumbnail" accept="image/*" className="w-[calc(50%-268px)] aspect-[3/2] absolute z-10" onChange={handlePictureChange}/>
				</div>
				<div className="grid gap-6">
					<input type="text" name="title" placeholder="Recipe Title*" onChange={handleChange} className="font-bold text-3xl m-0"/>
					<div className="flex justify-between">
						<div className="flex flex-col gap-1">
							<label className="font-bold">Preparation Time:</label>
							<div className="flex gap-3">
								<span><input type="number" name="prepHour" value={recipe.prepHour} onChange={handleChange}/> hrs</span>
								<span><input type="number" name="prepMin" value={recipe.prepMin} onChange={handleChange}/> mins</span>
							</div>
						</div>
						<div className="flex flex-col gap-1 w-1/2">
							<label className="font-bold">Portion:</label>
							<span><input type="number" name="portion" value={recipe.portion} onChange={handleChange}/> servings</span>
						</div>
					</div>
					<div className="flex flex-col gap-1">
						<label className="font-bold">Tags:</label>
						<div className="flex flex-wrap max-w-md border-b-2 gap-2">
							{recipe.tags.map((tag, index) => {
								return(
									<div className="tag flex justify-center items-center gap-2 mb-2 group cursor-text" key={index}>
										{tag}
										<button type="button" className="hidden group-hover:block" onClick={() => deleteMember ('tags', index)}><FiX size={12}/></button>
									</div>
								)
							})}
							<input type="text" name="tags" className="border-none" onKeyDown={handleTagChange}/>
						</div>
					</div>
				</div>
			</div>
			<div className="w-full flex flex-col gap-8">
				<div className="form-control">
					<label htmlFor="description"><h5>Description*</h5></label>
					<textarea name="description" className={recipe.description.length > 2000 ? 'border-secondary shadow shadow-red' : 'border-primary'} placeholder="How would you describe this menu?" onChange={handleChange}></textarea>
					<small>{recipe.description.length}/2000</small>
				</div>
				<div className="flex flex-col sm:flex-row gap-8 justify-between">
					<div className="form-control">
						<label htmlFor="ingredients"><h5>Ingredients*</h5></label>
						{recipe.ingredients.map((ingredient, index) => {
							return (
								<span className="flex gap-2 group" key={`ingredient-${index}`}>
									<input type="number" value={ingredient.quantity} id={index} name="quantity" onChange={handleIngredientChange}/>
									<select id={index} name="unit" value={ingredient.unit} onChange={handleIngredientChange}>
										<option disabled value={''}>unit</option>
										<option value={'teaspoon'} >teaspoon</option>
										<option value={'tablespoon'} >tablespoon</option>
										<option value={'gram'} >gram</option>
										<option value={'ml'} >ml/cc</option>
										<option value={'ounce'} >ounce</option>
										<option value={'cup'} >cup</option>
										<option value={'quart'} >quart</option>
										<option value={'pint'} >pint</option>
										<option value={'gallon'} >gallon</option>
									</select>
									of
									<input type="text" className="border-2 rounded-md" value={ingredient.item} id={index} name="item" onChange={handleIngredientChange}/>
									<button type="button" className="hidden group-hover:block" onClick={() => deleteMember('ingredients', index)}><FiX /></button>
								</span>
							)
						})}
						<div className="tag" onClick={() => addToArray('ingredients')}>+ Add Ingredient</div>
					</div>
					<div className="form-control w-1/2">
						<label><h5>Equipments*</h5></label>
						<div className="flex flex-wrap">
							{recipe.equipments.map((equipment, index) => {
								return (
									<span key={`equipment-${index}`} className="border-2 border-primary px-2 py-1 rounded-md">
										{equipment}
									</span>
								)
							})}
						</div>
						<div className="tag">+ Add Equipment</div>
					</div>
				</div>
				<div className="form-control">
					<label htmlFor="instructions"><h5>Instructions*</h5></label>
					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-2">
							{recipe.instructions.map((instruction, index) => {
								return(
									<span key={`instruction-${index}`} className="flex gap-2 group">
										{index+1}
										<input type="text" name="instructions" id={index} value={instruction} onChange={handleArrayChange} className="w-full"/>
										<button type="button" className="hidden group-hover:block" onClick={() => deleteMember('instructions', index)}><FiX /></button>
									</span>
								)
							})}
						</div>
						<div className="tag" onClick={()=>addToArray('instructions')}>+ Add Instruction</div>
					</div>
				</div>
				<div className="form-control">
					<label htmlFor="tips"><h5>Tips & Tricks</h5></label>
					<textarea placeholder="Share some tips on this recipe!"></textarea>
				</div>
				*Required
				<button type="submit" className="fixed bottom-4 right-4 btn self-end">Post Recipe</button>
			</div>
		</form>
	)
}

export default CreateRecipePageGrid