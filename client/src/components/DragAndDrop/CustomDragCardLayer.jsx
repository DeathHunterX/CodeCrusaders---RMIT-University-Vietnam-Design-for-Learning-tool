import React from 'react';
import { useDragLayer } from 'react-dnd';

const CustomDragCardLayer = () => {
  const { item, isDragging, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    isDragging: monitor.isDragging(),
    currentOffset: monitor.getSourceClientOffset(),
  }));

  if (!isDragging) {
    return null;
  }


  return (
    <div style={{
      position: 'fixed',
      pointerEvents: 'none',
      zIndex: 10000,
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    }}>
      <div style={{
        position: 'absolute',
        top: currentOffset.y,
        left: currentOffset.x,
        boxSizing: 'border-box',
        width: item.itemStats.width,
        height: item.itemStats.height,
        transition: 'none 0s ease 0s',
        zIndex: 10000,
        pointerEvents: 'none',
        userSelect: 'none',
        // backgroundColor: 'rgba(255, 255, 255, 0.5)',
        // border: '2px dashed gray',
        // boxShadow: '0px 0px 10px gray',
      }}>
        
        { item && 
          <div className="class_activity" style={{height: '100px', position:'relative'}}>
        
            <div className="activity_card mb-3" style={{userSelect: 'none', boxShadow: 'rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px',}}>
                <div className="activity_symbols" style={{backgroundColor: `${item.data.activityIconBg}`}}>
                    {item.data.activityIcon}
                </div>
                <div className="activity_content">
                    <div className="content_body">
                        <h5 className="activity_name">{item.data.activityName}</h5>
                        <p className="activity_desc">{item.data.activityDescription}</p>     
                    </div>
                </div>
            </div>
              
          </div>
        }
      </div>
    </div>
  );
}

export default CustomDragCardLayer
