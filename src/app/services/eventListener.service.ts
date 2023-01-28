import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventListenerService {
  updateTextColor(color: string) {
    this.activeObject.set({
      fill : color
    });
    this.handleSelection(this.activeObject)
  }
  changeFontSize(num: string) {
    this.activeObject.set({
      fontSize : num
    });
    this.handleSelection(this.activeObject)
  }
  changeFont(ff: string) {
    this.activeObject.set({
      fontFamily : ff
    });
    this._canvas.renderAll();
  }
  private _canvas: any;
  activeObject: any;

  constructor() { }
  initCanvas(canvas: fabric.Canvas) {
    this._canvas = canvas;
    this.activeObject =null
    this.registerEvents()
  }
  registerEvents() {
    this._canvas.on('selection:created', (options: any) => {
      this.activeObject = options.selected[0];
      if (this.activeObject.type == 'i-text') {
        this.handleSelection(options.selected[0])
      }

    });
    this._canvas.on('selection:updated', (options: any) => {
      let buttonContainer = document.getElementById('buttonContainer');
      if (buttonContainer) buttonContainer.style.display = 'none';
      this.activeObject = options.selected[0];
      if (this.activeObject.type == 'i-text') {
        this.handleSelection(options.selected[0])
      }

    });
    this._canvas.on('object:modified', (options: any) => {
      this.activeObject = options.target;
      if (this.activeObject.type == 'i-text') {
        this.handleSelection(options.target)
      }

    });

    this._canvas.on('object:moving', function (event: any) {
      let buttonContainer = document.getElementById('buttonContainer');
      if (buttonContainer) buttonContainer.style.display = 'none';
    });
    this._canvas.on('object:scaling', function (event: any) {
      let buttonContainer = document.getElementById('buttonContainer');
      if (buttonContainer) buttonContainer.style.display = 'none';
    });
    this._canvas.on('object:rotating', function (event: any) {
      let buttonContainer = document.getElementById('buttonContainer');
      if (buttonContainer) buttonContainer.style.display = 'none';
    });



    this._canvas.on('selection:cleared', (options: any) => {
      let buttonContainer = document.getElementById('buttonContainer');
      if (buttonContainer) buttonContainer.style.display = 'none';
    });
  }
  handleSelection(obj:any){
    this._canvas.renderAll()
      const { left, top, width, height } = obj.getBoundingRect();
      let buttonContainer = document.getElementById('buttonContainer');
      console.log(left, top, width, height)
      if(buttonContainer){
        buttonContainer.style.left = `${((left+width/2)-110)}px`;
        buttonContainer.style.top = `${top + height + 11}px`;
        buttonContainer.style.display = 'block';
      }
    }
}
