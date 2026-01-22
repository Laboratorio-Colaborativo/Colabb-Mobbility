import { Injectable, signal } from '@angular/core';

export type UserMode = 'rider' | 'workshop';

@Injectable({ providedIn: 'root' })
export class UiStateService {
  // Usando Signals para un rendimiento óptimo y sintaxis limpia
  view = signal<'home' | 'shop' | 'login'>('home');
  userMode = signal<UserMode>('rider');
  isMenuOpen = signal<boolean>(false);

  setView(view: 'home' | 'shop' | 'login') {
    this.view.set(view);
    this.isMenuOpen.set(false);
  }

  setUserMode(mode: UserMode) {
    this.userMode.set(mode);
  }

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
  }
}