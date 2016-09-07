"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var color_picker_service_1 = require('./color-picker.service');
var color_picker_directive_1 = require('./color-picker.directive');
var ColorPickerModule = (function () {
    function ColorPickerModule() {
    }
    ColorPickerModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            providers: [color_picker_service_1.ColorPickerService],
            declarations: [color_picker_directive_1.ColorPickerDirective],
            exports: [common_1.CommonModule, color_picker_directive_1.ColorPickerDirective]
        }), 
        __metadata('design:paramtypes', [])
    ], ColorPickerModule);
    return ColorPickerModule;
}());
exports.ColorPickerModule = ColorPickerModule;

//# sourceMappingURL=color-picker.module.js.map
