import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UiStateService } from '../shared/services/ui-state.service';
import { IconComponent } from '../shared/components/icons/icon.component';
import { DoodleButtonComponent } from '../shared/components/doodle-button/doodle-button.component';
import { DoodleCardComponent } from '../shared/components/doodle-card/doodle-card.component';
import { StatBoxComponent } from '../shared/components/stat-box/stat-box.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IconComponent,
    DoodleButtonComponent,
    DoodleCardComponent,
    StatBoxComponent
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  public uiStateService = inject(UiStateService);

  openWhatsApp(): void {
    // En un futuro, esto podría abrir una URL de WhatsApp
    alert('Contactando a soporte por WhatsApp...');
  }
}