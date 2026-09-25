import { Mosaic, MosaicWindow, createBalancedTreeFromLeaves } from 'react-mosaic-component';
import 'react-mosaic-component/react-mosaic-component.css';
import { PANELS } from '../panels/registry';

const MosaicWorkspace = ({ panels }) => {


  return (
    <div style={{ height: "100vh" }}>
      <Mosaic
        className="mosaic-theme"
        key={panels.map(p => p.id).join(",")}
        initialValue={createBalancedTreeFromLeaves(panels.map(p => p.id))}
        zeroStateView={<h1>Add a panel from the dropdown menu</h1>}
        renderTile={(id, path) => {
            const panel = panels.find(p => p.id === id);
            const { title, component: Component } = PANELS[panel.type];
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

