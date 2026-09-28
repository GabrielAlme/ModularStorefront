import { Mosaic, MosaicWindow, RemoveButton } from 'react-mosaic-component';
import { PANELS } from '../panels/registry';
import 'react-mosaic-component/react-mosaic-component.css';
import '../styles/mosaic-panels.css';

const MosaicWorkspace = ({ panels, layout, onChange }) => {


  return (
    <div style={{ height: "100vh" }} padding-left="160px">
      <Mosaic
        className="mosaic-theme"
        value={layout}
        onChange={onChange}
        zeroStateView={<h1>Add a panel from the dropdown menu</h1>}
        renderTile={(id, path) => {//moves through the tree and creates a mosaic window for each of the leaves it hits
            const panel = panels[id];//creates an object for each panel based on the id not the type
            const { title, component: Component } = PANELS[panels[id].type];//uses the type of the panel to get the component for building the panel
            return (
            <MosaicWindow path={path} title={title} toolbarControls={[<RemoveButton key="remove"/>]}>
                <Component/>
            </MosaicWindow>
            );
        }}
      />
    </div>
  )
}

export default MosaicWorkspace

