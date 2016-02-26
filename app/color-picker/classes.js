System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Hsva, Hsla, Rgba, SliderPosition, SliderDimension;
    return {
        setters:[],
        execute: function() {
            Hsva = (function () {
                function Hsva(h, s, v, a) {
                    this.h = h;
                    this.s = s;
                    this.v = v;
                    this.a = a;
                }
                return Hsva;
            }());
            exports_1("Hsva", Hsva);
            Hsla = (function () {
                function Hsla(h, s, l, a) {
                    this.h = h;
                    this.s = s;
                    this.l = l;
                    this.a = a;
                }
                return Hsla;
            }());
            exports_1("Hsla", Hsla);
            Rgba = (function () {
                function Rgba(r, g, b, a) {
                    this.r = r;
                    this.g = g;
                    this.b = b;
                    this.a = a;
                }
                return Rgba;
            }());
            exports_1("Rgba", Rgba);
            SliderPosition = (function () {
                function SliderPosition(h, s, v, a) {
                    this.h = h;
                    this.s = s;
                    this.v = v;
                    this.a = a;
                }
                return SliderPosition;
            }());
            exports_1("SliderPosition", SliderPosition);
            SliderDimension = (function () {
                function SliderDimension(h, s, v, a) {
                    this.h = h;
                    this.s = s;
                    this.v = v;
                    this.a = a;
                }
                return SliderDimension;
            }());
            exports_1("SliderDimension", SliderDimension);
        }
    }
});
//# sourceMappingURL=classes.js.map