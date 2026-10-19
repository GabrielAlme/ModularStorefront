import { useState, useRef, useEffect, useMemo } from 'react';
import { getLeaves } from 'react-mosaic-component';
import { PANELS } from '../panels/registry';
import MosaicWorkspace from './MosaicWorkspace';
import Dropdown from './Dropdown';
import SearchBar from './SearchBar';

const Workspace = () => {
  const [workspace] = useState(loadWorkspace);
  const [favorites, setFavorites] = useState(loadFavorites);
  const [panels, setPanels] = useState(workspace.panels);
  const [layout, setLayout] = useState(workspace.layout);
  const nextId = useRef(workspace.nextId);



// functions and use states related to loading the workspace panels
  function loadWorkspace() {
    const saved = JSON.parse(localStorage.getItem("workspace")) ?? {};
    return { panels: saved.panels ?? {}, nextId: saved.nextId ?? 1, layout: saved.layout ?? null} //checks local storage for the stored layout of panels, if there is no layout stored it upates it to the values on the right
  };
  
  useEffect (() => {
        localStorage.setItem("workspace", JSON.stringify({ panels, nextId: nextId.current, layout })
        , [panels, layout]); // this watches the array [panels] and when a change is made to it it uploads it to the local storage
  });




//functions for handling when panels are added and updating the layout
  const addPanel = (type) => {
    const id = nextId.current++; //sets id to the current value of nextId THEN increments the value of nextId
    setPanels(prev => ({...prev, [id] : { type } })); //now creates and object with a keyed id array and a cooresponding type for each key
    setLayout(prev => prev ? {type: "split", direction: "column", children: [id, prev]} : id); //places the new panel on top of the others
  };

  const handleLayoutChange = (newLayout) => { //mosaic passes its new layout when onChange is called
    setLayout(newLayout);
    const ids = getLeaves(newLayout); //gets the ids from the layout of the current panels
    setPanels(prev => Object.fromEntries( //uses the previous panels object to create an array of pairs [id, panel]
      Object.entries(prev).filter(([id]) => ids.includes(Number(id))) //finds the ids that are still on the page and builds a new object containing the current panels removing the panel that was closed
    ));
  };



//functions for loading, updating, and saving favorites
  function loadFavorites() {
    const saved = JSON.parse(localStorage.getItem("favorites")) ?? [];
    return saved;
  }

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const favoritePanels = useMemo(
    () => Object.fromEntries(
      favorites.filter(key => PANELS[key]).map(key => [key, PANELS[key]])
    ), [favorites]);

    const toggleFavorite = (key) => {
      setFavorites(prev => prev.includes(key) ? prev.filter(k => k != key) : [...prev, key] );
    };

    const favoriteButton = (id) => {
      return(
        <button onClick={(e) => {e.stopPropagation(); toggleFavorite(id); }}>
          {favorites.includes(id) ? "★" : "☆" }
        </button>
      )
    };

  return (
    <div className="workspace">
      <div className="navbar">
        <Dropdown registry={favoritePanels} onSelect={addPanel} title="Favorites" emptyMessage="Add panels to favorites using the star in the search menu"/>  {/* this passes the data from onSelect inside of AddPanel to the function addPanel */}
        <SearchBar registry={PANELS} onSelect={addPanel} button={favoriteButton}/>
      </div>
      <div className="mosaic-workspace">
        <MosaicWorkspace panels={panels} layout={layout} onChange={handleLayoutChange}/> {/* when a new panel is added/removed to/from panels object it passes the fucntion handleLayoutChange*/}
      </div>
    </div>
  )
}

export default Workspace
