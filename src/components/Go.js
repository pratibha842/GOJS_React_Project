import React, {useState} from 'react';
import * as go from 'gojs';
import { ReactDiagram } from 'gojs-react';
import './go.css';

function initDiagram() {
  const $ = go.GraphObject.make;
  const diagram =
    $(go.Diagram,
        {
            allowDelete: false,
            allowCopy: false,
            'undoManager.isEnabled': true,
            'clickCreatingTool.archetypeNodeData': { text: 'new node', color: 'lightblue' },
            
            model: new go.GraphLinksModel(
            {
                linkKeyProperty: 'key'
            })
        }
      );

      
    diagram.nodeTemplate =
    $(go.Node, 'Auto',
      new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
      
      $(go.Shape, 'diamond',
        { name: 'SHAPE', fill: 'white', strokeWidth: 0, width:200, height:130, margin:4},
    
        new go.Binding('fill', 'color')),
      $(go.TextBlock,
        { margin: 8, editable: true, name: 'TEXT'},
        new go.Binding('text').makeTwoWay()
      ),
      { 
        mouseEnter: function(e, obj) {
        var shape = obj.findObject("SHAPE");
        shape.fill = "#FFCCFF";
        shape.stroke = "#A6E6A1";
        var text = obj.findObject("TEXT");
        text.stroke = "black";
        },
        mouseLeave: function(e, obj) { 
        var shape = obj.findObject("SHAPE");
        shape.fill = obj.data.color;
        shape.stroke = null;
        var text = obj.findObject("TEXT");
        text.stroke = "black";
        },
       
      }
    
    );

  return diagram;
}


function CursorClick(CursorClick){
    return diagram;
}
function Go() {
    
  return (
    <div >
      
      <ReactDiagram
      name='cursor'
        initDiagram={initDiagram}
        divClassName='diagram-component'
        nodeDataArray={[
          { key: 0, text: 'Alpha', color: 'lightblue', loc: '80 85'},
          { key: 1, text: 'Beta', color: 'orange', loc: '180 20' },
          { key: 2, text: 'Gamma', color: 'lightgreen', loc: '280 85' },
          { key: 3, text: 'Delta', color: 'pink', loc: '175 220' }
        ]}
        linkDataArray={[
          { key: -1, from: 0, to: 3 },
        ]}
        
        onCursorClick={CursorClick}

        
      />
    </div>
  );
}

export default Go;