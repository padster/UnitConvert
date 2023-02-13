'use strict'

// Thanks https://github.com/jkroso/parse-duration

var durationRE = /(-?(?:\d+\.?\d*|\d*\.?\d+)(?:e[-+]?\d+)?)\s*([\p{L}]*)/uig

/**
 * conversion ratios
 */
let parse = {}

parse.nanosecond =
parse.ns = 1 / 1e6

parse['µs'] =
parse['μs'] =
parse.us =
parse.microsecond = 1 / 1e3

parse.millisecond =
parse.ms =
parse[''] = 1

parse.second =
parse.sec =
parse.s = parse.ms * 1000

parse.minute =
parse.min =
parse.m = parse.s * 60

parse.hour =
parse.hr =
parse.h = parse.m * 60

parse.day =
parse.d = parse.h * 24

parse.week =
parse.wk =
parse.w = parse.d * 7

parse.month =
parse.b =
parse.d * (365.25 / 12)

parse.year =
parse.yr =
parse.y = parse.d * 365.25

/**
 * convert `str` to ms
 *
 * @param {String} str
 * @param {String} format
 * @return {Number}
 */

function parseDuration(str='', format='ms'){
  var result = null
  // ignore commas/placeholders
  str = (str+'').replace(/(\d)[,_](\d)/g, '$1$2')
  str.replace(durationRE, function(_, n, units){
    units = unitRatio(units)
    if (units) result = (result || 0) + parseFloat(n, 10) * units
  })

  return result && (result / (unitRatio(format) || 1))
}

function unitRatio(str) {
  return parse[str] || parse[str.toLowerCase().replace(/s$/, '')]
}


// Thanks https://stackoverflow.com/questions/19700283/how-to-convert-time-in-milliseconds-to-hours-min-sec-format-in-javascript
function fmtDuration(ms) {
  let seconds = (ms / 1000).toFixed(1);
  let minutes = (ms / (1000 * 60)).toFixed(1);
  let hours = (ms / (1000 * 60 * 60)).toFixed(1);
  let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
  if (seconds < 60) return seconds + " Sec";
  else if (minutes < 60) return minutes + " Min";
  else if (hours < 24) return hours + " Hrs";
  else return days + " Days"
}
