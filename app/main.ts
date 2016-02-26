import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from './app.component';
import {ColorPickerService} from './color-picker/color-picker.service'

bootstrap(AppComponent, [ColorPickerService]);