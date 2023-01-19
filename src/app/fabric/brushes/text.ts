import { fabric } from 'fabric';
const fabricjs: typeof fabric =
    typeof fabric === 'undefined' ? require('fabric').fabric : fabric;

import {
    FabricEvent,
    FabricPointer,
    FabricPointerEvent,
} from '../types/fabric.utils';

export interface TextCreatorInterface extends fabric.BaseBrush {

    onMouseDown(pointer: FabricPointer | FabricEvent, ev: FabricEvent): void;
    onMouseMove(pointer: FabricPointer | FabricEvent, ev: FabricEvent): void;
    onMouseUp(ev?: FabricEvent): void;
}

const TextCreatorImp = <any>fabricjs.util.createClass(fabricjs.BaseBrush, {


    /**
     * Constructor
     * @param {fabricjs.Canvas} canvas
     * @return {Pointer} Instance of a pencil brush
     */
    initialize: function (canvas: fabric.Canvas) {
        this.canvas = canvas;
        this.isEditing =false;
    },
    setFontFamily(ff:string){
      this.fontFamily=ff;
    },
    /**
     * Inovoked on mouse down
     * @param {Object} pointer
     * @param {Object} ev
     */
    onMouseDown: function (
        pointer: any,
        ev: FabricEvent
    ) {
        if(this.isEditing){
            var object = this.canvas.findTarget(pointer,true);
            if(object && object.type=='i-text'){
                this.canvas.setActiveObject(object);
                object.enterEditing();
                return;
            }
        }

         this.fabicText = new fabric.IText('', {
            left: pointer.x,
            top: pointer.y,
            fontFamily: this.fontFamily,
            fill:  this.color,
            fontSize: this.width*10 || 25,
          });

          this.canvas.add(this.fabicText)
          this.canvas.setActiveObject(this.fabicText);
          this.fabicText.enterEditing();
          this.isEditing =true;
    },
    /**
     * Inovoked on mouse move
     * @param {Object} pointer
     * @param {Object} ev
     */
    onMouseMove: function (
        pointer: FabricPointer | FabricEvent,
        ev: FabricEvent
    ) { 
    },
    /**
     * Invoked on mouse up
     * @param {Object} ev
     */
    onMouseUp: function (ev?: FabricEvent) {

     }
   
});

/**
 * TextCreator class
 * @class fabricjs.TextCreator
 * @extends fabricjs.BaseBrush
 */
const TextCreator: {
    new(canvas: fabric.StaticCanvas): TextCreatorInterface;
} = TextCreatorImp;

(fabricjs as any).TextCreator = TextCreator;
export default TextCreator;