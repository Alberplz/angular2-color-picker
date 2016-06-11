# angular2-color-picker
Angular 2 Color Picker Directive/Component with no dependencies required.<br />
This is a Color Picker Directive/Component for Angular 2.

# Demo page
http://alberplz.github.io/angular2-color-picker/index.html

# Installation
* Via Git: <br /> git clone https://github.com/Alberplz/angular2-color-picker.git
* Via Bower: <br /> bower install angular2-color-picker

# Usage
* Use it in your HTML elements, for example:
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
[cpPositionOffset]="'0%'"
[cpPositionRelativeToArrow]="false, true"
[cpCancelButton]="false, true"
[cpHeight]="'290px'"
[cpCancelButtonClass]="'cp-cancel-button-class'"
[cpCancelButtonText]="'Cancel'"
[cpFallbackColor]="'#fff'"
```

#Extra content
If you want to change precalculated images for color picker sliders, you can find a little script in this project:
https://github.com/Alberplz/angular-colorpicker-directive

#Tested in:
* Chrome
* Firefox
* Microsoft Edge
* Opera
* Safari
* Internet Explorer

#For previous version of Angular:
https://github.com/Alberplz/angular-colorpicker-directive