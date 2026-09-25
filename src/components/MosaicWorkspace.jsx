import { Mosaic, MosaicWindow, createBalancedTreeFromLeaves } from 'react-mosaic-component';
import 'react-mosaic-component/react-mosaic-component.css';
import { PANELS } from '../panels/registry';

const MosaicWorkspace = ({ panels }) => {


  return (
    <div style={{ height: "100vh" }}>
      <Mosaic
        className="mosaic-theme"
        key={panels.map(p => p.id).join(",")} //takes the panels and maps them to a string that is used by initial value
        initialValue={createBalancedTreeFromLeaves(panels.map(p => p.id))}//takes the string of values and builds the tree for the layout of the page
        zeroStateView={<h1>Add a panel from the dropdown menu</h1>}
        renderTile={(id, path) => {//moves through the tree and creates a mosaic window for each of the leaves it hits
            const panel = panels.find(p => p.id === id);//creates an object for each panel based on the id not the type
            const { title, component: Component } = PANELS[panel.type];//uses the type of the panel to get the component for building the panel
            return (
            <MosaicWindow path={path} title={title}>
                <Component/>
            </MosaicWindow>
            );
        }}
      />
    </div>
  )
}

export default MosaicWorkspace

