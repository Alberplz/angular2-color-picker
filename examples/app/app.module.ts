import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {ColorPickerService} from 'angular2-color-picker';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule],    
    bootstrap: [AppComponent],
    providers: [ColorPickerService]
})
export class AppModule { }