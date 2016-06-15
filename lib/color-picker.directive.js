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
var color_picker_service_1 = require('./color-picker.service');
var classes_1 = require('./classes');
var ColorPickerDirective = (function () {
    function ColorPickerDirective(dcl, vcRef, el, service) {
        this.dcl = dcl;
        this.vcRef = vcRef;
        this.el = el;
        this.service = service;
        this.colorPickerChange = new core_1.EventEmitter();
        this.cpPosition = 'right';
        this.cpPositionOffset = '0%';
        this.cpPositionRelativeToArrow = false;
        this.cpOutputFormat = 'hex';
        this.cpCancelButton = false;
        this.cpCancelButtonClass = 'cp-cancel-button-class';
        this.cpCancelButtonText = 'Cancel';
        this.cpFallbackColor = '#fff';
        this.cpHeight = '290px';
        this.created = false;
    }
    ColorPickerDirective.prototype.ngOnInit = function () {
        var hsva = this.service.stringToHsva(this.colorPicker);
        if (hsva == null) {
            hsva = this.service.stringToHsva(this.cpFallbackColor);
        }
        this.colorPickerChange.emit(this.service.outputFormat(hsva, this.cpOutputFormat));
    };
    ColorPickerDirective.prototype.onClick = function () {
        var _this = this;
        if (!this.created) {
            this.created = true;
            this.dcl.loadNextToLocation(DialogComponent, this.vcRef)
                .then(function (res) {
                res.instance.setDialog(_this, _this.el, _this.colorPicker, _this.cpPosition, _this.cpPositionOffset, _this.cpPositionRelativeToArrow, _this.cpOutputFormat, _this.cpCancelButton, _this.cpCancelButtonClass, _this.cpCancelButtonText, _this.cpHeight);
                _this.dialog = res.instance;
            });
        }
        else if (this.dialog) {
            this.dialog.setInitialColor(this.colorPicker);
            this.dialog.openColorPicker();
        }
    };
    ColorPickerDirective.prototype.colorChanged = function (value) {
        this.colorPickerChange.emit(value);
    };
    ColorPickerDirective.prototype.changeInput = function (value) {
        this.dialog.setColorFromString(value);
        this.colorPickerChange.emit(value);
    };
    __decorate([
        core_1.Input('colorPicker'), 
        __metadata('design:type', String)
    ], ColorPickerDirective.prototype, "colorPicker", void 0);
    __decorate([
        core_1.Output('colorPickerChange'), 
        __metadata('design:type', Object)
    ], ColorPickerDirective.prototype, "colorPickerChange", void 0);
    __decorate([
        core_1.Input('cpPosition'), 
        __metadata('design:type', String)
    ], ColorPickerDirective.prototype, "cpPosition", void 0);
    __decorate([
        core_1.Input('cpPositionOffset'), 
        __metadata('design:type', String)
    ], ColorPickerDirective.prototype, "cpPositionOffset", void 0);
    __decorate([
        core_1.Input('cpPositionRelativeToArrow'), 
        __metadata('design:type', Boolean)
    ], ColorPickerDirective.prototype, "cpPositionRelativeToArrow", void 0);
    __decorate([
        core_1.Input('cpOutputFormat'), 
        __metadata('design:type', String)
    ], ColorPickerDirective.prototype, "cpOutputFormat", void 0);
    __decorate([
        core_1.Input('cpCancelButton'), 
        __metadata('design:type', Boolean)
    ], ColorPickerDirective.prototype, "cpCancelButton", void 0);
    __decorate([
        core_1.Input('cpCancelButtonClass'), 
        __metadata('design:type', String)
    ], ColorPickerDirective.prototype, "cpCancelButtonClass", void 0);
    __decorate([
        core_1.Input('cpCancelButtonText'), 
        __metadata('design:type', String)
    ], ColorPickerDirective.prototype, "cpCancelButtonText", void 0);
    __decorate([
        core_1.Input('cpFallbackColor'), 
        __metadata('design:type', String)
    ], ColorPickerDirective.prototype, "cpFallbackColor", void 0);
    __decorate([
        core_1.Input('cpHeight'), 
        __metadata('design:type', String)
    ], ColorPickerDirective.prototype, "cpHeight", void 0);
    ColorPickerDirective = __decorate([
        core_1.Directive({
            selector: '[colorPicker]',
            host: {
                '(input)': 'changeInput($event.target.value)',
                '(click)': 'onClick()'
            }
        }), 
        __metadata('design:paramtypes', [core_1.DynamicComponentLoader, core_1.ViewContainerRef, core_1.ElementRef, color_picker_service_1.ColorPickerService])
    ], ColorPickerDirective);
    return ColorPickerDirective;
}());
exports.ColorPickerDirective = ColorPickerDirective;
var TextDirective = (function () {
    function TextDirective() {
        this.newValue = new core_1.EventEmitter();
    }
    TextDirective.prototype.changeInput = function (value) {
        if (this.rg === undefined) {
            this.newValue.emit(value);
        }
        else {
            var numeric = parseFloat(value);
            if (!isNaN(numeric) && numeric >= 0 && numeric <= this.rg) {
                this.newValue.emit({ v: numeric, rg: this.rg });
            }
        }
    };
    __decorate([
        core_1.Output('newValue'), 
        __metadata('design:type', Object)
    ], TextDirective.prototype, "newValue", void 0);
    __decorate([
        core_1.Input('text'), 
        __metadata('design:type', Object)
    ], TextDirective.prototype, "text", void 0);
    __decorate([
        core_1.Input('rg'), 
        __metadata('design:type', Number)
    ], TextDirective.prototype, "rg", void 0);
    TextDirective = __decorate([
        core_1.Directive({
            selector: '[text]',
            host: {
                '(input)': 'changeInput($event.target.value)'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], TextDirective);
    return TextDirective;
}());
exports.TextDirective = TextDirective;
var SliderDirective = (function () {
    function SliderDirective(el) {
        var _this = this;
        this.el = el;
        this.newValue = new core_1.EventEmitter();
        this.listenerMove = function (event) { _this.move(event); };
        this.listenerStop = function () { _this.stop(); };
    }
    SliderDirective.prototype.setCursor = function (event) {
        var height = this.el.nativeElement.offsetHeight;
        var width = this.el.nativeElement.offsetWidth;
        var x = Math.max(0, Math.min(this.getX(event), width));
        var y = Math.max(0, Math.min(this.getY(event), height));
        if (this.rgX !== undefined && this.rgY !== undefined) {
            this.newValue.emit({ s: x / width, v: (1 - y / height), rgX: this.rgX, rgY: this.rgY });
        }
        else if (this.rgX === undefined && this.rgY !== undefined) {
            this.newValue.emit({ v: y / height, rg: this.rgY });
        }
        else {
            this.newValue.emit({ v: x / width, rg: this.rgX });
        }
    };
    SliderDirective.prototype.move = function (event) {
        event.preventDefault();
        this.setCursor(event);
    };
    SliderDirective.prototype.start = function (event) {
        this.setCursor(event);
        document.addEventListener('mousemove', this.listenerMove);
        document.addEventListener('touchmove', this.listenerMove);
        document.addEventListener('mouseup', this.listenerStop);
        document.addEventListener('touchend', this.listenerStop);
    };
    SliderDirective.prototype.stop = function () {
        document.removeEventListener('mousemove', this.listenerMove);
        document.removeEventListener('touchmove', this.listenerMove);
        document.removeEventListener('mouseup', this.listenerStop);
        document.removeEventListener('touchend', this.listenerStop);
    };
    SliderDirective.prototype.getX = function (event) {
        return (event.pageX !== undefined ? event.pageX : event.touches[0].pageX) - this.el.nativeElement.getBoundingClientRect().left - window.pageXOffset;
    };
    SliderDirective.prototype.getY = function (event) {
        return (event.pageY !== undefined ? event.pageY : event.touches[0].pageY) - this.el.nativeElement.getBoundingClientRect().top - window.pageYOffset;
    };
    __decorate([
        core_1.Output('newValue'), 
        __metadata('design:type', Object)
    ], SliderDirective.prototype, "newValue", void 0);
    __decorate([
        core_1.Input('slider'), 
        __metadata('design:type', String)
    ], SliderDirective.prototype, "slider", void 0);
    __decorate([
        core_1.Input('rgX'), 
        __metadata('design:type', Number)
    ], SliderDirective.prototype, "rgX", void 0);
    __decorate([
        core_1.Input('rgY'), 
        __metadata('design:type', Number)
    ], SliderDirective.prototype, "rgY", void 0);
    SliderDirective = __decorate([
        core_1.Directive({
            selector: '[slider]',
            host: {
                '(mousedown)': 'start($event)',
                '(touchstart)': 'start($event)'
            }
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], SliderDirective);
    return SliderDirective;
}());
exports.SliderDirective = SliderDirective;
var DialogComponent = (function () {
    function DialogComponent(el, service) {
        this.el = el;
        this.service = service;
        this.dialogWidth = 232;
        this.dialogArrowSize = 10;
        this.dialogArrowOffset = 15;
    }
    DialogComponent.prototype.setDialog = function (instance, elementRef, color, cpPosition, cpPositionOffset, cpPositionRelativeToArrow, cpOutputFormat, cpCancelButton, cpCancelButtonClass, cpCancelButtonText, cpHeight) {
        this.directiveInstance = instance;
        this.initialColor = color;
        this.directiveElementRef = elementRef;
        this.cpPosition = cpPosition;
        this.cpPositionOffset = parseInt(cpPositionOffset);
        if (!cpPositionRelativeToArrow) {
            this.dialogArrowOffset = 0;
        }
        this.cpOutputFormat = cpOutputFormat;
        this.cpCancelButton = cpCancelButton;
        this.cpCancelButtonClass = cpCancelButtonClass;
        this.cpCancelButtonText = cpCancelButtonText;
        this.cpHeight = parseInt(cpHeight);
    };
    DialogComponent.prototype.setInitialColor = function (color) {
        this.initialColor = color;
    };
    DialogComponent.prototype.ngOnInit = function () {
        var _this = this;
        var hsva = this.service.stringToHsva(this.initialColor);
        if (hsva !== null) {
            this.hsva = hsva;
        }
        else {
            this.hsva = new classes_1.Hsva(0, 1, 1, 1);
        }
        this.sliderDimMax = new classes_1.SliderDimension(150, 230, 130, 150);
        this.slider = new classes_1.SliderPosition(0, 0, 0, 0);
        if (this.cpOutputFormat === 'rgba') {
            this.format = 1;
        }
        else if (this.cpOutputFormat === 'hsla') {
            this.format = 2;
        }
        else {
            this.format = 0;
        }
        this.listenerMouseDown = function (event) { _this.onMouseDown(event); };
        this.listenerResize = function () { _this.onResize(); };
        this.update();
        this.openColorPicker();
    };
    DialogComponent.prototype.openColorPicker = function () {
        if (!this.show) {
            this.setDialogPosition();
            this.show = true;
            document.addEventListener('mousedown', this.listenerMouseDown);
            window.addEventListener('resize', this.listenerResize);
        }
    };
    DialogComponent.prototype.onMouseDown = function (event) {
        if (!this.isDescendant(this.el.nativeElement, event.target)
            && event.target != this.directiveElementRef.nativeElement) {
            this.closeColorPicker();
        }
    };
    DialogComponent.prototype.closeColorPicker = function () {
        this.show = false;
        document.removeEventListener('mouseup', this.listenerMouseDown);
        window.removeEventListener('resize', this.listenerResize);
    };
    DialogComponent.prototype.onResize = function () {
        if (this.position === 'fixed') {
            this.setDialogPosition();
        }
    };
    DialogComponent.prototype.setDialogPosition = function () {
        var node = this.directiveElementRef.nativeElement, position = 'static';
        var parentNode = null;
        while (node !== null && node.tagName !== 'HTML') {
            position = window.getComputedStyle(node).getPropertyValue("position");
            if (position !== 'static' && parentNode === null) {
                parentNode = node;
            }
            if (position === 'fixed') {
                break;
            }
            node = node.parentNode;
        }
        if (position !== 'fixed') {
            var boxDirective = this.createBox(this.directiveElementRef.nativeElement, true);
            if (parentNode === null) {
                parentNode = node;
            }
            var boxParent = this.createBox(parentNode, true);
            this.top = boxDirective.top - boxParent.top;
            this.left = boxDirective.left - boxParent.left;
        }
        else {
            var boxDirective = this.createBox(this.directiveElementRef.nativeElement, false);
            this.top = boxDirective.top;
            this.left = boxDirective.left;
            this.position = 'fixed';
        }
        if (this.cpPosition === 'left') {
            this.top += boxDirective.height * this.cpPositionOffset / 100 - this.dialogArrowOffset;
            this.left -= this.dialogWidth + this.dialogArrowSize;
        }
        else if (this.cpPosition === 'top') {
            this.top -= this.cpHeight + this.dialogArrowSize;
            this.left += this.cpPositionOffset / 100 * boxDirective.width - this.dialogArrowOffset;
            this.arrowTop = this.cpHeight - 1;
        }
        else if (this.cpPosition === 'bottom') {
            this.top += boxDirective.height + this.dialogArrowSize;
            this.left += this.cpPositionOffset / 100 * boxDirective.width - this.dialogArrowOffset;
        }
        else {
            this.top += boxDirective.height * this.cpPositionOffset / 100 - this.dialogArrowOffset;
            this.left += boxDirective.width + this.dialogArrowSize;
        }
    };
    DialogComponent.prototype.setSaturation = function (val) {
        var hsla = this.service.hsva2hsla(this.hsva);
        hsla.s = val.v / val.rg;
        this.hsva = this.service.hsla2hsva(hsla);
        this.update();
    };
    DialogComponent.prototype.setLightness = function (val) {
        var hsla = this.service.hsva2hsla(this.hsva);
        hsla.l = val.v / val.rg;
        this.hsva = this.service.hsla2hsva(hsla);
        this.update();
    };
    DialogComponent.prototype.setHue = function (val) {
        this.hsva.h = val.v / val.rg;
        this.update();
    };
    DialogComponent.prototype.setAlpha = function (val) {
        this.hsva.a = val.v / val.rg;
        this.update();
    };
    DialogComponent.prototype.setR = function (val) {
        var rgba = this.service.hsvaToRgba(this.hsva);
        rgba.r = val.v / val.rg;
        this.hsva = this.service.rgbaToHsva(rgba);
        this.update();
    };
    DialogComponent.prototype.setG = function (val) {
        var rgba = this.service.hsvaToRgba(this.hsva);
        rgba.g = val.v / val.rg;
        this.hsva = this.service.rgbaToHsva(rgba);
        this.update();
    };
    DialogComponent.prototype.setB = function (val) {
        var rgba = this.service.hsvaToRgba(this.hsva);
        rgba.b = val.v / val.rg;
        this.hsva = this.service.rgbaToHsva(rgba);
        this.update();
    };
    DialogComponent.prototype.setSaturationAndBrightness = function (val) {
        this.hsva.s = val.s / val.rgX;
        this.hsva.v = val.v / val.rgY;
        this.update();
    };
    DialogComponent.prototype.setColorFromString = function (value) {
        var hsva = this.service.stringToHsva(value);
        if (hsva !== null) {
            this.hsva = hsva;
        }
        this.update();
    };
    DialogComponent.prototype.formatPolicy = function () {
        this.format = (this.format + 1) % 3;
        if (this.format === 0 && this.hsva.a < 1) {
            this.format++;
        }
        return this.format;
    };
    DialogComponent.prototype.update = function () {
        var hsla = this.service.hsva2hsla(this.hsva);
        var rgba = this.service.denormalizeRGBA(this.service.hsvaToRgba(this.hsva));
        var hueRgba = this.service.denormalizeRGBA(this.service.hsvaToRgba(new classes_1.Hsva(this.hsva.h, 1, 1, 1)));
        this.hslaText = new classes_1.Hsla(Math.round((hsla.h) * 360), Math.round(hsla.s * 100), Math.round(hsla.l * 100), Math.round(hsla.a * 100) / 100);
        this.rgbaText = new classes_1.Rgba(rgba.r, rgba.g, rgba.b, Math.round(rgba.a * 100) / 100);
        this.hexText = this.service.hexText(rgba);
        this.alphaSliderColor = 'rgb(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ')';
        this.hueSliderColor = 'rgb(' + hueRgba.r + ',' + hueRgba.g + ',' + hueRgba.b + ')';
        if (this.format === 0 && this.hsva.a < 1) {
            this.format++;
        }
        this.outputColor = this.service.outputFormat(this.hsva, this.cpOutputFormat);
        this.slider = new classes_1.SliderPosition((this.hsva.h) * this.sliderDimMax.h - 8, this.hsva.s * this.sliderDimMax.s - 8, (1 - this.hsva.v) * this.sliderDimMax.v - 8, this.hsva.a * this.sliderDimMax.a - 8);
        this.directiveInstance.colorChanged(this.outputColor);
    };
    DialogComponent.prototype.cancelColor = function () {
        this.setColorFromString(this.initialColor);
        this.closeColorPicker();
    };
    DialogComponent.prototype.isDescendant = function (parent, child) {
        var node = child.parentNode;
        while (node !== null) {
            if (node === parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    };
    DialogComponent.prototype.createBox = function (element, offset) {
        return {
            top: element.getBoundingClientRect().top + (offset ? window.pageYOffset : 0),
            left: element.getBoundingClientRect().left + (offset ? window.pageXOffset : 0),
            width: element.offsetWidth,
            height: element.offsetHeight
        };
    };
    DialogComponent = __decorate([
        core_1.Component({
            selector: 'color-picker',
            template: "\n      <div class=\"color-picker\" *ngIf=\"show\" [style.height.px]=\"cpHeight\" [style.top.px]=\"top\" [style.left.px]=\"left\" [style.position]=\"position\">\n          <div class=\"arrow arrow-{{cpPosition}}\" [style.top.px]=\"arrowTop\"></div>    \n\n          <div [slider] [style.background-color]=\"hueSliderColor\" [rgX]=\"1\" [rgY]=\"1\" (newValue)=\"setSaturationAndBrightness($event)\" class=\"saturation-lightness\">\n              <div [style.left.px]=\"slider.s\" [style.top.px]=\"slider.v\" class=\"cursor\"></div>\n          </div>\n\n          <div [slider] [rgX]=\"1\" (newValue)=\"setHue($event)\" class=\"hue\">\n              <div [style.left.px]=\"slider.h\" class=\"cursor\"></div>\n          </div>\n\n          <div [slider] [style.background-color]=\"alphaSliderColor\" [rgX]=\"1\" (newValue)=\"setAlpha($event)\" class=\"alpha\">\n              <div [style.left.px]=\"slider.a\" class=\"cursor\"></div>\n          </div>\n\n          <div class=\"selected-color-background\"></div>\n          <div [style.background-color]=\"outputColor\" class=\"selected-color\"></div>\n\n          <div [hidden]=\"format!=2\" class=\"hsla-text\">\n              <input [text] type=\"number\" pattern=\"[0-9]*\" min=\"0\" max=\"360\" [rg]=\"360\" (newValue)=\"setHue($event)\" [value]=\"hslaText.h\"/>\n              <input [text] type=\"number\" pattern=\"[0-9]*\" min=\"0\" max=\"100\" [rg]=\"100\" (newValue)=\"setSaturation($event)\" [value]=\"hslaText.s\"/>\n              <input [text] type=\"number\" pattern=\"[0-9]*\" min=\"0\" max=\"100\" [rg]=\"100\" (newValue)=\"setLightness($event)\" [value]=\"hslaText.l\"/>\n              <input [text] type=\"number\" pattern=\"[0-9]+([.,][0-9]{1,2})?\" min=\"0\" max=\"1\" step=\"0.1\" [rg]=\"1\" (newValue)=\"setAlpha($event)\" [value]=\"hslaText.a\"/>\n              <div>H</div><div>S</div><div>L</div><div>A</div>\n          </div>\n\n          <div [hidden]=\"format!=1\" class=\"rgba-text\">\n              <input [text] type=\"number\" pattern=\"[0-9]*\" min=\"0\" max=\"255\" [rg]=\"255\" (newValue)=\"setR($event)\" [value]=\"rgbaText.r\"/>\n              <input [text] type=\"number\" pattern=\"[0-9]*\" min=\"0\" max=\"255\" [rg]=\"255\" (newValue)=\"setG($event)\" [value]=\"rgbaText.g\"/>\n              <input [text] type=\"number\" pattern=\"[0-9]*\" min=\"0\" max=\"255\" [rg]=\"255\" (newValue)=\"setB($event)\" [value]=\"rgbaText.b\"/>\n              <input [text] type=\"number\" pattern=\"[0-9]+([.,][0-9]{1,2})?\" min=\"0\" max=\"1\" step=\"0.1\" [rg]=\"1\" (newValue)=\"setAlpha($event)\" [value]=\"rgbaText.a\"/>\n              <div>R</div><div>G</div><div>B</div><div>A</div>\n          </div>\n\n          <div [hidden]=\"format!=0\" class=\"hex-text\">\n              <input [text] (newValue)=\"setColorFromString($event)\" [value]=\"hexText\"/>\n              <div>Hex</div>\n          </div>\n\n          <div (click)=\"formatPolicy()\" class=\"type-policy\"></div>\n    \n          <button *ngIf=\"cpCancelButton\" type=\"button\" class=\"{{cpCancelButtonClass}}\" (click)=\"cancelColor()\">{{cpCancelButtonText}}</button>\n\n      </div>\n    ",
            styles: ["\n      /*\n       * Styles for Color Picker\n       * \n       * Alberto Pujante\n       * \n       * @licence: http://opensource.org/licenses/MIT\n       */\n      .color-picker, .color-picker * {\n        -webkit-box-sizing: border-box;\n        -moz-box-sizing: border-box;\n        box-sizing: border-box;\n        margin: 0;\n        font-size: 11px; }\n\n      .color-picker {\n        width: 232px;\n        height: 290px;\n        border: #777 solid 1px;\n        left: 30px;\n        top: 250px;\n        position: absolute;\n        z-index: 1000;\n        background-color: #fff;\n        -webkit-touch-callout: none;\n        -webkit-user-select: none;\n        -khtml-user-select: none;\n        -moz-user-select: none;\n        -ms-user-select: none;\n        user-select: none; }\n        .color-picker i {\n          cursor: default;\n          position: relative; }\n        .color-picker input {\n          text-align: center;\n          font-size: 13px;\n          height: 26px;\n          -moz-appearance: textfield; }\n          .color-picker input:invalid {\n            box-shadow: none; }\n          .color-picker input:-moz-submit-invalid {\n            box-shadow: none; }\n          .color-picker input:-moz-ui-invalid {\n            box-shadow: none; }\n          .color-picker input::-webkit-inner-spin-button, .color-picker input::-webkit-outer-spin-button {\n            -webkit-appearance: none;\n            margin: 0; }\n        .color-picker .cp-cancel-button-class {\n          position: absolute;\n          top: 275px;\n          left: 161px; }\n        .color-picker .arrow {\n          height: 0;\n          width: 0;\n          border-style: solid;\n          position: absolute;\n          z-index: 999999; }\n        .color-picker .arrow-right {\n          border-width: 5px 10px;\n          border-color: transparent #777 transparent transparent;\n          top: 10px;\n          left: -20px; }\n        .color-picker .arrow-left {\n          border-width: 5px 10px;\n          border-color: transparent transparent transparent #777;\n          top: 10px;\n          left: 231px; }\n        .color-picker .arrow-bottom {\n          border-width: 10px 5px;\n          border-color: transparent transparent #777 transparent;\n          top: -20px;\n          left: 10px; }\n        .color-picker .arrow-top {\n          border-width: 10px 5px;\n          border-color: #777 transparent transparent transparent;\n          left: 10px; }\n        .color-picker div.cursor-sv {\n          cursor: default;\n          position: relative;\n          -moz-border-radius: 50%;\n          -webkit-border-radius: 50%;\n          border-radius: 50%;\n          -khtml-border-radius: 50%;\n          width: 15px;\n          height: 15px;\n          border: #ddd solid 1px; }\n        .color-picker div.cursor {\n          cursor: default;\n          position: relative;\n          -moz-border-radius: 50%;\n          -webkit-border-radius: 50%;\n          border-radius: 50%;\n          -khtml-border-radius: 50%;\n          width: 16px;\n          height: 16px;\n          border: #222 solid 2px; }\n        .color-picker .saturation-lightness {\n          width: 230px;\n          height: 130px;\n          border: none;\n          top: 0;\n          left: 0;\n          position: absolute;\n          background-image: url(\"data:image/png;base64,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\"); }\n        .color-picker .hue {\n          width: 150px;\n          height: 16px;\n          border: none;\n          top: 145px;\n          left: 70px;\n          position: absolute;\n          background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAAAQCAYAAAD06IYnAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AIWDwkUFWbCCAAAAFxJREFUaN7t0kEKg0AQAME2x83/n2qu5qCgD1iDhCoYdpnbQC9bbY1qVO/jvc6k3ad91s7/7F1/csgPrujuQ17BDYSFsBAWwgJhISyEBcJCWAgLhIWwEBYIi2f7Ar/1TCgFH2X9AAAAAElFTkSuQmCC\"); }\n        .color-picker .alpha {\n          width: 150px;\n          height: 16px;\n          border: none;\n          top: 175px;\n          left: 70px;\n          position: absolute;\n          background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAAAQCAYAAAD06IYnAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4AIWDwYQlZMa3gAAAWVJREFUaN7tmEGO6jAQRCsOArHgBpyAJYGjcGocxAm4A2IHpmoWE0eBH+ezmFlNvU06shJ3W6VEelWMUQAIIF9f6qZpimsA1LYtS2uF51/u27YVAFZVRUkEoGHdPV/sIcbIEIIkUdI/9Xa7neyv61+SWFUVAVCSct00TWn2fv6u3+Ecfd3tXzy/0+nEUu+SPjo/kqzrmiQpScN6v98XewfA8/lMkiLJ2WxGSUopcT6fM6U0NX9/frfbjev1WtfrlZfLhYfDQQHG/AIOlnGwjINlHCxjHCzjYJm/TJWdCwquJXseFFzGwDNNeiKMOJTO8xQdDQaeB29+K9efeLaBo9J7vdvtJj1RjFFjfiv7qv95tjx/7leSQgh93e1ffMeIp6O+YQjho/N791t1XVOSSI7N//K+4/GoxWLBx+PB5/Op5XLJ+/3OlJJWqxU3m83ovv5iGf8KjYNlHCxjHCzjYBkHy5gf5gusvQU7U37jTAAAAABJRU5ErkJggg==\"); }\n        .color-picker .selected-color {\n          width: 40px;\n          height: 40px;\n          top: 147px;\n          left: 15px;\n          position: absolute;\n          -moz-border-radius: 50%;\n          -webkit-border-radius: 50%;\n          border-radius: 50%;\n          -khtml-border-radius: 50%; }\n        .color-picker .selected-color-background {\n          width: 40px;\n          height: 40px;\n          top: 147px;\n          left: 15px;\n          position: absolute;\n          -moz-border-radius: 50%;\n          -webkit-border-radius: 50%;\n          border-radius: 50%;\n          -khtml-border-radius: 50%;\n          background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAh0lEQVRYR+2W0QlAMQgD60zdfwOdqa8TmI/wQMr5K0I5bZLIzLOa2nt37VVVbd+dDx5obgCC3KBLwJ2ff4PnVidkf+ucIhw80HQaCLo3DMH3CRK3iFsmAWVl6hPNDwt8EvNE5q+YuEXcMgkonVM6SdyCoEvAnZ8v1Hjx817MilmxSUB5rdLJDycZgUAZUch/AAAAAElFTkSuQmCC\"); }\n        .color-picker .type-policy {\n          position: absolute;\n          top: 226px;\n          left: 206px;\n          background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAAgCAYAAAAffCjxAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAACewAAAnsB01CO3AAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAIASURBVEiJ7ZY9axRRFIafsxMStrLQJpAgpBFhi+C9w1YSo00I6RZ/g9vZpBf/QOr4GyRgkSKNSrAadsZqQGwCkuAWyRZJsySwvhZ7N/vhzrgbLH3Ld8597jlzz50zJokyxXH8DqDVar0qi6v8BbItqSGpEcfxdlmsFWXkvX8AfAVWg3UKPEnT9GKujMzsAFgZsVaCN1VTQd77XUnrgE1kv+6935268WRpzrnHZvYRWC7YvC3pRZZl3wozqtVqiyH9IgjAspkd1Gq1xUJQtVrdB9ZKIAOthdg/Qc65LUk7wNIMoCVJO865rYFhkqjX6/d7vV4GPJwBMqofURS5JEk6FYBer/eeYb/Mo9WwFnPOvQbeAvfuAAK4BN4sAJtAG/gJIElmNuiJyba3EGNmZiPeZuEVmVell/Y/6N+CzDn3AXhEOOo7Hv/3BeAz8IzQkMPnJbuPx1wC+yYJ7/0nYIP5S/0FHKdp+rwCEEXRS/rf5Hl1Gtb2M0iSpCOpCZzPATmX1EySpHMLAsiy7MjMDoHrGSDXZnaYZdnRwBh7J91utwmczAA6CbG3GgPleX4jqUH/a1CktqRGnuc3hSCAMB32gKspkCtgb3KCQMmkjeP4WNJThrNNZval1WptTIsv7JtQ4tmIdRa8qSoEpWl6YWZNoAN0zKxZNPehpLSBZv2t+Q0CJ9lLnARQLAAAAABJRU5ErkJggg==\");\n          background-repeat: no-repeat;\n          background-position: center;\n          background-size: 8px 16px;\n          -moz-background-size: 8px 16px;\n          -webkit-background-size: 8px 16px;\n          -o-background-size: 8px 16px;\n          width: 16px;\n          height: 24px; }\n        .color-picker .hsla-text, .color-picker .rgba-text {\n          position: absolute;\n          top: 220px;\n          left: 12px;\n          font-size: 11px; }\n          .color-picker .hsla-text input, .color-picker .rgba-text input {\n            margin: 0;\n            float: left;\n            width: 40px;\n            margin-left: 7px;\n            border: #a9a9a9 solid 1px;\n            padding: 1px; }\n          .color-picker .hsla-text div, .color-picker .rgba-text div {\n            float: left;\n            width: 40px;\n            text-align: center;\n            color: #555;\n            margin-left: 7px;\n            margin-top: 4px; }\n          .color-picker .hsla-text div:nth-child(5), .color-picker .rgba-text div:nth-child(5) {\n            clear: left; }\n        .color-picker .hex-text {\n          position: absolute;\n          top: 220px;\n          left: 30px;\n          font-size: 11px; }\n          .color-picker .hex-text input {\n            float: left;\n            width: 160px;\n            border: #a9a9a9 solid 1px;\n            padding: 1px; }\n          .color-picker .hex-text div {\n            text-align: center;\n            color: #555;\n            float: left;\n            clear: left;\n            width: 160px;\n            margin-top: 4px; }\n    "],
            directives: [SliderDirective, TextDirective]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, color_picker_service_1.ColorPickerService])
    ], DialogComponent);
    return DialogComponent;
}());
exports.DialogComponent = DialogComponent;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbG9yLXBpY2tlci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHFCQUE4SCxlQUFlLENBQUMsQ0FBQTtBQUM5SSxxQ0FBaUMsd0JBQXdCLENBQUMsQ0FBQTtBQUMxRCx3QkFBZ0UsV0FBVyxDQUFDLENBQUE7QUFTNUU7SUFlSSw4QkFBb0IsR0FBMkIsRUFBVSxLQUF1QixFQUFVLEVBQWMsRUFBVSxPQUEyQjtRQUF6SCxRQUFHLEdBQUgsR0FBRyxDQUF3QjtRQUFVLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBQVUsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFVLFlBQU8sR0FBUCxPQUFPLENBQW9CO1FBYmhILHNCQUFpQixHQUFHLElBQUksbUJBQVksRUFBVSxDQUFDO1FBQ3ZELGVBQVUsR0FBVyxPQUFPLENBQUM7UUFDdkIscUJBQWdCLEdBQVcsSUFBSSxDQUFDO1FBQ3ZCLDhCQUF5QixHQUFZLEtBQUssQ0FBQztRQUN0RCxtQkFBYyxHQUFXLEtBQUssQ0FBQztRQUMvQixtQkFBYyxHQUFZLEtBQUssQ0FBQztRQUMzQix3QkFBbUIsR0FBVyx3QkFBd0IsQ0FBQztRQUN4RCx1QkFBa0IsR0FBVyxRQUFRLENBQUM7UUFDekMsb0JBQWUsR0FBVyxNQUFNLENBQUM7UUFDeEMsYUFBUSxHQUFXLE9BQU8sQ0FBQztRQUsxQyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztJQUN6QixDQUFDO0lBRUQsdUNBQVEsR0FBUjtRQUNJLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN2RCxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNmLElBQUksR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDM0QsQ0FBQztRQUNELElBQUksQ0FB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S0FBSSxDQUFDLElBQUksRUFBRSxDQUFBLENBQUMsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCxtQ0FBUyxHQUFULFVBQVUsS0FBVTtRQUNoQixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUM7UUFDaEQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDO1FBQzlDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBRXhELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssU0FBUyxJQUFJLElBQUksQ0FBQyxHQUFHLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNuRCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBQzVGLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxTQUFTLElBQUksSUFBSSxDQUFDLEdBQUcsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQzFELElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMs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O1lBQ1AsUUFBUSxFQUFFLGNBQWM7WUFDeEIsUUFBUSxFQUFFLG1rR0E2Q1Q7WUFDRCxNQUFNLEVBQUUsQ0FBQyxzcXdCQWdNUixDQUFDO1lBQ0YsVUFBVSxFQUFFLENBQUMsZUFBZSxFQUFFLGFBQWEsQ0FBQztTQUMvQyxDQUFDOzt1QkFBQTtJQXVRRixzQkFBQztBQUFELENBdFFBLEFBc1FDLElBQUE7QUF0UVksdUJBQWUsa0JBc1EzQixDQUFBIiwiZmlsZSI6ImNvbG9yLXBpY2tlci5kaXJlY3RpdmUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NvbXBvbmVudCwgRHluYW1pY0NvbXBvbmVudExvYWRlciwgRGlyZWN0aXZlLCBJbnB1dCwgT3V0cHV0LCBWaWV3Q29udGFpbmVyUmVmLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIE9uSW5pdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7Q29sb3JQaWNrZXJTZXJ2aWNlfSBmcm9tICcuL2NvbG9yLXBpY2tlci5zZXJ2aWNlJztcclxuaW1wb3J0IHtSZ2JhLCBIc2xhLCBIc3ZhLCBTbGlkZXJQb3NpdGlvbiwgU2xpZGVyRGltZW5zaW9ufSBmcm9tICcuL2NsYXNzZXMnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ1tjb2xvclBpY2tlcl0nLFxyXG4gICAgaG9zdDoge1xyXG4gICAgICAgICcoaW5wdXQpJzogJ2NoYW5nZUlucHV0KCRldmVudC50YXJnZXQudmFsdWUpJyxcclxuICAgICAgICAnKGNsaWNrKSc6ICdvbkNsaWNrKCknXHJcbiAgICB9XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBDb2xvclBpY2tlckRpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XHJcbiAgICBASW5wdXQoJ2NvbG9yUGlja2VyJykgY29sb3JQaWNrZXI6IHN0cmluZztcclxuICAgIEBPdXRwdXQoJ2NvbG9yUGlja2VyQ2hhbmdlJykgY29sb3JQaWNrZXJDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuICAgIEBJbnB1dCgnY3BQb3NpdGlvbicpIGNwUG9zaXRpb246IHN0cmluZyA9ICdyaWdodCc7XHJcbiAgICBASW5wdXQoJ2NwUG9zaXRpb25PZmZzZXQnKSBjcFBvc2l0aW9uT2Zmc2V0OiBzdHJpbmcgPSAnMCUnO1xyXG4gICAgQElucHV0KCdjcFBvc2l0aW9uUmVsYXRpdmVUb0Fycm93JykgY3BQb3NpdGlvblJlbGF0aXZlVG9BcnJvdzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgQElucHV0KCdjcE91dHB1dEZvcm1hdCcpIGNwT3V0cHV0Rm9ybWF0OiBzdHJpbmcgPSAnaGV4JztcclxuICAgIEBJbnB1dCgnY3BDYW5jZWxCdXR0b24nKSBjcENhbmNlbEJ1dHRvbjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgQElucHV0KCdjcENhbmNlbEJ1dHRvbkNsYXNzJykgY3BDYW5jZWxCdXR0b25DbGFzczogc3RyaW5nID0gJ2NwLWNhbmNlbC1idXR0b24tY2xhc3MnO1xyXG4gICAgQElucHV0KCdjcENhbmNlbEJ1dHRvblRleHQnKSBjcENhbmNlbEJ1dHRvblRleHQ6IHN0cmluZyA9ICdDYW5jZWwnO1xyXG4gICAgQElucHV0KCdjcEZhbGxiYWNrQ29sb3InKSBjcEZhbGxiYWNrQ29sb3I6IHN0cmluZyA9ICcjZmZmJztcclxuICAgIEBJbnB1dCgnY3BIZWlnaHQnKSBjcEhlaWdodDogc3RyaW5nID0gJzI5MHB4JztcclxuICAgIHByaXZhdGUgZGlhbG9nOiBhbnk7XHJcbiAgICBwcml2YXRlIGNyZWF0ZWQ6IGJvb2xlYW47XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBkY2w6IER5bmFtaWNDb21wb25lbnRMb2FkZXIsIHByaXZhdGUgdmNSZWY6IFZpZXdDb250YWluZXJSZWYsIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgc2VydmljZTogQ29sb3JQaWNrZXJTZXJ2aWNlKSB7XHJcbiAgICAgICAgdGhpcy5jcmVhdGVkID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdmFyIGhzdmEgPSB0aGlzLnNlcnZpY2Uuc3RyaW5nVG9Ic3ZhKHRoaXMuY29sb3JQaWNrZXIpO1xyXG4gICAgICAgIGlmIChoc3ZhID09IG51bGwpIHtcclxuICAgICAgICAgICAgaHN2YSA9IHRoaXMuc2VydmljZS5zdHJpbmdUb0hzdmEodGhpcy5jcEZhbGxiYWNrQ29sb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmNvbG9yUGlja2VyQ2hhbmdlLmVtaXQodGhpcy5zZXJ2aWNlLm91dHB1dEZvcm1hdChoc3ZhLCB0aGlzLmNwT3V0cHV0Rm9ybWF0KSk7XHJcbiAgICB9XHJcblxyXG4gICAgb25DbGljaygpIHtcclxuICAgICAgICBpZiAoIXRoaXMuY3JlYXRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLmRjbC5sb2FkTmV4dFRvTG9jYXRpb24oRGlhbG9nQ29tcG9uZW50LCB0aGlzLnZjUmVmKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcy5pbnN0YW5jZS5zZXREaWFsb2codGhpcywgdGhpcy5lbCwgdGhpcy5jb2xvclBpY2tlciwgdGhpcy5jcFBvc2l0aW9uLCB0aGlzLmNwUG9zaXRpb25PZmZzZXQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3BQb3NpdGlvblJlbGF0aXZlVG9BcnJvdywgdGhpcy5jcE91dHB1dEZvcm1hdCwgdGhpcy5jcENhbmNlbEJ1dHRvbiwgdGhpcy5jcENhbmNlbEJ1dHRvbkNsYXNzLCB0aGlzLmNwQ2FuY2VsQnV0dG9uVGV4dCwgdGhpcy5jcEhlaWdodCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kaWFsb2cgPSByZXMuaW5zdGFuY2U7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZGlhbG9nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGlhbG9nLnNldEluaXRpYWxDb2xvcih0aGlzLmNvbG9yUGlja2VyKTtcclxuICAgICAgICAgICAgdGhpcy5kaWFsb2cub3BlbkNvbG9yUGlja2VyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbG9yQ2hhbmdlZCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5jb2xvclBpY2tlckNoYW5nZS5lbWl0KHZhbHVlKVxyXG4gICAgfVxyXG5cclxuICAgIGNoYW5nZUlucHV0KHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmRpYWxvZy5zZXRDb2xvckZyb21TdHJpbmcodmFsdWUpXHJcbiAgICAgICAgdGhpcy5jb2xvclBpY2tlckNoYW5nZS5lbWl0KHZhbHVlKVxyXG4gICAgfVxyXG59XHJcblxyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgICBzZWxlY3RvcjogJ1t0ZXh0XScsXHJcbiAgICBob3N0OiB7XHJcbiAgICAgICAgJyhpbnB1dCknOiAnY2hhbmdlSW5wdXQoJGV2ZW50LnRhcmdldC52YWx1ZSknXHJcbiAgICB9XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUZXh0RGlyZWN0aXZlIHtcclxuICAgIEBPdXRwdXQoJ25ld1ZhbHVlJykgbmV3VmFsdWUgPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcclxuICAgIEBJbnB1dCgndGV4dCcpIHRleHQ6IGFueTtcclxuICAgIEBJbnB1dCgncmcnKSByZzogbnVtYmVyO1xyXG5cclxuICAgIGNoYW5nZUlucHV0KHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAodGhpcy5yZyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmV3VmFsdWUuZW1pdCh2YWx1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGV0IG51bWVyaWMgPSBwYXJzZUZsb2F0KHZhbHVlKVxyXG4gICAgICAgICAgICBpZiAoIWlzTmFOKG51bWVyaWMpICYmIG51bWVyaWMgPj0gMCAmJiBudW1lcmljIDw9IHRoaXMucmcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubmV3VmFsdWUuZW1pdCh7IHY6IG51bWVyaWMsIHJnOiB0aGlzLnJnIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5ARGlyZWN0aXZlKHtcclxuICAgIHNlbGVjdG9yOiAnW3NsaWRlcl0nLFxyXG4gICAgaG9zdDoge1xyXG4gICAgICAgICcobW91c2Vkb3duKSc6ICdzdGFydCgkZXZlbnQpJyxcclxuICAgICAgICAnKHRvdWNoc3RhcnQpJzogJ3N0YXJ0KCRldmVudCknXHJcbiAgICB9XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBTbGlkZXJEaXJlY3RpdmUge1xyXG4gICAgQE91dHB1dCgnbmV3VmFsdWUnKSBuZXdWYWx1ZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xyXG4gICAgQElucHV0KCdzbGlkZXInKSBzbGlkZXI6IHN0cmluZztcclxuICAgIEBJbnB1dCgncmdYJykgcmdYOiBudW1iZXI7XHJcbiAgICBASW5wdXQoJ3JnWScpIHJnWTogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBsaXN0ZW5lck1vdmU6IGFueTtcclxuICAgIHByaXZhdGUgbGlzdGVuZXJTdG9wOiBhbnk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZikge1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXJNb3ZlID0gKGV2ZW50OiBhbnkpID0+IHsgdGhpcy5tb3ZlKGV2ZW50KSB9O1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXJTdG9wID0gKCkgPT4geyB0aGlzLnN0b3AoKSB9O1xyXG4gICAgfVxyXG5cclxuICAgIHNldEN1cnNvcihldmVudDogYW55KSB7XHJcbiAgICAgICAgbGV0IGhlaWdodCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQ7XHJcbiAgICAgICAgbGV0IHdpZHRoID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50Lm9mZnNldFdpZHRoO1xyXG4gICAgICAgIGxldCB4ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4odGhpcy5nZXRYKGV2ZW50KSwgd2lkdGgpKTtcclxuICAgICAgICBsZXQgeSA9IE1hdGgubWF4KDAsIE1hdGgubWluKHRoaXMuZ2V0WShldmVudCksIGhlaWdodCkpO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5yZ1ggIT09IHVuZGVmaW5lZCAmJiB0aGlzLnJnWSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMubmV3VmFsdWUuZW1pdCh7IHM6IHggLyB3aWR0aCwgdjogKDEgLSB5IC8gaGVpZ2h0KSwgcmdYOiB0aGlzLnJnWCwgcmdZOiB0aGlzLnJnWSB9KTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucmdYID09PSB1bmRlZmluZWQgJiYgdGhpcy5yZ1kgIT09IHVuZGVmaW5lZCkgey8vcmVhZHkgdG8gdXNlIHZlcnRpY2FsIHNsaWRlcnNcclxuICAgICAgICAgICAgdGhpcy5uZXdWYWx1ZS5lbWl0KHsgdjogeSAvIGhlaWdodCwgcmc6IHRoaXMucmdZIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMubmV3VmFsdWUuZW1pdCh7IHY6IHggLyB3aWR0aCwgcmc6IHRoaXMucmdYIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtb3ZlKGV2ZW50OiBhbnkpIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHRoaXMuc2V0Q3Vyc29yKGV2ZW50KTtcclxuICAgIH1cclxuXHJcbiAgICBzdGFydChldmVudDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5zZXRDdXJzb3IoZXZlbnQpO1xyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMubGlzdGVuZXJNb3ZlKTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLmxpc3RlbmVyTW92ZSk7XHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMubGlzdGVuZXJTdG9wKTtcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMubGlzdGVuZXJTdG9wKTtcclxuICAgIH1cclxuXHJcbiAgICBzdG9wKCkge1xyXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMubGlzdGVuZXJNb3ZlKTtcclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaG1vdmUnLCB0aGlzLmxpc3RlbmVyTW92ZSk7XHJcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMubGlzdGVuZXJTdG9wKTtcclxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMubGlzdGVuZXJTdG9wKTtcclxuICAgIH1cclxuXHJcbiAgICBnZXRYKGV2ZW50OiBhbnkpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiAoZXZlbnQucGFnZVggIT09IHVuZGVmaW5lZCA/IGV2ZW50LnBhZ2VYIDogZXZlbnQudG91Y2hlc1swXS5wYWdlWCkgLSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCAtIHdpbmRvdy5wYWdlWE9mZnNldDtcclxuICAgIH1cclxuICAgIGdldFkoZXZlbnQ6IGFueSk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIChldmVudC5wYWdlWSAhPT0gdW5kZWZpbmVkID8gZXZlbnQucGFnZVkgOiBldmVudC50b3VjaGVzWzBdLnBhZ2VZKSAtIHRoaXMuZWwubmF0aXZlRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgLSB3aW5kb3cucGFnZVlPZmZzZXQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICdjb2xvci1waWNrZXInLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL2NvbG9yLXBpY2tlci5odG1sJyxcclxuICAgIHN0eWxlVXJsczogWycuL2NvbG9yLXBpY2tlci5jc3MnXSxcclxuICAgIGRpcmVjdGl2ZXM6IFtTbGlkZXJEaXJlY3RpdmUsIFRleHREaXJlY3RpdmVdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBEaWFsb2dDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xyXG4gICAgcHJpdmF0ZSBoc3ZhOiBIc3ZhO1xyXG4gICAgcHJpdmF0ZSByZ2JhVGV4dDogUmdiYTtcclxuICAgIHByaXZhdGUgaHNsYVRleHQ6IEhzbGE7XHJcbiAgICBwcml2YXRlIGhleFRleHQ6IHN0cmluZztcclxuICAgIHByaXZhdGUgb3V0cHV0Q29sb3I6IHN0cmluZztcclxuICAgIHByaXZhdGUgYWxwaGFTbGlkZXJDb2xvcjogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBodWVTbGlkZXJDb2xvcjogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBzbGlkZXI6IFNsaWRlclBvc2l0aW9uO1xyXG4gICAgcHJpdmF0ZSBzbGlkZXJEaW1NYXg6IFNsaWRlckRpbWVuc2lvbjtcclxuICAgIHByaXZhdGUgZm9ybWF0OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHNob3c6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIHRvcDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBsZWZ0OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHBvc2l0aW9uOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIGRpcmVjdGl2ZUluc3RhbmNlOiBhbnk7XHJcbiAgICBwcml2YXRlIGluaXRpYWxDb2xvcjogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBkaXJlY3RpdmVFbGVtZW50UmVmOiBFbGVtZW50UmVmO1xyXG5cclxuICAgIHByaXZhdGUgbGlzdGVuZXJNb3VzZURvd246IGFueTtcclxuICAgIHByaXZhdGUgbGlzdGVuZXJSZXNpemU6IGFueTtcclxuXHJcbiAgICBwcml2YXRlIGNwUG9zaXRpb246IHN0cmluZztcclxuICAgIHByaXZhdGUgY3BQb3NpdGlvbk9mZnNldDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBjcE91dHB1dEZvcm1hdDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBjcENhbmNlbEJ1dHRvbjogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgY3BDYW5jZWxCdXR0b25DbGFzczogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBjcENhbmNlbEJ1dHRvblRleHQ6IHN0cmluZztcclxuICAgIHByaXZhdGUgY3BIZWlnaHQ6IG51bWJlcjtcclxuXHJcbiAgICBwcml2YXRlIGRpYWxvZ1dpZHRoOiBudW1iZXIgPSAyMzI7XHJcbiAgICBwcml2YXRlIGRpYWxvZ0Fycm93U2l6ZTogbnVtYmVyID0gMTA7XHJcbiAgICBwcml2YXRlIGRpYWxvZ0Fycm93T2Zmc2V0OiBudW1iZXIgPSAxNTtcclxuICAgIHByaXZhdGUgYXJyb3dUb3A6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmLCBwcml2YXRlIHNlcnZpY2U6IENvbG9yUGlja2VyU2VydmljZSkgeyB9XHJcblxyXG4gICAgc2V0RGlhbG9nKGluc3RhbmNlOiBhbnksIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIGNvbG9yOiBhbnksIGNwUG9zaXRpb246IHN0cmluZywgY3BQb3NpdGlvbk9mZnNldDogc3RyaW5nLFxyXG4gICAgICAgIGNwUG9zaXRpb25SZWxhdGl2ZVRvQXJyb3c6IGJvb2xlYW4sIGNwT3V0cHV0Rm9ybWF0OiBzdHJpbmcsIGNwQ2FuY2VsQnV0dG9uOiBib29sZWFuLCBjcENhbmNlbEJ1dHRvbkNsYXNzOiBzdHJpbmcsIGNwQ2FuY2VsQnV0dG9uVGV4dDogc3RyaW5nLCBjcEhlaWdodDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5kaXJlY3RpdmVJbnN0YW5jZSA9IGluc3RhbmNlO1xyXG4gICAgICAgIHRoaXMuaW5pdGlhbENvbG9yID0gY29sb3I7XHJcbiAgICAgICAgdGhpcy5kaXJlY3RpdmVFbGVtZW50UmVmID0gZWxlbWVudFJlZjtcclxuICAgICAgICB0aGlzLmNwUG9zaXRpb24gPSBjcFBvc2l0aW9uO1xyXG4gICAgICAgIHRoaXMuY3BQb3NpdGlvbk9mZnNldCA9IHBhcnNlSW50KGNwUG9zaXRpb25PZmZzZXQpO1xyXG4gICAgICAgIGlmICghY3BQb3NpdGlvblJlbGF0aXZlVG9BcnJvdykge1xyXG4gICAgICAgICAgICB0aGlzLmRpYWxvZ0Fycm93T2Zmc2V0ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jcE91dHB1dEZvcm1hdCA9IGNwT3V0cHV0Rm9ybWF0O1xyXG4gICAgICAgIHRoaXMuY3BDYW5jZWxCdXR0b24gPSBjcENhbmNlbEJ1dHRvbjtcclxuICAgICAgICB0aGlzLmNwQ2FuY2VsQnV0dG9uQ2xhc3MgPSBjcENhbmNlbEJ1dHRvbkNsYXNzO1xyXG4gICAgICAgIHRoaXMuY3BDYW5jZWxCdXR0b25UZXh0ID0gY3BDYW5jZWxCdXR0b25UZXh0O1xyXG4gICAgICAgIHRoaXMuY3BIZWlnaHQgPSBwYXJzZUludChjcEhlaWdodCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0SW5pdGlhbENvbG9yKGNvbG9yOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmluaXRpYWxDb2xvciA9IGNvbG9yO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIGxldCBoc3ZhID0gdGhpcy5zZXJ2aWNlLnN0cmluZ1RvSHN2YSh0aGlzLmluaXRpYWxDb2xvcik7XHJcbiAgICAgICAgaWYgKGhzdmEgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5oc3ZhID0gaHN2YTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLmhzdmEgPSBuZXcgSHN2YSgwLCAxLCAxLCAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zbGlkZXJEaW1NYXggPSBuZXcgU2xpZGVyRGltZW5zaW9uKDE1MCwgMjMwLCAxMzAsIDE1MCk7XHJcbiAgICAgICAgdGhpcy5zbGlkZXIgPSBuZXcgU2xpZGVyUG9zaXRpb24oMCwgMCwgMCwgMCk7XHJcbiAgICAgICAgaWYgKHRoaXMuY3BPdXRwdXRGb3JtYXQgPT09ICdyZ2JhJykge1xyXG4gICAgICAgICAgICB0aGlzLmZvcm1hdCA9IDE7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNwT3V0cHV0Rm9ybWF0ID09PSAnaHNsYScpIHtcclxuICAgICAgICAgICAgdGhpcy5mb3JtYXQgPSAyO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuZm9ybWF0ID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5saXN0ZW5lck1vdXNlRG93biA9IChldmVudDogYW55KSA9PiB7IHRoaXMub25Nb3VzZURvd24oZXZlbnQpIH07XHJcbiAgICAgICAgdGhpcy5saXN0ZW5lclJlc2l6ZSA9ICgpID0+IHsgdGhpcy5vblJlc2l6ZSgpIH07XHJcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgICAgICB0aGlzLm9wZW5Db2xvclBpY2tlcigpO1xyXG4gICAgfVxyXG5cclxuICAgIG9wZW5Db2xvclBpY2tlcigpIHtcclxuICAgICAgICBpZiAoIXRoaXMuc2hvdykge1xyXG4gICAgICAgICAgICB0aGlzLnNldERpYWxvZ1Bvc2l0aW9uKCk7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvdyA9IHRydWU7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHRoaXMubGlzdGVuZXJNb3VzZURvd24pO1xyXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5saXN0ZW5lclJlc2l6ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uTW91c2VEb3duKGV2ZW50OiBhbnkpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNEZXNjZW5kYW50KHRoaXMuZWwubmF0aXZlRWxlbWVudCwgZXZlbnQudGFyZ2V0KVxyXG4gICAgICAgICAgICAmJiBldmVudC50YXJnZXQgIT0gdGhpcy5kaXJlY3RpdmVFbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5jbG9zZUNvbG9yUGlja2VyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNsb3NlQ29sb3JQaWNrZXIoKSB7XHJcbiAgICAgICAgdGhpcy5zaG93ID0gZmFsc2U7XHJcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMubGlzdGVuZXJNb3VzZURvd24pO1xyXG4gICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmxpc3RlbmVyUmVzaXplKTtcclxuICAgIH1cclxuXHJcbiAgICBvblJlc2l6ZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5wb3NpdGlvbiA9PT0gJ2ZpeGVkJykge1xyXG4gICAgICAgICAgICB0aGlzLnNldERpYWxvZ1Bvc2l0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldERpYWxvZ1Bvc2l0aW9uKCkge1xyXG4gICAgICAgIHZhciBub2RlID0gdGhpcy5kaXJlY3RpdmVFbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsIHBvc2l0aW9uID0gJ3N0YXRpYyc7XHJcbiAgICAgICAgbGV0IHBhcmVudE5vZGUgPSBudWxsO1xyXG4gICAgICAgIHdoaWxlIChub2RlICE9PSBudWxsICYmIG5vZGUudGFnTmFtZSAhPT0gJ0hUTUwnKSB7XHJcbiAgICAgICAgICAgIHBvc2l0aW9uID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUobm9kZSkuZ2V0UHJvcGVydHlWYWx1ZShcInBvc2l0aW9uXCIpO1xyXG4gICAgICAgICAgICBpZiAocG9zaXRpb24gIT09ICdzdGF0aWMnICYmIHBhcmVudE5vZGUgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHBhcmVudE5vZGUgPSBub2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwb3NpdGlvbiA9PT0gJ2ZpeGVkJykge1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBvc2l0aW9uICE9PSAnZml4ZWQnKSB7XHJcbiAgICAgICAgICAgIHZhciBib3hEaXJlY3RpdmUgPSB0aGlzLmNyZWF0ZUJveCh0aGlzLmRpcmVjdGl2ZUVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIGlmIChwYXJlbnROb2RlID09PSBudWxsKSB7IHBhcmVudE5vZGUgPSBub2RlIH1cclxuICAgICAgICAgICAgbGV0IGJveFBhcmVudCA9IHRoaXMuY3JlYXRlQm94KHBhcmVudE5vZGUsIHRydWUpO1xyXG4gICAgICAgICAgICB0aGlzLnRvcCA9IGJveERpcmVjdGl2ZS50b3AgLSBib3hQYXJlbnQudG9wO1xyXG4gICAgICAgICAgICB0aGlzLmxlZnQgPSBib3hEaXJlY3RpdmUubGVmdCAtIGJveFBhcmVudC5sZWZ0O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBib3hEaXJlY3RpdmUgPSB0aGlzLmNyZWF0ZUJveCh0aGlzLmRpcmVjdGl2ZUVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgZmFsc2UpO1xyXG4gICAgICAgICAgICB0aGlzLnRvcCA9IGJveERpcmVjdGl2ZS50b3A7XHJcbiAgICAgICAgICAgIHRoaXMubGVmdCA9IGJveERpcmVjdGl2ZS5sZWZ0O1xyXG4gICAgICAgICAgICB0aGlzLnBvc2l0aW9uID0gJ2ZpeGVkJztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuY3BQb3NpdGlvbiA9PT0gJ2xlZnQnKSB7XHJcbiAgICAgICAgICAgIHRoaXMudG9wICs9IGJveERpcmVjdGl2ZS5oZWlnaHQgKiB0aGlzLmNwUG9zaXRpb25PZmZzZXQgLyAxMDAgLSB0aGlzLmRpYWxvZ0Fycm93T2Zmc2V0O1xyXG4gICAgICAgICAgICB0aGlzLmxlZnQgLT0gdGhpcy5kaWFsb2dXaWR0aCArIHRoaXMuZGlhbG9nQXJyb3dTaXplO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jcFBvc2l0aW9uID09PSAndG9wJykge1xyXG4gICAgICAgICAgICB0aGlzLnRvcCAtPSB0aGlzLmNwSGVpZ2h0ICsgdGhpcy5kaWFsb2dBcnJvd1NpemU7XHJcbiAgICAgICAgICAgIHRoaXMubGVmdCArPSB0aGlzLmNwUG9zaXRpb25PZmZzZXQgLyAxMDAgKiBib3hEaXJlY3RpdmUud2lkdGggLSB0aGlzLmRpYWxvZ0Fycm93T2Zmc2V0O1xyXG4gICAgICAgICAgICB0aGlzLmFycm93VG9wID0gdGhpcy5jcEhlaWdodCAtIDE7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNwUG9zaXRpb24gPT09ICdib3R0b20nKSB7XHJcbiAgICAgICAgICAgIHRoaXMudG9wICs9IGJveERpcmVjdGl2ZS5oZWlnaHQgKyB0aGlzLmRpYWxvZ0Fycm93U2l6ZTtcclxuICAgICAgICAgICAgdGhpcy5sZWZ0ICs9IHRoaXMuY3BQb3NpdGlvbk9mZnNldCAvIDEwMCAqIGJveERpcmVjdGl2ZS53aWR0aCAtIHRoaXMuZGlhbG9nQXJyb3dPZmZzZXQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy50b3AgKz0gYm94RGlyZWN0aXZlLmhlaWdodCAqIHRoaXMuY3BQb3NpdGlvbk9mZnNldCAvIDEwMCAtIHRoaXMuZGlhbG9nQXJyb3dPZmZzZXQ7XHJcbiAgICAgICAgICAgIHRoaXMubGVmdCArPSBib3hEaXJlY3RpdmUud2lkdGggKyB0aGlzLmRpYWxvZ0Fycm93U2l6ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U2F0dXJhdGlvbih2YWw6IHsgdjogbnVtYmVyLCByZzogbnVtYmVyIH0pIHtcclxuICAgICAgICBsZXQgaHNsYSA9IHRoaXMuc2VydmljZS5oc3ZhMmhzbGEodGhpcy5oc3ZhKTtcclxuICAgICAgICBoc2xhLnMgPSB2YWwudiAvIHZhbC5yZztcclxuICAgICAgICB0aGlzLmhzdmEgPSB0aGlzLnNlcnZpY2UuaHNsYTJoc3ZhKGhzbGEpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0TGlnaHRuZXNzKHZhbDogeyB2OiBudW1iZXIsIHJnOiBudW1iZXIgfSkge1xyXG4gICAgICAgIGxldCBoc2xhID0gdGhpcy5zZXJ2aWNlLmhzdmEyaHNsYSh0aGlzLmhzdmEpO1xyXG4gICAgICAgIGhzbGEubCA9IHZhbC52IC8gdmFsLnJnO1xyXG4gICAgICAgIHRoaXMuaHN2YSA9IHRoaXMuc2VydmljZS5oc2xhMmhzdmEoaHNsYSk7XHJcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRIdWUodmFsOiB7IHY6IG51bWJlciwgcmc6IG51bWJlciB9KSB7XHJcbiAgICAgICAgdGhpcy5oc3ZhLmggPSB2YWwudiAvIHZhbC5yZztcclxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldEFscGhhKHZhbDogeyB2OiBudW1iZXIsIHJnOiBudW1iZXIgfSkge1xyXG4gICAgICAgIHRoaXMuaHN2YS5hID0gdmFsLnYgLyB2YWwucmc7XHJcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRSKHZhbDogeyB2OiBudW1iZXIsIHJnOiBudW1iZXIgfSkge1xyXG4gICAgICAgIGxldCByZ2JhID0gdGhpcy5zZXJ2aWNlLmhzdmFUb1JnYmEodGhpcy5oc3ZhKTtcclxuICAgICAgICByZ2JhLnIgPSB2YWwudiAvIHZhbC5yZztcclxuICAgICAgICB0aGlzLmhzdmEgPSB0aGlzLnNlcnZpY2UucmdiYVRvSHN2YShyZ2JhKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xyXG4gICAgfVxyXG4gICAgc2V0Ryh2YWw6IHsgdjogbnVtYmVyLCByZzogbnVtYmVyIH0pIHtcclxuICAgICAgICBsZXQgcmdiYSA9IHRoaXMuc2VydmljZS5oc3ZhVG9SZ2JhKHRoaXMuaHN2YSk7XHJcbiAgICAgICAgcmdiYS5nID0gdmFsLnYgLyB2YWwucmc7XHJcbiAgICAgICAgdGhpcy5oc3ZhID0gdGhpcy5zZXJ2aWNlLnJnYmFUb0hzdmEocmdiYSk7XHJcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcclxuICAgIH1cclxuICAgIHNldEIodmFsOiB7IHY6IG51bWJlciwgcmc6IG51bWJlciB9KSB7XHJcbiAgICAgICAgbGV0IHJnYmEgPSB0aGlzLnNlcnZpY2UuaHN2YVRvUmdiYSh0aGlzLmhzdmEpO1xyXG4gICAgICAgIHJnYmEuYiA9IHZhbC52IC8gdmFsLnJnO1xyXG4gICAgICAgIHRoaXMuaHN2YSA9IHRoaXMuc2VydmljZS5yZ2JhVG9Ic3ZhKHJnYmEpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U2F0dXJhdGlvbkFuZEJyaWdodG5lc3ModmFsOiB7IHM6IG51bWJlciwgdjogbnVtYmVyLCByZ1g6IG51bWJlciwgcmdZOiBudW1iZXIgfSkge1xyXG4gICAgICAgIHRoaXMuaHN2YS5zID0gdmFsLnMgLyB2YWwucmdYO1xyXG4gICAgICAgIHRoaXMuaHN2YS52ID0gdmFsLnYgLyB2YWwucmdZO1xyXG4gICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0Q29sb3JGcm9tU3RyaW5nKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgaHN2YSA9IHRoaXMuc2VydmljZS5zdHJpbmdUb0hzdmEodmFsdWUpO1xyXG4gICAgICAgIGlmIChoc3ZhICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaHN2YSA9IGhzdmE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudXBkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZm9ybWF0UG9saWN5KCk6IG51bWJlciB7XHJcbiAgICAgICAgdGhpcy5mb3JtYXQgPSAodGhpcy5mb3JtYXQgKyAxKSAlIDM7XHJcbiAgICAgICAgaWYgKHRoaXMuZm9ybWF0ID09PSAwICYmIHRoaXMuaHN2YS5hIDwgMSkge1xyXG4gICAgICAgICAgICB0aGlzLmZvcm1hdCsrO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5mb3JtYXQ7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlKCkge1xyXG4gICAgICAgIGxldCBoc2xhID0gdGhpcy5zZXJ2aWNlLmhzdmEyaHNsYSh0aGlzLmhzdmEpO1xyXG4gICAgICAgIGxldCByZ2JhID0gdGhpcy5zZXJ2aWNlLmRlbm9ybWFsaXplUkdCQSh0aGlzLnNlcnZpY2UuaHN2YVRvUmdiYSh0aGlzLmhzdmEpKTtcclxuICAgICAgICBsZXQgaHVlUmdiYSA9IHRoaXMuc2VydmljZS5kZW5vcm1hbGl6ZVJHQkEodGhpcy5zZXJ2aWNlLmhzdmFUb1JnYmEobmV3IEhzdmEodGhpcy5oc3ZhLmgsIDEsIDEsIDEpKSk7XHJcblxyXG4gICAgICAgIHRoaXMuaHNsYVRleHQgPSBuZXcgSHNsYShNYXRoLnJvdW5kKChoc2xhLmgpICogMzYwKSwgTWF0aC5yb3VuZChoc2xhLnMgKiAxMDApLCBNYXRoLnJvdW5kKGhzbGEubCAqIDEwMCksIE1hdGgucm91bmQoaHNsYS5hICogMTAwKSAvIDEwMCk7XHJcbiAgICAgICAgdGhpcy5yZ2JhVGV4dCA9IG5ldyBSZ2JhKHJnYmEuciwgcmdiYS5nLCByZ2JhLmIsIE1hdGgucm91bmQocmdiYS5hICogMTAwKSAvIDEwMCk7XHJcbiAgICAgICAgdGhpcy5oZXhUZXh0ID0gdGhpcy5zZXJ2aWNlLmhleFRleHQocmdiYSk7XHJcblxyXG4gICAgICAgIHRoaXMuYWxwaGFTbGlkZXJDb2xvciA9ICdyZ2IoJyArIHJnYmEuciArICcsJyArIHJnYmEuZyArICcsJyArIHJnYmEuYiArICcpJztcclxuICAgICAgICB0aGlzLmh1ZVNsaWRlckNvbG9yID0gJ3JnYignICsgaHVlUmdiYS5yICsgJywnICsgaHVlUmdiYS5nICsgJywnICsgaHVlUmdiYS5iICsgJyknO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5mb3JtYXQgPT09IDAgJiYgdGhpcy5oc3ZhLmEgPCAxKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZm9ybWF0Kys7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLm91dHB1dENvbG9yID0gdGhpcy5zZXJ2aWNlLm91dHB1dEZvcm1hdCh0aGlzLmhzdmEsIHRoaXMuY3BPdXRwdXRGb3JtYXQpO1xyXG5cclxuICAgICAgICB0aGlzLnNsaWRlciA9IG5ldyBTbGlkZXJQb3NpdGlvbigodGhpcy5oc3ZhLmgpICogdGhpcy5zbGlkZXJEaW1NYXguaCAtIDgsIHRoaXMuaHN2YS5zICogdGhpcy5zbGlkZXJEaW1NYXgucyAtIDgsXHJcbiAgICAgICAgICAgICgxIC0gdGhpcy5oc3ZhLnYpICogdGhpcy5zbGlkZXJEaW1NYXgudiAtIDgsIHRoaXMuaHN2YS5hICogdGhpcy5zbGlkZXJEaW1NYXguYSAtIDgpXHJcblxyXG4gICAgICAgIHRoaXMuZGlyZWN0aXZlSW5zdGFuY2UuY29sb3JDaGFuZ2VkKHRoaXMub3V0cHV0Q29sb3IpO1xyXG4gICAgfVxyXG5cclxuICAgIGNhbmNlbENvbG9yKCkge1xyXG4gICAgICAgIHRoaXMuc2V0Q29sb3JGcm9tU3RyaW5nKHRoaXMuaW5pdGlhbENvbG9yKTtcclxuICAgICAgICB0aGlzLmNsb3NlQ29sb3JQaWNrZXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBpc0Rlc2NlbmRhbnQocGFyZW50LCBjaGlsZCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHZhciBub2RlID0gY2hpbGQucGFyZW50Tm9kZTtcclxuICAgICAgICB3aGlsZSAobm9kZSAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAobm9kZSA9PT0gcGFyZW50KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBub2RlID0gbm9kZS5wYXJlbnROb2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgY3JlYXRlQm94KGVsZW1lbnQsIG9mZnNldCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdG9wOiBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIChvZmZzZXQgPyB3aW5kb3cucGFnZVlPZmZzZXQgOiAwKSxcclxuICAgICAgICAgICAgbGVmdDogZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0ICsgKG9mZnNldCA/IHdpbmRvdy5wYWdlWE9mZnNldCA6IDApLFxyXG4gICAgICAgICAgICB3aWR0aDogZWxlbWVudC5vZmZzZXRXaWR0aCxcclxuICAgICAgICAgICAgaGVpZ2h0OiBlbGVtZW50Lm9mZnNldEhlaWdodFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
