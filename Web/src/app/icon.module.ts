import { NgModule } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { AppIcons } from './icons';

@NgModule({
  imports: [
    LucideAngularModule.pick(AppIcons)
  ],
  exports: [
    LucideAngularModule
  ]
})
export class IconModule { }