import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ColorPickerService} from './color-picker.service';
import {ColorPickerDirective} from './color-picker.directive';

@NgModule({
    imports: [CommonModule],
    providers: [ColorPickerService],
    declarations: [ColorPickerDirective],
    exports: [ColorPickerDirective]
})
export class ColorPickerModule {}
