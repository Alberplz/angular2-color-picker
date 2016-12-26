"use strict";
const core_1 = require("@angular/core");
const color_picker_service_1 = require("./color-picker.service");
const classes_1 = require("./classes");
const core_2 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
let ColorPickerDirective = class ColorPickerDirective {
    constructor(compiler, vcRef, el, service) {
        this.compiler = compiler;
        this.vcRef = vcRef;
        this.el = el;
        this.service = service;
        this.colorPickerChange = new core_1.EventEmitter(true);
        this.cpToggleChange = new core_1.EventEmitter(true);
        this.cpPosition = 'right';
        this.cpPositionOffset = '0%';
        this.cpPositionRelativeToArrow = false;
        this.cpOutputFormat = 'hex';
        this.cpPresetLabel = 'Preset colors';
        this.cpCancelButton = false;
        this.cpCancelButtonClass = 'cp-cancel-button-class';
        this.cpCancelButtonText = 'Cancel';
        this.cpOKButton = false;
        this.cpOKButtonClass = 'cp-ok-button-class';
        this.cpOKButtonText = 'OK';
        this.cpFallbackColor = '#fff';
        this.cpHeight = 'auto';
        this.cpWidth = '230px';
        this.cpIgnoredElements = [];
        this.cpDialogDisplay = 'popup';
        this.cpSaveClickOutside = true;
        this.cpAlphaChannel = 'hex6';
        this.ignoreChanges = false;
        this.created = false;
    }
    ngOnChanges(changes) {
        if (changes.cpToggle) {
            if (changes.cpToggle.currentValue)
                this.openDialog();
            if (!changes.cpToggle.currentValue && this.dialog)
                this.dialog.closeColorPicker();
        }
        if (changes.colorPicker) {
            if (this.dialog && !this.ignoreChanges) {
                if (this.cpDialogDisplay === 'inline') {
                    this.dialog.setInitialColor(changes.colorPicker.currentValue);
                }
                this.dialog.setColorFromString(changes.colorPicker.currentValue, false);
            }
            this.ignoreChanges = false;
        }
    }
    ngOnInit() {
        let hsva = this.service.stringToHsva(this.colorPicker);
        if (hsva === null)
            hsva = this.service.stringToHsva(this.colorPicker, true);
        if (hsva == null) {
            hsva = this.service.stringToHsva(this.cpFallbackColor);
        }
        this.colorPickerChange.emit(this.service.outputFormat(hsva, this.cpOutputFormat, this.cpAlphaChannel === 'hex8'));
    }
    onClick() {
        if (this.cpIgnoredElements.filter((item) => item === this.el.nativeElement).length === 0) {
            this.openDialog();
        }
    }
    openDialog() {
        if (!this.created) {
            this.created = true;
            this.compiler.compileModuleAndAllComponentsAsync(DynamicCpModule)
                .then(factory => {
                const compFactory = factory.componentFactories.find(x => x.componentType === DialogComponent);
                if (!compFactory) {
                    throw new Error(`no comp factory`);
                }
                const injector = core_2.ReflectiveInjector.fromResolvedProviders([], this.vcRef.parentInjector);
                const cmpRef = this.vcRef.createComponent(compFactory, 0, injector, []);
                cmpRef.instance.setDialog(this, this.el, this.colorPicker, this.cpPosition, this.cpPositionOffset, this.cpPositionRelativeToArrow, this.cpOutputFormat, this.cpPresetLabel, this.cpPresetColors, this.cpCancelButton, this.cpCancelButtonClass, this.cpCancelButtonText, this.cpOKButton, this.cpOKButtonClass, this.cpOKButtonText, this.cpHeight, this.cpWidth, this.cpIgnoredElements, this.cpDialogDisplay, this.cpSaveClickOutside, this.cpAlphaChannel);
                this.dialog = cmpRef.instance;
            });
        }
        else if (this.dialog) {
            this.dialog.openDialog(this.colorPicker);
        }
    }
    colorChanged(value, ignore = true) {
        this.ignoreChanges = ignore;
        this.colorPickerChange.emit(value);
    }
    changeInput(value) {
        this.dialog.setColorFromString(value, true);
    }
    toggle(value) {
        this.cpToggleChange.emit(value);
    }
};
__decorate([
    core_1.Input('colorPicker'),
    __metadata("design:type", String)
], ColorPickerDirective.prototype, "colorPicker", void 0);
__decorate([
    core_1.Output('colorPickerChange'),
    __metadata("design:type", Object)
], ColorPickerDirective.prototype, "colorPickerChange", void 0);
__decorate([
    core_1.Input('cpToggle'),
    __metadata("design:type", Boolean)
], ColorPickerDirective.prototype, "cpToggle", void 0);
__decorate([
    core_1.Output('cpToggleChange'),
    __metadata("design:type", Object)
], ColorPickerDirective.prototype, "cpToggleChange", void 0);
__decorate([
    core_1.Input('cpPosition'),
    __metadata("design:type", String)
], ColorPickerDirective.prototype, "cpPosition", void 0);
__decorate([
    core_1.Input('cpPositionOffset'),
    __metadata("design:type", String)
], ColorPickerDirective.prototype, "cpPositionOffset", void 0);
__decorate([
    core_1.Input('cpPositionRelativeToArrow'),
    __metadata("design:type", Boolean)
], ColorPickerDirective.prototype, "cpPositionRelativeToArrow", void 0);
__decorate([
    core_1.Input('cpOutputFormat'),
    __metadata("design:type", String)
], ColorPickerDirective.prototype, "cpOutputFormat", void 0);
__decorate([
    core_1.Input('cpPresetLabel'),
    __metadata("design:type", String)
], ColorPickerDirective.prototype, "cpPresetLabel", void 0);
__decorate([
    core_1.Input('cpPresetColors'),
    __metadata("design:type", Array)
], ColorPickerDirective.prototype, "cpPresetColors", void 0);
__decorate([
    core_1.Input('cpCancelButton'),
    __metadata("design:type", Boolean)
], ColorPickerDirective.prototype, "cpCancelButton", void 0);
__decorate([
    core_1.Input('cpCancelButtonClass'),
    __metadata("design:type", String)
], ColorPickerDirective.prototype, "cpCancelButtonClass", void 0);
__decorate([
    core_1.Input('cpCancelButtonText'),
    __metadata("design:type", String)
], ColorPickerDirective.prototype, "cpCancelButtonText", void 0);
__decorate([
    core_1.Input('cpOKButton'),
    __metadata("design:type", Boolean)
], ColorPickerDirective.prototype, "cpOKButton", void 0);
__decorate([
    core_1.Input('cpOKButtonClass'),
    __metadata("design:type", String)
], ColorPickerDirective.prototype, "cpOKButtonClass", void 0);
__decorate([
    core_1.Input('cpOKButtonText'),
    __metadata("design:type", String)
], ColorPickerDirective.prototype, "cpOKButtonText", void 0);
__decorate([
    core_1.Input('cpFallbackColor'),
    __metadata("design:type", String)
], ColorPickerDirective.prototype, "cpFallbackColor", void 0);
__decorate([
    core_1.Input('cpHeight'),
    __metadata("design:type", String)
], ColorPickerDirective.prototype, "cpHeight", void 0);
__decorate([
    core_1.Input('cpWidth'),
    __metadata("design:type", String)
], ColorPickerDirective.prototype, "cpWidth", void 0);
__decorate([
    core_1.Input('cpIgnoredElements'),
    __metadata("design:type", Object)
], ColorPickerDirective.prototype, "cpIgnoredElements", void 0);
__decorate([
    core_1.Input('cpDialogDisplay'),
    __metadata("design:type", String)
], ColorPickerDirective.prototype, "cpDialogDisplay", void 0);
__decorate([
    core_1.Input('cpSaveClickOutside'),
    __metadata("design:type", Boolean)
], ColorPickerDirective.prototype, "cpSaveClickOutside", void 0);
__decorate([
    core_1.Input('cpAlphaChannel'),
    __metadata("design:type", String)
], ColorPickerDirective.prototype, "cpAlphaChannel", void 0);
ColorPickerDirective = __decorate([
    core_1.Directive({
        selector: '[colorPicker]',
        host: {
            '(input)': 'changeInput($event.target.value)',
            '(click)': 'onClick()'
        }
    }),
    __metadata("design:paramtypes", [core_2.Compiler, core_1.ViewContainerRef, core_1.ElementRef, color_picker_service_1.ColorPickerService])
], ColorPickerDirective);
exports.ColorPickerDirective = ColorPickerDirective;
let TextDirective = class TextDirective {
    constructor() {
        this.newValue = new core_1.EventEmitter();
    }
    changeInput(value) {
        if (this.rg === undefined) {
            this.newValue.emit(value);
        }
        else {
            let numeric = parseFloat(value);
            if (!isNaN(numeric) && numeric >= 0 && numeric <= this.rg) {
                this.newValue.emit({ v: numeric, rg: this.rg });
            }
        }
    }
};
__decorate([
    core_1.Output('newValue'),
    __metadata("design:type", Object)
], TextDirective.prototype, "newValue", void 0);
__decorate([
    core_1.Input('text'),
    __metadata("design:type", Object)
], TextDirective.prototype, "text", void 0);
__decorate([
    core_1.Input('rg'),
    __metadata("design:type", Number)
], TextDirective.prototype, "rg", void 0);
TextDirective = __decorate([
    core_1.Directive({
        selector: '[text]',
        host: {
            '(input)': 'changeInput($event.target.value)'
        }
    }),
    __metadata("design:paramtypes", [])
], TextDirective);
exports.TextDirective = TextDirective;
let SliderDirective = class SliderDirective {
    constructor(el) {
        this.el = el;
        this.newValue = new core_1.EventEmitter();
        this.listenerMove = (event) => { this.move(event); };
        this.listenerStop = () => { this.stop(); };
    }
    setCursor(event) {
        let height = this.el.nativeElement.offsetHeight;
        let width = this.el.nativeElement.offsetWidth;
        let x = Math.max(0, Math.min(this.getX(event), width));
        let y = Math.max(0, Math.min(this.getY(event), height));
        if (this.rgX !== undefined && this.rgY !== undefined) {
            this.newValue.emit({ s: x / width, v: (1 - y / height), rgX: this.rgX, rgY: this.rgY });
        }
        else if (this.rgX === undefined && this.rgY !== undefined) {
            this.newValue.emit({ v: y / height, rg: this.rgY });
        }
        else {
            this.newValue.emit({ v: x / width, rg: this.rgX });
        }
    }
    move(event) {
        event.preventDefault();
        this.setCursor(event);
    }
    start(event) {
        this.setCursor(event);
        document.addEventListener('mousemove', this.listenerMove);
        document.addEventListener('touchmove', this.listenerMove);
        document.addEventListener('mouseup', this.listenerStop);
        document.addEventListener('touchend', this.listenerStop);
    }
    stop() {
        document.removeEventListener('mousemove', this.listenerMove);
        document.removeEventListener('touchmove', this.listenerMove);
        document.removeEventListener('mouseup', this.listenerStop);
        document.removeEventListener('touchend', this.listenerStop);
    }
    getX(event) {
        return (event.pageX !== undefined ? event.pageX : event.touches[0].pageX) - this.el.nativeElement.getBoundingClientRect().left - window.pageXOffset;
    }
    getY(event) {
        return (event.pageY !== undefined ? event.pageY : event.touches[0].pageY) - this.el.nativeElement.getBoundingClientRect().top - window.pageYOffset;
    }
};
__decorate([
    core_1.Output('newValue'),
    __metadata("design:type", Object)
], SliderDirective.prototype, "newValue", void 0);
__decorate([
    core_1.Input('slider'),
    __metadata("design:type", String)
], SliderDirective.prototype, "slider", void 0);
__decorate([
    core_1.Input('rgX'),
    __metadata("design:type", Number)
], SliderDirective.prototype, "rgX", void 0);
__decorate([
    core_1.Input('rgY'),
    __metadata("design:type", Number)
], SliderDirective.prototype, "rgY", void 0);
SliderDirective = __decorate([
    core_1.Directive({
        selector: '[slider]',
        host: {
            '(mousedown)': 'start($event)',
            '(touchstart)': 'start($event)'
        }
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], SliderDirective);
exports.SliderDirective = SliderDirective;
let DialogComponent = class DialogComponent {
    constructor(el, service) {
        this.el = el;
        this.service = service;
        this.dialogArrowSize = 10;
        this.dialogArrowOffset = 15;
    }
    setDialog(instance, elementRef, color, cpPosition, cpPositionOffset, cpPositionRelativeToArrow, cpOutputFormat, cpPresetLabel, cpPresetColors, cpCancelButton, cpCancelButtonClass, cpCancelButtonText, cpOKButton, cpOKButtonClass, cpOKButtonText, cpHeight, cpWidth, cpIgnoredElements, cpDialogDisplay, cpSaveClickOutside, cpAlphaChannel) {
        this.directiveInstance = instance;
        this.initialColor = color;
        this.directiveElementRef = elementRef;
        this.cpPosition = cpPosition;
        this.cpPositionOffset = parseInt(cpPositionOffset);
        if (!cpPositionRelativeToArrow) {
            this.dialogArrowOffset = 0;
        }
        this.cpOutputFormat = cpOutputFormat;
        this.cpPresetLabel = cpPresetLabel;
        this.cpPresetColors = cpPresetColors;
        this.cpCancelButton = cpCancelButton;
        this.cpCancelButtonClass = cpCancelButtonClass;
        this.cpCancelButtonText = cpCancelButtonText;
        this.cpOKButton = cpOKButton;
        this.cpOKButtonClass = cpOKButtonClass;
        this.cpOKButtonText = cpOKButtonText;
        this.cpHeight = parseInt(cpHeight);
        this.cpWidth = parseInt(cpWidth);
        this.cpIgnoredElements = cpIgnoredElements;
        this.cpDialogDisplay = cpDialogDisplay;
        if (this.cpDialogDisplay === 'inline') {
            this.dialogArrowOffset = 0;
            this.dialogArrowSize = 0;
        }
        this.cpSaveClickOutside = cpSaveClickOutside;
        this.cpAlphaChannel = cpAlphaChannel;
    }
    ngOnInit() {
        let alphaWidth = this.alphaSlider.nativeElement.offsetWidth;
        let hueWidth = this.hueSlider.nativeElement.offsetWidth;
        this.sliderDimMax = new classes_1.SliderDimension(hueWidth, this.cpWidth, 130, alphaWidth);
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
        this.listenerMouseDown = (event) => { this.onMouseDown(event); };
        this.listenerResize = () => { this.onResize(); };
        this.openDialog(this.initialColor, false);
    }
    setInitialColor(color) {
        this.initialColor = color;
    }
    openDialog(color, emit = true) {
        this.setInitialColor(color);
        this.setColorFromString(color, emit);
        this.openColorPicker();
    }
    cancelColor() {
        this.setColorFromString(this.initialColor, true);
        if (this.cpDialogDisplay === 'popup') {
            this.directiveInstance.colorChanged(this.initialColor, true);
            this.closeColorPicker();
        }
    }
    oKColor() {
        if (this.cpDialogDisplay === 'popup') {
            this.closeColorPicker();
        }
    }
    setColorFromString(value, emit = true) {
        let hsva;
        if (this.cpAlphaChannel === 'hex8') {
            hsva = this.service.stringToHsva(value, true);
            if (!hsva && !this.hsva) {
                hsva = this.service.stringToHsva(value, false);
            }
        }
        else {
            hsva = this.service.stringToHsva(value, false);
        }
        if (hsva) {
            this.hsva = hsva;
            this.update(emit);
        }
    }
    onMouseDown(event) {
        if ((!this.isDescendant(this.el.nativeElement, event.target)
            && event.target != this.directiveElementRef.nativeElement &&
            this.cpIgnoredElements.filter((item) => item === event.target).length === 0) && this.cpDialogDisplay === 'popup') {
            if (!this.cpSaveClickOutside) {
                this.setColorFromString(this.initialColor, false);
                this.directiveInstance.colorChanged(this.initialColor);
            }
            this.closeColorPicker();
        }
    }
    openColorPicker() {
        if (!this.show) {
            this.setDialogPosition();
            this.show = true;
            this.directiveInstance.toggle(true);
            document.addEventListener('mousedown', this.listenerMouseDown);
            window.addEventListener('resize', this.listenerResize);
        }
    }
    closeColorPicker() {
        if (this.show) {
            this.show = false;
            this.directiveInstance.toggle(false);
            document.removeEventListener('mousedown', this.listenerMouseDown);
            window.removeEventListener('resize', this.listenerResize);
        }
    }
    onResize() {
        if (this.position === 'fixed') {
            this.setDialogPosition();
        }
    }
    setDialogPosition() {
        let dialogHeight = this.dialogElement.nativeElement.offsetHeight;
        let node = this.directiveElementRef.nativeElement, position = 'static';
        let parentNode = null;
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
            this.left -= this.cpWidth + this.dialogArrowSize - 2;
        }
        else if (this.cpPosition === 'top') {
            this.top -= dialogHeight + this.dialogArrowSize;
            this.left += this.cpPositionOffset / 100 * boxDirective.width - this.dialogArrowOffset;
            this.arrowTop = dialogHeight - 1;
        }
        else if (this.cpPosition === 'bottom') {
            this.top += boxDirective.height + this.dialogArrowSize;
            this.left += this.cpPositionOffset / 100 * boxDirective.width - this.dialogArrowOffset;
        }
        else {
            this.top += boxDirective.height * this.cpPositionOffset / 100 - this.dialogArrowOffset;
            this.left += boxDirective.width + this.dialogArrowSize;
        }
    }
    setSaturation(val) {
        let hsla = this.service.hsva2hsla(this.hsva);
        hsla.s = val.v / val.rg;
        this.hsva = this.service.hsla2hsva(hsla);
        this.update();
    }
    setLightness(val) {
        let hsla = this.service.hsva2hsla(this.hsva);
        hsla.l = val.v / val.rg;
        this.hsva = this.service.hsla2hsva(hsla);
        this.update();
    }
    setHue(val) {
        this.hsva.h = val.v / val.rg;
        this.update();
    }
    setAlpha(val) {
        this.hsva.a = val.v / val.rg;
        this.update();
    }
    setR(val) {
        let rgba = this.service.hsvaToRgba(this.hsva);
        rgba.r = val.v / val.rg;
        this.hsva = this.service.rgbaToHsva(rgba);
        this.update();
    }
    setG(val) {
        let rgba = this.service.hsvaToRgba(this.hsva);
        rgba.g = val.v / val.rg;
        this.hsva = this.service.rgbaToHsva(rgba);
        this.update();
    }
    setB(val) {
        let rgba = this.service.hsvaToRgba(this.hsva);
        rgba.b = val.v / val.rg;
        this.hsva = this.service.rgbaToHsva(rgba);
        this.update();
    }
    setSaturationAndBrightness(val) {
        this.hsva.s = val.s / val.rgX;
        this.hsva.v = val.v / val.rgY;
        this.update();
    }
    formatPolicy() {
        this.format = (this.format + 1) % 3;
        if (this.format === 0 && this.hsva.a < 1 && this.cpAlphaChannel === 'hex6') {
            this.format++;
        }
        return this.format;
    }
    update(emit = true) {
        let hsla = this.service.hsva2hsla(this.hsva);
        let rgba = this.service.denormalizeRGBA(this.service.hsvaToRgba(this.hsva));
        let hueRgba = this.service.denormalizeRGBA(this.service.hsvaToRgba(new classes_1.Hsva(this.hsva.h, 1, 1, 1)));
        this.hslaText = new classes_1.Hsla(Math.round((hsla.h) * 360), Math.round(hsla.s * 100), Math.round(hsla.l * 100), Math.round(hsla.a * 100) / 100);
        this.rgbaText = new classes_1.Rgba(rgba.r, rgba.g, rgba.b, Math.round(rgba.a * 100) / 100);
        this.hexText = this.service.hexText(rgba, this.cpAlphaChannel === 'hex8');
        this.alphaSliderColor = 'rgb(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ')';
        this.hueSliderColor = 'rgb(' + hueRgba.r + ',' + hueRgba.g + ',' + hueRgba.b + ')';
        if (this.format === 0 && this.hsva.a < 1 && this.cpAlphaChannel === 'hex6') {
            this.format++;
        }
        let lastOutput = this.outputColor;
        this.outputColor = this.service.outputFormat(this.hsva, this.cpOutputFormat, this.cpAlphaChannel === 'hex8');
        this.selectedColor = this.service.outputFormat(this.hsva, 'rgba', false);
        this.slider = new classes_1.SliderPosition((this.hsva.h) * this.sliderDimMax.h - 8, this.hsva.s * this.sliderDimMax.s - 8, (1 - this.hsva.v) * this.sliderDimMax.v - 8, this.hsva.a * this.sliderDimMax.a - 8);
        if (emit && lastOutput !== this.outputColor) {
            this.directiveInstance.colorChanged(this.outputColor);
        }
    }
    isDescendant(parent, child) {
        let node = child.parentNode;
        while (node !== null) {
            if (node === parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    }
    createBox(element, offset) {
        return {
            top: element.getBoundingClientRect().top + (offset ? window.pageYOffset : 0),
            left: element.getBoundingClientRect().left + (offset ? window.pageXOffset : 0),
            width: element.offsetWidth,
            height: element.offsetHeight
        };
    }
};
__decorate([
    core_1.ViewChild('hueSlider'),
    __metadata("design:type", Object)
], DialogComponent.prototype, "hueSlider", void 0);
__decorate([
    core_1.ViewChild('alphaSlider'),
    __metadata("design:type", Object)
], DialogComponent.prototype, "alphaSlider", void 0);
__decorate([
    core_1.ViewChild('dialogPopup'),
    __metadata("design:type", Object)
], DialogComponent.prototype, "dialogElement", void 0);
DialogComponent = __decorate([
    core_1.Component({
        selector: 'color-picker',
        templateUrl: './templates/default/color-picker.html',
        styleUrls: ['./templates/default/color-picker.css']
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, color_picker_service_1.ColorPickerService])
], DialogComponent);
exports.DialogComponent = DialogComponent;
let DynamicCpModule = class DynamicCpModule {
};
DynamicCpModule = __decorate([
    core_2.NgModule({
        imports: [platform_browser_1.BrowserModule],
        declarations: [DialogComponent, TextDirective, SliderDirective]
    }),
    __metadata("design:paramtypes", [])
], DynamicCpModule);
;
//# sourceMappingURL=color-picker.directive.js.map