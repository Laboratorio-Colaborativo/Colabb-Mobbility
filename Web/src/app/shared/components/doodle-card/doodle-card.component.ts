import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doodle-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doodle-card.component.html',
})
export class DoodleCardComponent {
  @Input() highlight = false;
  // Permite añadir clases extra desde el padre si es necesario
  @Input() className = '';
}
