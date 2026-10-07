import { useState, useMemo, useRef, useEffect } from 'react';

const searchbar = ({ registry, onAction, onSelect }) => {
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);

    const wrapperRef = useRef(null);

    useEffect(() => { 
        if (!open) return;

        function handleOutside(e) {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("pointerdown", handleOutside);
        return () => document.removeEventListener("pointerdown", handleOutside);
    }, [open]);

    const results = useMemo(() => {
        const q = query.trim().toLowercase(); //trims the users query of spaces and end lines at the start or end
        if(!q) return [];//hands the searchbar a blank array if the query is empty
        return registry.filter(item => item.name.toLowercase().includes(q)).slice(0, 8);// filters
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
                {results.map(item => (
                    <li key={item.id} onClick={() => {onSelect(item); setOpen(false)}}>
                        <span>{item.name}</span>
                        <button
                            onMouseDown={e => e.preventDefault()}
                            onClick={e => {e.stopPropagation();}}
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

export default searchbar
