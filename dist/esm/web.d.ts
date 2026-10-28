import { WebPlugin } from '@capacitor/core';
import type { AutoAvailability, AutoMessageOptions, AutoPlugin, AutoStateKeyOptions, AutoStateOptions, AutoStateResult, AutoTemplateOptions, PluginVersionResult } from './definitions';
export declare class AutoWeb extends WebPlugin implements AutoPlugin {
    private template?;
    private lastMessage?;
    private state;
    private transientState;
    isAvailable(): Promise<AutoAvailability>;
    setRootTemplate(options: AutoTemplateOptions): Promise<void>;
    setState(options: AutoStateOptions): Promise<void>;
    getState(options: AutoStateKeyOptions): Promise<AutoStateResult>;
    removeState(options: AutoStateKeyOptions): Promise<void>;
    setTransientState(options: AutoStateOptions): Promise<void>;
    getTransientState(options: AutoStateKeyOptions): Promise<AutoStateResult>;
    sendMessage(options: AutoMessageOptions): Promise<void>;
    getPluginVersion(): Promise<PluginVersionResult>;
    getCurrentTemplate(): AutoTemplateOptions | undefined;
    getLastMessage(): AutoMessageOptions | undefined;
    private stateResult;
    private notifyStateChanged;
    private assertValidKey;
    private assertValidPayload;
    private clonePayload;
}
