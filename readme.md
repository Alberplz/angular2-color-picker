# angular2-color-picker
Angular 2 Color Picker Directive/Component with no dependencies required.<br />
This is a Color Picker Directive/Component for Angular 2.

# Demo page
http://alberplz.github.io/angular2-color-picker/examples/index.html

# Installation
```bash
npm i --save angular2-color-picker
```

# Usage
* Use it in your HTML elements, for example:
```html
<input [(colorPicker)]="color" [style.background]="color" [value]="color"/>
```
* Or:
```html
<input [colorPicker]="color" (colorPickerChange)="color=$event" [style.background]="color" [value]="color"/>
```

* Add ColorPickerModule in your app.module.ts:
```javascript
import {ColorPickerModule} from 'angular2-color-picker';

@NgModule({
    ...
    imports: [ColorPickerModule]
})

```
* Set color the variable. You can use ColorPickerService in your component if you want extra functions.
```javascript
import {Component} from '@angular/core';
import {ColorPickerService} from 'angular2-color-picker';

@Component({
    selector: 'my-app',
    templateUrl: 'app/demo.html'
})

export class AppComponent {
    private color: string = "#127bdc";
    constructor(private cpService: ColorPickerService) {
    }
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
```bash
git clone https://github.com/Alberplz/angular2-color-picker.git
npm install
cd agular2-color-picker
npm run build
gulp copylib
```

#Options
Default option is the first item.
```html
[cpOutputFormat]="'hex', 'rgba', 'hsla'"
[cpPosition]="'right', 'left', 'top', 'bottom'"
[cpPositionOffset]="'0%'"
[cpPositionRelativeToArrow]="false, true"
[cpWidth]="'230px'"
[cpHeight]="'auto'"
[cpSaveClickOutside]="true, false"
[cpOKButton]="false, true"
[cpOKButtonClass]="''"
[cpOKButtonText]="'OK'"
[cpCancelButton]="false, true"
[cpCancelButtonClass]="''"
[cpCancelButtonText]="'Cancel'"
[cpFallbackColor]="'#fff'"
[cpPresetLabel]="'Preset colors'"
[cpPresetColors]="[]", e.g: "['#fff', '#000']"
[cpToggle] = "false, true"
[cpIgnoredElements]="[]"
[cpDialogDisplay]="'popup,' 'inline'"
[cpAlphaChannel]="'hex6', 'hex8', 'disabled'"
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