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
var index_1 = require('./index');
var ColorPickerModule = (function () {
    function ColorPickerModule() {
    }
    ColorPickerModule = __decorate([
        core_1.NgModule({
            declarations: [
                index_1.ColorPickerDirective,
                index_1.SliderDirective,
                index_1.TextDirective,
                index_1.DialogComponent
            ],
            imports: [common_1.CommonModule],
            exports: [index_1.ColorPickerDirective],
            entryComponents: [index_1.DialogComponent],
            providers: [index_1.ColorPickerService],
        }), 
        __metadata('design:paramtypes', [])
    ], ColorPickerModule);
    return ColorPickerModule;
}());
exports.ColorPickerModule = ColorPickerModule;

//# sourceMappingURL=color-picker.module.js.map
