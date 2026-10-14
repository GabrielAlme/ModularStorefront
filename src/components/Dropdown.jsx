import { useState, useRef, useEffect } from "react";

const Dropdown = ({ registry, onSelect, title }) => {

    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);


    useEffect(() => { //this tracks if the user clicks outside of the dropdown and closes it when they do
        const handleClick = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setIsOpen(false); 
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const results = useMemo(() => {
            const q = query.trim().toLowerCase(); //trims the users query of spaces and end lines at the start or end
            if(!q) return [];//hands the searchbar a blank array if the query is empty
            return registryItems.filter(item => item.title.toLowerCase().includes(q)).slice(0, 8);// filters through the entries of registryItems to find what the user is looking for
        }, [query, registry]);

  return (
    <div ref={ref}>
        <button onClick={() => setIsOpen(prev => !prev)}>
            { title }
        </button>
        {isOpen && (
            <ul className="search-results">
                {results.map(item => ( //takes the filtered results and maps the items to an unordered list
                    <li key={item.id} onClick={() => {onSelect(item.id);}}>
                        <span>{item.title}</span>
                    </li>
                ))}
            </ul>
        )}
    </div>
  )
}

export default Dropdown
