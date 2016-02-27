System.register(['angular2/core', './color-picker.service', './classes'], function(exports_1, context_1) {
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
    var core_1, color_picker_service_1, classes_1;
    var ColorPickerDirective, TextDirective, SliderDirective, DialogComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (color_picker_service_1_1) {
                color_picker_service_1 = color_picker_service_1_1;
            },
            function (classes_1_1) {
                classes_1 = classes_1_1;
            }],
        execute: function() {
            ColorPickerDirective = (function () {
                function ColorPickerDirective(dcl, el, service) {
                    this.dcl = dcl;
                    this.el = el;
                    this.service = service;
                    this.colorPickerChange = new core_1.EventEmitter();
                    this.cpPosition = 'right';
                    this.cpOutputFormat = 'hex';
                    this.created = false;
                }
                ColorPickerDirective.prototype.ngOnInit = function () {
                    var hsva = this.service.stringToHsva(this.colorPicker);
                    if (hsva !== null) {
                        this.colorPickerChange.emit(this.service.outputFormat(hsva, this.cpOutputFormat));
                    }
                };
                ColorPickerDirective.prototype.onClick = function () {
                    var _this = this;
                    if (!this.created) {
                        this.created = true;
                        this.dcl.loadNextToLocation(DialogComponent, this.el)
                            .then(function (res) {
                            res.instance.setDialog(_this, _this.el, _this.colorPicker, _this.cpPosition, _this.cpOutputFormat, _this.cpCancelButton);
                            _this.dialog = res.instance;
                        });
                    }
                    else if (this.dialog) {
                        this.dialog.openColorPicker();
                    }
                };
                ColorPickerDirective.prototype.colorChanged = function (value) {
                    this.colorPickerChange.emit(value);
                };
                ColorPickerDirective.prototype.changeInput = function (value) {
                    this.dialog.setColorFromHex(value);
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
                    core_1.Input('cpOutputFormat'), 
                    __metadata('design:type', String)
                ], ColorPickerDirective.prototype, "cpOutputFormat", void 0);
                __decorate([
                    core_1.Input('cpCancelButton'), 
                    __metadata('design:type', String)
                ], ColorPickerDirective.prototype, "cpCancelButton", void 0);
                ColorPickerDirective = __decorate([
                    core_1.Directive({
                        selector: '[colorPicker]',
                        host: {
                            '(input)': 'changeInput($event.target.value)',
                            '(click)': 'onClick()'
                        }
                    }), 
                    __metadata('design:paramtypes', [core_1.DynamicComponentLoader, core_1.ElementRef, color_picker_service_1.ColorPickerService])
                ], ColorPickerDirective);
                return ColorPickerDirective;
            }());
            exports_1("ColorPickerDirective", ColorPickerDirective);
            TextDirective = (function () {
                function TextDirective() {
                    this.action = new core_1.EventEmitter();
                }
                TextDirective.prototype.changeInput = function (value) {
                    if (this.rg === undefined) {
                        this.action.emit(value);
                    }
                    else {
                        var numeric = parseFloat(value);
                        if (!isNaN(numeric) && numeric >= 0 && numeric <= this.rg) {
                            this.action.emit({ v: numeric, rg: this.rg });
                        }
                    }
                };
                __decorate([
                    core_1.Output('action'), 
                    __metadata('design:type', Object)
                ], TextDirective.prototype, "action", void 0);
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
            exports_1("TextDirective", TextDirective);
            SliderDirective = (function () {
                function SliderDirective(el) {
                    var _this = this;
                    this.el = el;
                    this.newValue = new core_1.EventEmitter();
                    this.listenerMove = function (event) { _this.move(event); };
                    this.listenerStop = function () { _this.stop(); };
                }
                SliderDirective.prototype.setCursor = function (event) {
                    var maxTop = this.el.nativeElement.offsetHeight;
                    var maxLeft = this.el.nativeElement.offsetWidth;
                    var x = Math.max(0, Math.min(this.getX(event), maxLeft));
                    var y = Math.max(0, Math.min(this.getY(event), maxTop));
                    if (this.rgX !== undefined && this.rgY !== undefined) {
                        this.newValue.emit({ s: x / maxLeft, v: (1 - y / maxTop), rgX: this.rgX, rgY: this.rgY });
                    }
                    else if (this.rgX === undefined && this.rgY !== undefined) {
                        this.newValue.emit({ v: y / maxTop, rg: this.rgY });
                    }
                    else {
                        this.newValue.emit({ v: x / maxLeft, rg: this.rgX });
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
            exports_1("SliderDirective", SliderDirective);
            DialogComponent = (function () {
                function DialogComponent(el, service) {
                    this.el = el;
                    this.service = service;
                    this.dialogHeight = 290;
                    this.dialogWidth = 232;
                    this.dialogArrowSize = 10;
                    this.dialogArrowShift = 15;
                }
                DialogComponent.prototype.setDialog = function (instance, elementRef, color, cpPosition, cpOutputFormat, cpCancelButton) {
                    this.directiveInstance = instance;
                    this.initialColor = color;
                    this.directiveElementRef = elementRef;
                    this.cpPosition = cpPosition;
                    this.cpOutputFormat = cpOutputFormat;
                    this.cpCancelButton = cpCancelButton;
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
                    this.slider = new classes_1.SliderPosition('0px', '0px', '0px', '0px');
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
                    if (!this.service.isDescendant(this.el.nativeElement, event.target)
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
                    var node = this.directiveElementRef.nativeElement;
                    var position = 'static';
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
                    var top, left;
                    if (position !== 'fixed') {
                        var boxDirective = this.service.createBox(this.directiveElementRef.nativeElement, true);
                        if (parentNode === null) {
                            parentNode = node;
                        }
                        var boxParent = this.service.createBox(parentNode, true);
                        top = boxDirective.top - boxParent.top;
                        left = boxDirective.left - boxParent.left;
                    }
                    else {
                        var boxDirective = this.service.createBox(this.directiveElementRef.nativeElement, false);
                        top = boxDirective.top;
                        left = boxDirective.left;
                        this.position = 'fixed';
                    }
                    if (this.cpPosition === 'left') {
                        top += boxDirective.height / 2 - this.dialogArrowShift;
                        left -= this.dialogWidth + this.dialogArrowSize;
                    }
                    else if (this.cpPosition === 'top') {
                        top -= this.dialogHeight + this.dialogArrowSize;
                    }
                    else if (this.cpPosition === 'bottom') {
                        top += boxDirective.height + this.dialogArrowSize;
                    }
                    else {
                        top += boxDirective.height / 2 - this.dialogArrowShift;
                        left += boxDirective.width + this.dialogArrowSize;
                    }
                    this.top = top + 'px';
                    this.left = left + 'px';
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
                DialogComponent.prototype.setColorFromHex = function (value) {
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
                    this.hslaText = new classes_1.Hsla(Math.round((hsla.h) * 360), Math.round(hsla.s * 100), Math.round(hsla.l * 100), this.service.round(hsla.a, 2));
                    this.rgbaText = new classes_1.Rgba(rgba.r, rgba.g, rgba.b, this.service.round(rgba.a, 2));
                    this.hexText = this.service.hexText(rgba);
                    this.alphaSliderColor = 'rgb(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ')';
                    this.hueSliderColor = 'rgb(' + hueRgba.r + ',' + hueRgba.g + ',' + hueRgba.b + ')';
                    if (this.format === 0 && this.hsva.a < 1) {
                        this.format++;
                    }
                    this.outputColor = this.service.outputFormat(this.hsva, this.cpOutputFormat);
                    this.slider = new classes_1.SliderPosition((this.hsva.h) * this.sliderDimMax.h - 8 + 'px', this.hsva.s * this.sliderDimMax.s - 8 + 'px', (1 - this.hsva.v) * this.sliderDimMax.v - 8 + 'px', this.hsva.a * this.sliderDimMax.a - 8 + 'px');
                    this.directiveInstance.colorChanged(this.outputColor);
                };
                DialogComponent = __decorate([
                    core_1.Component({
                        selector: 'color-picker',
                        templateUrl: 'app/color-picker/color-picker.html',
                        styleUrls: ['app/color-picker/color-picker.css'],
                        directives: [SliderDirective, TextDirective]
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef, color_picker_service_1.ColorPickerService])
                ], DialogComponent);
                return DialogComponent;
            }());
            exports_1("DialogComponent", DialogComponent);
        }
    }
});
//# sourceMappingURL=color-picker.directive.js.map