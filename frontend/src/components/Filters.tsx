import { useRouter } from "next/router"
import { useState } from "react"

export const Filters = () => {
    const router = useRouter()

    const [filterValue, setFilterValue] = useState('')
    const [sortValue, setSortValue] = useState('asc')

    const handleSearch = () => {
        setFilterValue(filterValue)
        router.replace({
            query: { ...router.query, filterByTitle: filterValue },
         });
    }

    const handleSort = () => {
        setSortValue((prevState) => prevState === 'asc' ? 'desc' : 'asc')
        router.replace({
            query: { ...router.query, sort: sortValue },
         });
    }
    return (
        <div className="mb-4 flex justify-between">
            <div className="flex flex-nowrap gap-x-4 justify-center content-center">
                <input className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="title" type="text" onChange={e => setFilterValue(e.target.value)} placeholder="Search by Title"/>
                <button className="inline-block px-4 py-1.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" onClick={handleSearch}>Search</button>
            </div>
            <div>
                <span
                    onClick={handleSort}
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">
                    Sort by title
                </span>
            </div>
        </div>

    )
}