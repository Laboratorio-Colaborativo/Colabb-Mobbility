import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type UserMode = 'rider' | 'workshop';

@Injectable({ providedIn: 'root' })
export class UiStateService {
  private userModeSubject = new BehaviorSubject<UserMode>('rider');
  userMode$ = this.userModeSubject.asObservable();

  setUserMode(mode: UserMode) {
    this.userModeSubject.next(mode);
  }
}