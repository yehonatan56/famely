import React from 'react'

export default function Image(props) {
  return (
    <div>
      <div
          key={props.index}
          style={{
            position: 'absolute',
            top: props.img.metadata.top,
            left: props.img.metadata.left,
            cursor: props.draggingIndex === props.index ? 'grabbing' : 'grab',
          }}
          onMouseDown={(event) => props.handleMouseDown(event, props.index)}
          onClick={() => props.handleImageClick(props.index)}
        >
          <img
            src={props.img.url}
            alt={`Uploaded ${props.index}`}
            style={{ width: props.img.metadata.width, height: props.img.metadata.height }}
          />
          <div
            onMouseDown={(e) => props.handleResizeStart(e, props.index)}
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              width: 10,
              height: 10,
              background: 'blue',
              cursor: 'nwse-resize',
            }}
          />
        </div>  
    </div>
  )
}
