import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {ColorPickerModule} from 'angular2-color-picker';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, ColorPickerModule],
    bootstrap: [AppComponent]
})
export class AppModule { }