import { Injectable } from '@angular/core';
import  {fabric} from 'fabric';

import ClickEraser from '../fabric/brushes/eraser';
import Laser from '../fabric/brushes/laser';
import PaintBucket from '../fabric/brushes/paintBucket';
import PanZoom from '../fabric/brushes/pan';
import perfectFreeHand from '../fabric/brushes/perfectHand';

import Pointer from '../fabric/brushes/pointer';
import shapeCreator from '../fabric/brushes/shape.creator';
import TextCreator from '../fabric/brushes/text';


@Injectable({
  providedIn: 'root'
})
export class ToolService {
  _canvas!: fabric.Canvas;
  selectedColor: string="rgb(0,0,0)";
  selectedWidth: number=5;
  currentTool: string='pencil';
  tool:any;
  constructor() { }

  initCanvas(canvas:fabric.Canvas){
     this._canvas =canvas;
     this.tool=null;
  }
  updateTool(tool: string,fontFamily?:string) {
    this._canvas.isDrawingMode = true;
    this._canvas.off('mouse:wheeel');
   switch (tool) {
    case 'perfect':
      this.tool= new perfectFreeHand(this._canvas);
      break;
    case 'pencil':
      var cursorUrl =  'assets/cursors/pencil.cur';
      this._canvas.freeDrawingCursor =  `url(" ${cursorUrl} "), auto`;
      this.tool= new fabric.PencilBrush(this._canvas);
      break;
    case 'spraybrush':
      this.tool = new fabric.SprayBrush(this._canvas);
      break;
    case 'circlebrush':
      this.tool = new fabric.CircleBrush(this._canvas);
      break;
    case 'selector':
      this._canvas.isDrawingMode = false;
      return;
      break;
    case 'pointer':
      var cursorUrl =  'https://ossrs.net/wiki/images/figma-cursor.png';
      this._canvas.freeDrawingCursor =  `url(" ${cursorUrl} "), auto`;
      this.tool = new Pointer(this._canvas);
      break;
    case 'laser':
      var cursorUrl =  'assets/cursors/circle.cur';
      this._canvas.freeDrawingCursor =  `url(" ${cursorUrl} "), auto`;
      this.tool = new Laser(this._canvas);
      break;
    case 'eraser':
      var cursorUrl =  'https://ossrs.net/wiki/images/figma-cursor.png';
      this._canvas.freeDrawingCursor =  `url(" ${cursorUrl} "), auto`;
      this.tool =  new ClickEraser(this._canvas);
      break;
    case 'text':
      var cursorUrl =  'https://ossrs.net/wiki/images/figma-cursor.png';
      this._canvas.freeDrawingCursor =  `url(" ${cursorUrl} "), auto`;
      this.tool = new TextCreator(this._canvas);
      this.tool.setFontFamily(fontFamily|| 'Tahoma')
      break;
    case 'paintbucket':
      var cursorUrl =  'https://ossrs.net/wiki/images/figma-cursor.png';
      this._canvas.freeDrawingCursor =  `url(" ${cursorUrl} "), auto`;
      this.tool = new PaintBucket(this._canvas);
      break;
    case 'panzoom':
      
      var cursorUrl =  'https://ossrs.net/wiki/images/figma-cursor.png';
      this._canvas.freeDrawingCursor =  `grab`;
      this.tool = new PanZoom(this._canvas);
      break;
    default:
      this.tool = new shapeCreator(this._canvas);
      this.tool.setShape(tool)
      break;
    }
    this.tool.color = this.selectedColor;
    this.tool.width =  this.selectedWidth;
    this._canvas.freeDrawingBrush =this.tool
  }
  changedColor(color:string) {
    this.selectedColor =  color;
    // this.updateCanvasObject();
    this._canvas.freeDrawingBrush.color = this.selectedColor;
  
  }
  changedStroke(selectedWidth:number) {    
    this.selectedWidth  = selectedWidth;
    // this.updateCanvasObject();
    this._canvas.freeDrawingBrush.width = this.selectedWidth;
  
  }
  updateCanvasObject(){
    let object = this._canvas.getActiveObject();
    let group = this._canvas.getActiveObjects();
     console.log(object)
    if(group.length){
      group.forEach((object: fabric.Object) => {
       object.set({
        stroke :    this.selectedColor,
        strokeWidth:   this.selectedWidth
       })
     });
     this._canvas.renderAll();

    }
    else if(object){
      object.set({
        stroke :    this.selectedColor,
        strokeWidth:   this.selectedWidth
      });
      this._canvas.renderAll();
    }
  }
}
