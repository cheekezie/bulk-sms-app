import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonComponent } from './button/button.component';
import { LoaderComponent } from './loader/loader.component';
import { EmptyComponent } from './empty/empty.component';

@NgModule({
  declarations: [ButtonComponent, LoaderComponent, EmptyComponent],
  imports: [CommonModule],
  exports: [ButtonComponent, LoaderComponent, EmptyComponent],
})
export class UiModule {}
