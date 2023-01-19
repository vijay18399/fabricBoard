import { ɵbypassSanitizationTrustStyle } from '@angular/core';
import { fabric } from 'fabric';
const fabricjs: typeof fabric =
    typeof fabric === 'undefined' ? require('fabric').fabric : fabric;

import {
    FabricEvent,
    FabricPointer,
    FabricPointerEvent,
} from '../types/fabric.utils';

export interface PanZoomInterface extends fabric.BaseBrush {

    onMouseDown(pointer: FabricPointer | FabricEvent, ev: FabricEvent): void;
    onMouseMove(pointer: FabricPointer | FabricEvent, ev: FabricEvent): void;
    onMouseUp(ev?: FabricEvent): void;
}

const PanZoomImp = <any>fabricjs.util.createClass(fabricjs.BaseBrush, {


    /**
     * Constructor
     * @param {fabricjs.Canvas} canvas
     * @return {Pointer} Instance of a pencil brush
     */
    initialize: function (canvas: fabric.Canvas) {
        this.canvas = canvas;
        this.panning = false;
        this.zooming = false;
        this.lastX = 0;
        this.lastY = 0;
        this.canvas.on('mouse:wheel',(e:any)=>{this.onMouseWheel(e)});
    },
    /**
     * Inovoked on mouse down
     * @param {Object} pointer
     * @param {Object} ev
     */
    onMouseDown: function (
        pointer: any,
        ev: any
    ) {
        if(ev.e.touches){
        this.lastX = pointer.x;
        this.lastY = pointer.y;
        this.isTouch =true
        }
        this.panning = true;
        this.canvas.freeDrawingCursor =  `grabbing`;
    },
    /**
     * Inovoked on mouse move
     * @param {Object} pointer
     * @param {Object} ev
     */
    onMouseMove: function (
        pointer: any,
        ev: any
    ) { 
        if (!this.panning) return;
        if(ev.e.touches){
        ev.e.movementX =   pointer.x-this.lastX;
        ev.e.movementY =   pointer.y-this.lastY;
        }
        pointer = new fabric.Point(ev.e.movementX,ev.e.movementY)
        this.canvas.relativePan(pointer);
        this.canvas.freeDrawingCursor =  `grabbing`;
    },
    /**
     * Invoked on mouse up
     * @param {Object} ev
     */
    onMouseUp: function (ev?: FabricEvent) {
        this.panning = false;
        this.canvas.freeDrawingCursor =  `grab`;
     },
     
    /**
     * Invoked on mouse Wheel
     * @param {Object} opt
     */
     onMouseWheel: function(opt:any){
        let delta = opt.e.deltaY;
        let zoom = this.canvas.getZoom();
        zoom *= 0.999 ** delta;
        if (zoom > 4) zoom = 4;
        if (zoom < 0.01) zoom = 0.01;
        this.canvas.setZoom(zoom);
        opt.e.preventDefault();
        opt.e.stopPropagation();
    },
   
});

/**
 * PanZoom class
 * @class fabricjs.PanZoom
 * @extends fabricjs.BaseBrush
 */
const PanZoom: {
    new(canvas: fabric.StaticCanvas): PanZoomInterface;
} = PanZoomImp;

(fabricjs as any).PanZoom = PanZoom;
export default PanZoom;