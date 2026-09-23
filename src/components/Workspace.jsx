import { Mosaic, MosaicWindow, createBalancedTreeFromLeaves } from 'react-mosaic-component';
import 'react-mosaic-component/react-mosaic-component.css';
import { PANELS } from '../panels/registry';

const Workspace = ({ open }) => {
  return (
    <div style={{ height: "100vh" }}>
      <Mosaic
        className="mosaic-theme"
        key={open.join(",")}
        initialValue={createBalancedTreeFromLeaves(open)}
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

export default Workspace

