# angular2-color-picker
Angular 2 Color Picker Directive with no dependencies required.
This is a Color Picker Directive for Angular 2 (now in beta). This version is compiled for Angular 2 beta 7.

# Demo page
http://alberplz.github.io/angular2-color-picker/index.html

# Intallation
bower install angular2-color-picker

# Usage
* In your view:
```html
<input [(colorPicker)]="color" [style.background]="color" [value]="color"/>
```
* Add ColorPickerService in your main.ts:
```javascript
import {ColorPickerService} from './color-picker/color-picker.service'
bootstrap(AppComponent, [ColorPickerService]);
```
* Include ColorPickerDirective in your component, and set color the variable:
```javascript
import {Component} from 'angular2/core';
import {ColorPickerDirective} from './color-picker/color-picker.directive'

@Component({
    selector: 'my-app',
    templateUrl: 'app/demo.html',
    directives: [ColorPickerDirective]
})

export class AppComponent {
    private color: string = "#127bdc";
}
```

#Options
Default option is the first item.
```html
[cpOutputFormat]="'hex', 'rgba', 'hsla'"
[cpPosition]="'right', 'left', 'top', 'bottom'"
```

#Extra content
If you want to change precaculated images for color picker sliders, you can find a little script in this project:
https://github.com/Alberplz/angular-colorpicker-directive

#Tested in:
* Chrome 48
* Firefox 44.0.2
* Microsoft Edge
* Opera 35.0
* Safari 5.1.7, not working in beta 7.
* Internet Explorer 11, not working in beta 7.