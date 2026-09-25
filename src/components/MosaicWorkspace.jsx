import { Mosaic, MosaicWindow, createBalancedTreeFromLeaves } from 'react-mosaic-component';
import 'react-mosaic-component/react-mosaic-component.css';


const MosaicWorkspace = ({ panels }) => {


  return (
    <div style={{ height: "100vh" }}>
      <Mosaic
        className="mosaic-theme"
        key={panels.map(p => p.id).join(",")}
        initialValue={createBalancedTreeFromLeaves(panels.map(p => p.id))}
        zeroStateView={<h1>Add a panel from the dropdown menu</h1>}
        renderTile={(id, path) => {
            const panel = PANELS[id];
            const Component = panel.component;
            return (
            <MosaicWindow path={path} title={panel.title}>
                <Component/>
            </MosaicWindow>
            );
        }}
      />
    </div>
  )
}

export default MosaicWorkspace

