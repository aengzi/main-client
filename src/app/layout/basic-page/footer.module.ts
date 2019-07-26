import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { BasicPageFooterComponent } from './footer.component';

@NgModule({
  declarations: [
    BasicPageFooterComponent
  ],
  exports: [
    BasicPageFooterComponent
  ],
  imports: [
    FlexLayoutModule
  ]
})
export class BasicPageFooterModule { }
