import Link from "next/link"
import { useRouter } from "next/router"

function Pagnation({ totalPostCount }) {
    let router = useRouter()
    let pageIntoArray = Array.from(Array(totalPostCount).keys())

    return (
        <div className="flex justify-center">
            <nav aria-label="navigation">
                <ul className="flex list-style-none mt-4">
                    {
                        pageIntoArray.map(page => {
                            return <li key={page} className="page-item">
                                <Link href={page === 0 ? "/posts" : `/posts/page/${page + 1}`} legacyBehavior>
                                    <a className="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none" >{page + 1} </a>
                                </Link>
                            </li>
                        })
                    }

                </ul>
            </nav>
        </div>
    )
}

export default Pagnation