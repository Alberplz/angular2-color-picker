import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    ColorPickerDirective,
    SliderDirective,
    TextDirective,
    DialogComponent,
    ColorPickerService
} from './index';

@NgModule({
    declarations: [
        ColorPickerDirective,
        SliderDirective,
        TextDirective,
        DialogComponent
    ],
    imports: [ CommonModule ],
    exports: [ ColorPickerDirective ],
    entryComponents: [ DialogComponent ],
    providers: [ ColorPickerService ],
})
export class ColorPickerModule {
}
