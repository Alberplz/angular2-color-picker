import {bootstrap} from '@angular/platform-browser-dynamic';
import {AppComponent} from './app.component';
import {ColorPickerService} from './color-picker/color-picker.service'

bootstrap(AppComponent, [ColorPickerService]);