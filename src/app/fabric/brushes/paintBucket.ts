import { fabric } from 'fabric';
const fabricjs: typeof fabric =
    typeof fabric === 'undefined' ? require('fabric').fabric : fabric;
import FloodFill from 'q-floodfill'
import {
    FabricEvent,
    FabricPointer,
    FabricPointerEvent,
} from '../types/fabric.utils';

export interface PaintBucketInterface extends fabric.BaseBrush {

    onMouseDown(pointer: FabricPointer | FabricEvent, ev: FabricEvent): void;
    onMouseMove(pointer: FabricPointer | FabricEvent, ev: FabricEvent): void;
    onMouseUp(ev?: FabricEvent): void;
}

const PaintBucketImp = <any>fabricjs.util.createClass(fabricjs.BaseBrush, {


    /**
     * Constructor
     * @param {fabricjs.Canvas} canvas
     * @return {Pointer} Instance of a pencil brush
     */
    initialize: function (canvas: fabric.Canvas) {
        this.canvas = canvas;
        console.log("kkk")
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
        this.floodFill(pointer);
    },
    floodFill: function(pointer: any) {
        const context = this.canvas.getContext('2d')
        const imgData = context.getImageData(0, 0, this.canvas.width, this.canvas.height)
        // Construct flood fill instance
        const floodFill = new FloodFill(imgData)
        // Modify image data
        floodFill.fill('rgb(255, 0, 0)', Math.round(pointer.x),Math.round( pointer.y), 0)
        // put the modified data back in context
        context.putImageData(floodFill.imageData, 0, 0)

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
        // this.canvas.freeDrawingCursor = 'pointer';
    },
    /**
     * Invoked on mouse up
     * @param {Object} ev
     */
    onMouseUp: function (ev?: FabricEvent) {
        // this.canvas.freeDrawingCursor = 'pointer';
     },
   
});

/**
 * PaintBucket class
 * @class fabricjs.PaintBucket
 * @extends fabricjs.BaseBrush
 */
const PaintBucket: {
    new(canvas: fabric.StaticCanvas): PaintBucketInterface;
} = PaintBucketImp;

(fabricjs as any).PaintBucket = PaintBucket;
export default PaintBucket;