/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
define(["require","exports","vs/base/common/strings","vs/editor/contrib/snippet/common/snippet","vs/editor/common/core/range"],function(t,e,o,i,n){"use strict";var r=function(){function t(t){this.emmetSupportedModes=["html","razor","css","less","sass","scss","stylus","xml","xsl","jade","handlebars","ejs","hbs","jsx","tsx","erb","php","twig"],this.editor=t,this._hasMadeEdits=!1}return t.prototype.isEmmetEnabledMode=function(){var t=this.getSyntax();return this.emmetSupportedModes.indexOf(t)!==-1},t.prototype.getSelectionRange=function(){var t=this.editor.getSelection();return{start:this.getOffsetFromPosition(t.getStartPosition()),end:this.getOffsetFromPosition(t.getEndPosition())}},t.prototype.getCurrentLineRange=function(){var t=this.editor.getSelection().startLineNumber;return{start:this.getOffsetFromPosition({lineNumber:t,column:1}),end:this.getOffsetFromPosition({lineNumber:t+1,column:1})}},t.prototype.getCaretPos=function(){var t=this.editor.getSelection().getStartPosition();return this.getOffsetFromPosition(t)},t.prototype.setCaretPos=function(t){this.createSelection(t)},t.prototype.getCurrentLine=function(){var t=this.editor.getSelection().getStartPosition();return this.editor.getModel().getLineContent(t.lineNumber)},t.prototype.onBeforeEmmetAction=function(){this._hasMadeEdits=!1},t.prototype.replaceContent=function(t,e,r,s){var u=this.getPositionFromOffset(e),p=this.getPositionFromOffset(r),a=this.editor.getModel().getLineContent(u.lineNumber).substr(0,u.column-1),l=a.match(/<[\/]?$/);if(l){if(!o.startsWith(t,l[0]))return;u={lineNumber:u.lineNumber,column:u.column-l[0].length}}this._hasMadeEdits||(this._hasMadeEdits=!0,this.editor.pushUndoStop());var c=new n.Range(u.lineNumber,u.column,p.lineNumber,p.column),d=i.CodeSnippet.convertExternalSnippet(t,i.ExternalSnippetType.EmmetSnippet),g=new i.CodeSnippet(d);i.getSnippetController(this.editor).runWithReplaceRange(g,c,!1)},t.prototype.onAfterEmmetAction=function(){this._hasMadeEdits&&this.editor.pushUndoStop()},t.prototype.getContent=function(){return this.editor.getModel().getValue()},t.prototype.createSelection=function(t,e){var o=this.getPositionFromOffset(t),i=null;i=e?this.getPositionFromOffset(e):o;var r=new n.Range(o.lineNumber,o.column,i.lineNumber,i.column);this.editor.setSelection(r),this.editor.revealRange(r)},t.prototype.getSyntax=function(){var t=this.editor.getSelection().getStartPosition(),e=this.editor.getModel().getModeIdAtPosition(t.lineNumber,t.column),o=e.split(".").pop();return/\b(razor|handlebars|erb|php|hbs|ejs|twig)\b/.test(o)?"html":/\b(typescriptreact|javascriptreact)\b/.test(o)?"jsx":"sass-indented"===o?"sass":o},t.prototype.getProfileName=function(){return null},t.prototype.prompt=function(t){},t.prototype.getSelection=function(){var t=this.editor.getSelection(),e=this.editor.getModel(),o=t.getStartPosition(),i=t.getEndPosition(),r=new n.Range(o.lineNumber,o.column,i.lineNumber,i.column);return e.getValueInRange(r)},t.prototype.getFilePath=function(){return this.editor.getModel().uri.fsPath},t.prototype.getPositionFromOffset=function(t){return this.editor.getModel().getPositionAt(t)},t.prototype.getOffsetFromPosition=function(t){return this.editor.getModel().getOffsetAt(t)},t}();e.EditorAccessor=r});