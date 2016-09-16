import { ViewContainerRef, ElementRef, EventEmitter, OnInit, AfterViewInit } from '@angular/core';
import { ColorPickerService } from './color-picker.service';
import { Compiler } from '@angular/core';
export declare class ColorPickerDirective implements OnInit {
    private compiler;
    private vcRef;
    private el;
    private service;
    colorPicker: string;
    colorPickerChange: EventEmitter<string>;
    cpPosition: string;
    cpPositionOffset: string;
    cpPositionRelativeToArrow: boolean;
    cpOutputFormat: string;
    cpPresetLabel: string;
    cpPresetColors: Array<string>;
    cpCancelButton: boolean;
    cpCancelButtonClass: string;
    cpCancelButtonText: string;
    cpFallbackColor: string;
    cpHeight: string;
    cpWidth: string;
    private dialog;
    private created;
    constructor(compiler: Compiler, vcRef: ViewContainerRef, el: ElementRef, service: ColorPickerService);
    ngOnInit(): void;
    onClick(): void;
    colorChanged(value: string): void;
    changeInput(value: string): void;
}
export declare class TextDirective {
    newValue: EventEmitter<any>;
    text: any;
    rg: number;
    changeInput(value: string): void;
}
export declare class SliderDirective {
    private el;
    newValue: EventEmitter<any>;
    slider: string;
    rgX: number;
    rgY: number;
    private listenerMove;
    private listenerStop;
    constructor(el: ElementRef);
    setCursor(event: any): void;
    move(event: any): void;
    start(event: any): void;
    stop(): void;
    getX(event: any): number;
    getY(event: any): number;
}
export declare class DialogComponent implements OnInit, AfterViewInit {
    private el;
    private service;
    private hsva;
    private rgbaText;
    private hslaText;
    private hexText;
    private outputColor;
    private alphaSliderColor;
    private hueSliderColor;
    private slider;
    private sliderDimMax;
    private format;
    private show;
    private top;
    private left;
    private position;
    private directiveInstance;
    private initialColor;
    private directiveElementRef;
    private listenerMouseDown;
    private listenerResize;
    private cpPosition;
    private cpPositionOffset;
    private cpOutputFormat;
    private cpPresetLabel;
    private cpPresetColors;
    private cpCancelButton;
    private cpCancelButtonClass;
    private cpCancelButtonText;
    private cpHeight;
    private cpWidth;
    private dialogArrowSize;
    private dialogArrowOffset;
    private arrowTop;
    hueSlider: any;
    alphaSlider: any;
    dialogElement: any;
    constructor(el: ElementRef, service: ColorPickerService);
    setDialog(instance: any, elementRef: ElementRef, color: any, cpPosition: string, cpPositionOffset: string, cpPositionRelativeToArrow: boolean, cpOutputFormat: string, cpPresetLabel: string, cpPresetColors: Array<string>, cpCancelButton: boolean, cpCancelButtonClass: string, cpCancelButtonText: string, cpHeight: string, cpWidth: string): void;
    updateDialog(color: any, cpHeight: string, cpWidth: string): void;
    setInitialColor(color: any): void;
    ngOnInit(): void;
    ngAfterViewInit(): void;
    openColorPicker(): void;
    onMouseDown(event: any): void;
    closeColorPicker(): void;
    onResize(): void;
    setDialogPosition(): void;
    setSaturation(val: {
        v: number;
        rg: number;
    }): void;
    setLightness(val: {
        v: number;
        rg: number;
    }): void;
    setHue(val: {
        v: number;
        rg: number;
    }): void;
    setAlpha(val: {
        v: number;
        rg: number;
    }): void;
    setR(val: {
        v: number;
        rg: number;
    }): void;
    setG(val: {
        v: number;
        rg: number;
    }): void;
    setB(val: {
        v: number;
        rg: number;
    }): void;
    setSaturationAndBrightness(val: {
        s: number;
        v: number;
        rgX: number;
        rgY: number;
    }): void;
    setColorFromString(value: string): void;
    formatPolicy(): number;
    update(): void;
    cancelColor(): void;
    isDescendant(parent: any, child: any): boolean;
    createBox(element: any, offset: boolean): any;
}
