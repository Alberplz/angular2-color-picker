import { Component } from '@angular/core';
import '../../public/css/styles.css';
import {ColorPickerService, Rgba} from 'angular2-color-picker/lib';

export class Cmyk {
    constructor(public c: number, public m: number, public y: number, public k: number) { }
}

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(private cpService: ColorPickerService) { }

    private color: string = '#2889e9';
    private color2: string = "hsla(300,82%,52%)";
    private color3: string = "#fff500";
    private color4: string = "rgb(236,64,64)";
    private color5: string = "rgba(45,208,45,1)";
    private color6: string = "#1973c0";
    private color7: string = "#f200bd";
    private color8: string = "#a8ff00";
    private color9: string = "#3b4da1";
    private cmyk: Cmyk = new Cmyk(0, 0, 0, 0);

    onChangeColor(color: string): Cmyk {
        return this.rgbaToCmyk(this.cpService.hsvaToRgba(this.cpService.stringToHsva(color)));
    }

    rgbaToCmyk(rgba: Rgba): Cmyk {
        let cmyk: Cmyk = new Cmyk(0, 0, 0, 0), k: number;
        k = 1 - Math.max(rgba.r, rgba.g, rgba.b);
        if (k == 1) return new Cmyk(0, 0, 0, 1);
        cmyk.c = (1 - rgba.r - k) / (1 - k);
        cmyk.m = (1 - rgba.g - k) / (1 - k);
        cmyk.y = (1 - rgba.b - k) / (1 - k);
        cmyk.k = k;
        return cmyk;
    }
}