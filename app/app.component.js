System.register(['angular2/core', './color-picker/color-picker.directive'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, color_picker_directive_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (color_picker_directive_1_1) {
                color_picker_directive_1 = color_picker_directive_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.color = "#127bdc";
                    this.color2 = "hsla(300,82%,52%)";
                    this.color3 = "#fff500";
                    this.color4 = "rgb(236,64,64)";
                    this.color5 = "rgba(45,208,45,1)";
                    this.color6 = "#1973c0";
                    this.color7 = "#f200bd";
                    this.color8 = "#a8ff00";
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'app/demo.html',
                        directives: [color_picker_directive_1.ColorPickerDirective]
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map