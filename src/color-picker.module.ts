import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ColorPickerService} from './color-picker.service';
import {ColorPickerDirective, TextDirective, SliderDirective, DialogComponent} from './color-picker.directive';


@NgModule({
    imports: [CommonModule],
    providers: [ColorPickerService],
    declarations: [ColorPickerDirective, TextDirective, SliderDirective, DialogComponent],
    exports: [ColorPickerDirective],
    entryComponents: [DialogComponent]
})
export class ColorPickerModule {}
