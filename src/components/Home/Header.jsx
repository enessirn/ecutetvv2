import { FiHeart } from "react-icons/fi";
function Header({toggle,setToggle}) {
  return (
    <>
      <nav className="absolute top-0 left-0 z-50  w-full min-w-full max-w-full h-16 rounded flex items-center px-4 justify-between !box-border">
       <div className={`w-20 h-10 bg-gray-400 rounded-3xl cursor-pointer !transition-all ${toggle ? '!bg-red-700 !border-2 !border-red-800 !transition-all' : ''}`} onClick={()=> setToggle(!toggle)}>
        <div className={`w-8 h-8 bg-gray-800 rounded-full mx-1 pointer-events-none my-1 ${toggle ? '!ml-10 !bg-red-200 ' : ''}`} ></div>
        <p className='!select-none absolute left-24 md:left-28 top-5 text-lg md:text-xl text-gray-100 transition-colors  hover:text-white'>Series</p>
       </div>
        <a className='select-none cursor-pointer text-red-700 hover:text-red-800 transition-colors font-bold text-4xl' href='#'>
          Ecute.Tv
        </a>
        <a href="#" className='flex text-xl items-center gap-1 text-gray-400 !select-none hover:text-white   transition-colors'>
          <FiHeart /> My Liked
        </a>
      </nav>
    </>
  )
}

export default Header