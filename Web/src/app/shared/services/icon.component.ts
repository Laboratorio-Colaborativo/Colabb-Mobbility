import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconService } from '../../shared/services/icon.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      [attr.width]="size" 
      [attr.height]="size" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      [attr.stroke-width]="strokeWidth" 
      stroke-linecap="round" 
      stroke-linejoin="round"
      [class]="className"
      [innerHTML]="svgContent">
    </svg>
  `
})
export class IconComponent {
  @Input() name: string = '';
  @Input() size: number = 24;
  @Input() strokeWidth: number = 2;
  @Input() className: string = '';
  
  private iconService = inject(IconService);
  private sanitizer = inject(DomSanitizer);
  
  get svgContent(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.iconService.getIcon(this.name));
  }
}