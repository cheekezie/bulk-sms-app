import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from './text-input/text-input.component';
import { SelectComponent } from './select/select.component';
import { UiModule } from '../ui/ui.module';

@NgModule({
  declarations: [TextInputComponent, SelectComponent],
  imports: [CommonModule, UiModule],
  exports: [TextInputComponent, SelectComponent],
})
export class FormInputsModule {}
