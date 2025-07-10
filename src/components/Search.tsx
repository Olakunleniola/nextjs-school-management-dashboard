import Image from "next/image"

const Search = () => {
  return (
    <div className="md:w-auto w-full flex items-center gap-2 text-xs ring-[1.5px] px-2 ring-gray-300 rounded-full shadow-sm">
        <Image
          src="/search.png"
          alt="search logo"
          width={14}
          height={14}
          className="h-auto size-4 object-contain"
        />
        <input
          type="text"
          placeholder="Search......"
          className="w-[200px] bg-transparent p-2 text-base text-gray500 placeholder-gray-400 outline-hidden"
        />
    </div>
  )
}

export default Search
