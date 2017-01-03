import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorPickerService } from './color-picker.service';
import { ColorPickerDirective, TextDirective, SliderDirective, DialogComponent } from './color-picker.directive';
export var ColorPickerModule = (function () {
    function ColorPickerModule() {
    }
    ColorPickerModule.decorators = [
        { type: NgModule, args: [{
                    imports: [CommonModule],
                    providers: [ColorPickerService],
                    declarations: [ColorPickerDirective, TextDirective, SliderDirective, DialogComponent],
                    exports: [ColorPickerDirective],
                    entryComponents: [DialogComponent]
                },] },
    ];
    /** @nocollapse */
    ColorPickerModule.ctorParameters = function () { return []; };
    return ColorPickerModule;
}());
//# sourceMappingURL=color-picker.module.js.map