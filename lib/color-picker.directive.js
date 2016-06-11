var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var color_picker_service_1 = require('./color-picker.service');
var classes_1 = require('./classes');
var styleUrls = ['./color-picker.css'];
var templateUrl = './color-picker.html';
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
    ], ColorPickerDirective.prototype, "colorPicker");
    __decorate([
        core_1.Output('colorPickerChange'), 
        __metadata('design:type', Object)
    ], ColorPickerDirective.prototype, "colorPickerChange");
    __decorate([
        core_1.Input('cpPosition'), 
        __metadata('design:type', String)
    ], ColorPickerDirective.prototype, "cpPosition");
    __decorate([
        core_1.Input('cpPositionOffset'), 
        __metadata('design:type', String)
    ], ColorPickerDirective.prototype, "cpPositionOffset");
    __decorate([
        core_1.Input('cpPositionRelativeToArrow'), 
        __metadata('design:type', Boolean)
    ], ColorPickerDirective.prototype, "cpPositionRelativeToArrow");
    __decorate([
        core_1.Input('cpOutputFormat'), 
        __metadata('design:type', String)
    ], ColorPickerDirective.prototype, "cpOutputFormat");
    __decorate([
        core_1.Input('cpCancelButton'), 
        __metadata('design:type', Boolean)
    ], ColorPickerDirective.prototype, "cpCancelButton");
    __decorate([
        core_1.Input('cpCancelButtonClass'), 
        __metadata('design:type', String)
    ], ColorPickerDirective.prototype, "cpCancelButtonClass");
    __decorate([
        core_1.Input('cpCancelButtonText'), 
        __metadata('design:type', String)
    ], ColorPickerDirective.prototype, "cpCancelButtonText");
    __decorate([
        core_1.Input('cpFallbackColor'), 
        __metadata('design:type', String)
    ], ColorPickerDirective.prototype, "cpFallbackColor");
    __decorate([
        core_1.Input('cpHeight'), 
        __metadata('design:type', String)
    ], ColorPickerDirective.prototype, "cpHeight");
    ColorPickerDirective = __decorate([
        core_1.Directive({
            selector: '[colorPicker]',
            host: {
                '(input)': 'changeInput($event.target.value)',
                '(click)': 'onClick()'
            }
        }), 
        __metadata('design:paramtypes', [(typeof DynamicComponentLoader !== 'undefined' && DynamicComponentLoader) || Object, (typeof ViewContainerRef !== 'undefined' && ViewContainerRef) || Object, (typeof ElementRef !== 'undefined' && ElementRef) || Object, ColorPickerService])
    ], ColorPickerDirective);
    return ColorPickerDirective;
})();
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
    ], TextDirective.prototype, "newValue");
    __decorate([
        core_1.Input('text'), 
        __metadata('design:type', Object)
    ], TextDirective.prototype, "text");
    __decorate([
        core_1.Input('rg'), 
        __metadata('design:type', Number)
    ], TextDirective.prototype, "rg");
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
})();
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
    ], SliderDirective.prototype, "newValue");
    __decorate([
        core_1.Input('slider'), 
        __metadata('design:type', String)
    ], SliderDirective.prototype, "slider");
    __decorate([
        core_1.Input('rgX'), 
        __metadata('design:type', Number)
    ], SliderDirective.prototype, "rgX");
    __decorate([
        core_1.Input('rgY'), 
        __metadata('design:type', Number)
    ], SliderDirective.prototype, "rgY");
    SliderDirective = __decorate([
        core_1.Directive({
            selector: '[slider]',
            host: {
                '(mousedown)': 'start($event)',
                '(touchstart)': 'start($event)'
            }
        }), 
        __metadata('design:paramtypes', [(typeof ElementRef !== 'undefined' && ElementRef) || Object])
    ], SliderDirective);
    return SliderDirective;
})();
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
            templateUrl: templateUrl,
            styleUrls: styleUrls,
            directives: [SliderDirective, TextDirective]
        }), 
        __metadata('design:paramtypes', [(typeof ElementRef !== 'undefined' && ElementRef) || Object, ColorPickerService])
    ], DialogComponent);
    return DialogComponent;
})();
exports.DialogComponent = DialogComponent;
