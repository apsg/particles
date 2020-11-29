(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Particles = {}));
}(this, (function (exports) { 'use strict';

    var script = {};




    script.__file = "src/Particles.vue";

    // Import vue component

    // Declare install function executed by Vue.use()
    function install(Vue) {
        if (install.installed) { return; }
        install.installed = true;
        Vue.component('particles', script);
    }

    // Create module definition for Vue.use()
    var plugin = {
        install: install,
    };

    // Auto-install when vue is found (eg. in browser via <script> tag)
    var GlobalVue = null;
    if (typeof window !== 'undefined') {
        GlobalVue = window.Vue;
    } else if (typeof global !== 'undefined') {
        GlobalVue = global.Vue;
    }
    if (GlobalVue) {
        GlobalVue.use(plugin);
    }

    exports.default = script;
    exports.install = install;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
