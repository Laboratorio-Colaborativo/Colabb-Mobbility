import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type BadgeType = 'neutral' | 'tech' | 'urgent' | 'brand';

@Component({
  selector: 'app-marker-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span [ngClass]="getClasses()">
      {{ text }}
    </span>
  `
})
export class MarkerBadgeComponent {
  @Input() text: string = '';
  @Input() type: BadgeType | string | undefined | null = 'neutral';

  getClasses(): string {
    const baseStyle = 'px-2 py-0.5 rounded-sm text-[10px] font-mono font-bold uppercase tracking-wider border-b-2 inline-block';
    const styles: Record<string, string> = {
      neutral: "bg-gray-100 text-gray-600 border-gray-200",
      tech: "bg-colabb-tech-blue-light text-[#006064] border-colabb-tech-blue -rotate-2",
      urgent: "bg-colabb-lime-light-light text-black border-colabb-lime-light rotate-1 font-black",
      brand: "bg-colabb-brand-purple-light text-colabb-brand-purple border-colabb-brand-purple"
    };
    return `${baseStyle} ${styles[this.type || 'neutral'] || styles['neutral']}`;
  }
}