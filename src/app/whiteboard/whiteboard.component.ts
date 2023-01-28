class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

import { Component } from '@angular/core';
import { fabric } from 'fabric';
import { UndoService } from '../services/undo.service';
import { ToolService } from '../services/tool.service';
import {setCustoms } from '../fabric/customSettings';
import { toolsConfig} from './tools.config';
import { EventListenerService } from '../services/eventListener.service';
@Component({
  selector: 'app-whiteboard',
  templateUrl: './whiteboard.component.html',
  styleUrls: ['./whiteboard.component.scss']
})
export class WhiteboardComponent {
  
   _canvas!: fabric.Canvas;
   colors: string[] = ['#0E0E0E', '#FE0000', '#1878F3', '#EFC733', '#CB503E', '#8C1092','#06CF9C','#33648D','#6A000C'];
   fontFamilies:string[]=['Tahoma','sans-serif','Times New Roman','Courier New','Arial','Helvetica','Lucida Console']
   selectedColor: string = '#0E0E0E';
   selectedStroke: number = 5;
   fontSizes=[10,20,30,40,50,60,80];
   currentTool: string = 'selector';
   activeObject:any = null;
  toolsList:any;
  fontFamily:any='Tahoma';
  selectedFile?: ImageSnippet;
  imageService: any;
  constructor(public toolService: ToolService, public undoService: UndoService, public evntListner:EventListenerService) {
    this.toolsList = toolsConfig;
  }
  public ngOnInit(): void {
      this._canvas = new fabric.Canvas('fabricCanavs', {
        width: window.innerWidth,
        height: window.innerHeight,
        isDrawingMode: true
      });
      this._canvas.add(new fabric.IText("Hello",{
        left:100,
        top:100,
        fontSize:20,
        stroke: this.selectedColor
      }))
      this.toolService.initCanvas(this._canvas);
      this.undoService.initCanvas(this._canvas);
      this.toolService.updateTool('selector');
      this.evntListner.initCanvas(this._canvas);
      setCustoms('#FF5733 ',this._canvas);
  }
  changeFontFamily(ff:string){
    this.evntListner.changeFont(ff);
  }
  changeFontSize(fs:string){
    this.evntListner.changeFontSize(fs);
  }
  onZoom(num:number){
    let zoom = this._canvas.getZoom();
    zoom *= 0.999 ** num;
    if (zoom > 4) zoom = 4;
    if (zoom < 0.01) zoom = 0.01;
    this._canvas.setZoom(zoom);
  }
  updateTextColor(color:string){
    this.evntListner.updateTextColor(color);
  }
   onToolChange(tool: string) {
     this.currentTool = tool;
     this.toolService.updateTool(tool)
   }
   updateToolColor(color: string) {
     this.selectedColor = color;
     this.toolService.changedColor(color)
   }
   setTheme(color: string){
     setCustoms(color,this._canvas);
     this._canvas.renderAll();
   }
   updateToolStroke() {
     this.toolService.changedStroke(this.selectedStroke)
   }
   onUndo() {
    this.undoService.undo()
   }
   onRedo() {
     this.undoService.redo()
   }
   activeTool(active:any,toolsList:any){
    return(toolsList.find((tool:any) => tool.toolCode === active));  
   }
   setColor(color:string){
    return (this.currentTool == color? 'primary' :'default')
   }
   handleFileInput(event: any) {
    let files = event.target.files;
    const file = files.item(0);
    const reader = new FileReader();
    if(!file){
       return;
    }
    reader.readAsDataURL(file);
    reader.onload = () => {
      let imageUrl = reader.result as string;
      console.log(imageUrl)
      fabric.Image.fromURL(imageUrl, (img) => {
        img.set({
          left: window.innerWidth/4,
          top: window.innerHeight/4,
          angle: 0,
          padding: 10,
          cornerSize: 10,
          hasRotatingPoint: true,
          scaleX: 0.25,
          scaleY: 0.25
        });
        this._canvas.add(img);
        this._canvas.setActiveObject(img);
        
        this.toolService.updateTool('selector');
      });

    };
  }
}
