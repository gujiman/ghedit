import { IStorageService } from 'vs/code/electron-main/storage';
import { IPath, VSCodeWindow } from 'vs/code/electron-main/window';
import { ICommandLineArguments, IProcessEnvironment, IEnvironmentService } from 'vs/code/electron-main/env';
import { ILifecycleService } from 'vs/code/electron-main/lifecycle';
import { ISettingsService } from 'vs/code/electron-main/settings';
import { IUpdateService } from 'vs/code/electron-main/update-manager';
import { ILogService } from 'vs/code/electron-main/log';
import { IInstantiationService } from 'vs/platform/instantiation/common/instantiation';
export interface IOpenConfiguration {
    cli: ICommandLineArguments;
    userEnv?: IProcessEnvironment;
    pathsToOpen?: string[];
    preferNewWindow?: boolean;
    forceNewWindow?: boolean;
    forceEmpty?: boolean;
    windowToUse?: VSCodeWindow;
    diffMode?: boolean;
}
export interface IOpenedPathsList {
    folders: string[];
    files: string[];
}
export declare const IWindowsService: {
    (...args: any[]): void;
    type: IWindowsService;
};
export interface IWindowsService {
    _serviceBrand: any;
    onOpen(clb: (path: IPath) => void): () => void;
    onReady(clb: (win: VSCodeWindow) => void): () => void;
    onClose(clb: (id: number) => void): () => void;
    ready(initialUserEnv: IProcessEnvironment): void;
    reload(win: VSCodeWindow, cli?: ICommandLineArguments): void;
    open(openConfig: IOpenConfiguration): VSCodeWindow[];
    openPluginDevelopmentHostWindow(openConfig: IOpenConfiguration): void;
    openFileFolderPicker(forceNewWindow?: boolean): void;
    openFilePicker(forceNewWindow?: boolean): void;
    openFolderPicker(forceNewWindow?: boolean): void;
    focusLastActive(cli: ICommandLineArguments): VSCodeWindow;
    getLastActiveWindow(): VSCodeWindow;
    findWindow(workspacePath: string, filePath?: string, extensionDevelopmentPath?: string): VSCodeWindow;
    openNewWindow(): void;
    sendToFocused(channel: string, ...args: any[]): void;
    sendToAll(channel: string, payload: any, windowIdsToIgnore?: number[]): void;
    getFocusedWindow(): VSCodeWindow;
    getWindowById(windowId: number): VSCodeWindow;
    getWindows(): VSCodeWindow[];
    getWindowCount(): number;
}
export declare class WindowsManager implements IWindowsService {
    private instantiationService;
    private logService;
    private storageService;
    private envService;
    private lifecycleService;
    private updateService;
    private settingsService;
    _serviceBrand: any;
    static openedPathsListStorageKey: string;
    private static workingDirPickerStorageKey;
    private static windowsStateStorageKey;
    private static WINDOWS;
    private eventEmitter;
    private initialUserEnv;
    private windowsState;
    constructor(instantiationService: IInstantiationService, logService: ILogService, storageService: IStorageService, envService: IEnvironmentService, lifecycleService: ILifecycleService, updateService: IUpdateService, settingsService: ISettingsService);
    onOpen(clb: (path: IPath) => void): () => void;
    onReady(clb: (win: VSCodeWindow) => void): () => void;
    onClose(clb: (id: number) => void): () => void;
    ready(initialUserEnv: IProcessEnvironment): void;
    private registerListeners();
    private onBroadcast(event, payload);
    reload(win: VSCodeWindow, cli?: ICommandLineArguments): void;
    open(openConfig: IOpenConfiguration): VSCodeWindow[];
    openPluginDevelopmentHostWindow(openConfig: IOpenConfiguration): void;
    private toConfiguration(userEnv, cli, workspacePath?, filesToOpen?, filesToCreate?, filesToDiff?, extensionsToInstall?);
    private getRecentlyOpenedPaths(workspacePath?, filesToOpen?);
    private toIPath(anyPath, ignoreFileNotFound?, gotoLineMode?);
    private cliToPaths(cli, ignoreFileNotFound?);
    private openInBrowserWindow(configuration, forceNewWindow?, windowToUse?);
    private getNewWindowState(configuration);
    private ensureNoOverlap(state);
    openFileFolderPicker(forceNewWindow?: boolean): void;
    openFilePicker(forceNewWindow?: boolean, path?: string): void;
    openFolderPicker(forceNewWindow?: boolean): void;
    private doPickAndOpen(options);
    private getFileOrFolderPaths(options, clb);
    focusLastActive(cli: ICommandLineArguments): VSCodeWindow;
    getLastActiveWindow(): VSCodeWindow;
    findWindow(workspacePath: string, filePath?: string, extensionDevelopmentPath?: string): VSCodeWindow;
    openNewWindow(): void;
    sendToFocused(channel: string, ...args: any[]): void;
    sendToAll(channel: string, payload: any, windowIdsToIgnore?: number[]): void;
    getFocusedWindow(): VSCodeWindow;
    getWindowById(windowId: number): VSCodeWindow;
    getWindows(): VSCodeWindow[];
    getWindowCount(): number;
    private onWindowError(vscodeWindow, error);
    private onBeforeWindowClose(win);
    private onWindowClosed(win);
    private isPathEqual(pathA, pathB);
}