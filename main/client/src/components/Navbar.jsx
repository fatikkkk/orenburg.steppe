import React from 'react'
import { NavLink} from 'react-router-dom'

export const Navbar = () => {

  const activeStyles = {
    color:'black',
  }

  return (
    <div className='flex py-10 justify-between items-center'>
      <span className='flex justify-center items-center w-56 h-10 bg-rose-800 text-lg text-white rounded-sm'>
        Orenburg<b>.steppe</b>
      </span>

      <ul className="flex gap-8">
        <li>
          <NavLink to={'/'} 
            href="/" 
            className="text-lg text-gray-400 hover:text-black"
            style={({isActive}) => isActive ? activeStyles : undefined}>Main</NavLink>
        </li>
        {/* <li>
          <NavLink to={"/contacts"} 
            href='/' 
            className="text-lg text-gray-400 hover:text-black"
            style={({isActive}) => isActive ? activeStyles : undefined}>Contacts</NavLink>
        </li> */}
        <li>
          <NavLink to={"/grants"} 
            href='/' 
            className="text-lg text-gray-400 hover:text-black"
            style={({isActive}) => isActive ? activeStyles : undefined}>Grants</NavLink>
        </li>
      </ul>

    </div>
  )
}
