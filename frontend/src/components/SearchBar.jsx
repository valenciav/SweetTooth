import { FaSearch } from 'react-icons/fa'

const SearchBar = () => {
	return (
		<div className='w-1/2 bg-background p-3 h-full rounded-md opacity-80 flex justify-between items-center'>
			<input label="searchQuery" type='text' className='border-none m-0 w-full'/>
			<FaSearch/>
		</div>
	)
}

export default SearchBar