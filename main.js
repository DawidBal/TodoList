(()=>{"use strict";function e(e,t){if(t.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+t.length+" present")}function t(t){e(1,arguments);var n=Object.prototype.toString.call(t);return t instanceof Date||"object"==typeof t&&"[object Date]"===n?new Date(t.getTime()):"number"==typeof t||"[object Number]"===n?new Date(t):("string"!=typeof t&&"[object String]"!==n||"undefined"==typeof console||(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"),console.warn((new Error).stack)),new Date(NaN))}function n(n){e(1,arguments);var r=t(n);return!isNaN(r)}var r={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}};function a(e){return function(t){var n=t||{},r=n.width?String(n.width):e.defaultWidth;return e.formats[r]||e.formats[e.defaultWidth]}}var o,i={date:a({formats:{full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},defaultWidth:"full"}),time:a({formats:{full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},defaultWidth:"full"}),dateTime:a({formats:{full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},defaultWidth:"full"})},s={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"};function u(e){return function(t,n){var r,a=n||{};if("formatting"===(a.context?String(a.context):"standalone")&&e.formattingValues){var o=e.defaultFormattingWidth||e.defaultWidth,i=a.width?String(a.width):o;r=e.formattingValues[i]||e.formattingValues[o]}else{var s=e.defaultWidth,u=a.width?String(a.width):e.defaultWidth;r=e.values[u]||e.values[s]}return r[e.argumentCallback?e.argumentCallback(t):t]}}function c(e){return function(t,n){var r=String(t),a=n||{},o=a.width,i=o&&e.matchPatterns[o]||e.matchPatterns[e.defaultMatchWidth],s=r.match(i);if(!s)return null;var u,c=s[0],d=o&&e.parsePatterns[o]||e.parsePatterns[e.defaultParseWidth];return u="[object Array]"===Object.prototype.toString.call(d)?function(e,t){for(var n=0;n<e.length;n++)if(e[n].test(c))return n}(d):function(e,t){for(var n in e)if(e.hasOwnProperty(n)&&e[n].test(c))return n}(d),u=e.valueCallback?e.valueCallback(u):u,{value:u=a.valueCallback?a.valueCallback(u):u,rest:r.slice(c.length)}}}const d={code:"en-US",formatDistance:function(e,t,n){var a;return n=n||{},a="string"==typeof r[e]?r[e]:1===t?r[e].one:r[e].other.replace("{{count}}",t),n.addSuffix?n.comparison>0?"in "+a:a+" ago":a},formatLong:i,formatRelative:function(e,t,n,r){return s[e]},localize:{ordinalNumber:function(e,t){var n=Number(e),r=n%100;if(r>20||r<10)switch(r%10){case 1:return n+"st";case 2:return n+"nd";case 3:return n+"rd"}return n+"th"},era:u({values:{narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},defaultWidth:"wide"}),quarter:u({values:{narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},defaultWidth:"wide",argumentCallback:function(e){return Number(e)-1}}),month:u({values:{narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},defaultWidth:"wide"}),day:u({values:{narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},defaultWidth:"wide"}),dayPeriod:u({values:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},defaultWidth:"wide",formattingValues:{narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},defaultFormattingWidth:"wide"})},match:{ordinalNumber:(o={matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:function(e){return parseInt(e,10)}},function(e,t){var n=String(e),r=t||{},a=n.match(o.matchPattern);if(!a)return null;var i=a[0],s=n.match(o.parsePattern);if(!s)return null;var u=o.valueCallback?o.valueCallback(s[0]):s[0];return{value:u=r.valueCallback?r.valueCallback(u):u,rest:n.slice(i.length)}}),era:c({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:"wide",parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:"any"}),quarter:c({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:"wide",parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:"any",valueCallback:function(e){return e+1}}),month:c({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:"any"}),day:c({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:"wide",parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:"any"}),dayPeriod:c({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:"any",parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:"any"})},options:{weekStartsOn:0,firstWeekContainsDate:1}};function l(e){if(null===e||!0===e||!1===e)return NaN;var t=Number(e);return isNaN(t)?t:t<0?Math.ceil(t):Math.floor(t)}function h(n,r){e(2,arguments);var a=t(n).getTime(),o=l(r);return new Date(a+o)}function m(t,n){e(2,arguments);var r=l(n);return h(t,-r)}function f(e,t){for(var n=e<0?"-":"",r=Math.abs(e).toString();r.length<t;)r="0"+r;return n+r}const g=function(e,t){var n=e.getUTCFullYear(),r=n>0?n:1-n;return f("yy"===t?r%100:r,t.length)},w=function(e,t){var n=e.getUTCMonth();return"M"===t?String(n+1):f(n+1,2)},v=function(e,t){return f(e.getUTCDate(),t.length)},b=function(e,t){return f(e.getUTCHours()%12||12,t.length)},y=function(e,t){return f(e.getUTCHours(),t.length)},p=function(e,t){return f(e.getUTCMinutes(),t.length)},T=function(e,t){return f(e.getUTCSeconds(),t.length)},M=function(e,t){var n=t.length,r=e.getUTCMilliseconds();return f(Math.floor(r*Math.pow(10,n-3)),t.length)};var k=864e5;function C(n){e(1,arguments);var r=1,a=t(n),o=a.getUTCDay(),i=(o<r?7:0)+o-r;return a.setUTCDate(a.getUTCDate()-i),a.setUTCHours(0,0,0,0),a}function x(n){e(1,arguments);var r=t(n),a=r.getUTCFullYear(),o=new Date(0);o.setUTCFullYear(a+1,0,4),o.setUTCHours(0,0,0,0);var i=C(o),s=new Date(0);s.setUTCFullYear(a,0,4),s.setUTCHours(0,0,0,0);var u=C(s);return r.getTime()>=i.getTime()?a+1:r.getTime()>=u.getTime()?a:a-1}function P(t){e(1,arguments);var n=x(t),r=new Date(0);r.setUTCFullYear(n,0,4),r.setUTCHours(0,0,0,0);var a=C(r);return a}var D=6048e5;function j(n,r){e(1,arguments);var a=r||{},o=a.locale,i=o&&o.options&&o.options.weekStartsOn,s=null==i?0:l(i),u=null==a.weekStartsOn?s:l(a.weekStartsOn);if(!(u>=0&&u<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var c=t(n),d=c.getUTCDay(),h=(d<u?7:0)+d-u;return c.setUTCDate(c.getUTCDate()-h),c.setUTCHours(0,0,0,0),c}function S(n,r){e(1,arguments);var a=t(n,r),o=a.getUTCFullYear(),i=r||{},s=i.locale,u=s&&s.options&&s.options.firstWeekContainsDate,c=null==u?1:l(u),d=null==i.firstWeekContainsDate?c:l(i.firstWeekContainsDate);if(!(d>=1&&d<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var h=new Date(0);h.setUTCFullYear(o+1,0,d),h.setUTCHours(0,0,0,0);var m=j(h,r),f=new Date(0);f.setUTCFullYear(o,0,d),f.setUTCHours(0,0,0,0);var g=j(f,r);return a.getTime()>=m.getTime()?o+1:a.getTime()>=g.getTime()?o:o-1}function E(t,n){e(1,arguments);var r=n||{},a=r.locale,o=a&&a.options&&a.options.firstWeekContainsDate,i=null==o?1:l(o),s=null==r.firstWeekContainsDate?i:l(r.firstWeekContainsDate),u=S(t,n),c=new Date(0);c.setUTCFullYear(u,0,s),c.setUTCHours(0,0,0,0);var d=j(c,n);return d}var U=6048e5;function q(e,t){var n=e>0?"-":"+",r=Math.abs(e),a=Math.floor(r/60),o=r%60;if(0===o)return n+String(a);var i=t||"";return n+String(a)+i+f(o,2)}function W(e,t){return e%60==0?(e>0?"-":"+")+f(Math.abs(e)/60,2):N(e,t)}function N(e,t){var n=t||"",r=e>0?"-":"+",a=Math.abs(e);return r+f(Math.floor(a/60),2)+n+f(a%60,2)}const O={G:function(e,t,n){var r=e.getUTCFullYear()>0?1:0;switch(t){case"G":case"GG":case"GGG":return n.era(r,{width:"abbreviated"});case"GGGGG":return n.era(r,{width:"narrow"});case"GGGG":default:return n.era(r,{width:"wide"})}},y:function(e,t,n){if("yo"===t){var r=e.getUTCFullYear(),a=r>0?r:1-r;return n.ordinalNumber(a,{unit:"year"})}return g(e,t)},Y:function(e,t,n,r){var a=S(e,r),o=a>0?a:1-a;return"YY"===t?f(o%100,2):"Yo"===t?n.ordinalNumber(o,{unit:"year"}):f(o,t.length)},R:function(e,t){return f(x(e),t.length)},u:function(e,t){return f(e.getUTCFullYear(),t.length)},Q:function(e,t,n){var r=Math.ceil((e.getUTCMonth()+1)/3);switch(t){case"Q":return String(r);case"QQ":return f(r,2);case"Qo":return n.ordinalNumber(r,{unit:"quarter"});case"QQQ":return n.quarter(r,{width:"abbreviated",context:"formatting"});case"QQQQQ":return n.quarter(r,{width:"narrow",context:"formatting"});case"QQQQ":default:return n.quarter(r,{width:"wide",context:"formatting"})}},q:function(e,t,n){var r=Math.ceil((e.getUTCMonth()+1)/3);switch(t){case"q":return String(r);case"qq":return f(r,2);case"qo":return n.ordinalNumber(r,{unit:"quarter"});case"qqq":return n.quarter(r,{width:"abbreviated",context:"standalone"});case"qqqqq":return n.quarter(r,{width:"narrow",context:"standalone"});case"qqqq":default:return n.quarter(r,{width:"wide",context:"standalone"})}},M:function(e,t,n){var r=e.getUTCMonth();switch(t){case"M":case"MM":return w(e,t);case"Mo":return n.ordinalNumber(r+1,{unit:"month"});case"MMM":return n.month(r,{width:"abbreviated",context:"formatting"});case"MMMMM":return n.month(r,{width:"narrow",context:"formatting"});case"MMMM":default:return n.month(r,{width:"wide",context:"formatting"})}},L:function(e,t,n){var r=e.getUTCMonth();switch(t){case"L":return String(r+1);case"LL":return f(r+1,2);case"Lo":return n.ordinalNumber(r+1,{unit:"month"});case"LLL":return n.month(r,{width:"abbreviated",context:"standalone"});case"LLLLL":return n.month(r,{width:"narrow",context:"standalone"});case"LLLL":default:return n.month(r,{width:"wide",context:"standalone"})}},w:function(n,r,a,o){var i=function(n,r){e(1,arguments);var a=t(n),o=j(a,r).getTime()-E(a,r).getTime();return Math.round(o/U)+1}(n,o);return"wo"===r?a.ordinalNumber(i,{unit:"week"}):f(i,r.length)},I:function(n,r,a){var o=function(n){e(1,arguments);var r=t(n),a=C(r).getTime()-P(r).getTime();return Math.round(a/D)+1}(n);return"Io"===r?a.ordinalNumber(o,{unit:"week"}):f(o,r.length)},d:function(e,t,n){return"do"===t?n.ordinalNumber(e.getUTCDate(),{unit:"date"}):v(e,t)},D:function(n,r,a){var o=function(n){e(1,arguments);var r=t(n),a=r.getTime();r.setUTCMonth(0,1),r.setUTCHours(0,0,0,0);var o=r.getTime(),i=a-o;return Math.floor(i/k)+1}(n);return"Do"===r?a.ordinalNumber(o,{unit:"dayOfYear"}):f(o,r.length)},E:function(e,t,n){var r=e.getUTCDay();switch(t){case"E":case"EE":case"EEE":return n.day(r,{width:"abbreviated",context:"formatting"});case"EEEEE":return n.day(r,{width:"narrow",context:"formatting"});case"EEEEEE":return n.day(r,{width:"short",context:"formatting"});case"EEEE":default:return n.day(r,{width:"wide",context:"formatting"})}},e:function(e,t,n,r){var a=e.getUTCDay(),o=(a-r.weekStartsOn+8)%7||7;switch(t){case"e":return String(o);case"ee":return f(o,2);case"eo":return n.ordinalNumber(o,{unit:"day"});case"eee":return n.day(a,{width:"abbreviated",context:"formatting"});case"eeeee":return n.day(a,{width:"narrow",context:"formatting"});case"eeeeee":return n.day(a,{width:"short",context:"formatting"});case"eeee":default:return n.day(a,{width:"wide",context:"formatting"})}},c:function(e,t,n,r){var a=e.getUTCDay(),o=(a-r.weekStartsOn+8)%7||7;switch(t){case"c":return String(o);case"cc":return f(o,t.length);case"co":return n.ordinalNumber(o,{unit:"day"});case"ccc":return n.day(a,{width:"abbreviated",context:"standalone"});case"ccccc":return n.day(a,{width:"narrow",context:"standalone"});case"cccccc":return n.day(a,{width:"short",context:"standalone"});case"cccc":default:return n.day(a,{width:"wide",context:"standalone"})}},i:function(e,t,n){var r=e.getUTCDay(),a=0===r?7:r;switch(t){case"i":return String(a);case"ii":return f(a,t.length);case"io":return n.ordinalNumber(a,{unit:"day"});case"iii":return n.day(r,{width:"abbreviated",context:"formatting"});case"iiiii":return n.day(r,{width:"narrow",context:"formatting"});case"iiiiii":return n.day(r,{width:"short",context:"formatting"});case"iiii":default:return n.day(r,{width:"wide",context:"formatting"})}},a:function(e,t,n){var r=e.getUTCHours()/12>=1?"pm":"am";switch(t){case"a":case"aa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"aaa":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return n.dayPeriod(r,{width:"narrow",context:"formatting"});case"aaaa":default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},b:function(e,t,n){var r,a=e.getUTCHours();switch(r=12===a?"noon":0===a?"midnight":a/12>=1?"pm":"am",t){case"b":case"bb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"bbb":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return n.dayPeriod(r,{width:"narrow",context:"formatting"});case"bbbb":default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},B:function(e,t,n){var r,a=e.getUTCHours();switch(r=a>=17?"evening":a>=12?"afternoon":a>=4?"morning":"night",t){case"B":case"BB":case"BBB":return n.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"BBBBB":return n.dayPeriod(r,{width:"narrow",context:"formatting"});case"BBBB":default:return n.dayPeriod(r,{width:"wide",context:"formatting"})}},h:function(e,t,n){if("ho"===t){var r=e.getUTCHours()%12;return 0===r&&(r=12),n.ordinalNumber(r,{unit:"hour"})}return b(e,t)},H:function(e,t,n){return"Ho"===t?n.ordinalNumber(e.getUTCHours(),{unit:"hour"}):y(e,t)},K:function(e,t,n){var r=e.getUTCHours()%12;return"Ko"===t?n.ordinalNumber(r,{unit:"hour"}):f(r,t.length)},k:function(e,t,n){var r=e.getUTCHours();return 0===r&&(r=24),"ko"===t?n.ordinalNumber(r,{unit:"hour"}):f(r,t.length)},m:function(e,t,n){return"mo"===t?n.ordinalNumber(e.getUTCMinutes(),{unit:"minute"}):p(e,t)},s:function(e,t,n){return"so"===t?n.ordinalNumber(e.getUTCSeconds(),{unit:"second"}):T(e,t)},S:function(e,t){return M(e,t)},X:function(e,t,n,r){var a=(r._originalDate||e).getTimezoneOffset();if(0===a)return"Z";switch(t){case"X":return W(a);case"XXXX":case"XX":return N(a);case"XXXXX":case"XXX":default:return N(a,":")}},x:function(e,t,n,r){var a=(r._originalDate||e).getTimezoneOffset();switch(t){case"x":return W(a);case"xxxx":case"xx":return N(a);case"xxxxx":case"xxx":default:return N(a,":")}},O:function(e,t,n,r){var a=(r._originalDate||e).getTimezoneOffset();switch(t){case"O":case"OO":case"OOO":return"GMT"+q(a,":");case"OOOO":default:return"GMT"+N(a,":")}},z:function(e,t,n,r){var a=(r._originalDate||e).getTimezoneOffset();switch(t){case"z":case"zz":case"zzz":return"GMT"+q(a,":");case"zzzz":default:return"GMT"+N(a,":")}},t:function(e,t,n,r){var a=r._originalDate||e;return f(Math.floor(a.getTime()/1e3),t.length)},T:function(e,t,n,r){return f((r._originalDate||e).getTime(),t.length)}};function Y(e,t){switch(e){case"P":return t.date({width:"short"});case"PP":return t.date({width:"medium"});case"PPP":return t.date({width:"long"});case"PPPP":default:return t.date({width:"full"})}}function L(e,t){switch(e){case"p":return t.time({width:"short"});case"pp":return t.time({width:"medium"});case"ppp":return t.time({width:"long"});case"pppp":default:return t.time({width:"full"})}}const A={p:L,P:function(e,t){var n,r=e.match(/(P+)(p+)?/),a=r[1],o=r[2];if(!o)return Y(e,t);switch(a){case"P":n=t.dateTime({width:"short"});break;case"PP":n=t.dateTime({width:"medium"});break;case"PPP":n=t.dateTime({width:"long"});break;case"PPPP":default:n=t.dateTime({width:"full"})}return n.replace("{{date}}",Y(a,t)).replace("{{time}}",L(o,t))}};function F(e){var t=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds()));return t.setUTCFullYear(e.getFullYear()),e.getTime()-t.getTime()}var z=["D","DD"],H=["YY","YYYY"];function X(e){return-1!==z.indexOf(e)}function B(e){return-1!==H.indexOf(e)}function Q(e,t,n){if("YYYY"===e)throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(t,"`) for formatting years to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("YY"===e)throw new RangeError("Use `yy` instead of `YY` (in `".concat(t,"`) for formatting years to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("D"===e)throw new RangeError("Use `d` instead of `D` (in `".concat(t,"`) for formatting days of the month to the input `").concat(n,"`; see: https://git.io/fxCyr"));if("DD"===e)throw new RangeError("Use `dd` instead of `DD` (in `".concat(t,"`) for formatting days of the month to the input `").concat(n,"`; see: https://git.io/fxCyr"))}var G=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,_=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,R=/^'([^]*?)'?$/,$=/''/g,I=/[a-zA-Z]/;function J(r,a,o){e(2,arguments);var i=String(a),s=o||{},u=s.locale||d,c=u.options&&u.options.firstWeekContainsDate,h=null==c?1:l(c),f=null==s.firstWeekContainsDate?h:l(s.firstWeekContainsDate);if(!(f>=1&&f<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var g=u.options&&u.options.weekStartsOn,w=null==g?0:l(g),v=null==s.weekStartsOn?w:l(s.weekStartsOn);if(!(v>=0&&v<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");if(!u.localize)throw new RangeError("locale must contain localize property");if(!u.formatLong)throw new RangeError("locale must contain formatLong property");var b=t(r);if(!n(b))throw new RangeError("Invalid time value");var y=F(b),p=m(b,y),T={firstWeekContainsDate:f,weekStartsOn:v,locale:u,_originalDate:b},M=i.match(_).map((function(e){var t=e[0];return"p"===t||"P"===t?(0,A[t])(e,u.formatLong,T):e})).join("").match(G).map((function(e){if("''"===e)return"'";var t=e[0];if("'"===t)return V(e);var n=O[t];if(n)return!s.useAdditionalWeekYearTokens&&B(e)&&Q(e,a,r),!s.useAdditionalDayOfYearTokens&&X(e)&&Q(e,a,r),n(p,e,u.localize,T);if(t.match(I))throw new RangeError("Format string contains an unescaped latin alphabet character `"+t+"`");return e})).join("");return M}function V(e){return e.match(R)[1].replace($,"'")}const K=(()=>{const e=["Inbox"];let t="Inbox";const n=t=>e.includes(t);return{getActiveProject:()=>t,setActiveProject:e=>{if(!n(e))throw new Error("Missing project!");t=e},addNewProject:t=>{t.preventDefault();const r=t.target.querySelector("input").value;n(r)?ee.printMessage(`Project ${r} is already created`,ee.types.Error):(e.push(r),ee.showNewProject(r),ee.setNewTaskOption(r),ee.removeProjectForm(),t.target.reset())},getAllProjects:()=>e,removeProject:t=>{e.splice(e.indexOf(t),1)},getDefaultProject:()=>"Inbox",renameProject:(t,n)=>{e[e.indexOf(t)]=n}}})(),Z=(()=>{const e=[];let t=[];const n=()=>t;return{tasks:e,addNewTask:n=>{n.preventDefault();const r=(a=new FormData(n.target),(({title:e,notes:t,priority:n,project:r,endDate:a=""})=>{const o={title:e,notes:t,priority:n,project:r,startDate:J(new Date,"yyyy-MM-dd"),endDate:a,completed:!1};return Object.assign({},o)})(Object.fromEntries(a)));var a,o;o=r,e.push(o),r.project===K.getActiveProject()&&(ee.showTask(r,e.indexOf(r)),t.push(r)),n.target.reset()},removeTask:t=>{if(!t.target.matches("button"))return;const r=t.target.parentNode.dataset.index;e.splice(r,1),ee.removeTaskElement(r),ee.showTasks(n())},getTasksByProject:t=>e.filter((e=>e.project===t)),saveActiveTasks:e=>{t=Array.from(e)},getActiveTasks:n,changeTasksProject:(e,t)=>{e.forEach((e=>e.project=t))}}})();const ee=(()=>{const n=document.querySelector(".js-todo-from"),r=document.querySelector(".js-tasklist"),a=document.querySelector(".js-showTaskForm"),o=document.querySelector(".js-cancelTaskForm"),i=document.querySelector(".js-project-from"),s=document.querySelector(".js-project-list"),u=document.querySelector(".js-projects"),c=document.querySelector(".js-showProjectForm"),d=document.querySelector(".js-cancelProjForm"),l=document.querySelector(".js-inbox"),h=document.querySelector(".js-today"),m=document.querySelector(".js-tomorrow"),f=document.querySelector(".js-printMsg"),g=K.getDefaultProject(),w=(e,t)=>{const n=document.createElement("div");return n.setAttribute("data-index",t),n.classList.add(`priority-${e.priority}`),n.innerHTML=`<h2>${e.title}</h2>\n            <label for="task-${t}"></label>\n            <input type="checkbox" data-index="${t}" id="task-${t}" \n            ${!0===e.completed?"disabled":""}>\n            <button>X</button>`,n},v=e=>{L(r),Z.saveActiveTasks(e),e.forEach((e=>{const t=Z.tasks.indexOf(e);if(-1===t)return;const n=w(e,t);r.append(n)}))},b=(e,t)=>{M(t,"btn--active"),A(t.target.textContent);const n=Z.tasks.filter((t=>new Date(t.endDate).getDate()-e.getDate()==0));v(n)},y=e=>{const t=document.createElement("option");return t.setAttribute("value",e),t.textContent=e,t},p=()=>{K.getAllProjects().forEach((e=>{u.append(y(e))}))},T=e=>{const t=document.createElement("button");return t.classList.add("c-projects__item"),t.classList.add("btn"),t.setAttribute("data-action","change"),t.innerHTML=`${e}<div class="c-projects__icons">\n      <button class="btn btn--project" data-action="remove">\n        <svg class="icon icon--project" data-action="remove" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path data-action="remove" d="M9 3h6v-1.75c0-.066-.026-.13-.073-.177-.047-.047-.111-.073-.177-.073h-5.5c-.066 0-.13.026-.177.073-.047.047-.073.111-.073.177v1.75zm11 1h-16v18c0 .552.448 1 1 1h14c.552 0 1-.448 1-1v-18zm-10 3.5c0-.276-.224-.5-.5-.5s-.5.224-.5.5v12c0 .276.224.5.5.5s.5-.224.5-.5v-12zm5 0c0-.276-.224-.5-.5-.5s-.5.224-.5.5v12c0 .276.224.5.5.5s.5-.224.5-.5v-12zm8-4.5v1h-2v18c0 1.105-.895 2-2 2h-14c-1.105 0-2-.895-2-2v-18h-2v-1h7v-2c0-.552.448-1 1-1h6c.552 0 1 .448 1 1v2h7z"/></svg>\n      </button>\n    </div>`,t},M=(e,t)=>{(e=>{document.querySelectorAll(`.${e}`).forEach((t=>t.classList.remove(e)))})(t),((e,t)=>{e.target.classList.add(t)})(e,t)},k=e=>{switch(e.target.dataset.action){case"change":x(e);break;case"remove":C(e)}},C=e=>{const t=e.target.closest(".c-projects__item"),n=t.childNodes[0].nodeValue,r=Z.getTasksByProject(n);K.removeProject(n),A(g),K.setActiveProject(g),Z.changeTasksProject(r,g),O(t,175,"fade-out"),N(t,175)},x=e=>{const t=e.target.childNodes[0].nodeValue;M(e,"btn--active"),K.setActiveProject(t),A(t),(e=>{u.querySelectorAll("option").forEach((t=>t.value===e?t.setAttribute("selected",""):t.removeAttribute("selected")))})(t),v(Z.getTasksByProject(t))},P=()=>E(i,c),D=()=>U(i,c),j=()=>E(n,a),S=()=>U(n,a),E=(e,t)=>{e.parentElement.style.display="block",t.style.display="none"},U=(e,t)=>{e.parentElement.style.display="none",t.style.display="flex"},q=()=>{var u,f,g,w,v;n.addEventListener("submit",Z.addNewTask),r.addEventListener("click",Z.removeTask),a.addEventListener("click",j),o.addEventListener("click",S),i.addEventListener("submit",K.addNewProject),s.addEventListener("click",k),c.addEventListener("click",P),d.addEventListener("click",D),l.addEventListener("click",x),h.addEventListener("click",b.bind(null,function(n){e(1,arguments);var r=t(n);return r.setHours(0,0,0,0),r}(Date.now()))),m.addEventListener("click",b.bind(null,(f=(u=new Date).getFullYear(),g=u.getMonth(),w=u.getDate(),(v=new Date(0)).setFullYear(f,g,w+1),v.setHours(0,0,0,0),v)))},W={Error:"Error",Success:"Success"},N=(e,t)=>{setTimeout((()=>(e=>e.parentElement.removeChild(e))(e)),t)},O=(e,t=1e3,n)=>{let r;return function(){clearTimeout(r),e.classList.add(n),r=setTimeout((()=>{e.classList.remove(n)}),t)}},Y=O(f,1500,"fadeIn-up"),L=e=>e.innerHTML="",A=e=>{document.querySelector(".js-tasklist__title").textContent=e};return{taskForm:n,taskList:r,showTasks:v,showTask:(e,t)=>r.append(w(e,t)),removeTaskElement:e=>{document.querySelector(`[data-index="${e}"`).remove()},showNewProject:e=>s.append(T(e)),init:()=>{L(s),K.getAllProjects().forEach((e=>{e!==g&&s.append(T(e))})),p(),q(),document.querySelector(".js-date").setAttribute("value",J(new Date,"yyyy-MM-dd"))},setTaskFormOptions:p,setNewTaskOption:e=>u.append(y(e)),removeProjectForm:D,printMessage:(e,t)=>{f.style.cssText=t===W.Error?"--printMsgColor: var(--secondary);--printTextColor: var(--white)":"--printMsgColor: var(--main);--printTextColor: var(--bg)",f.textContent=e,Y()},types:W}})();ee.init()})();