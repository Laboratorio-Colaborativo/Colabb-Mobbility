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
  const whatsappTaller = 'https://wa.me/message/SICL53S57PGNJ1';
  const whatsappMotero = 'https://wa.me/message/SICL53S57PGNJ1';

  console.log('Current user mode:', this.uiStateService.userMode());

  // Abrimos en una pestaña nueva para que el cliente no pierda de vista el catálogo
  if (this.uiStateService.userMode() === 'rider') {
    console.log('Opening WhatsApp for rider');
    window.open(whatsappMotero, '_blank');
  } else {
    console.log('Opening WhatsApp for workshop');
    window.open(whatsappTaller, '_blank');
  }
}
}