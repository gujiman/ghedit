import Event from 'vs/base/common/event';
import severity from 'vs/base/common/severity';
import { TPromise } from 'vs/base/common/winjs.base';
import { IKeybindingService } from 'vs/platform/keybinding/common/keybinding';
import { IMarkerService } from 'vs/platform/markers/common/markers';
import { ILifecycleService } from 'vs/platform/lifecycle/common/lifecycle';
import { IExtensionService } from 'vs/platform/extensions/common/extensions';
import { IInstantiationService } from 'vs/platform/instantiation/common/instantiation';
import { IFileService } from 'vs/platform/files/common/files';
import { IEventService } from 'vs/platform/event/common/event';
import { IMessageService } from 'vs/platform/message/common/message';
import { ITelemetryService } from 'vs/platform/telemetry/common/telemetry';
import { IStorageService } from 'vs/platform/storage/common/storage';
import { IEditorGroupService } from 'vs/workbench/services/group/common/groupService';
import debug = require('vs/workbench/parts/debug/common/debug');
import { Source } from 'vs/workbench/parts/debug/common/debugSource';
import { ITaskService } from 'vs/workbench/parts/tasks/common/taskService';
import { IViewletService } from 'vs/workbench/services/viewlet/common/viewletService';
import { IPanelService } from 'vs/workbench/services/panel/common/panelService';
import { IPartService } from 'vs/workbench/services/part/common/partService';
import { ITextFileService } from 'vs/workbench/parts/files/common/files';
import { IConfigurationService } from 'vs/platform/configuration/common/configuration';
import { IWorkspaceContextService } from 'vs/workbench/services/workspace/common/contextService';
import { IWorkbenchEditorService } from 'vs/workbench/services/editor/common/editorService';
import { IWindowService } from 'vs/workbench/services/window/electron-browser/windowService';
export declare class DebugService implements debug.IDebugService {
    private storageService;
    private editorService;
    private textFileService;
    private viewletService;
    private panelService;
    private fileService;
    private messageService;
    private partService;
    private windowService;
    private telemetryService;
    private contextService;
    private editorGroupService;
    private lifecycleService;
    private instantiationService;
    private extensionService;
    private markerService;
    private taskService;
    private configurationService;
    _serviceBrand: any;
    private _state;
    private _onDidChangeState;
    private session;
    private model;
    private viewModel;
    private configurationManager;
    private customTelemetryService;
    private lastTaskEvent;
    private toDispose;
    private toDisposeOnSessionEnd;
    private inDebugMode;
    private breakpointsToSendOnResourceSaved;
    constructor(storageService: IStorageService, editorService: IWorkbenchEditorService, textFileService: ITextFileService, viewletService: IViewletService, panelService: IPanelService, fileService: IFileService, messageService: IMessageService, partService: IPartService, windowService: IWindowService, telemetryService: ITelemetryService, contextService: IWorkspaceContextService, keybindingService: IKeybindingService, editorGroupService: IEditorGroupService, eventService: IEventService, lifecycleService: ILifecycleService, instantiationService: IInstantiationService, extensionService: IExtensionService, markerService: IMarkerService, taskService: ITaskService, configurationService: IConfigurationService);
    private registerListeners(eventService, lifecycleService);
    private onBroadcast(broadcast);
    private registerSessionListeners();
    private onOutput(event);
    private getThreadData();
    private loadBreakpoints();
    private loadFunctionBreakpoints();
    private loadExceptionBreakpoints();
    private loadWatchExpressions();
    state: debug.State;
    onDidChangeState: Event<debug.State>;
    private setStateAndEmit(newState);
    enabled: boolean;
    setFocusedStackFrameAndEvaluate(focusedStackFrame: debug.IStackFrame, thread?: debug.IThread): TPromise<void>;
    enableOrDisableBreakpoints(enable: boolean, breakpoint?: debug.IEnablement): TPromise<void>;
    addBreakpoints(rawBreakpoints: debug.IRawBreakpoint[]): TPromise<void[]>;
    removeBreakpoints(id?: string): TPromise<any>;
    setBreakpointsActivated(activated: boolean): TPromise<void>;
    addFunctionBreakpoint(): void;
    renameFunctionBreakpoint(id: string, newFunctionName: string): TPromise<void>;
    removeFunctionBreakpoints(id?: string): TPromise<void>;
    addReplExpression(name: string): TPromise<void>;
    logToRepl(value: string | {
        [key: string]: any;
    }, severity?: severity): void;
    appendReplOutput(value: string, severity?: severity): void;
    removeReplExpressions(): void;
    setVariable(variable: debug.IExpression, value: string): TPromise<any>;
    addWatchExpression(name: string): TPromise<void>;
    renameWatchExpression(id: string, newName: string): TPromise<void>;
    removeWatchExpressions(id?: string): void;
    createSession(noDebug: boolean, configuration?: debug.IConfig): TPromise<any>;
    private doCreateSession(configuration);
    private runPreLaunchTask(taskName);
    private rawAttach(port);
    restartSession(): TPromise<any>;
    getActiveSession(): debug.IRawDebugSession;
    private onSessionEnd();
    getModel(): debug.IModel;
    getViewModel(): debug.IViewModel;
    openOrRevealSource(source: Source, lineNumber: number, preserveFocus: boolean, sideBySide: boolean): TPromise<any>;
    private sourceIsUnavailable(source, sideBySide);
    getConfigurationManager(): debug.IConfigurationManager;
    next(threadId: number): TPromise<void>;
    stepIn(threadId: number): TPromise<void>;
    stepOut(threadId: number): TPromise<void>;
    stepBack(threadId: number): TPromise<void>;
    continue(threadId: number): TPromise<void>;
    pause(threadId: number): TPromise<any>;
    restartFrame(frameId: number): TPromise<any>;
    private lazyTransitionToRunningState(threadId?);
    private getDebugStringEditorInput(source, value, mtype);
    private sendAllBreakpoints();
    private sendBreakpoints(modelUri, sourceModified?);
    private sendFunctionBreakpoints();
    private sendExceptionBreakpoints();
    private onFileChanges(fileChangesEvent);
    private store();
    dispose(): void;
}