import { Component, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { WhiteboardComponent } from './whiteboard/whiteboard.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  pagesCount : number = 0;
  currentPage : number = 0;
  list:any;
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef
  ) {
     this.createPage();
  }

  createPage() {
     this.pagesCount ++;
     this.next()
     this.list = [...Array(this.pagesCount+1).keys()].slice(1);
  }

  next() {
    this.currentPage++;
  }
  prev(){
    this.currentPage--;
  }

}
