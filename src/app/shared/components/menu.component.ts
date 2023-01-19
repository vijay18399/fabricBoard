import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-menu',
  template: `
    <button [class.active]="activeTool"  (click)="isOpen = !isOpen;" class="btn">
        <i class="icon"  [ngClass]="icon" > </i> 
    </button>

    <div class="menu" [class.open]="isOpen" #menu >
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
  .btn{
    background-color: #FAFAFA;
    margin: 5px;
    width: 40px;
    height: 40px;
    border-radius: 10px;
    color:#183153;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0px;
  }
  .active{
    background-color:#183153;
    color: #FAFAFA;
  }
    .menu {
    
      display: none;
    }

    .menu.open {
    display: block;
    position: absolute;
    top: 5px;
    left: 75px;
    padding: 12px;
    background-color: white;
    box-shadow: 0px 0px 5px 0px rgb(0 0 0 / 75%);
    border-radius: 5px;
    }
  `]
})
export class MenuComponent {
  @Input() icon = 'fa-solid  fa-rotate-left';
  @Input() activeTool = null;
  public isOpen = false;
  constructor(private elementRef: ElementRef) { }
  @HostListener('document:click', ['$event'])
  clickOut(event: { target: any; }) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }


}