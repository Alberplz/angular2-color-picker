import {NgModule, ModuleWithProviders} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ColorPickerService} from './color-picker.service';
import {ColorPickerDirective} from './color-picker.directive';

@NgModule({
    imports: [CommonModule],
    providers: [],
    declarations: [ColorPickerDirective],
    exports: [ColorPickerDirective]
})
export class ColorPickerModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ColorPickerModule,
            providers: [ColorPickerService]
        };
    }
}
