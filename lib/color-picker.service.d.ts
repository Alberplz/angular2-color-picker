import { Rgba, Hsla, Hsva } from './classes';
export declare class ColorPickerService {
    constructor();
    hsla2hsva(hsla: Hsla): Hsva;
    hsva2hsla(hsva: Hsva): Hsla;
    rgbaToHsva(rgba: Rgba): Hsva;
    hsvaToRgba(hsva: Hsva): Rgba;
    stringToHsva(colorString?: string): Hsva;
    outputFormat(hsva: Hsva, outputFormat: string): string;
    hexText(rgba: Rgba): string;
    denormalizeRGBA(rgba: Rgba): Rgba;
}
