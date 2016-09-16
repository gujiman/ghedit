define(["require","exports"],function(t,e){/*---------------------------------------------------------------------------------------------
     *  Copyright (c) Microsoft Corporation. All rights reserved.
     *  Licensed under the MIT License. See License.txt in the project root for license information.
     *--------------------------------------------------------------------------------------------*/
"use strict";var r=function(){function t(t){this._source=t,this.sourceLength=t.length,this._pos=0,this.whitespace="\t  ",this.whitespaceArr=this.stringToArray(this.whitespace),this.separators="",this.separatorsArr=this.stringToArray(this.separators),this.tokenStart=-1,this.tokenEnd=-1}return t.prototype.stringToArray=function(e){return t.STRING_TO_ARRAY_CACHE.hasOwnProperty(e)||(t.STRING_TO_ARRAY_CACHE[e]=this.actualStringToArray(e)),t.STRING_TO_ARRAY_CACHE[e]},t.prototype.actualStringToArray=function(t){for(var e=0,r=0;r<t.length;r++)e=Math.max(e,t.charCodeAt(r));for(var n=[],r=0;r<=e;r++)n[r]=!1;for(var r=0;r<t.length;r++)n[t.charCodeAt(r)]=!0;return n},t.prototype.pos=function(){return this._pos},t.prototype.eos=function(){return this._pos>=this.sourceLength},t.prototype.peek=function(){if(this._pos>=this.sourceLength)throw new Error("Stream is at the end");return this._source[this._pos]},t.prototype.next=function(){if(this._pos>=this.sourceLength)throw new Error("Stream is at the end");return this.tokenStart=-1,this.tokenEnd=-1,this._source[this._pos++]},t.prototype.next2=function(){if(this._pos>=this.sourceLength)throw new Error("Stream is at the end");this.tokenStart=-1,this.tokenEnd=-1,this._pos++},t.prototype.advance=function(t){if(0===t)return"";var e=this._pos;return this._pos+=t,this.tokenStart=-1,this.tokenEnd=-1,this._source.substring(e,this._pos)},t.prototype._advance2=function(t){return 0===t?t:(this._pos+=t,this.tokenStart=-1,this.tokenEnd=-1,t)},t.prototype.advanceToEOS=function(){var t=this._pos;return this._pos=this.sourceLength,this.resetPeekedToken(),this._source.substring(t,this._pos)},t.prototype.goBack=function(t){this._pos-=t,this.resetPeekedToken()},t.prototype.createPeeker=function(t){var e=this;if(t instanceof RegExp)return function(){var r=t.exec(e._source.substr(e._pos));if(null===r)return 0;if(0!==r.index)throw new Error('Regular expression must begin with the character "^"');return r[0].length};if((t instanceof String||"string"==typeof t)&&t)return function(){for(var r=t.length,n=e._pos+r<=e.sourceLength,s=0;n&&s<r;s++)n=e._source.charCodeAt(e._pos+s)===t.charCodeAt(s);return n?r:0};throw new Error("Condition must be either a regular expression, function or a non-empty string")},t.prototype._advanceIfStringCaseInsensitive=function(t){var e,r=this._pos,n=this._source,s=t.length;if(s<1||r+s>this.sourceLength)return 0;for(e=0;e<s;e++)if(n.charAt(r+e).toLowerCase()!==t.charAt(e).toLowerCase())return 0;return s},t.prototype.advanceIfStringCaseInsensitive=function(t){return this.advance(this._advanceIfStringCaseInsensitive(t))},t.prototype.advanceIfStringCaseInsensitive2=function(t){return this._advance2(this._advanceIfStringCaseInsensitive(t))},t.prototype._advanceIfString=function(t){var e,r=this._pos,n=this._source,s=t.length;if(s<1||r+s>this.sourceLength)return 0;for(e=0;e<s;e++)if(n.charCodeAt(r+e)!==t.charCodeAt(e))return 0;return s},t.prototype.advanceIfString=function(t){return this.advance(this._advanceIfString(t))},t.prototype.advanceIfString2=function(t){return this._advance2(this._advanceIfString(t))},t.prototype._advanceIfCharCode=function(t){return this._pos<this.sourceLength&&this._source.charCodeAt(this._pos)===t?1:0},t.prototype.advanceIfCharCode=function(t){return this.advance(this._advanceIfCharCode(t))},t.prototype.advanceIfCharCode2=function(t){return this._advance2(this._advanceIfCharCode(t))},t.prototype._advanceIfRegExp=function(t){return this._pos>=this.sourceLength?0:t.test(this._source.substr(this._pos))?RegExp.lastMatch.length:0},t.prototype.advanceIfRegExp=function(t){return this.advance(this._advanceIfRegExp(t))},t.prototype.advanceIfRegExp2=function(t){return this._advance2(this._advanceIfRegExp(t))},t.prototype.advanceLoop=function(t,e,r){if(this.eos())return"";var n=this.createPeeker(t),s=this._pos,o=0,i=null;for(i=e?function(t){return t>0}:function(t){return 0===t};!this.eos()&&i(o=n());)o>0?this.advance(o):this.next();return r&&!this.eos()&&this.advance(o),this._source.substring(s,this._pos)},t.prototype.advanceWhile=function(t){return this.advanceLoop(t,!0,!1)},t.prototype.advanceUntil=function(t,e){return this.advanceLoop(t,!1,e)},t.prototype._advanceUntilString=function(t,e){if(this.eos()||0===t.length)return 0;var r=this._pos,n=this._source.indexOf(t,r);return n===-1?this.sourceLength-r:e?n+t.length-r:n-r},t.prototype.advanceUntilString=function(t,e){return this.advance(this._advanceUntilString(t,e))},t.prototype.advanceUntilString2=function(t,e){return this._advance2(this._advanceUntilString(t,e))},t.prototype.resetPeekedToken=function(){this.tokenStart=-1,this.tokenEnd=-1},t.prototype.setTokenRules=function(t,e){this.separators===t&&this.whitespace===e||(this.separators=t,this.separatorsArr=this.stringToArray(this.separators),this.whitespace=e,this.whitespaceArr=this.stringToArray(this.whitespace),this.resetPeekedToken())},t.prototype.peekToken=function(){if(this.tokenStart!==-1)return this._source.substring(this.tokenStart,this.tokenEnd);var t=this._source,e=this.sourceLength,r=this.whitespaceArr,n=this.separatorsArr,s=this._pos;if(s>=e)throw new Error("Stream is at the end");for(;r[t.charCodeAt(s)]&&s<e;)s++;var o=s;if(n[t.charCodeAt(o)]&&o<e)o++;else for(;!n[t.charCodeAt(o)]&&!r[t.charCodeAt(o)]&&o<e;)o++;return this.tokenStart=s,this.tokenEnd=o,t.substring(s,o)},t.prototype.nextToken=function(){if(this._pos>=this.sourceLength)throw new Error("Stream is at the end");var t;return t=this.tokenStart===-1?this.peekToken():this._source.substring(this.tokenStart,this.tokenEnd),this._pos=this.tokenEnd,this.tokenStart=-1,this.tokenEnd=-1,t},t.prototype.peekWhitespace=function(){for(var t=this._source,e=this.sourceLength,r=this.whitespaceArr,n=this._pos;r[t.charCodeAt(n)]&&n<e;)n++;return t.substring(this._pos,n)},t.prototype._skipWhitespace=function(){for(var t=this._source,e=this.sourceLength,r=this.whitespaceArr,n=this._pos,s=this._pos;r[t.charCodeAt(s)]&&s<e;)s++;return s-n},t.prototype.skipWhitespace=function(){return this.advance(this._skipWhitespace())},t.prototype.skipWhitespace2=function(){return this._advance2(this._skipWhitespace())},t.STRING_TO_ARRAY_CACHE={},t}();e.LineStream=r});