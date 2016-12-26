"use strict";
const core_1 = require("@angular/core");
const common_1 = require("@angular/common");
const color_picker_service_1 = require("./color-picker.service");
const color_picker_directive_1 = require("./color-picker.directive");
let ColorPickerModule = class ColorPickerModule {
};
ColorPickerModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        providers: [color_picker_service_1.ColorPickerService],
        declarations: [color_picker_directive_1.ColorPickerDirective],
        exports: [color_picker_directive_1.ColorPickerDirective]
    }),
    __metadata("design:paramtypes", [])
], ColorPickerModule);
exports.ColorPickerModule = ColorPickerModule;
//# sourceMappingURL=color-picker.module.js.map