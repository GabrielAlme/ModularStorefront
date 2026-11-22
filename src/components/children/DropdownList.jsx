
const DropdownList = ({ registry, onSelect, emptyMessage="" }) => {
    return (
        <ul className="drop-list">
            {Object.keys(registry).length === 0 ? (
                <li>Add panels to favorites using the star in the search menu</li>
            ) : (
                Object.entries(registry).map(([id, type]) => (
                    <li key={id} onClick={() => onSelect(id)}>
                        <span>{type.title}</span>
                    </li>
                ))
            )}
        </ul>
    )
}

export default DropdownList