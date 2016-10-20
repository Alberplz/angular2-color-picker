import { Rgba, Hsla, Hsva } from './classes';
export declare class ColorPickerService {
    constructor();
    hsla2hsva(hsla: Hsla): Hsva;
    hsva2hsla(hsva: Hsva): Hsla;
    rgbaToHsva(rgba: Rgba): Hsva;
    hsvaToRgba(hsva: Hsva): Rgba;
    stringToHsva(colorString?: string, hex8?: boolean): Hsva;
    outputFormat(hsva: Hsva, outputFormat: string, allowHex8: boolean): string;
    hexText(rgba: Rgba, allowHex8: boolean): string;
    denormalizeRGBA(rgba: Rgba): Rgba;
}
