/*
 * timeInput 0.0.1
 * Quick, intelligent time entry
 * https://github.com/bmuenzenmeyer/timeInput#readme
 *
 * Copyright 2016, Roydan Enterprises
 * Released under the MIT license.
*/

!function(r){r.fn.timeInput=function(){function t(r){if(!r)return void 0;var t=8,n=r.trim().match(/^(\d{1,2})(?::)*([0-5][0-9])?\s*((P|A)(?:M)?)?$/i);if(null===n)return null;var u=Number(n[1]),i=n[2]?Number(n[2]):0,a=n[4];if(u>12&&a||u>23)return null;!a&&12>u&&u>0&&t>u&&(u+=12),12>u&&u>0&&a&&"P"===a.toUpperCase()&&(u+=12),12===u&&a&&"A"===a.toUpperCase()&&(u=0);var e=u.toString(),o=i.toString();return 10>u&&(e="0"+e),10>i&&"00"!==i&&(o="0"+o),e+":"+o+":00"}function n(r){if(!r)return void 0;var t=r.trim().match(/^(\d{2})(?::)(\d{2})(?::)?(\d{2})?$/i);if(null===t)return null;var n=Number(t[1]),u=Number(t[2]),i="am";return n>=12&&(i="pm",n=12===n?12:n-12),0===n&&(n=12),n+":"+(10>u?"0"+u:u)+" "+i.toUpperCase()}function u(r){var u=r.val(),i="";i=u?t(u):r.attr("data-time");var a=n(i);r.attr("data-time",i).val(a).change()}return this.each(function(){var t=r(this);t.on("blur",function(r){u(t)}),u(t)})}}(jQuery);