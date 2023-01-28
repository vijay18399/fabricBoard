import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'color-menu',
  template: `
    <button [ngStyle]="{ backgroundColor  :activeColor}"  (click)="isOpen = !isOpen;" class="btn">
    </button>

    <div class="menu" [class.open]="isOpen" #menu >
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
  .btn{
    width: 40px;
    height: 40px;
    border-radius: 15px;
    border: 8px white solid;
  }
    .menu {
      display: none;
    }

 .menu.open {
    display: block;
    position: absolute;
    top: 300px;
    left: 75px;
    padding: 12px;
    background-color: white;
    box-shadow: 0px 0px 5px 0px rgb(0 0 0 / 75%);
    border-radius: 5px;
    }
  `]
})
export class ColorPickerComponent {
  @Input() activeColor = 'white';
  public isOpen = false;
  constructor(private elementRef: ElementRef) { }
  @HostListener('document:click', ['$event'])
  clickOut(event: { target: any; }) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }

}