// src/app/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationPanelComponent } from './navigation-panel/navigation-panel.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavigationPanelComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [NavigationPanelComponent]
})
export class SharedModule { }
