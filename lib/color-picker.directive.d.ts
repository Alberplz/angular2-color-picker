import { OnChanges, ViewContainerRef, ElementRef, EventEmitter, OnInit } from '@angular/core';
import { ColorPickerService } from './color-picker.service';
import { Rgba, Hsla, SliderPosition } from './classes';
import { Compiler } from '@angular/core';
export declare class ColorPickerDirective implements OnInit, OnChanges {
    private compiler;
    private vcRef;
    private el;
    private service;
    colorPicker: string;
    colorPickerChange: EventEmitter<string>;
    cpToggle: boolean;
    cpToggleChange: EventEmitter<boolean>;
    cpPosition: string;
    cpPositionOffset: string;
    cpPositionRelativeToArrow: boolean;
    cpOutputFormat: string;
    cpPresetLabel: string;
    cpPresetColors: Array<string>;
    cpCancelButton: boolean;
    cpCancelButtonClass: string;
    cpCancelButtonText: string;
    cpOKButton: boolean;
    cpOKButtonClass: string;
    cpOKButtonText: string;
    cpFallbackColor: string;
    cpHeight: string;
    cpWidth: string;
    cpIgnoredElements: any;
    cpDialogDisplay: string;
    cpSaveClickOutside: boolean;
    cpAlphaChannel: string;
    cpColorChangeOnInit: boolean;
    private dialog;
    private created;
    private ignoreChanges;
    constructor(compiler: Compiler, vcRef: ViewContainerRef, el: ElementRef, service: ColorPickerService);
    ngOnChanges(changes: any): void;
    ngOnInit(): void;
    onClick(): void;
    openDialog(): void;
    colorChanged(value: string, ignore?: boolean): void;
    changeInput(value: string): void;
    toggle(value: boolean): void;
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
export declare class DialogComponent implements OnInit {
    private el;
    private service;
    rgbaText: Rgba;
    hslaText: Hsla;
    hexText: string;
    outputColor: string;
    alphaSliderColor: string;
    hueSliderColor: string;
    slider: SliderPosition;
    format: number;
    show: boolean;
    top: number;
    left: number;
    position: string;
    cpPosition: string;
    cpPresetColors: Array<string>;
    cpCancelButton: boolean;
    cpHeight: number;
    cpWidth: number;
    arrowTop: number;
    private hsva;
    private directiveInstance;
    private initialColor;
    private directiveElementRef;
    private sliderDimMax;
    private listenerMouseDown;
    private listenerResize;
    private cpPositionOffset;
    private cpOutputFormat;
    private cpPresetLabel;
    private cpCancelButtonClass;
    private cpCancelButtonText;
    private cpIgnoredElements;
    private dialogArrowSize;
    private dialogArrowOffset;
    cpOKButton: boolean;
    cpOKButtonClass: string;
    cpOKButtonText: string;
    cpDialogDisplay: string;
    cpAlphaChannel: string;
    cpSaveClickOutside: boolean;
    selectedColor: string;
    hueSlider: any;
    alphaSlider: any;
    dialogElement: any;
    constructor(el: ElementRef, service: ColorPickerService);
    setDialog(instance: any, elementRef: ElementRef, color: any, cpPosition: string, cpPositionOffset: string, cpPositionRelativeToArrow: boolean, cpOutputFormat: string, cpPresetLabel: string, cpPresetColors: Array<string>, cpCancelButton: boolean, cpCancelButtonClass: string, cpCancelButtonText: string, cpOKButton: boolean, cpOKButtonClass: string, cpOKButtonText: string, cpHeight: string, cpWidth: string, cpIgnoredElements: any, cpDialogDisplay: string, cpSaveClickOutside: boolean, cpAlphaChannel: string): void;
    ngOnInit(): void;
    setInitialColor(color: any): void;
    openDialog(color: any, emit?: boolean): void;
    cancelColor(): void;
    oKColor(): void;
    setColorFromString(value: string, emit?: boolean): void;
    onMouseDown(event: any): void;
    openColorPicker(): void;
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
    formatPolicy(): number;
    update(emit?: boolean): void;
    isDescendant(parent: any, child: any): boolean;
    createBox(element: any, offset: boolean): any;
}
export declare class DynamicCpModule {
}
