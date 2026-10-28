import { registerPlugin } from '@capacitor/core';
const Auto = registerPlugin('Auto', {
    web: () => import('./web').then((m) => new m.AutoWeb()),
});
export * from './definitions';
export { Auto };
//# sourceMappingURL=index.js.map