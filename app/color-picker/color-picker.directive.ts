import {Component, DynamicComponentLoader, OnChanges, Directive, Input, Output, ElementRef, EventEmitter, OnInit} from 'angular2/core';
import {ColorPickerService} from './color-picker.service';
import {Rgba, Hsla, Hsva, SliderPosition, SliderDimension} from './classes';

@Directive({
    selector: '[colorPicker]',
    host: {
        '(input)': 'changeInput($event.target.value)',
        '(click)': 'onClick($event)'
    }
})
export class ColorPickerDirective implements OnInit {
    @Input('colorPicker') colorPicker: string;
    @Output('colorPickerChange') colorPickerChange = new EventEmitter<string>();
    @Input('cpPosition') cpPosition: string = 'right';
    @Input('cpOutputFormat') cpOutputFormat: string = 'hex';
    @Input('cpCancelButton') cpCancelButton: string;
    private dialog: any;
    private created: boolean;

    constructor(private dcl: DynamicComponentLoader, private el: ElementRef, private service: ColorPickerService) {
        this.created = false;
    }

    ngOnInit() {
        let hsva = this.service.stringToHsva(this.colorPicker);
        if (hsva !== null) {
            this.colorPickerChange.emit(this.service.outputFormat(hsva, this.cpOutputFormat));
        }
    }

    onClick(event: any) {
        if (!this.created) {
            this.created = true;
            this.dcl.loadNextToLocation(DialogComponent, this.el)
                .then((res) => {
                    //res.instance.setDirectiveInstance(this);
                    //res.instance.setInitialColor(this.colorPicker);
                    //res.instance.setDirectiveElementRef(this.el)
                    res.instance.setDialog(this, this.el, this.colorPicker, this.cpPosition, this.cpOutputFormat, this.cpCancelButton);
                    this.dialog = res.instance;
                });
        } else if (this.dialog) {
            this.dialog.openColorPicker();
        }
    }

    colorChanged(value: string) {
        this.colorPickerChange.emit(value)
    }

    changeInput(value: string) {
        this.dialog.setColorFromHex(value)
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
    @Output('action') action = new EventEmitter<any>();
    @Input('text') text: any;
    @Input('rg') rg: any;

    constructor(private el: ElementRef) { }

    changeInput(value: string) {
        if (this.rg === undefined) {
            this.action.emit(value);
        } else {
            let numeric = parseFloat(value)
            //this.el.nativeElement.value = Math.min(numeric, this.rg);  Math.min(numeric, this.rg)          
            if (!isNaN(numeric) && value.slice(-1) !== '.' && numeric >= 0 && numeric <= this.rg) {
                this.action.emit({ v: numeric, rg: this.rg });
            }
        }
    }
}

@Directive({
    selector: '[slider]',
    host: {
        '(mousedown)': 'onMousedown($event)'
    }
})
export class SliderDirective {
    @Output('newValue') newValue = new EventEmitter<any>();
    @Input('slider') slider: string;
    @Input('rgX') rgX: any;
    @Input('rgY') rgY: any;
    private listenerMousemove: any;
    private listenerMouseup: any;

    constructor(private el: ElementRef) {
        this.listenerMousemove = (event: Event) => { this.setCursor(event) };
        this.listenerMouseup = (event: Event) => { this.onMouseUp(event) };
    }
    setCursor(event: Event) {
        let maxTop = this.el.nativeElement.offsetHeight;
        let maxLeft = this.el.nativeElement.offsetWidth;
        let x = Math.max(0, Math.min(this.getX(event), maxLeft));
        let y = Math.max(0, Math.min(this.getY(event), maxTop));

        if (this.rgX !== undefined && this.rgY !== undefined) {
            this.newValue.emit({ s: x / maxLeft, v: (1 - y / maxTop), rgX: this.rgX, rgY: this.rgY });
        } else if (this.rgX === undefined && this.rgY !== undefined) {
            this.newValue.emit({ v: y / maxTop, rg: this.rgY });
        } else {
            this.newValue.emit({ v: x / maxLeft, rg: this.rgX });
        }
    }
    getX(event: Event) {
        return event.pageX - this.el.nativeElement.getBoundingClientRect().left - window.pageXOffset;
    }
    getY(event: Event) {
        return event.pageY - this.el.nativeElement.getBoundingClientRect().top - window.pageYOffset;
    }
    onMousedown(event: Event) {
        event.preventDefault();
        document.addEventListener('mousemove', this.listenerMousemove);
        document.addEventListener('mouseup', this.listenerMouseup);
        this.setCursor(event);
    }
    onMouseUp(event: Event) {
        document.removeEventListener('mousemove', this.listenerMousemove);
        document.removeEventListener('mouseup', this.listenerMouseup);
    }
}

@Component({
    selector: 'color-picker',
    templateUrl: 'app/color-picker/color-picker.html',
    styleUrls: ['app/color-picker/color-picker.css'],
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
    private listenerClick: any;
    private top: string;
    private left: string;
    private position: string;
    private directiveInstance: any;
    private initialColor: string;
    private directiveElementRef: ElementRef;

    private cpPosition: string;
    private cpOutputFormat: string;
    private cpCancelButton: string;


    constructor(private el: ElementRef, private service: ColorPickerService) { }

    /*setDirectiveInstance(instance: any) {
        this.directiveInstance = instance;
    }
    setInitialColor(color: any) {
        this.initialColor = color;
    }
    setDirectiveElementRef(elementRef: ElementRef) {
        this.directiveElementRef = elementRef;
    }*/

    setDialog(instance: any, elementRef: ElementRef, color: any, cpPosition: string, cpOutputFormat: string, cpCancelButton: string) {
        this.directiveInstance = instance;
        this.initialColor = color;
        this.directiveElementRef = elementRef;
        this.cpPosition = cpPosition;
        this.cpOutputFormat = cpOutputFormat;
        this.cpCancelButton = cpCancelButton;
    }

    ngOnInit() {

        let hsva = this.service.stringToHsva(this.initialColor);
        if (hsva !== null) {
            this.hsva = hsva;
        } else {
            this.hsva = new Hsva(0, 1, 1, 1);
        }
        this.sliderDimMax = new SliderDimension(150, 230, 130, 150);
        this.slider = new SliderPosition('0px', '0px', '0px', '0px');

        if (this.cpOutputFormat === 'rgba') {
            this.format = 1;
        } else if (this.cpOutputFormat === 'hsla') {
            this.format = 2;
        } else {
            this.format = 0;
        }

        this.listenerClick = (event: Event) => { this.closeColorPicker(event) };
        this.update();

        var node = this.directiveElementRef.nativeElement;
        var position = 'static';
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

        let top, left;
        if (position !== 'fixed') {
            var boxDirentive = this.service.createBox(this.directiveElementRef.nativeElement, true);
            if (parentNode === null) { parentNode = node }
            let boxParent = this.service.createBox(parentNode, true);
            top = boxDirentive.top - boxParent.top;
            left = boxDirentive.left - boxParent.left;
        } else {
            var boxDirentive = this.service.createBox(this.directiveElementRef.nativeElement, false);
            top = boxDirentive.top;
            left = boxDirentive.left;
            this.position = 'fixed';
        }
        if (this.cpPosition === 'left') {
            left -= 252;
        } else if (this.cpPosition === 'top') {
            top -= 300;
            left -= 10;
        } else if (this.cpPosition === 'bottom') {
            top += boxDirentive.height + 10;
            left -= 10;
        } else {
            left += boxDirentive.width;
        }
        this.top = top + 'px';
        this.left = left + 'px';

        this.openColorPicker();
    }

    openColorPicker() {
        if (!this.show) {
            this.show = true;
            document.addEventListener('mousedown', this.listenerClick);
        }
    }

    closeColorPicker(event: Event) {
        if (!this.service.isDescendant(this.el.nativeElement, event.target) && event.target != this.directiveElementRef.nativeElement) {
            this.show = false;
            document.removeEventListener('mousedown', this.listenerClick);
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

    setColorFromHex(value: string) {
        let hsva = this.service.stringToHsva(value);
        if (hsva !== null) {
            this.hsva = hsva;
        }
        this.update();
    }

    formatPolicy() {
        this.format = (this.format + 1) % 3;
        if (this.format === 0 && this.hsva.a < 1) {
            this.format++;
        }
        return this.format;
    }

    update() {
        let hsla = this.service.hsva2hsla(this.hsva);
        this.hslaText = new Hsla(Math.round((hsla.h) * 360), Math.round(hsla.s * 100), Math.round(hsla.l * 100), this.service.round(hsla.a, 2));

        let rgba = this.service.denormalizeRGBA(this.service.hsvaToRgba(this.hsva));
        let hueRgba = this.service.denormalizeRGBA(this.service.hsvaToRgba(new Hsva(this.hsva.h, 1, 1, 1)));

        this.rgbaText = new Rgba(rgba.r, rgba.g, rgba.b, this.service.round(rgba.a, 2));

        this.hexText = this.service.hexText(rgba);

        this.alphaSliderColor = 'rgb(' + rgba.r + ',' + rgba.g + ',' + rgba.b + ')';
        this.hueSliderColor = 'rgb(' + hueRgba.r + ',' + hueRgba.g + ',' + hueRgba.b + ')';

        if (this.format === 0 && this.hsva.a < 1) {
            this.format++;
        }

        this.outputColor = this.service.outputFormat(this.hsva, this.cpOutputFormat);

        this.slider = new SliderPosition((this.hsva.h) * this.sliderDimMax.h - 8 + 'px',
            this.hsva.s * this.sliderDimMax.s - 8 + 'px',
            (1 - this.hsva.v) * this.sliderDimMax.v - 8 + 'px',
            this.hsva.a * this.sliderDimMax.a - 8 + 'px')

        this.directiveInstance.colorChanged(this.outputColor)
    }

}