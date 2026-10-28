var capacitorAuto = (function (exports, core) {
    'use strict';

    const Auto = core.registerPlugin('Auto', {
        web: () => Promise.resolve().then(function () { return web; }).then((m) => new m.AutoWeb()),
    });

    const ROOT_TEMPLATE_STATE_KEY = '__capgo_auto_root_template';
    class AutoWeb extends core.WebPlugin {
        constructor() {
            super(...arguments);
            this.state = new Map();
            this.transientState = new Map();
        }
        async isAvailable() {
            return {
                available: false,
                connected: false,
                platform: 'web',
            };
        }
        async setRootTemplate(options) {
            this.template = options;
        }
        async setState(options) {
            const key = this.assertValidKey(options);
            const value = this.assertValidPayload(options);
            this.state.set(key, value);
            await this.notifyStateChanged(key, value, false);
        }
        async getState(options) {
            const key = this.assertValidKey(options);
            return this.stateResult(key, this.state.get(key));
        }
        async removeState(options) {
            const key = this.assertValidKey(options);
            this.state.delete(key);
            await this.notifyStateChanged(key, undefined, false);
        }
        async setTransientState(options) {
            const key = this.assertValidKey(options);
            const value = this.assertValidPayload(options);
            this.transientState.set(key, value);
            await this.notifyStateChanged(key, value, true);
        }
        async getTransientState(options) {
            const key = this.assertValidKey(options);
            return this.stateResult(key, this.transientState.get(key));
        }
        async sendMessage(options) {
            this.lastMessage = options;
            await this.notifyListeners('messageReceived', Object.assign(Object.assign({}, options), { platform: 'web' }));
        }
        async getPluginVersion() {
            return {
                version: 'web',
            };
        }
        getCurrentTemplate() {
            return this.template;
        }
        getLastMessage() {
            return this.lastMessage;
        }
        stateResult(key, value) {
            return value === undefined ? { key } : { key, value: this.clonePayload(value) };
        }
        async notifyStateChanged(key, value, transient) {
            await this.notifyListeners('stateChanged', Object.assign(Object.assign({}, this.stateResult(key, value)), { platform: 'web', transient }));
        }
        assertValidKey(options) {
            if (options === null || typeof options !== 'object') {
                throw new Error('State options must be an object');
            }
            const key = options.key;
            if (typeof key !== 'string' || key.length === 0) {
                throw new Error('State key must be a non-empty string');
            }
            if (key === ROOT_TEMPLATE_STATE_KEY) {
                throw new Error(`State key is reserved: ${ROOT_TEMPLATE_STATE_KEY}`);
            }
            return key;
        }
        assertValidPayload(options) {
            if (options === null || typeof options !== 'object') {
                throw new Error('State options must be an object');
            }
            const value = options.value;
            if (value === null || Array.isArray(value) || typeof value !== 'object') {
                throw new Error('State value must be a JSON object');
            }
            return this.clonePayload(value);
        }
        clonePayload(value) {
            return JSON.parse(JSON.stringify(value));
        }
    }

    var web = /*#__PURE__*/Object.freeze({
        __proto__: null,
        AutoWeb: AutoWeb
    });

    exports.Auto = Auto;

    return exports;

})({}, capacitorExports);
//# sourceMappingURL=plugin.js.map
