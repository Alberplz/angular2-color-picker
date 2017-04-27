import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ColorPickerService} from './color-picker.service';
import {ColorPickerDirective, DynamicCpModule} from './color-picker.directive';

@NgModule({
    imports: [CommonModule, DynamicCpModule],
    providers: [ColorPickerService],
    declarations: [ColorPickerDirective],
    exports: [ColorPickerDirective]
})
export class ColorPickerModule {}
