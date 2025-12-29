import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../icons/icon.component';

type ButtonVariant = 'primary' | 'action' | 'outline' | 'ghost';

@Component({
  selector: 'doodle-button',
  standalone: true,
  imports: [CommonModule, IconComponent],
  template: `
    <button (click)="onClick.emit()" [ngClass]="getClasses()" [disabled]="disabled">
      <app-icon *ngIf="icon" [name]="icon" [size]="18" [strokeWidth]="2.5"></app-icon>
      <ng-content></ng-content>
    </button>
  `
})
export class DoodleButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() icon?: string;
  @Input() className: string = '';
  @Input() disabled: boolean = false;
  @Output() onClick = new EventEmitter<void>();

  getClasses() {
    const baseStyle = "relative font-bold px-6 py-3 transition-all duration-200 flex items-center justify-center gap-2 rounded-md border-2 border-black";
    const variants = {
      primary: `bg-colabb-tech-blue text-white shadow-[4px_4px_0px_0px_#000] hover:bg-[#208bc0]`,
      action: `bg-colabb-lime-light text-black shadow-[4px_4px_0px_0px_#000] hover:bg-[#ECEA00]`,
      outline: `bg-white text-black shadow-[4px_4px_0px_0px_#000] hover:bg-gray-50`,
      ghost: `bg-transparent border-none shadow-none text-gray-500 hover:text-black hover:bg-gray-100/50`,
    };
    const interactiveStyle = this.disabled
      ? 'opacity-50 cursor-not-allowed'
      : 'active:translate-y-1 active:shadow-none cursor-pointer';
    return `${baseStyle} ${variants[this.variant]} ${interactiveStyle} ${this.className}`;
  }
}