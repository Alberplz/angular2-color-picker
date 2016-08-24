import {Component, DynamicComponentLoader, Directive, Input, Output, ViewContainerRef, ElementRef, EventEmitter, OnInit} from '@angular/core';
import {ColorPickerService} from './color-picker.service';
import {Rgba, Hsla, Hsva, SliderPosition, SliderDimension} from './classes';

@Directive({
    selector: '[colorPicker]',
    host: {
        '(input)': 'changeInput($event.target.value)',
        '(click)': 'onClick()'
    }
})
export class ColorPickerDirective implements OnInit {
    @Input('colorPicker') colorPicker: string;
    @Output('colorPickerChange') colorPickerChange = new EventEmitter<string>(true);
    @Input('cpPosition') cpPosition: string = 'right';
    @Input('cpPositionOffset') cpPositionOffset: string = '0%';
    @Input('cpPositionRelativeToArrow') cpPositionRelativeToArrow: boolean = false;
    @Input('cpOutputFormat') cpOutputFormat: string = 'hex';
    @Input('cpCancelButton') cpCancelButton: boolean = false;
    @Input('cpCancelButtonClass') cpCancelButtonClass: string = 'cp-cancel-button-class';
    @Input('cpCancelButtonText') cpCancelButtonText: string = 'Cancel';
    @Input('cpFallbackColor') cpFallbackColor: string = '#fff';
    @Input('cpHeight') cpHeight: string = '290px';
    private dialog: any;
    private created: boolean;

    constructor(private dcl: DynamicComponentLoader, private vcRef: ViewContainerRef, private el: ElementRef, private service: ColorPickerService) {
        this.created = false;
    }

    ngOnInit() {
        var hsva = this.service.stringToHsva(this.colorPicker);
        if (hsva == null) {
            hsva = this.service.stringToHsva(this.cpFallbackColor);
        }
        this.colorPickerChange.emit(this.service.outputFormat(hsva, this.cpOutputFormat));
    }

    onClick() {
        if (!this.created) {
            this.created = true;
            this.dcl.loadNextToLocation(DialogComponent, this.vcRef)
                .then((res) => {
                    res.instance.setDialog(this, this.el, this.colorPicker, this.cpPosition, this.cpPositionOffset,
                        this.cpPositionRelativeToArrow, this.cpOutputFormat, this.cpCancelButton, this.cpCancelButtonClass, this.cpCancelButtonText, this.cpHeight);
                    this.dialog = res.instance;
                });
        } else if (this.dialog) {
            this.dialog.setInitialColor(this.colorPicker);
            this.dialog.openColorPicker();
        }
    }

    colorChanged(value: string) {
        this.colorPickerChange.emit(value)
    }

    changeInput(value: string) {
        this.dialog.setColorFromString(value)
        this.colorPickerChange.emit(value)
    }
}


@Directive({
    selector: '[text]',
    host: {
        '(input)': 'changeInput($event.target.value)'
    }
})
export class TextDirective {
    @Output('newValue') newValue = new EventEmitter<any>();
    @Input('text') text: any;
    @Input('rg') rg: number;

    changeInput(value: string) {
        if (this.rg === undefined) {
            this.newValue.emit(value);
        } else {
            let numeric = parseFloat(value)
            if (!isNaN(numeric) && numeric >= 0 && numeric <= this.rg) {
                this.newValue.emit({ v: numeric, rg: this.rg });
            }
        }
    }
}

@Directive({
    selector: '[slider]',
    host: {
        '(mousedown)': 'start($event)',
        '(touchstart)': 'start($event)'
    }
})
export class SliderDirective {
    @Output('newValue') newValue = new EventEmitter<any>();
    @Input('slider') slider: string;
    @Input('rgX') rgX: number;
    @Input('rgY') rgY: number;
    private listenerMove: any;
    private listenerStop: any;

    constructor(private el: ElementRef) {
        this.listenerMove = (event: any) => { this.move(event) };
        this.listenerStop = () => { this.stop() };
    }

    setCursor(event: any) {
        let height = this.el.nativeElement.offsetHeight;
        let width = this.el.nativeElement.offsetWidth;
        let x = Math.max(0, Math.min(this.getX(event), width));
        let y = Math.max(0, Math.min(this.getY(event), height));

        if (this.rgX !== undefined && this.rgY !== undefined) {
            this.newValue.emit({ s: x / width, v: (1 - y / height), rgX: this.rgX, rgY: this.rgY });
        } else if (this.rgX === undefined && this.rgY !== undefined) {//ready to use vertical sliders
            this.newValue.emit({ v: y / height, rg: this.rgY });
        } else {
            this.newValue.emit({ v: x / width, rg: this.rgX });
        }
    }

    move(event: any) {
        event.preventDefault();
        this.setCursor(event);
    }

    start(event: any) {
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

    getX(event: any): number {        
        return (event.pageX !== undefined ? event.pageX : event.touches[0].pageX) - this.el.nativeElement.getBoundingClientRect().left - window.pageXOffset;
    }
    getY(event: any): number {
        return (event.pageY !== undefined ? event.pageY : event.touches[0].pageY) - this.el.nativeElement.getBoundingClientRect().top - window.pageYOffset;
    }
}

@Component({
    selector: 'color-picker',
    templateUrl: './templates/default/color-picker.html',
    styleUrls: ['./templates/default/color-picker.css'],
    directives: [SliderDirective, TextDirective]
})
export class DialogComponent implements OnInit {
    private hsva: Hsva;
    private rgbaText: Rgba;
    private hslaText: Hsla;
    private hexText: string;
    private outputColor: string;
    private alphaSliderColor: string;
    private hueSliderColor: string;
    private slider: SliderPosition;
    private sliderDimMax: SliderDimension;
    private format: number;
    private show: boolean;
    private top: number;
    private left: number;
    private position: string;
    private directiveInstance: any;
    private initialColor: string;
    private directiveElementRef: ElementRef;

    private listenerMouseDown: any;
    private listenerResize: any;

    private cpPosition: string;
    private cpPositionOffset: number;
    private cpOutputFormat: string;
    private cpCancelButton: boolean;
    private cpCancelButtonClass: string;
    private cpCancelButtonText: string;
    private cpHeight: number;

    private dialogWidth: number = 232;
    private dialogArrowSize: number = 10;
    private dialogArrowOffset: number = 15;
    private arrowTop: number;

    constructor(private el: ElementRef, private service: ColorPickerService) { }

    setDialog(instance: any, elementRef: ElementRef, color: any, cpPosition: string, cpPositionOffset: string,
        cpPositionRelativeToArrow: boolean, cpOutputFormat: string, cpCancelButton: boolean, cpCancelButtonClass: string, cpCancelButtonText: string, cpHeight: string) {
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
    }

    setInitialColor(color: any) {
        this.initialColor = color;
    }

    ngOnInit() {
        let hsva = this.service.stringToHsva(this.initialColor);
        if (hsva !== null) {
            this.hsva = hsva;
        } else {
            this.hsva = new Hsva(0, 1, 1, 1);
        }
        this.sliderDimMax = new SliderDimension(150, 230, 130, 150);
        this.slider = new SliderPosition(0, 0, 0, 0);
        if (this.cpOutputFormat === 'rgba') {
            this.format = 1;
        } else if (this.cpOutputFormat === 'hsla') {
            this.format = 2;
        } else {
            this.format = 0;
        }
        this.listenerMouseDown = (event: any) => { this.onMouseDown(event) };
        this.listenerResize = () => { this.onResize() };
        this.update();
        this.openColorPicker();
    }

    openColorPicker() {
        if (!this.show) {
            this.setDialogPosition();
            this.show = true;
            document.addEventListener('mousedown', this.listenerMouseDown);
            window.addEventListener('resize', this.listenerResize);
        }
    }

    onMouseDown(event: any) {
        if (!this.isDescendant(this.el.nativeElement, event.target)
            && event.target != this.directiveElementRef.nativeElement) {
            this.closeColorPicker();
        }
    }

    closeColorPicker() {
        this.show = false;
        document.removeEventListener('mouseup', this.listenerMouseDown);
        window.removeEventListener('resize', this.listenerResize);
    }

    onResize() {
        if (this.position === 'fixed') {
            this.setDialogPosition();
        }
    }

    setDialogPosition() {
        var node = this.directiveElementRef.nativeElement, position = 'static';
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
            if (parentNode === null) { parentNode = node }
            let boxParent = this.createBox(parentNode, true);
            this.top = boxDirective.top - boxParent.top;
            this.left = boxDirective.left - boxParent.left;
        } else {
            var boxDirective = this.createBox(this.directiveElementRef.nativeElement, false);
            this.top = boxDirective.top;
            this.left = boxDirective.left;
            this.position = 'fixed';
        }
        if (this.cpPosition === 'left') {
            this.top += boxDirective.height * this.cpPositionOffset / 100 - this.dialogArrowOffset;
            this.left -= this.dialogWidth + this.dialogArrowSize;
        } else if (this.cpPosition === 'top') {
            this.top -= this.cpHeight + this.dialogArrowSize;
            this.left += this.cpPositionOffset / 100 * boxDirective.width - this.dialogArrowOffset;
            this.arrowTop = this.cpHeight - 1;
        } else if (this.cpPosition === 'bottom') {
            this.top += boxDirective.height + this.dialogArrowSize;
            this.left += this.cpPositionOffset / 100 * boxDirective.width - this.dialogArrowOffset;
        } else {
            this.top += boxDirective.height * this.cpPositionOffset / 100 - this.dialogArrowOffset;
            this.left += boxDirective.width + this.dialogArrowSize;
        }
    }

    setSaturation(val: { v: number, rg: number }) {
        let hsla = this.service.hsva2hsla(this.hsva);
        hsla.s = val.v / val.rg;
        this.hsva = this.service.hsla2hsva(hsla);
        this.update();
    }

    setLightness(val: { v: number, rg: number }) {
        let hsla = this.service.hsva2hsla(this.hsva);
        hsla.l = val.v / val.rg;
        this.hsva = this.service.hsla2hsva(hsla);
        this.update();
    }

    setHue(val: { v: number, rg: number }) {
        this.hsva.h = val.v / val.rg;
        this.update();
    }

    setAlpha(val: { v: number, rg: number }) {
        this.hsva.a = val.v / val.rg;
        this.update();
    }

    setR(val: { v: number, rg: number }) {
        let rgba = this.service.hsvaToRgba(this.hsva);
        rgba.r = val.v / val.rg;
        this.hsva = this.service.rgbaToHsva(rgba);
        this.update();
    }
    setG(val: { v: number, rg: number }) {
        let rgba = this.service.hsvaToRgba(this.hsva);
        rgba.g = val.v / val.rg;
        this.hsva = this.service.rgbaToHsva(rgba);
        this.update();
    }
    setB(val: { v: number, rg: number }) {
        let rgba = this.service.hsvaToRgba(this.hsva);
        rgba.b = val.v / val.rg;
        this.hsva = this.service.rgbaToHsva(rgba);
        this.update();
    }

    setSaturationAndBrightness(val: { s: number, v: number, rgX: number, rgY: number }) {
        this.hsva.s = val.s / val.rgX;
        this.hsva.v = val.v / val.rgY;
        this.update();
    }

    setColorFromString(value: string) {
        let hsva = this.service.stringToHsva(value);
        if (hsva !== null) {
            this.hsva = hsva;
        }
        this.update();
    }

    formatPolicy(): number {
        this.format = (this.format + 1) % 3;
        if (this.format === 0 && this.hsva.a < 1) {
            this.format++;
        }
        return this.format;
    }

    update() {
        let hsla = this.service.hsva2hsla(this.hsva);
        let rgba = this.service.denormalizeRGBA(this.service.hsvaToRgba(this.hsva));
        let hueRgba = this.service.denormalizeRGBA(this.service.hsvaToRgba(new Hsva(this.hsva.h, 1, 1, 1)));

        this.hslaText = new Hsla(Math.round((hsla.h) * 360), Math.round(hsla.s * 100), Math.round(hsla.l * 100), Math.round(hsla.a * 100) / 100);
        this.rgbaText = new Rgba(rgba.r, rgba.g, rgba.b, Math.round(rgba.a * 100) / 100);
        this.hexText = this.service.hexText(rgba);

        this.alphaSliderColor = 'rgb(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ')';
        this.hueSliderColor = 'rgb(' + hueRgba.r + ',' + hueRgba.g + ',' + hueRgba.b + ')';

        if (this.format === 0 && this.hsva.a < 1) {
            this.format++;
        }

        this.outputColor = this.service.outputFormat(this.hsva, this.cpOutputFormat);

        this.slider = new SliderPosition((this.hsva.h) * this.sliderDimMax.h - 8, this.hsva.s * this.sliderDimMax.s - 8,
            (1 - this.hsva.v) * this.sliderDimMax.v - 8, this.hsva.a * this.sliderDimMax.a - 8)

        this.directiveInstance.colorChanged(this.outputColor);
    }

    cancelColor() {
        this.setColorFromString(this.initialColor);
        this.closeColorPicker();
    }

    isDescendant(parent, child): boolean {
        var node = child.parentNode;
        while (node !== null) {
            if (node === parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    }

    createBox(element, offset): any {
        return {
            top: element.getBoundingClientRect().top + (offset ? window.pageYOffset : 0),
            left: element.getBoundingClientRect().left + (offset ? window.pageXOffset : 0),
            width: element.offsetWidth,
            height: element.offsetHeight
        };
    }
}