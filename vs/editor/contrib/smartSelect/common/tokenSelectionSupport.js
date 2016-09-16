var __decorate=this&&this.__decorate||function(e,t,o,n){var r,i=arguments.length,c=i<3?t:null===n?n=Object.getOwnPropertyDescriptor(t,o):n;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)c=Reflect.decorate(e,t,o,n);else for(var s=e.length-1;s>=0;s--)(r=e[s])&&(c=(i<3?r(c):i>3?r(t,o,c):r(t,o))||c);return i>3&&c&&Object.defineProperty(t,o,c),c},__param=this&&this.__param||function(e,t){return function(o,n){t(o,n,e)}};define(["require","exports","vs/base/common/winjs.base","vs/editor/common/core/range","vs/editor/common/services/modelService","./tokenTree"],function(e,t,o,n,r,i){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";var c=function(){function e(e){this._modelService=e}return e.prototype.getRangesToPosition=function(e,t){return o.TPromise.as(this.getRangesToPositionSync(e,t))},e.prototype.getRangesToPositionSync=function(e,t){var o=this._modelService.getModel(e),n=[];return o&&this._doGetRangesToPosition(o,t).forEach(function(e){n.push({type:void 0,range:e})}),n},e.prototype._doGetRangesToPosition=function(e,t){var o,r,c=i.build(e);o=i.find(c,t);for(var s=[];o;)r&&n.Range.equalsRange(r,o.range)||s.push(o.range),r=o.range,o=o.parent;return s=s.reverse()},e=__decorate([__param(0,r.IModelService)],e)}();t.TokenSelectionSupport=c});