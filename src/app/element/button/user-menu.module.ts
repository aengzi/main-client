import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { UserMenuButtonComponent } from './user-menu.component';

@NgModule({
  declarations: [UserMenuButtonComponent],
  exports: [UserMenuButtonComponent],
  imports: [CommonModule, MaterialModule, RouterModule],
})
export class UserMenuButtonModule {}
