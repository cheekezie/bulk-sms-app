import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  CapitalizePipe,
  ExtractFileTypeFromPath,
  MaskText,
  NameInitials,
  Ordinal,
  ReplaceUnderscore,
  StripUnderscore,
  TransformAmount,
  TransformCamelCase,
  TransformDayTime,
  TransformRef,
  TransformTime,
  TransformToNaira,
} from './index';

@NgModule({
  declarations: [
    StripUnderscore,
    TransformTime,
    Ordinal,
    TransformRef,
    TransformToNaira,
    TransformDayTime,
    TransformCamelCase,
    NameInitials,
    ExtractFileTypeFromPath,
    MaskText,
    ReplaceUnderscore,
    CapitalizePipe,
    TransformAmount,
    // ExtractFileType,
  ],
  imports: [CommonModule],
  exports: [
    StripUnderscore,
    TransformTime,
    Ordinal,
    TransformRef,
    TransformToNaira,
    TransformDayTime,
    TransformCamelCase,
    NameInitials,
    ReplaceUnderscore,
    TransformAmount,
    MaskText,
    CapitalizePipe,
    ExtractFileTypeFromPath,
  ],
})
export class CustomPipeModule {}
