import {Component} from '@angular/core';
import {ColorPickerDirective} from 'angular2-color-picker';

@Component({
    selector: 'my-app',
    templateUrl: 'app/demo.html',
    directives: [ColorPickerDirective]
})

export class AppComponent {
    private color: string = '#2889e9';
    private color2: string = "hsla(300,82%,52%)";
    private color3: string = "#fff500";
    private color4: string = "rgb(236,64,64)";
    private color5: string = "rgba(45,208,45,1)";
    private color6: string = "#1973c0";
    private color7: string = "#f200bd";
    private color8: string = "#a8ff00";
}