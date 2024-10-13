import React from 'react'

const Tag = ({tag}) => {
	return (
		<div className='border-[var(--background)] border-2 rounded-full w-fit px-4'>
			{tag}
		</div>
	)
}

export default Tag