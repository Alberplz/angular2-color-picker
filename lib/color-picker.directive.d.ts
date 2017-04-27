import { OnChanges, ViewContainerRef, ElementRef, EventEmitter, OnInit, ComponentFactoryResolver } from '@angular/core';
import { ColorPickerService } from './color-picker.service';
import { Rgba, Hsla, Hsva, SliderPosition, SliderDimension } from './classes';
export declare class ColorPickerDirective implements OnInit, OnChanges {
    private vcRef;
    private resolver;
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
    private dialog;
    private created;
    private ignoreChanges;
    constructor(vcRef: ViewContainerRef, resolver: ComponentFactoryResolver, el: ElementRef, service: ColorPickerService);
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
    hsva: Hsva;
    rgbaText: Rgba;
    hslaText: Hsla;
    hexText: string;
    outputColor: string;
    selectedColor: string;
    alphaSliderColor: string;
    hueSliderColor: string;
    slider: SliderPosition;
    sliderDimMax: SliderDimension;
    format: number;
    show: boolean;
    top: number;
    left: number;
    position: string;
    directiveInstance: any;
    initialColor: string;
    directiveElementRef: ElementRef;
    listenerMouseDown: any;
    listenerResize: any;
    cpPosition: string;
    cpPositionOffset: number;
    cpOutputFormat: string;
    cpPresetLabel: string;
    cpPresetColors: Array<string>;
    cpCancelButton: boolean;
    cpCancelButtonClass: string;
    cpCancelButtonText: string;
    cpOKButton: boolean;
    cpOKButtonClass: string;
    cpOKButtonText: string;
    cpHeight: number;
    cpWidth: number;
    cpIgnoredElements: any;
    cpDialogDisplay: string;
    cpSaveClickOutside: boolean;
    cpAlphaChannel: string;
    private dialogArrowSize;
    private dialogArrowOffset;
    private arrowTop;
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
