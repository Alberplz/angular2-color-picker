# angular2-color-picker
Angular 2 Color Picker Directive/Component with no dependencies required.<br />
This is a Color Picker Directive/Component for Angular 2.

# Demo page
http://alberplz.github.io/angular2-color-picker/examples/index.html

# Installation
npm i --save angular2-color-picker

# Usage
* Use it in your HTML elements, for example:
```html
<input [(colorPicker)]="color" [style.background]="color" [value]="color"/>
```
* Or:
```html
<input [colorPicker]="color" (colorPickerChange)="color=$event" [style.background]="color" [value]="color"/>
```

* Add ColorPickerService in your app.module.ts:
```javascript
import {ColorPickerService} from 'angular2-color-picker';

@NgModule({
    ...
    providers: [ColorPickerService]
})

```
* Include ColorPickerDirective in your component, and set color the variable:
```javascript
import {Component} from '@angular/core';
import {ColorPickerDirective} from 'angular2-color-picker';

@Component({
    selector: 'my-app',
    templateUrl: 'app/demo.html',
    directives: [ColorPickerDirective]
})

export class AppComponent {
    private color: string = "#127bdc";
}
```
* Configure system.config.js
```javascript
var map = {
        ...    
        'angular2-color-picker': 'node_modules/angular2-color-picker'
    };
var packages = {
        ...
        'angular2-color-picker': {main:'index.js', defaultExtension: 'js'}
    };
```
#Build
git clone https://github.com/Alberplz/angular2-color-picker.git<br />
npm install<br />
cd agular2-color-picker<br />
npm run build

#Options
Default option is the first item.
```html
[cpOutputFormat]="'hex', 'rgba', 'hsla'"
[cpPosition]="'right', 'left', 'top', 'bottom'"
[cpPositionOffset]="'0%'"
[cpPositionRelativeToArrow]="false, true"
[cpCancelButton]="false, true"
[cpWidth]="'230px'"
[cpHeight]="'290px'"
[cpCancelButtonClass]="'cp-cancel-button-class'"
[cpCancelButtonText]="'Cancel'"
[cpFallbackColor]="'#fff'"
[cpPresetLabel]="'Preset colors'"
[cpPresetColors]="[]", e.g: "['#fff', '#000']"
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