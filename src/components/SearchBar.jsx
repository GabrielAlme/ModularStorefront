import { useState, useMemo, useRef, useEffect } from 'react';

const SearchBar = ({ registry, onAction, onSelect }) => {
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);

    const wrapperRef = useRef(null);

    useEffect(() => { 
        if (!open) return;

        function handleOutside(e) { //handler for when someone clicks outside the search list
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("pointerdown", handleOutside);
        return () => document.removeEventListener("pointerdown", handleOutside);
    }, [open]);

    const registryItems = useMemo(() => //this is a function to just turn the passed registry into an object we can work with
        Object.entries(registry).map(([id , values]) => ({...values, id})), //...values takes all of the values of the entries and puts them into objects
    [registry]);

    const results = useMemo(() => {
        const q = query.trim().toLowerCase(); //trims the users query of spaces and end lines at the start or end
        if(!q) return [];//hands the searchbar a blank array if the query is empty
        return registryItems.filter(item => item.title.toLowerCase().includes(q)).slice(0, 8);// filters through the entries of registryItems to find what the user is looking for
    }, [query, registry]);

  return (
    <div>
      <input
        type="search"
        value={query}
        onChange={e => { setQuery(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
        placeholder="Search panels..."
      />
        {open && results.length > 0 && (
            <ul className="search-results">
                {results.map(item => ( //takes the filtered results and maps the items to an unordered list
                    <li key={item.id} onClick={() => {onSelect(item.id); setOpen(false)}}>
                        <span>{item.title}</span>
                        <button //WIP will be turned into the favorite button (a nice little star)
                            onMouseDown={e => e.preventDefault()}
                            onClick={e => {e.stopPropagation(); onAction={item}}} 
                        >
                            Favorite
                        </button>
                    </li>
                ))}
            </ul>
        )}
    </div>
  )
}

export default SearchBar
