import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonComponent } from './button/button.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [ButtonComponent, LoaderComponent],
  imports: [CommonModule],
  exports: [ButtonComponent, LoaderComponent],
})
export class UiModule {}
