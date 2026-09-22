import React from 'react'
import { Mosaic, MosaicWindow } from 'react-mosaic-component';

const Workspace = ({ children }) => {
  return (
    <div style={{ height: "100vh" }}>
      <Mosaic
        initialValue="a"
        renderTile={(id, path) => (
            <MosaicWindow
                path={path}
                title="Window A">
                    {children}
                </MosaicWindow>
        )}
      />
    </div>
  )
}

export default Workspace

