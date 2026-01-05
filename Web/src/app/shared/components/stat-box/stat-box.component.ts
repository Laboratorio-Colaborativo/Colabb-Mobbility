import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stat-box',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex flex-col pl-4 border-l-4 border-gray-200 hover:border-colabb-lime-light transition-colors cursor-default">
      <span class="text-[24px] font-black text-colabb-dark tracking-tighter">{{ value }}</span>
      <span class="text-[16px] text-gray-500 font-mono uppercase tracking-widest bg-gray-100 inline-block px-1 w-fit mt-1">{{ label }}</span>
      <span *ngIf="sub" class="text-[16px] text-green-600 font-bold mt-1 flex items-center gap-1">
           <span class="text-[8px]">▲</span> {{ sub }}
      </span>
    </div>
  `
})
export class StatBoxComponent {
  @Input() label: string = '';
  @Input() value: string = '';
  @Input() sub: string = '';
}