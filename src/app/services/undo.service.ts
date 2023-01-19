import { Injectable } from '@angular/core';
import { Action } from '../models/action';

@Injectable({
  providedIn: 'root'
})
export class UndoService {
  _canvas!: fabric.Canvas;
  public undoStack: Action[]=[];
  public redoStack: Action[]=[];
  historyIndex:number=0;
  disabledUndo:boolean=true;
  disabledRedo:boolean=true;
  isUndoActive:boolean=false;
  constructor() { }

  initCanvas(canvas:fabric.Canvas){
     this._canvas = canvas;
     this.registerEvents();
  }
  registerEvents(){
 
    this._canvas.on('object:added', (e)=>{this.objectAdded(e)});
      this._canvas.on('object:modified',  (e)=>{this.objectModified(e)});
    this._canvas.on('object:removed',  (e)=>{this.objectRemoved(e)});
    
  }
  objectAdded(e: any): void {

    if(e.target.type=="path" || e.target.type=="group"){
       e.target.selectable = false
       e.target.hoverCursor = 'default';
    }
    if(this.isUndoActive){
      return;
    }
    console.log(this.undoStack)
    this.undoStack.push({
      action: "ADD",
      object: e.target
    });
    this.redoStack=[];
    this.historyIndex++;

  }
  objectRemoved(e: any): void {
    if(this.isUndoActive){
      return;
    }
    this.undoStack.push({
      action: "REM",
      object: e.target
    });
    this.redoStack=[];
    this.historyIndex++;
  }
  objectModified(e:any):void{
    if(this.isUndoActive){
      return;
    }
    this.undoStack.push({
      action: "MOD",
      object: e.target
    });
    this.redoStack=[];
    this.historyIndex++;
    // this.handleSelection(e.target)
  }

  handleSelection(obj:any){
    const { left, top, width, height } = obj.getBoundingRect();
    let buttonContainer = document.getElementById('buttonContainer');
    if(buttonContainer){
      buttonContainer.style.left = `${(left+width/4)-(buttonContainer.clientWidth/4)}px`;
      buttonContainer.style.top = `${top + height + 5}px`;
      buttonContainer.style.display = 'block';
    }
  }
  undo(){
    this.isUndoActive =true;
    var undoAction = this.undoStack.pop()
    if(undoAction){
      this.redoStack.push(undoAction)
      this.handleUndo(undoAction)
    }
    if(this.undoStack.length==0){
      this.disabledUndo =false;
    }
    this.isUndoActive =false;
  }
  redo(){
    this.isUndoActive =true;
    var redoAction = this.redoStack.pop()
    if(redoAction){
      this.undoStack.push(redoAction)
      this.handleRedo(redoAction)
      
    }
    if(this.redoStack.length==0){
      this.disabledRedo =false;
    }
    this.isUndoActive =false;
  }
  handleUndo(undoAction:Action){
    if(undoAction.action == 'ADD'){
      this._canvas.remove(undoAction.object);
    }
    else if(undoAction.action == 'REM'){
      this._canvas.add(undoAction.object);
    }else{
       undoAction.object.set({
       left : this.undoStack.at(-1)?.object.left,
       top : this.undoStack.at(-1)?.object.top,
       })
    }
  }
  handleRedo(undoAction:Action){
    if(undoAction.action == 'ADD'){
      this._canvas.add(undoAction.object);
    }
    else if(undoAction.action == 'REM'){
      this._canvas.remove(undoAction.object);
    }else{
       undoAction.object.set({
       left : this.redoStack.at(-1)?.object.left,
       top : this.redoStack.at(-1)?.object.top,
       })
    }
  }


}
