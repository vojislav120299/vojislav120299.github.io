function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["orderList-orderList-module"], {
  /***/
  "./node_modules/chartist/dist/chartist.js":
  /*!************************************************!*\
    !*** ./node_modules/chartist/dist/chartist.js ***!
    \************************************************/

  /*! no static exports found */

  /***/
  function node_modulesChartistDistChartistJs(module, exports, __webpack_require__) {
    var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

    (function (root, factory) {
      if (true) {
        // AMD. Register as an anonymous module unless amdModuleId is set
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
          return root['Chartist'] = factory();
        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
      } else {}
    })(this, function () {
      /* Chartist.js 0.11.4
       * Copyright © 2019 Gion Kunz
       * Free to use under either the WTFPL license or the MIT license.
       * https://raw.githubusercontent.com/gionkunz/chartist-js/master/LICENSE-WTFPL
       * https://raw.githubusercontent.com/gionkunz/chartist-js/master/LICENSE-MIT
       */

      /**
       * The core module of Chartist that is mainly providing static functions and higher level functions for chart modules.
       *
       * @module Chartist.Core
       */
      var Chartist = {
        version: '0.11.4'
      };

      (function (globalRoot, Chartist) {
        'use strict';

        var window = globalRoot.window;
        var document = globalRoot.document;
        /**
         * This object contains all namespaces used within Chartist.
         *
         * @memberof Chartist.Core
         * @type {{svg: string, xmlns: string, xhtml: string, xlink: string, ct: string}}
         */

        Chartist.namespaces = {
          svg: 'http://www.w3.org/2000/svg',
          xmlns: 'http://www.w3.org/2000/xmlns/',
          xhtml: 'http://www.w3.org/1999/xhtml',
          xlink: 'http://www.w3.org/1999/xlink',
          ct: 'http://gionkunz.github.com/chartist-js/ct'
        };
        /**
         * Helps to simplify functional style code
         *
         * @memberof Chartist.Core
         * @param {*} n This exact value will be returned by the noop function
         * @return {*} The same value that was provided to the n parameter
         */

        Chartist.noop = function (n) {
          return n;
        };
        /**
         * Generates a-z from a number 0 to 26
         *
         * @memberof Chartist.Core
         * @param {Number} n A number from 0 to 26 that will result in a letter a-z
         * @return {String} A character from a-z based on the input number n
         */


        Chartist.alphaNumerate = function (n) {
          // Limit to a-z
          return String.fromCharCode(97 + n % 26);
        };
        /**
         * Simple recursive object extend
         *
         * @memberof Chartist.Core
         * @param {Object} target Target object where the source will be merged into
         * @param {Object...} sources This object (objects) will be merged into target and then target is returned
         * @return {Object} An object that has the same reference as target but is extended and merged with the properties of source
         */


        Chartist.extend = function (target) {
          var i, source, sourceProp;
          target = target || {};

          for (i = 1; i < arguments.length; i++) {
            source = arguments[i];

            for (var prop in source) {
              sourceProp = source[prop];

              if (typeof sourceProp === 'object' && sourceProp !== null && !(sourceProp instanceof Array)) {
                target[prop] = Chartist.extend(target[prop], sourceProp);
              } else {
                target[prop] = sourceProp;
              }
            }
          }

          return target;
        };
        /**
         * Replaces all occurrences of subStr in str with newSubStr and returns a new string.
         *
         * @memberof Chartist.Core
         * @param {String} str
         * @param {String} subStr
         * @param {String} newSubStr
         * @return {String}
         */


        Chartist.replaceAll = function (str, subStr, newSubStr) {
          return str.replace(new RegExp(subStr, 'g'), newSubStr);
        };
        /**
         * Converts a number to a string with a unit. If a string is passed then this will be returned unmodified.
         *
         * @memberof Chartist.Core
         * @param {Number} value
         * @param {String} unit
         * @return {String} Returns the passed number value with unit.
         */


        Chartist.ensureUnit = function (value, unit) {
          if (typeof value === 'number') {
            value = value + unit;
          }

          return value;
        };
        /**
         * Converts a number or string to a quantity object.
         *
         * @memberof Chartist.Core
         * @param {String|Number} input
         * @return {Object} Returns an object containing the value as number and the unit as string.
         */


        Chartist.quantity = function (input) {
          if (typeof input === 'string') {
            var match = /^(\d+)\s*(.*)$/g.exec(input);
            return {
              value: +match[1],
              unit: match[2] || undefined
            };
          }

          return {
            value: input
          };
        };
        /**
         * This is a wrapper around document.querySelector that will return the query if it's already of type Node
         *
         * @memberof Chartist.Core
         * @param {String|Node} query The query to use for selecting a Node or a DOM node that will be returned directly
         * @return {Node}
         */


        Chartist.querySelector = function (query) {
          return query instanceof Node ? query : document.querySelector(query);
        };
        /**
         * Functional style helper to produce array with given length initialized with undefined values
         *
         * @memberof Chartist.Core
         * @param length
         * @return {Array}
         */


        Chartist.times = function (length) {
          return Array.apply(null, new Array(length));
        };
        /**
         * Sum helper to be used in reduce functions
         *
         * @memberof Chartist.Core
         * @param previous
         * @param current
         * @return {*}
         */


        Chartist.sum = function (previous, current) {
          return previous + (current ? current : 0);
        };
        /**
         * Multiply helper to be used in `Array.map` for multiplying each value of an array with a factor.
         *
         * @memberof Chartist.Core
         * @param {Number} factor
         * @returns {Function} Function that can be used in `Array.map` to multiply each value in an array
         */


        Chartist.mapMultiply = function (factor) {
          return function (num) {
            return num * factor;
          };
        };
        /**
         * Add helper to be used in `Array.map` for adding a addend to each value of an array.
         *
         * @memberof Chartist.Core
         * @param {Number} addend
         * @returns {Function} Function that can be used in `Array.map` to add a addend to each value in an array
         */


        Chartist.mapAdd = function (addend) {
          return function (num) {
            return num + addend;
          };
        };
        /**
         * Map for multi dimensional arrays where their nested arrays will be mapped in serial. The output array will have the length of the largest nested array. The callback function is called with variable arguments where each argument is the nested array value (or undefined if there are no more values).
         *
         * @memberof Chartist.Core
         * @param arr
         * @param cb
         * @return {Array}
         */


        Chartist.serialMap = function (arr, cb) {
          var result = [],
              length = Math.max.apply(null, arr.map(function (e) {
            return e.length;
          }));
          Chartist.times(length).forEach(function (e, index) {
            var args = arr.map(function (e) {
              return e[index];
            });
            result[index] = cb.apply(null, args);
          });
          return result;
        };
        /**
         * This helper function can be used to round values with certain precision level after decimal. This is used to prevent rounding errors near float point precision limit.
         *
         * @memberof Chartist.Core
         * @param {Number} value The value that should be rounded with precision
         * @param {Number} [digits] The number of digits after decimal used to do the rounding
         * @returns {number} Rounded value
         */


        Chartist.roundWithPrecision = function (value, digits) {
          var precision = Math.pow(10, digits || Chartist.precision);
          return Math.round(value * precision) / precision;
        };
        /**
         * Precision level used internally in Chartist for rounding. If you require more decimal places you can increase this number.
         *
         * @memberof Chartist.Core
         * @type {number}
         */


        Chartist.precision = 8;
        /**
         * A map with characters to escape for strings to be safely used as attribute values.
         *
         * @memberof Chartist.Core
         * @type {Object}
         */

        Chartist.escapingMap = {
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          '\'': '&#039;'
        };
        /**
         * This function serializes arbitrary data to a string. In case of data that can't be easily converted to a string, this function will create a wrapper object and serialize the data using JSON.stringify. The outcoming string will always be escaped using Chartist.escapingMap.
         * If called with null or undefined the function will return immediately with null or undefined.
         *
         * @memberof Chartist.Core
         * @param {Number|String|Object} data
         * @return {String}
         */

        Chartist.serialize = function (data) {
          if (data === null || data === undefined) {
            return data;
          } else if (typeof data === 'number') {
            data = '' + data;
          } else if (typeof data === 'object') {
            data = JSON.stringify({
              data: data
            });
          }

          return Object.keys(Chartist.escapingMap).reduce(function (result, key) {
            return Chartist.replaceAll(result, key, Chartist.escapingMap[key]);
          }, data);
        };
        /**
         * This function de-serializes a string previously serialized with Chartist.serialize. The string will always be unescaped using Chartist.escapingMap before it's returned. Based on the input value the return type can be Number, String or Object. JSON.parse is used with try / catch to see if the unescaped string can be parsed into an Object and this Object will be returned on success.
         *
         * @memberof Chartist.Core
         * @param {String} data
         * @return {String|Number|Object}
         */


        Chartist.deserialize = function (data) {
          if (typeof data !== 'string') {
            return data;
          }

          data = Object.keys(Chartist.escapingMap).reduce(function (result, key) {
            return Chartist.replaceAll(result, Chartist.escapingMap[key], key);
          }, data);

          try {
            data = JSON.parse(data);
            data = data.data !== undefined ? data.data : data;
          } catch (e) {}

          return data;
        };
        /**
         * Create or reinitialize the SVG element for the chart
         *
         * @memberof Chartist.Core
         * @param {Node} container The containing DOM Node object that will be used to plant the SVG element
         * @param {String} width Set the width of the SVG element. Default is 100%
         * @param {String} height Set the height of the SVG element. Default is 100%
         * @param {String} className Specify a class to be added to the SVG element
         * @return {Object} The created/reinitialized SVG element
         */


        Chartist.createSvg = function (container, width, height, className) {
          var svg;
          width = width || '100%';
          height = height || '100%'; // Check if there is a previous SVG element in the container that contains the Chartist XML namespace and remove it
          // Since the DOM API does not support namespaces we need to manually search the returned list http://www.w3.org/TR/selectors-api/

          Array.prototype.slice.call(container.querySelectorAll('svg')).filter(function filterChartistSvgObjects(svg) {
            return svg.getAttributeNS(Chartist.namespaces.xmlns, 'ct');
          }).forEach(function removePreviousElement(svg) {
            container.removeChild(svg);
          }); // Create svg object with width and height or use 100% as default

          svg = new Chartist.Svg('svg').attr({
            width: width,
            height: height
          }).addClass(className);
          svg._node.style.width = width;
          svg._node.style.height = height; // Add the DOM node to our container

          container.appendChild(svg._node);
          return svg;
        };
        /**
         * Ensures that the data object passed as second argument to the charts is present and correctly initialized.
         *
         * @param  {Object} data The data object that is passed as second argument to the charts
         * @return {Object} The normalized data object
         */


        Chartist.normalizeData = function (data, reverse, multi) {
          var labelCount;
          var output = {
            raw: data,
            normalized: {}
          }; // Check if we should generate some labels based on existing series data

          output.normalized.series = Chartist.getDataArray({
            series: data.series || []
          }, reverse, multi); // If all elements of the normalized data array are arrays we're dealing with
          // multi series data and we need to find the largest series if they are un-even

          if (output.normalized.series.every(function (value) {
            return value instanceof Array;
          })) {
            // Getting the series with the the most elements
            labelCount = Math.max.apply(null, output.normalized.series.map(function (series) {
              return series.length;
            }));
          } else {
            // We're dealing with Pie data so we just take the normalized array length
            labelCount = output.normalized.series.length;
          }

          output.normalized.labels = (data.labels || []).slice(); // Padding the labels to labelCount with empty strings

          Array.prototype.push.apply(output.normalized.labels, Chartist.times(Math.max(0, labelCount - output.normalized.labels.length)).map(function () {
            return '';
          }));

          if (reverse) {
            Chartist.reverseData(output.normalized);
          }

          return output;
        };
        /**
         * This function safely checks if an objects has an owned property.
         *
         * @param {Object} object The object where to check for a property
         * @param {string} property The property name
         * @returns {boolean} Returns true if the object owns the specified property
         */


        Chartist.safeHasProperty = function (object, property) {
          return object !== null && typeof object === 'object' && object.hasOwnProperty(property);
        };
        /**
         * Checks if a value is considered a hole in the data series.
         *
         * @param {*} value
         * @returns {boolean} True if the value is considered a data hole
         */


        Chartist.isDataHoleValue = function (value) {
          return value === null || value === undefined || typeof value === 'number' && isNaN(value);
        };
        /**
         * Reverses the series, labels and series data arrays.
         *
         * @memberof Chartist.Core
         * @param data
         */


        Chartist.reverseData = function (data) {
          data.labels.reverse();
          data.series.reverse();

          for (var i = 0; i < data.series.length; i++) {
            if (typeof data.series[i] === 'object' && data.series[i].data !== undefined) {
              data.series[i].data.reverse();
            } else if (data.series[i] instanceof Array) {
              data.series[i].reverse();
            }
          }
        };
        /**
         * Convert data series into plain array
         *
         * @memberof Chartist.Core
         * @param {Object} data The series object that contains the data to be visualized in the chart
         * @param {Boolean} [reverse] If true the whole data is reversed by the getDataArray call. This will modify the data object passed as first parameter. The labels as well as the series order is reversed. The whole series data arrays are reversed too.
         * @param {Boolean} [multi] Create a multi dimensional array from a series data array where a value object with `x` and `y` values will be created.
         * @return {Array} A plain array that contains the data to be visualized in the chart
         */


        Chartist.getDataArray = function (data, reverse, multi) {
          // Recursively walks through nested arrays and convert string values to numbers and objects with value properties
          // to values. Check the tests in data core -> data normalization for a detailed specification of expected values
          function recursiveConvert(value) {
            if (Chartist.safeHasProperty(value, 'value')) {
              // We are dealing with value object notation so we need to recurse on value property
              return recursiveConvert(value.value);
            } else if (Chartist.safeHasProperty(value, 'data')) {
              // We are dealing with series object notation so we need to recurse on data property
              return recursiveConvert(value.data);
            } else if (value instanceof Array) {
              // Data is of type array so we need to recurse on the series
              return value.map(recursiveConvert);
            } else if (Chartist.isDataHoleValue(value)) {
              // We're dealing with a hole in the data and therefore need to return undefined
              // We're also returning undefined for multi value output
              return undefined;
            } else {
              // We need to prepare multi value output (x and y data)
              if (multi) {
                var multiValue = {}; // Single series value arrays are assumed to specify the Y-Axis value
                // For example: [1, 2] => [{x: undefined, y: 1}, {x: undefined, y: 2}]
                // If multi is a string then it's assumed that it specified which dimension should be filled as default

                if (typeof multi === 'string') {
                  multiValue[multi] = Chartist.getNumberOrUndefined(value);
                } else {
                  multiValue.y = Chartist.getNumberOrUndefined(value);
                }

                multiValue.x = value.hasOwnProperty('x') ? Chartist.getNumberOrUndefined(value.x) : multiValue.x;
                multiValue.y = value.hasOwnProperty('y') ? Chartist.getNumberOrUndefined(value.y) : multiValue.y;
                return multiValue;
              } else {
                // We can return simple data
                return Chartist.getNumberOrUndefined(value);
              }
            }
          }

          return data.series.map(recursiveConvert);
        };
        /**
         * Converts a number into a padding object.
         *
         * @memberof Chartist.Core
         * @param {Object|Number} padding
         * @param {Number} [fallback] This value is used to fill missing values if a incomplete padding object was passed
         * @returns {Object} Returns a padding object containing top, right, bottom, left properties filled with the padding number passed in as argument. If the argument is something else than a number (presumably already a correct padding object) then this argument is directly returned.
         */


        Chartist.normalizePadding = function (padding, fallback) {
          fallback = fallback || 0;
          return typeof padding === 'number' ? {
            top: padding,
            right: padding,
            bottom: padding,
            left: padding
          } : {
            top: typeof padding.top === 'number' ? padding.top : fallback,
            right: typeof padding.right === 'number' ? padding.right : fallback,
            bottom: typeof padding.bottom === 'number' ? padding.bottom : fallback,
            left: typeof padding.left === 'number' ? padding.left : fallback
          };
        };

        Chartist.getMetaData = function (series, index) {
          var value = series.data ? series.data[index] : series[index];
          return value ? value.meta : undefined;
        };
        /**
         * Calculate the order of magnitude for the chart scale
         *
         * @memberof Chartist.Core
         * @param {Number} value The value Range of the chart
         * @return {Number} The order of magnitude
         */


        Chartist.orderOfMagnitude = function (value) {
          return Math.floor(Math.log(Math.abs(value)) / Math.LN10);
        };
        /**
         * Project a data length into screen coordinates (pixels)
         *
         * @memberof Chartist.Core
         * @param {Object} axisLength The svg element for the chart
         * @param {Number} length Single data value from a series array
         * @param {Object} bounds All the values to set the bounds of the chart
         * @return {Number} The projected data length in pixels
         */


        Chartist.projectLength = function (axisLength, length, bounds) {
          return length / bounds.range * axisLength;
        };
        /**
         * Get the height of the area in the chart for the data series
         *
         * @memberof Chartist.Core
         * @param {Object} svg The svg element for the chart
         * @param {Object} options The Object that contains all the optional values for the chart
         * @return {Number} The height of the area in the chart for the data series
         */


        Chartist.getAvailableHeight = function (svg, options) {
          return Math.max((Chartist.quantity(options.height).value || svg.height()) - (options.chartPadding.top + options.chartPadding.bottom) - options.axisX.offset, 0);
        };
        /**
         * Get highest and lowest value of data array. This Array contains the data that will be visualized in the chart.
         *
         * @memberof Chartist.Core
         * @param {Array} data The array that contains the data to be visualized in the chart
         * @param {Object} options The Object that contains the chart options
         * @param {String} dimension Axis dimension 'x' or 'y' used to access the correct value and high / low configuration
         * @return {Object} An object that contains the highest and lowest value that will be visualized on the chart.
         */


        Chartist.getHighLow = function (data, options, dimension) {
          // TODO: Remove workaround for deprecated global high / low config. Axis high / low configuration is preferred
          options = Chartist.extend({}, options, dimension ? options['axis' + dimension.toUpperCase()] : {});
          var highLow = {
            high: options.high === undefined ? -Number.MAX_VALUE : +options.high,
            low: options.low === undefined ? Number.MAX_VALUE : +options.low
          };
          var findHigh = options.high === undefined;
          var findLow = options.low === undefined; // Function to recursively walk through arrays and find highest and lowest number

          function recursiveHighLow(data) {
            if (data === undefined) {
              return undefined;
            } else if (data instanceof Array) {
              for (var i = 0; i < data.length; i++) {
                recursiveHighLow(data[i]);
              }
            } else {
              var value = dimension ? +data[dimension] : +data;

              if (findHigh && value > highLow.high) {
                highLow.high = value;
              }

              if (findLow && value < highLow.low) {
                highLow.low = value;
              }
            }
          } // Start to find highest and lowest number recursively


          if (findHigh || findLow) {
            recursiveHighLow(data);
          } // Overrides of high / low based on reference value, it will make sure that the invisible reference value is
          // used to generate the chart. This is useful when the chart always needs to contain the position of the
          // invisible reference value in the view i.e. for bipolar scales.


          if (options.referenceValue || options.referenceValue === 0) {
            highLow.high = Math.max(options.referenceValue, highLow.high);
            highLow.low = Math.min(options.referenceValue, highLow.low);
          } // If high and low are the same because of misconfiguration or flat data (only the same value) we need
          // to set the high or low to 0 depending on the polarity


          if (highLow.high <= highLow.low) {
            // If both values are 0 we set high to 1
            if (highLow.low === 0) {
              highLow.high = 1;
            } else if (highLow.low < 0) {
              // If we have the same negative value for the bounds we set bounds.high to 0
              highLow.high = 0;
            } else if (highLow.high > 0) {
              // If we have the same positive value for the bounds we set bounds.low to 0
              highLow.low = 0;
            } else {
              // If data array was empty, values are Number.MAX_VALUE and -Number.MAX_VALUE. Set bounds to prevent errors
              highLow.high = 1;
              highLow.low = 0;
            }
          }

          return highLow;
        };
        /**
         * Checks if a value can be safely coerced to a number. This includes all values except null which result in finite numbers when coerced. This excludes NaN, since it's not finite.
         *
         * @memberof Chartist.Core
         * @param value
         * @returns {Boolean}
         */


        Chartist.isNumeric = function (value) {
          return value === null ? false : isFinite(value);
        };
        /**
         * Returns true on all falsey values except the numeric value 0.
         *
         * @memberof Chartist.Core
         * @param value
         * @returns {boolean}
         */


        Chartist.isFalseyButZero = function (value) {
          return !value && value !== 0;
        };
        /**
         * Returns a number if the passed parameter is a valid number or the function will return undefined. On all other values than a valid number, this function will return undefined.
         *
         * @memberof Chartist.Core
         * @param value
         * @returns {*}
         */


        Chartist.getNumberOrUndefined = function (value) {
          return Chartist.isNumeric(value) ? +value : undefined;
        };
        /**
         * Checks if provided value object is multi value (contains x or y properties)
         *
         * @memberof Chartist.Core
         * @param value
         */


        Chartist.isMultiValue = function (value) {
          return typeof value === 'object' && ('x' in value || 'y' in value);
        };
        /**
         * Gets a value from a dimension `value.x` or `value.y` while returning value directly if it's a valid numeric value. If the value is not numeric and it's falsey this function will return `defaultValue`.
         *
         * @memberof Chartist.Core
         * @param value
         * @param dimension
         * @param defaultValue
         * @returns {*}
         */


        Chartist.getMultiValue = function (value, dimension) {
          if (Chartist.isMultiValue(value)) {
            return Chartist.getNumberOrUndefined(value[dimension || 'y']);
          } else {
            return Chartist.getNumberOrUndefined(value);
          }
        };
        /**
         * Pollard Rho Algorithm to find smallest factor of an integer value. There are more efficient algorithms for factorization, but this one is quite efficient and not so complex.
         *
         * @memberof Chartist.Core
         * @param {Number} num An integer number where the smallest factor should be searched for
         * @returns {Number} The smallest integer factor of the parameter num.
         */


        Chartist.rho = function (num) {
          if (num === 1) {
            return num;
          }

          function gcd(p, q) {
            if (p % q === 0) {
              return q;
            } else {
              return gcd(q, p % q);
            }
          }

          function f(x) {
            return x * x + 1;
          }

          var x1 = 2,
              x2 = 2,
              divisor;

          if (num % 2 === 0) {
            return 2;
          }

          do {
            x1 = f(x1) % num;
            x2 = f(f(x2)) % num;
            divisor = gcd(Math.abs(x1 - x2), num);
          } while (divisor === 1);

          return divisor;
        };
        /**
         * Calculate and retrieve all the bounds for the chart and return them in one array
         *
         * @memberof Chartist.Core
         * @param {Number} axisLength The length of the Axis used for
         * @param {Object} highLow An object containing a high and low property indicating the value range of the chart.
         * @param {Number} scaleMinSpace The minimum projected length a step should result in
         * @param {Boolean} onlyInteger
         * @return {Object} All the values to set the bounds of the chart
         */


        Chartist.getBounds = function (axisLength, highLow, scaleMinSpace, onlyInteger) {
          var i,
              optimizationCounter = 0,
              newMin,
              newMax,
              bounds = {
            high: highLow.high,
            low: highLow.low
          };
          bounds.valueRange = bounds.high - bounds.low;
          bounds.oom = Chartist.orderOfMagnitude(bounds.valueRange);
          bounds.step = Math.pow(10, bounds.oom);
          bounds.min = Math.floor(bounds.low / bounds.step) * bounds.step;
          bounds.max = Math.ceil(bounds.high / bounds.step) * bounds.step;
          bounds.range = bounds.max - bounds.min;
          bounds.numberOfSteps = Math.round(bounds.range / bounds.step); // Optimize scale step by checking if subdivision is possible based on horizontalGridMinSpace
          // If we are already below the scaleMinSpace value we will scale up

          var length = Chartist.projectLength(axisLength, bounds.step, bounds);
          var scaleUp = length < scaleMinSpace;
          var smallestFactor = onlyInteger ? Chartist.rho(bounds.range) : 0; // First check if we should only use integer steps and if step 1 is still larger than scaleMinSpace so we can use 1

          if (onlyInteger && Chartist.projectLength(axisLength, 1, bounds) >= scaleMinSpace) {
            bounds.step = 1;
          } else if (onlyInteger && smallestFactor < bounds.step && Chartist.projectLength(axisLength, smallestFactor, bounds) >= scaleMinSpace) {
            // If step 1 was too small, we can try the smallest factor of range
            // If the smallest factor is smaller than the current bounds.step and the projected length of smallest factor
            // is larger than the scaleMinSpace we should go for it.
            bounds.step = smallestFactor;
          } else {
            // Trying to divide or multiply by 2 and find the best step value
            while (true) {
              if (scaleUp && Chartist.projectLength(axisLength, bounds.step, bounds) <= scaleMinSpace) {
                bounds.step *= 2;
              } else if (!scaleUp && Chartist.projectLength(axisLength, bounds.step / 2, bounds) >= scaleMinSpace) {
                bounds.step /= 2;

                if (onlyInteger && bounds.step % 1 !== 0) {
                  bounds.step *= 2;
                  break;
                }
              } else {
                break;
              }

              if (optimizationCounter++ > 1000) {
                throw new Error('Exceeded maximum number of iterations while optimizing scale step!');
              }
            }
          }

          var EPSILON = 2.221E-16;
          bounds.step = Math.max(bounds.step, EPSILON);

          function safeIncrement(value, increment) {
            // If increment is too small use *= (1+EPSILON) as a simple nextafter
            if (value === (value += increment)) {
              value *= 1 + (increment > 0 ? EPSILON : -EPSILON);
            }

            return value;
          } // Narrow min and max based on new step


          newMin = bounds.min;
          newMax = bounds.max;

          while (newMin + bounds.step <= bounds.low) {
            newMin = safeIncrement(newMin, bounds.step);
          }

          while (newMax - bounds.step >= bounds.high) {
            newMax = safeIncrement(newMax, -bounds.step);
          }

          bounds.min = newMin;
          bounds.max = newMax;
          bounds.range = bounds.max - bounds.min;
          var values = [];

          for (i = bounds.min; i <= bounds.max; i = safeIncrement(i, bounds.step)) {
            var value = Chartist.roundWithPrecision(i);

            if (value !== values[values.length - 1]) {
              values.push(value);
            }
          }

          bounds.values = values;
          return bounds;
        };
        /**
         * Calculate cartesian coordinates of polar coordinates
         *
         * @memberof Chartist.Core
         * @param {Number} centerX X-axis coordinates of center point of circle segment
         * @param {Number} centerY X-axis coordinates of center point of circle segment
         * @param {Number} radius Radius of circle segment
         * @param {Number} angleInDegrees Angle of circle segment in degrees
         * @return {{x:Number, y:Number}} Coordinates of point on circumference
         */


        Chartist.polarToCartesian = function (centerX, centerY, radius, angleInDegrees) {
          var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
          return {
            x: centerX + radius * Math.cos(angleInRadians),
            y: centerY + radius * Math.sin(angleInRadians)
          };
        };
        /**
         * Initialize chart drawing rectangle (area where chart is drawn) x1,y1 = bottom left / x2,y2 = top right
         *
         * @memberof Chartist.Core
         * @param {Object} svg The svg element for the chart
         * @param {Object} options The Object that contains all the optional values for the chart
         * @param {Number} [fallbackPadding] The fallback padding if partial padding objects are used
         * @return {Object} The chart rectangles coordinates inside the svg element plus the rectangles measurements
         */


        Chartist.createChartRect = function (svg, options, fallbackPadding) {
          var hasAxis = !!(options.axisX || options.axisY);
          var yAxisOffset = hasAxis ? options.axisY.offset : 0;
          var xAxisOffset = hasAxis ? options.axisX.offset : 0; // If width or height results in invalid value (including 0) we fallback to the unitless settings or even 0

          var width = svg.width() || Chartist.quantity(options.width).value || 0;
          var height = svg.height() || Chartist.quantity(options.height).value || 0;
          var normalizedPadding = Chartist.normalizePadding(options.chartPadding, fallbackPadding); // If settings were to small to cope with offset (legacy) and padding, we'll adjust

          width = Math.max(width, yAxisOffset + normalizedPadding.left + normalizedPadding.right);
          height = Math.max(height, xAxisOffset + normalizedPadding.top + normalizedPadding.bottom);
          var chartRect = {
            padding: normalizedPadding,
            width: function width() {
              return this.x2 - this.x1;
            },
            height: function height() {
              return this.y1 - this.y2;
            }
          };

          if (hasAxis) {
            if (options.axisX.position === 'start') {
              chartRect.y2 = normalizedPadding.top + xAxisOffset;
              chartRect.y1 = Math.max(height - normalizedPadding.bottom, chartRect.y2 + 1);
            } else {
              chartRect.y2 = normalizedPadding.top;
              chartRect.y1 = Math.max(height - normalizedPadding.bottom - xAxisOffset, chartRect.y2 + 1);
            }

            if (options.axisY.position === 'start') {
              chartRect.x1 = normalizedPadding.left + yAxisOffset;
              chartRect.x2 = Math.max(width - normalizedPadding.right, chartRect.x1 + 1);
            } else {
              chartRect.x1 = normalizedPadding.left;
              chartRect.x2 = Math.max(width - normalizedPadding.right - yAxisOffset, chartRect.x1 + 1);
            }
          } else {
            chartRect.x1 = normalizedPadding.left;
            chartRect.x2 = Math.max(width - normalizedPadding.right, chartRect.x1 + 1);
            chartRect.y2 = normalizedPadding.top;
            chartRect.y1 = Math.max(height - normalizedPadding.bottom, chartRect.y2 + 1);
          }

          return chartRect;
        };
        /**
         * Creates a grid line based on a projected value.
         *
         * @memberof Chartist.Core
         * @param position
         * @param index
         * @param axis
         * @param offset
         * @param length
         * @param group
         * @param classes
         * @param eventEmitter
         */


        Chartist.createGrid = function (position, index, axis, offset, length, group, classes, eventEmitter) {
          var positionalData = {};
          positionalData[axis.units.pos + '1'] = position;
          positionalData[axis.units.pos + '2'] = position;
          positionalData[axis.counterUnits.pos + '1'] = offset;
          positionalData[axis.counterUnits.pos + '2'] = offset + length;
          var gridElement = group.elem('line', positionalData, classes.join(' ')); // Event for grid draw

          eventEmitter.emit('draw', Chartist.extend({
            type: 'grid',
            axis: axis,
            index: index,
            group: group,
            element: gridElement
          }, positionalData));
        };
        /**
         * Creates a grid background rect and emits the draw event.
         *
         * @memberof Chartist.Core
         * @param gridGroup
         * @param chartRect
         * @param className
         * @param eventEmitter
         */


        Chartist.createGridBackground = function (gridGroup, chartRect, className, eventEmitter) {
          var gridBackground = gridGroup.elem('rect', {
            x: chartRect.x1,
            y: chartRect.y2,
            width: chartRect.width(),
            height: chartRect.height()
          }, className, true); // Event for grid background draw

          eventEmitter.emit('draw', {
            type: 'gridBackground',
            group: gridGroup,
            element: gridBackground
          });
        };
        /**
         * Creates a label based on a projected value and an axis.
         *
         * @memberof Chartist.Core
         * @param position
         * @param length
         * @param index
         * @param labels
         * @param axis
         * @param axisOffset
         * @param labelOffset
         * @param group
         * @param classes
         * @param useForeignObject
         * @param eventEmitter
         */


        Chartist.createLabel = function (position, length, index, labels, axis, axisOffset, labelOffset, group, classes, useForeignObject, eventEmitter) {
          var labelElement;
          var positionalData = {};
          positionalData[axis.units.pos] = position + labelOffset[axis.units.pos];
          positionalData[axis.counterUnits.pos] = labelOffset[axis.counterUnits.pos];
          positionalData[axis.units.len] = length;
          positionalData[axis.counterUnits.len] = Math.max(0, axisOffset - 10);

          if (useForeignObject) {
            // We need to set width and height explicitly to px as span will not expand with width and height being
            // 100% in all browsers
            var content = document.createElement('span');
            content.className = classes.join(' ');
            content.setAttribute('xmlns', Chartist.namespaces.xhtml);
            content.innerText = labels[index];
            content.style[axis.units.len] = Math.round(positionalData[axis.units.len]) + 'px';
            content.style[axis.counterUnits.len] = Math.round(positionalData[axis.counterUnits.len]) + 'px';
            labelElement = group.foreignObject(content, Chartist.extend({
              style: 'overflow: visible;'
            }, positionalData));
          } else {
            labelElement = group.elem('text', positionalData, classes.join(' ')).text(labels[index]);
          }

          eventEmitter.emit('draw', Chartist.extend({
            type: 'label',
            axis: axis,
            index: index,
            group: group,
            element: labelElement,
            text: labels[index]
          }, positionalData));
        };
        /**
         * Helper to read series specific options from options object. It automatically falls back to the global option if
         * there is no option in the series options.
         *
         * @param {Object} series Series object
         * @param {Object} options Chartist options object
         * @param {string} key The options key that should be used to obtain the options
         * @returns {*}
         */


        Chartist.getSeriesOption = function (series, options, key) {
          if (series.name && options.series && options.series[series.name]) {
            var seriesOptions = options.series[series.name];
            return seriesOptions.hasOwnProperty(key) ? seriesOptions[key] : options[key];
          } else {
            return options[key];
          }
        };
        /**
         * Provides options handling functionality with callback for options changes triggered by responsive options and media query matches
         *
         * @memberof Chartist.Core
         * @param {Object} options Options set by user
         * @param {Array} responsiveOptions Optional functions to add responsive behavior to chart
         * @param {Object} eventEmitter The event emitter that will be used to emit the options changed events
         * @return {Object} The consolidated options object from the defaults, base and matching responsive options
         */


        Chartist.optionsProvider = function (options, responsiveOptions, eventEmitter) {
          var baseOptions = Chartist.extend({}, options),
              currentOptions,
              mediaQueryListeners = [],
              i;

          function updateCurrentOptions(mediaEvent) {
            var previousOptions = currentOptions;
            currentOptions = Chartist.extend({}, baseOptions);

            if (responsiveOptions) {
              for (i = 0; i < responsiveOptions.length; i++) {
                var mql = window.matchMedia(responsiveOptions[i][0]);

                if (mql.matches) {
                  currentOptions = Chartist.extend(currentOptions, responsiveOptions[i][1]);
                }
              }
            }

            if (eventEmitter && mediaEvent) {
              eventEmitter.emit('optionsChanged', {
                previousOptions: previousOptions,
                currentOptions: currentOptions
              });
            }
          }

          function removeMediaQueryListeners() {
            mediaQueryListeners.forEach(function (mql) {
              mql.removeListener(updateCurrentOptions);
            });
          }

          if (!window.matchMedia) {
            throw 'window.matchMedia not found! Make sure you\'re using a polyfill.';
          } else if (responsiveOptions) {
            for (i = 0; i < responsiveOptions.length; i++) {
              var mql = window.matchMedia(responsiveOptions[i][0]);
              mql.addListener(updateCurrentOptions);
              mediaQueryListeners.push(mql);
            }
          } // Execute initially without an event argument so we get the correct options


          updateCurrentOptions();
          return {
            removeMediaQueryListeners: removeMediaQueryListeners,
            getCurrentOptions: function getCurrentOptions() {
              return Chartist.extend({}, currentOptions);
            }
          };
        };
        /**
         * Splits a list of coordinates and associated values into segments. Each returned segment contains a pathCoordinates
         * valueData property describing the segment.
         *
         * With the default options, segments consist of contiguous sets of points that do not have an undefined value. Any
         * points with undefined values are discarded.
         *
         * **Options**
         * The following options are used to determine how segments are formed
         * ```javascript
         * var options = {
         *   // If fillHoles is true, undefined values are simply discarded without creating a new segment. Assuming other options are default, this returns single segment.
         *   fillHoles: false,
         *   // If increasingX is true, the coordinates in all segments have strictly increasing x-values.
         *   increasingX: false
         * };
         * ```
         *
         * @memberof Chartist.Core
         * @param {Array} pathCoordinates List of point coordinates to be split in the form [x1, y1, x2, y2 ... xn, yn]
         * @param {Array} values List of associated point values in the form [v1, v2 .. vn]
         * @param {Object} options Options set by user
         * @return {Array} List of segments, each containing a pathCoordinates and valueData property.
         */


        Chartist.splitIntoSegments = function (pathCoordinates, valueData, options) {
          var defaultOptions = {
            increasingX: false,
            fillHoles: false
          };
          options = Chartist.extend({}, defaultOptions, options);
          var segments = [];
          var hole = true;

          for (var i = 0; i < pathCoordinates.length; i += 2) {
            // If this value is a "hole" we set the hole flag
            if (Chartist.getMultiValue(valueData[i / 2].value) === undefined) {
              // if(valueData[i / 2].value === undefined) {
              if (!options.fillHoles) {
                hole = true;
              }
            } else {
              if (options.increasingX && i >= 2 && pathCoordinates[i] <= pathCoordinates[i - 2]) {
                // X is not increasing, so we need to make sure we start a new segment
                hole = true;
              } // If it's a valid value we need to check if we're coming out of a hole and create a new empty segment


              if (hole) {
                segments.push({
                  pathCoordinates: [],
                  valueData: []
                }); // As we have a valid value now, we are not in a "hole" anymore

                hole = false;
              } // Add to the segment pathCoordinates and valueData


              segments[segments.length - 1].pathCoordinates.push(pathCoordinates[i], pathCoordinates[i + 1]);
              segments[segments.length - 1].valueData.push(valueData[i / 2]);
            }
          }

          return segments;
        };
      })(this || global, Chartist);

      ;
      /**
      * Chartist path interpolation functions.
      *
      * @module Chartist.Interpolation
      */

      /* global Chartist */

      (function (globalRoot, Chartist) {
        'use strict';

        Chartist.Interpolation = {};
        /**
         * This interpolation function does not smooth the path and the result is only containing lines and no curves.
         *
         * @example
         * var chart = new Chartist.Line('.ct-chart', {
         *   labels: [1, 2, 3, 4, 5],
         *   series: [[1, 2, 8, 1, 7]]
         * }, {
         *   lineSmooth: Chartist.Interpolation.none({
         *     fillHoles: false
         *   })
         * });
         *
         *
         * @memberof Chartist.Interpolation
         * @return {Function}
         */

        Chartist.Interpolation.none = function (options) {
          var defaultOptions = {
            fillHoles: false
          };
          options = Chartist.extend({}, defaultOptions, options);
          return function none(pathCoordinates, valueData) {
            var path = new Chartist.Svg.Path();
            var hole = true;

            for (var i = 0; i < pathCoordinates.length; i += 2) {
              var currX = pathCoordinates[i];
              var currY = pathCoordinates[i + 1];
              var currData = valueData[i / 2];

              if (Chartist.getMultiValue(currData.value) !== undefined) {
                if (hole) {
                  path.move(currX, currY, false, currData);
                } else {
                  path.line(currX, currY, false, currData);
                }

                hole = false;
              } else if (!options.fillHoles) {
                hole = true;
              }
            }

            return path;
          };
        };
        /**
         * Simple smoothing creates horizontal handles that are positioned with a fraction of the length between two data points. You can use the divisor option to specify the amount of smoothing.
         *
         * Simple smoothing can be used instead of `Chartist.Smoothing.cardinal` if you'd like to get rid of the artifacts it produces sometimes. Simple smoothing produces less flowing lines but is accurate by hitting the points and it also doesn't swing below or above the given data point.
         *
         * All smoothing functions within Chartist are factory functions that accept an options parameter. The simple interpolation function accepts one configuration parameter `divisor`, between 1 and ∞, which controls the smoothing characteristics.
         *
         * @example
         * var chart = new Chartist.Line('.ct-chart', {
         *   labels: [1, 2, 3, 4, 5],
         *   series: [[1, 2, 8, 1, 7]]
         * }, {
         *   lineSmooth: Chartist.Interpolation.simple({
         *     divisor: 2,
         *     fillHoles: false
         *   })
         * });
         *
         *
         * @memberof Chartist.Interpolation
         * @param {Object} options The options of the simple interpolation factory function.
         * @return {Function}
         */


        Chartist.Interpolation.simple = function (options) {
          var defaultOptions = {
            divisor: 2,
            fillHoles: false
          };
          options = Chartist.extend({}, defaultOptions, options);
          var d = 1 / Math.max(1, options.divisor);
          return function simple(pathCoordinates, valueData) {
            var path = new Chartist.Svg.Path();
            var prevX, prevY, prevData;

            for (var i = 0; i < pathCoordinates.length; i += 2) {
              var currX = pathCoordinates[i];
              var currY = pathCoordinates[i + 1];
              var length = (currX - prevX) * d;
              var currData = valueData[i / 2];

              if (currData.value !== undefined) {
                if (prevData === undefined) {
                  path.move(currX, currY, false, currData);
                } else {
                  path.curve(prevX + length, prevY, currX - length, currY, currX, currY, false, currData);
                }

                prevX = currX;
                prevY = currY;
                prevData = currData;
              } else if (!options.fillHoles) {
                prevX = currX = prevData = undefined;
              }
            }

            return path;
          };
        };
        /**
         * Cardinal / Catmull-Rome spline interpolation is the default smoothing function in Chartist. It produces nice results where the splines will always meet the points. It produces some artifacts though when data values are increased or decreased rapidly. The line may not follow a very accurate path and if the line should be accurate this smoothing function does not produce the best results.
         *
         * Cardinal splines can only be created if there are more than two data points. If this is not the case this smoothing will fallback to `Chartist.Smoothing.none`.
         *
         * All smoothing functions within Chartist are factory functions that accept an options parameter. The cardinal interpolation function accepts one configuration parameter `tension`, between 0 and 1, which controls the smoothing intensity.
         *
         * @example
         * var chart = new Chartist.Line('.ct-chart', {
         *   labels: [1, 2, 3, 4, 5],
         *   series: [[1, 2, 8, 1, 7]]
         * }, {
         *   lineSmooth: Chartist.Interpolation.cardinal({
         *     tension: 1,
         *     fillHoles: false
         *   })
         * });
         *
         * @memberof Chartist.Interpolation
         * @param {Object} options The options of the cardinal factory function.
         * @return {Function}
         */


        Chartist.Interpolation.cardinal = function (options) {
          var defaultOptions = {
            tension: 1,
            fillHoles: false
          };
          options = Chartist.extend({}, defaultOptions, options);
          var t = Math.min(1, Math.max(0, options.tension)),
              c = 1 - t;
          return function cardinal(pathCoordinates, valueData) {
            // First we try to split the coordinates into segments
            // This is necessary to treat "holes" in line charts
            var segments = Chartist.splitIntoSegments(pathCoordinates, valueData, {
              fillHoles: options.fillHoles
            });

            if (!segments.length) {
              // If there were no segments return 'Chartist.Interpolation.none'
              return Chartist.Interpolation.none()([]);
            } else if (segments.length > 1) {
              // If the split resulted in more that one segment we need to interpolate each segment individually and join them
              // afterwards together into a single path.
              var paths = []; // For each segment we will recurse the cardinal function

              segments.forEach(function (segment) {
                paths.push(cardinal(segment.pathCoordinates, segment.valueData));
              }); // Join the segment path data into a single path and return

              return Chartist.Svg.Path.join(paths);
            } else {
              // If there was only one segment we can proceed regularly by using pathCoordinates and valueData from the first
              // segment
              pathCoordinates = segments[0].pathCoordinates;
              valueData = segments[0].valueData; // If less than two points we need to fallback to no smoothing

              if (pathCoordinates.length <= 4) {
                return Chartist.Interpolation.none()(pathCoordinates, valueData);
              }

              var path = new Chartist.Svg.Path().move(pathCoordinates[0], pathCoordinates[1], false, valueData[0]),
                  z;

              for (var i = 0, iLen = pathCoordinates.length; iLen - 2 * !z > i; i += 2) {
                var p = [{
                  x: +pathCoordinates[i - 2],
                  y: +pathCoordinates[i - 1]
                }, {
                  x: +pathCoordinates[i],
                  y: +pathCoordinates[i + 1]
                }, {
                  x: +pathCoordinates[i + 2],
                  y: +pathCoordinates[i + 3]
                }, {
                  x: +pathCoordinates[i + 4],
                  y: +pathCoordinates[i + 5]
                }];

                if (z) {
                  if (!i) {
                    p[0] = {
                      x: +pathCoordinates[iLen - 2],
                      y: +pathCoordinates[iLen - 1]
                    };
                  } else if (iLen - 4 === i) {
                    p[3] = {
                      x: +pathCoordinates[0],
                      y: +pathCoordinates[1]
                    };
                  } else if (iLen - 2 === i) {
                    p[2] = {
                      x: +pathCoordinates[0],
                      y: +pathCoordinates[1]
                    };
                    p[3] = {
                      x: +pathCoordinates[2],
                      y: +pathCoordinates[3]
                    };
                  }
                } else {
                  if (iLen - 4 === i) {
                    p[3] = p[2];
                  } else if (!i) {
                    p[0] = {
                      x: +pathCoordinates[i],
                      y: +pathCoordinates[i + 1]
                    };
                  }
                }

                path.curve(t * (-p[0].x + 6 * p[1].x + p[2].x) / 6 + c * p[2].x, t * (-p[0].y + 6 * p[1].y + p[2].y) / 6 + c * p[2].y, t * (p[1].x + 6 * p[2].x - p[3].x) / 6 + c * p[2].x, t * (p[1].y + 6 * p[2].y - p[3].y) / 6 + c * p[2].y, p[2].x, p[2].y, false, valueData[(i + 2) / 2]);
              }

              return path;
            }
          };
        };
        /**
         * Monotone Cubic spline interpolation produces a smooth curve which preserves monotonicity. Unlike cardinal splines, the curve will not extend beyond the range of y-values of the original data points.
         *
         * Monotone Cubic splines can only be created if there are more than two data points. If this is not the case this smoothing will fallback to `Chartist.Smoothing.none`.
         *
         * The x-values of subsequent points must be increasing to fit a Monotone Cubic spline. If this condition is not met for a pair of adjacent points, then there will be a break in the curve between those data points.
         *
         * All smoothing functions within Chartist are factory functions that accept an options parameter.
         *
         * @example
         * var chart = new Chartist.Line('.ct-chart', {
         *   labels: [1, 2, 3, 4, 5],
         *   series: [[1, 2, 8, 1, 7]]
         * }, {
         *   lineSmooth: Chartist.Interpolation.monotoneCubic({
         *     fillHoles: false
         *   })
         * });
         *
         * @memberof Chartist.Interpolation
         * @param {Object} options The options of the monotoneCubic factory function.
         * @return {Function}
         */


        Chartist.Interpolation.monotoneCubic = function (options) {
          var defaultOptions = {
            fillHoles: false
          };
          options = Chartist.extend({}, defaultOptions, options);
          return function monotoneCubic(pathCoordinates, valueData) {
            // First we try to split the coordinates into segments
            // This is necessary to treat "holes" in line charts
            var segments = Chartist.splitIntoSegments(pathCoordinates, valueData, {
              fillHoles: options.fillHoles,
              increasingX: true
            });

            if (!segments.length) {
              // If there were no segments return 'Chartist.Interpolation.none'
              return Chartist.Interpolation.none()([]);
            } else if (segments.length > 1) {
              // If the split resulted in more that one segment we need to interpolate each segment individually and join them
              // afterwards together into a single path.
              var paths = []; // For each segment we will recurse the monotoneCubic fn function

              segments.forEach(function (segment) {
                paths.push(monotoneCubic(segment.pathCoordinates, segment.valueData));
              }); // Join the segment path data into a single path and return

              return Chartist.Svg.Path.join(paths);
            } else {
              // If there was only one segment we can proceed regularly by using pathCoordinates and valueData from the first
              // segment
              pathCoordinates = segments[0].pathCoordinates;
              valueData = segments[0].valueData; // If less than three points we need to fallback to no smoothing

              if (pathCoordinates.length <= 4) {
                return Chartist.Interpolation.none()(pathCoordinates, valueData);
              }

              var xs = [],
                  ys = [],
                  i,
                  n = pathCoordinates.length / 2,
                  ms = [],
                  ds = [],
                  dys = [],
                  dxs = [],
                  path; // Populate x and y coordinates into separate arrays, for readability

              for (i = 0; i < n; i++) {
                xs[i] = pathCoordinates[i * 2];
                ys[i] = pathCoordinates[i * 2 + 1];
              } // Calculate deltas and derivative


              for (i = 0; i < n - 1; i++) {
                dys[i] = ys[i + 1] - ys[i];
                dxs[i] = xs[i + 1] - xs[i];
                ds[i] = dys[i] / dxs[i];
              } // Determine desired slope (m) at each point using Fritsch-Carlson method
              // See: http://math.stackexchange.com/questions/45218/implementation-of-monotone-cubic-interpolation


              ms[0] = ds[0];
              ms[n - 1] = ds[n - 2];

              for (i = 1; i < n - 1; i++) {
                if (ds[i] === 0 || ds[i - 1] === 0 || ds[i - 1] > 0 !== ds[i] > 0) {
                  ms[i] = 0;
                } else {
                  ms[i] = 3 * (dxs[i - 1] + dxs[i]) / ((2 * dxs[i] + dxs[i - 1]) / ds[i - 1] + (dxs[i] + 2 * dxs[i - 1]) / ds[i]);

                  if (!isFinite(ms[i])) {
                    ms[i] = 0;
                  }
                }
              } // Now build a path from the slopes


              path = new Chartist.Svg.Path().move(xs[0], ys[0], false, valueData[0]);

              for (i = 0; i < n - 1; i++) {
                path.curve( // First control point
                xs[i] + dxs[i] / 3, ys[i] + ms[i] * dxs[i] / 3, // Second control point
                xs[i + 1] - dxs[i] / 3, ys[i + 1] - ms[i + 1] * dxs[i] / 3, // End point
                xs[i + 1], ys[i + 1], false, valueData[i + 1]);
              }

              return path;
            }
          };
        };
        /**
         * Step interpolation will cause the line chart to move in steps rather than diagonal or smoothed lines. This interpolation will create additional points that will also be drawn when the `showPoint` option is enabled.
         *
         * All smoothing functions within Chartist are factory functions that accept an options parameter. The step interpolation function accepts one configuration parameter `postpone`, that can be `true` or `false`. The default value is `true` and will cause the step to occur where the value actually changes. If a different behaviour is needed where the step is shifted to the left and happens before the actual value, this option can be set to `false`.
         *
         * @example
         * var chart = new Chartist.Line('.ct-chart', {
         *   labels: [1, 2, 3, 4, 5],
         *   series: [[1, 2, 8, 1, 7]]
         * }, {
         *   lineSmooth: Chartist.Interpolation.step({
         *     postpone: true,
         *     fillHoles: false
         *   })
         * });
         *
         * @memberof Chartist.Interpolation
         * @param options
         * @returns {Function}
         */


        Chartist.Interpolation.step = function (options) {
          var defaultOptions = {
            postpone: true,
            fillHoles: false
          };
          options = Chartist.extend({}, defaultOptions, options);
          return function step(pathCoordinates, valueData) {
            var path = new Chartist.Svg.Path();
            var prevX, prevY, prevData;

            for (var i = 0; i < pathCoordinates.length; i += 2) {
              var currX = pathCoordinates[i];
              var currY = pathCoordinates[i + 1];
              var currData = valueData[i / 2]; // If the current point is also not a hole we can draw the step lines

              if (currData.value !== undefined) {
                if (prevData === undefined) {
                  path.move(currX, currY, false, currData);
                } else {
                  if (options.postpone) {
                    // If postponed we should draw the step line with the value of the previous value
                    path.line(currX, prevY, false, prevData);
                  } else {
                    // If not postponed we should draw the step line with the value of the current value
                    path.line(prevX, currY, false, currData);
                  } // Line to the actual point (this should only be a Y-Axis movement


                  path.line(currX, currY, false, currData);
                }

                prevX = currX;
                prevY = currY;
                prevData = currData;
              } else if (!options.fillHoles) {
                prevX = prevY = prevData = undefined;
              }
            }

            return path;
          };
        };
      })(this || global, Chartist);

      ;
      /**
      * A very basic event module that helps to generate and catch events.
      *
      * @module Chartist.Event
      */

      /* global Chartist */

      (function (globalRoot, Chartist) {
        'use strict';

        Chartist.EventEmitter = function () {
          var handlers = [];
          /**
           * Add an event handler for a specific event
           *
           * @memberof Chartist.Event
           * @param {String} event The event name
           * @param {Function} handler A event handler function
           */

          function addEventHandler(event, handler) {
            handlers[event] = handlers[event] || [];
            handlers[event].push(handler);
          }
          /**
           * Remove an event handler of a specific event name or remove all event handlers for a specific event.
           *
           * @memberof Chartist.Event
           * @param {String} event The event name where a specific or all handlers should be removed
           * @param {Function} [handler] An optional event handler function. If specified only this specific handler will be removed and otherwise all handlers are removed.
           */


          function removeEventHandler(event, handler) {
            // Only do something if there are event handlers with this name existing
            if (handlers[event]) {
              // If handler is set we will look for a specific handler and only remove this
              if (handler) {
                handlers[event].splice(handlers[event].indexOf(handler), 1);

                if (handlers[event].length === 0) {
                  delete handlers[event];
                }
              } else {
                // If no handler is specified we remove all handlers for this event
                delete handlers[event];
              }
            }
          }
          /**
           * Use this function to emit an event. All handlers that are listening for this event will be triggered with the data parameter.
           *
           * @memberof Chartist.Event
           * @param {String} event The event name that should be triggered
           * @param {*} data Arbitrary data that will be passed to the event handler callback functions
           */


          function emit(event, data) {
            // Only do something if there are event handlers with this name existing
            if (handlers[event]) {
              handlers[event].forEach(function (handler) {
                handler(data);
              });
            } // Emit event to star event handlers


            if (handlers['*']) {
              handlers['*'].forEach(function (starHandler) {
                starHandler(event, data);
              });
            }
          }

          return {
            addEventHandler: addEventHandler,
            removeEventHandler: removeEventHandler,
            emit: emit
          };
        };
      })(this || global, Chartist);

      ;
      /**
      * This module provides some basic prototype inheritance utilities.
      *
      * @module Chartist.Class
      */

      /* global Chartist */

      (function (globalRoot, Chartist) {
        'use strict';

        function listToArray(list) {
          var arr = [];

          if (list.length) {
            for (var i = 0; i < list.length; i++) {
              arr.push(list[i]);
            }
          }

          return arr;
        }
        /**
         * Method to extend from current prototype.
         *
         * @memberof Chartist.Class
         * @param {Object} properties The object that serves as definition for the prototype that gets created for the new class. This object should always contain a constructor property that is the desired constructor for the newly created class.
         * @param {Object} [superProtoOverride] By default extens will use the current class prototype or Chartist.class. With this parameter you can specify any super prototype that will be used.
         * @return {Function} Constructor function of the new class
         *
         * @example
         * var Fruit = Class.extend({
           * color: undefined,
           *   sugar: undefined,
           *
           *   constructor: function(color, sugar) {
           *     this.color = color;
           *     this.sugar = sugar;
           *   },
           *
           *   eat: function() {
           *     this.sugar = 0;
           *     return this;
           *   }
           * });
         *
         * var Banana = Fruit.extend({
           *   length: undefined,
           *
           *   constructor: function(length, sugar) {
           *     Banana.super.constructor.call(this, 'Yellow', sugar);
           *     this.length = length;
           *   }
           * });
         *
         * var banana = new Banana(20, 40);
         * console.log('banana instanceof Fruit', banana instanceof Fruit);
         * console.log('Fruit is prototype of banana', Fruit.prototype.isPrototypeOf(banana));
         * console.log('bananas prototype is Fruit', Object.getPrototypeOf(banana) === Fruit.prototype);
         * console.log(banana.sugar);
         * console.log(banana.eat().sugar);
         * console.log(banana.color);
         */


        function extend(properties, superProtoOverride) {
          var superProto = superProtoOverride || this.prototype || Chartist.Class;
          var proto = Object.create(superProto);
          Chartist.Class.cloneDefinitions(proto, properties);

          var constr = function constr() {
            var fn = proto.constructor || function () {},
                instance; // If this is linked to the Chartist namespace the constructor was not called with new
            // To provide a fallback we will instantiate here and return the instance


            instance = this === Chartist ? Object.create(proto) : this;
            fn.apply(instance, Array.prototype.slice.call(arguments, 0)); // If this constructor was not called with new we need to return the instance
            // This will not harm when the constructor has been called with new as the returned value is ignored

            return instance;
          };

          constr.prototype = proto;
          constr["super"] = superProto;
          constr.extend = this.extend;
          return constr;
        } // Variable argument list clones args > 0 into args[0] and retruns modified args[0]


        function cloneDefinitions() {
          var args = listToArray(arguments);
          var target = args[0];
          args.splice(1, args.length - 1).forEach(function (source) {
            Object.getOwnPropertyNames(source).forEach(function (propName) {
              // If this property already exist in target we delete it first
              delete target[propName]; // Define the property with the descriptor from source

              Object.defineProperty(target, propName, Object.getOwnPropertyDescriptor(source, propName));
            });
          });
          return target;
        }

        Chartist.Class = {
          extend: extend,
          cloneDefinitions: cloneDefinitions
        };
      })(this || global, Chartist);

      ;
      /**
      * Base for all chart types. The methods in Chartist.Base are inherited to all chart types.
      *
      * @module Chartist.Base
      */

      /* global Chartist */

      (function (globalRoot, Chartist) {
        'use strict';

        var window = globalRoot.window; // TODO: Currently we need to re-draw the chart on window resize. This is usually very bad and will affect performance.
        // This is done because we can't work with relative coordinates when drawing the chart because SVG Path does not
        // work with relative positions yet. We need to check if we can do a viewBox hack to switch to percentage.
        // See http://mozilla.6506.n7.nabble.com/Specyfing-paths-with-percentages-unit-td247474.html
        // Update: can be done using the above method tested here: http://codepen.io/gionkunz/pen/KDvLj
        // The problem is with the label offsets that can't be converted into percentage and affecting the chart container

        /**
         * Updates the chart which currently does a full reconstruction of the SVG DOM
         *
         * @param {Object} [data] Optional data you'd like to set for the chart before it will update. If not specified the update method will use the data that is already configured with the chart.
         * @param {Object} [options] Optional options you'd like to add to the previous options for the chart before it will update. If not specified the update method will use the options that have been already configured with the chart.
         * @param {Boolean} [override] If set to true, the passed options will be used to extend the options that have been configured already. Otherwise the chart default options will be used as the base
         * @memberof Chartist.Base
         */

        function update(data, options, override) {
          if (data) {
            this.data = data || {};
            this.data.labels = this.data.labels || [];
            this.data.series = this.data.series || []; // Event for data transformation that allows to manipulate the data before it gets rendered in the charts

            this.eventEmitter.emit('data', {
              type: 'update',
              data: this.data
            });
          }

          if (options) {
            this.options = Chartist.extend({}, override ? this.options : this.defaultOptions, options); // If chartist was not initialized yet, we just set the options and leave the rest to the initialization
            // Otherwise we re-create the optionsProvider at this point

            if (!this.initializeTimeoutId) {
              this.optionsProvider.removeMediaQueryListeners();
              this.optionsProvider = Chartist.optionsProvider(this.options, this.responsiveOptions, this.eventEmitter);
            }
          } // Only re-created the chart if it has been initialized yet


          if (!this.initializeTimeoutId) {
            this.createChart(this.optionsProvider.getCurrentOptions());
          } // Return a reference to the chart object to chain up calls


          return this;
        }
        /**
         * This method can be called on the API object of each chart and will un-register all event listeners that were added to other components. This currently includes a window.resize listener as well as media query listeners if any responsive options have been provided. Use this function if you need to destroy and recreate Chartist charts dynamically.
         *
         * @memberof Chartist.Base
         */


        function detach() {
          // Only detach if initialization already occurred on this chart. If this chart still hasn't initialized (therefore
          // the initializationTimeoutId is still a valid timeout reference, we will clear the timeout
          if (!this.initializeTimeoutId) {
            window.removeEventListener('resize', this.resizeListener);
            this.optionsProvider.removeMediaQueryListeners();
          } else {
            window.clearTimeout(this.initializeTimeoutId);
          }

          return this;
        }
        /**
         * Use this function to register event handlers. The handler callbacks are synchronous and will run in the main thread rather than the event loop.
         *
         * @memberof Chartist.Base
         * @param {String} event Name of the event. Check the examples for supported events.
         * @param {Function} handler The handler function that will be called when an event with the given name was emitted. This function will receive a data argument which contains event data. See the example for more details.
         */


        function on(event, handler) {
          this.eventEmitter.addEventHandler(event, handler);
          return this;
        }
        /**
         * Use this function to un-register event handlers. If the handler function parameter is omitted all handlers for the given event will be un-registered.
         *
         * @memberof Chartist.Base
         * @param {String} event Name of the event for which a handler should be removed
         * @param {Function} [handler] The handler function that that was previously used to register a new event handler. This handler will be removed from the event handler list. If this parameter is omitted then all event handlers for the given event are removed from the list.
         */


        function off(event, handler) {
          this.eventEmitter.removeEventHandler(event, handler);
          return this;
        }

        function initialize() {
          // Add window resize listener that re-creates the chart
          window.addEventListener('resize', this.resizeListener); // Obtain current options based on matching media queries (if responsive options are given)
          // This will also register a listener that is re-creating the chart based on media changes

          this.optionsProvider = Chartist.optionsProvider(this.options, this.responsiveOptions, this.eventEmitter); // Register options change listener that will trigger a chart update

          this.eventEmitter.addEventHandler('optionsChanged', function () {
            this.update();
          }.bind(this)); // Before the first chart creation we need to register us with all plugins that are configured
          // Initialize all relevant plugins with our chart object and the plugin options specified in the config

          if (this.options.plugins) {
            this.options.plugins.forEach(function (plugin) {
              if (plugin instanceof Array) {
                plugin[0](this, plugin[1]);
              } else {
                plugin(this);
              }
            }.bind(this));
          } // Event for data transformation that allows to manipulate the data before it gets rendered in the charts


          this.eventEmitter.emit('data', {
            type: 'initial',
            data: this.data
          }); // Create the first chart

          this.createChart(this.optionsProvider.getCurrentOptions()); // As chart is initialized from the event loop now we can reset our timeout reference
          // This is important if the chart gets initialized on the same element twice

          this.initializeTimeoutId = undefined;
        }
        /**
         * Constructor of chart base class.
         *
         * @param query
         * @param data
         * @param defaultOptions
         * @param options
         * @param responsiveOptions
         * @constructor
         */


        function Base(query, data, defaultOptions, options, responsiveOptions) {
          this.container = Chartist.querySelector(query);
          this.data = data || {};
          this.data.labels = this.data.labels || [];
          this.data.series = this.data.series || [];
          this.defaultOptions = defaultOptions;
          this.options = options;
          this.responsiveOptions = responsiveOptions;
          this.eventEmitter = Chartist.EventEmitter();
          this.supportsForeignObject = Chartist.Svg.isSupported('Extensibility');
          this.supportsAnimations = Chartist.Svg.isSupported('AnimationEventsAttribute');

          this.resizeListener = function resizeListener() {
            this.update();
          }.bind(this);

          if (this.container) {
            // If chartist was already initialized in this container we are detaching all event listeners first
            if (this.container.__chartist__) {
              this.container.__chartist__.detach();
            }

            this.container.__chartist__ = this;
          } // Using event loop for first draw to make it possible to register event listeners in the same call stack where
          // the chart was created.


          this.initializeTimeoutId = setTimeout(initialize.bind(this), 0);
        } // Creating the chart base class


        Chartist.Base = Chartist.Class.extend({
          constructor: Base,
          optionsProvider: undefined,
          container: undefined,
          svg: undefined,
          eventEmitter: undefined,
          createChart: function createChart() {
            throw new Error('Base chart type can\'t be instantiated!');
          },
          update: update,
          detach: detach,
          on: on,
          off: off,
          version: Chartist.version,
          supportsForeignObject: false
        });
      })(this || global, Chartist);

      ;
      /**
      * Chartist SVG module for simple SVG DOM abstraction
      *
      * @module Chartist.Svg
      */

      /* global Chartist */

      (function (globalRoot, Chartist) {
        'use strict';

        var document = globalRoot.document;
        /**
         * Chartist.Svg creates a new SVG object wrapper with a starting element. You can use the wrapper to fluently create sub-elements and modify them.
         *
         * @memberof Chartist.Svg
         * @constructor
         * @param {String|Element} name The name of the SVG element to create or an SVG dom element which should be wrapped into Chartist.Svg
         * @param {Object} attributes An object with properties that will be added as attributes to the SVG element that is created. Attributes with undefined values will not be added.
         * @param {String} className This class or class list will be added to the SVG element
         * @param {Object} parent The parent SVG wrapper object where this newly created wrapper and it's element will be attached to as child
         * @param {Boolean} insertFirst If this param is set to true in conjunction with a parent element the newly created element will be added as first child element in the parent element
         */

        function Svg(name, attributes, className, parent, insertFirst) {
          // If Svg is getting called with an SVG element we just return the wrapper
          if (name instanceof Element) {
            this._node = name;
          } else {
            this._node = document.createElementNS(Chartist.namespaces.svg, name); // If this is an SVG element created then custom namespace

            if (name === 'svg') {
              this.attr({
                'xmlns:ct': Chartist.namespaces.ct
              });
            }
          }

          if (attributes) {
            this.attr(attributes);
          }

          if (className) {
            this.addClass(className);
          }

          if (parent) {
            if (insertFirst && parent._node.firstChild) {
              parent._node.insertBefore(this._node, parent._node.firstChild);
            } else {
              parent._node.appendChild(this._node);
            }
          }
        }
        /**
         * Set attributes on the current SVG element of the wrapper you're currently working on.
         *
         * @memberof Chartist.Svg
         * @param {Object|String} attributes An object with properties that will be added as attributes to the SVG element that is created. Attributes with undefined values will not be added. If this parameter is a String then the function is used as a getter and will return the attribute value.
         * @param {String} [ns] If specified, the attribute will be obtained using getAttributeNs. In order to write namepsaced attributes you can use the namespace:attribute notation within the attributes object.
         * @return {Object|String} The current wrapper object will be returned so it can be used for chaining or the attribute value if used as getter function.
         */


        function attr(attributes, ns) {
          if (typeof attributes === 'string') {
            if (ns) {
              return this._node.getAttributeNS(ns, attributes);
            } else {
              return this._node.getAttribute(attributes);
            }
          }

          Object.keys(attributes).forEach(function (key) {
            // If the attribute value is undefined we can skip this one
            if (attributes[key] === undefined) {
              return;
            }

            if (key.indexOf(':') !== -1) {
              var namespacedAttribute = key.split(':');

              this._node.setAttributeNS(Chartist.namespaces[namespacedAttribute[0]], key, attributes[key]);
            } else {
              this._node.setAttribute(key, attributes[key]);
            }
          }.bind(this));
          return this;
        }
        /**
         * Create a new SVG element whose wrapper object will be selected for further operations. This way you can also create nested groups easily.
         *
         * @memberof Chartist.Svg
         * @param {String} name The name of the SVG element that should be created as child element of the currently selected element wrapper
         * @param {Object} [attributes] An object with properties that will be added as attributes to the SVG element that is created. Attributes with undefined values will not be added.
         * @param {String} [className] This class or class list will be added to the SVG element
         * @param {Boolean} [insertFirst] If this param is set to true in conjunction with a parent element the newly created element will be added as first child element in the parent element
         * @return {Chartist.Svg} Returns a Chartist.Svg wrapper object that can be used to modify the containing SVG data
         */


        function elem(name, attributes, className, insertFirst) {
          return new Chartist.Svg(name, attributes, className, this, insertFirst);
        }
        /**
         * Returns the parent Chartist.SVG wrapper object
         *
         * @memberof Chartist.Svg
         * @return {Chartist.Svg} Returns a Chartist.Svg wrapper around the parent node of the current node. If the parent node is not existing or it's not an SVG node then this function will return null.
         */


        function parent() {
          return this._node.parentNode instanceof SVGElement ? new Chartist.Svg(this._node.parentNode) : null;
        }
        /**
         * This method returns a Chartist.Svg wrapper around the root SVG element of the current tree.
         *
         * @memberof Chartist.Svg
         * @return {Chartist.Svg} The root SVG element wrapped in a Chartist.Svg element
         */


        function root() {
          var node = this._node;

          while (node.nodeName !== 'svg') {
            node = node.parentNode;
          }

          return new Chartist.Svg(node);
        }
        /**
         * Find the first child SVG element of the current element that matches a CSS selector. The returned object is a Chartist.Svg wrapper.
         *
         * @memberof Chartist.Svg
         * @param {String} selector A CSS selector that is used to query for child SVG elements
         * @return {Chartist.Svg} The SVG wrapper for the element found or null if no element was found
         */


        function querySelector(selector) {
          var foundNode = this._node.querySelector(selector);

          return foundNode ? new Chartist.Svg(foundNode) : null;
        }
        /**
         * Find the all child SVG elements of the current element that match a CSS selector. The returned object is a Chartist.Svg.List wrapper.
         *
         * @memberof Chartist.Svg
         * @param {String} selector A CSS selector that is used to query for child SVG elements
         * @return {Chartist.Svg.List} The SVG wrapper list for the element found or null if no element was found
         */


        function querySelectorAll(selector) {
          var foundNodes = this._node.querySelectorAll(selector);

          return foundNodes.length ? new Chartist.Svg.List(foundNodes) : null;
        }
        /**
         * Returns the underlying SVG node for the current element.
         *
         * @memberof Chartist.Svg
         * @returns {Node}
         */


        function getNode() {
          return this._node;
        }
        /**
         * This method creates a foreignObject (see https://developer.mozilla.org/en-US/docs/Web/SVG/Element/foreignObject) that allows to embed HTML content into a SVG graphic. With the help of foreignObjects you can enable the usage of regular HTML elements inside of SVG where they are subject for SVG positioning and transformation but the Browser will use the HTML rendering capabilities for the containing DOM.
         *
         * @memberof Chartist.Svg
         * @param {Node|String} content The DOM Node, or HTML string that will be converted to a DOM Node, that is then placed into and wrapped by the foreignObject
         * @param {String} [attributes] An object with properties that will be added as attributes to the foreignObject element that is created. Attributes with undefined values will not be added.
         * @param {String} [className] This class or class list will be added to the SVG element
         * @param {Boolean} [insertFirst] Specifies if the foreignObject should be inserted as first child
         * @return {Chartist.Svg} New wrapper object that wraps the foreignObject element
         */


        function foreignObject(content, attributes, className, insertFirst) {
          // If content is string then we convert it to DOM
          // TODO: Handle case where content is not a string nor a DOM Node
          if (typeof content === 'string') {
            var container = document.createElement('div');
            container.innerHTML = content;
            content = container.firstChild;
          } // Adding namespace to content element


          content.setAttribute('xmlns', Chartist.namespaces.xmlns); // Creating the foreignObject without required extension attribute (as described here
          // http://www.w3.org/TR/SVG/extend.html#ForeignObjectElement)

          var fnObj = this.elem('foreignObject', attributes, className, insertFirst); // Add content to foreignObjectElement

          fnObj._node.appendChild(content);

          return fnObj;
        }
        /**
         * This method adds a new text element to the current Chartist.Svg wrapper.
         *
         * @memberof Chartist.Svg
         * @param {String} t The text that should be added to the text element that is created
         * @return {Chartist.Svg} The same wrapper object that was used to add the newly created element
         */


        function text(t) {
          this._node.appendChild(document.createTextNode(t));

          return this;
        }
        /**
         * This method will clear all child nodes of the current wrapper object.
         *
         * @memberof Chartist.Svg
         * @return {Chartist.Svg} The same wrapper object that got emptied
         */


        function empty() {
          while (this._node.firstChild) {
            this._node.removeChild(this._node.firstChild);
          }

          return this;
        }
        /**
         * This method will cause the current wrapper to remove itself from its parent wrapper. Use this method if you'd like to get rid of an element in a given DOM structure.
         *
         * @memberof Chartist.Svg
         * @return {Chartist.Svg} The parent wrapper object of the element that got removed
         */


        function remove() {
          this._node.parentNode.removeChild(this._node);

          return this.parent();
        }
        /**
         * This method will replace the element with a new element that can be created outside of the current DOM.
         *
         * @memberof Chartist.Svg
         * @param {Chartist.Svg} newElement The new Chartist.Svg object that will be used to replace the current wrapper object
         * @return {Chartist.Svg} The wrapper of the new element
         */


        function replace(newElement) {
          this._node.parentNode.replaceChild(newElement._node, this._node);

          return newElement;
        }
        /**
         * This method will append an element to the current element as a child.
         *
         * @memberof Chartist.Svg
         * @param {Chartist.Svg} element The Chartist.Svg element that should be added as a child
         * @param {Boolean} [insertFirst] Specifies if the element should be inserted as first child
         * @return {Chartist.Svg} The wrapper of the appended object
         */


        function append(element, insertFirst) {
          if (insertFirst && this._node.firstChild) {
            this._node.insertBefore(element._node, this._node.firstChild);
          } else {
            this._node.appendChild(element._node);
          }

          return this;
        }
        /**
         * Returns an array of class names that are attached to the current wrapper element. This method can not be chained further.
         *
         * @memberof Chartist.Svg
         * @return {Array} A list of classes or an empty array if there are no classes on the current element
         */


        function classes() {
          return this._node.getAttribute('class') ? this._node.getAttribute('class').trim().split(/\s+/) : [];
        }
        /**
         * Adds one or a space separated list of classes to the current element and ensures the classes are only existing once.
         *
         * @memberof Chartist.Svg
         * @param {String} names A white space separated list of class names
         * @return {Chartist.Svg} The wrapper of the current element
         */


        function addClass(names) {
          this._node.setAttribute('class', this.classes(this._node).concat(names.trim().split(/\s+/)).filter(function (elem, pos, self) {
            return self.indexOf(elem) === pos;
          }).join(' '));

          return this;
        }
        /**
         * Removes one or a space separated list of classes from the current element.
         *
         * @memberof Chartist.Svg
         * @param {String} names A white space separated list of class names
         * @return {Chartist.Svg} The wrapper of the current element
         */


        function removeClass(names) {
          var removedClasses = names.trim().split(/\s+/);

          this._node.setAttribute('class', this.classes(this._node).filter(function (name) {
            return removedClasses.indexOf(name) === -1;
          }).join(' '));

          return this;
        }
        /**
         * Removes all classes from the current element.
         *
         * @memberof Chartist.Svg
         * @return {Chartist.Svg} The wrapper of the current element
         */


        function removeAllClasses() {
          this._node.setAttribute('class', '');

          return this;
        }
        /**
         * Get element height using `getBoundingClientRect`
         *
         * @memberof Chartist.Svg
         * @return {Number} The elements height in pixels
         */


        function height() {
          return this._node.getBoundingClientRect().height;
        }
        /**
         * Get element width using `getBoundingClientRect`
         *
         * @memberof Chartist.Core
         * @return {Number} The elements width in pixels
         */


        function width() {
          return this._node.getBoundingClientRect().width;
        }
        /**
         * The animate function lets you animate the current element with SMIL animations. You can add animations for multiple attributes at the same time by using an animation definition object. This object should contain SMIL animation attributes. Please refer to http://www.w3.org/TR/SVG/animate.html for a detailed specification about the available animation attributes. Additionally an easing property can be passed in the animation definition object. This can be a string with a name of an easing function in `Chartist.Svg.Easing` or an array with four numbers specifying a cubic Bézier curve.
         * **An animations object could look like this:**
         * ```javascript
         * element.animate({
         *   opacity: {
         *     dur: 1000,
         *     from: 0,
         *     to: 1
         *   },
         *   x1: {
         *     dur: '1000ms',
         *     from: 100,
         *     to: 200,
         *     easing: 'easeOutQuart'
         *   },
         *   y1: {
         *     dur: '2s',
         *     from: 0,
         *     to: 100
         *   }
         * });
         * ```
         * **Automatic unit conversion**
         * For the `dur` and the `begin` animate attribute you can also omit a unit by passing a number. The number will automatically be converted to milli seconds.
         * **Guided mode**
         * The default behavior of SMIL animations with offset using the `begin` attribute is that the attribute will keep it's original value until the animation starts. Mostly this behavior is not desired as you'd like to have your element attributes already initialized with the animation `from` value even before the animation starts. Also if you don't specify `fill="freeze"` on an animate element or if you delete the animation after it's done (which is done in guided mode) the attribute will switch back to the initial value. This behavior is also not desired when performing simple one-time animations. For one-time animations you'd want to trigger animations immediately instead of relative to the document begin time. That's why in guided mode Chartist.Svg will also use the `begin` property to schedule a timeout and manually start the animation after the timeout. If you're using multiple SMIL definition objects for an attribute (in an array), guided mode will be disabled for this attribute, even if you explicitly enabled it.
         * If guided mode is enabled the following behavior is added:
         * - Before the animation starts (even when delayed with `begin`) the animated attribute will be set already to the `from` value of the animation
         * - `begin` is explicitly set to `indefinite` so it can be started manually without relying on document begin time (creation)
         * - The animate element will be forced to use `fill="freeze"`
         * - The animation will be triggered with `beginElement()` in a timeout where `begin` of the definition object is interpreted in milli seconds. If no `begin` was specified the timeout is triggered immediately.
         * - After the animation the element attribute value will be set to the `to` value of the animation
         * - The animate element is deleted from the DOM
         *
         * @memberof Chartist.Svg
         * @param {Object} animations An animations object where the property keys are the attributes you'd like to animate. The properties should be objects again that contain the SMIL animation attributes (usually begin, dur, from, and to). The property begin and dur is auto converted (see Automatic unit conversion). You can also schedule multiple animations for the same attribute by passing an Array of SMIL definition objects. Attributes that contain an array of SMIL definition objects will not be executed in guided mode.
         * @param {Boolean} guided Specify if guided mode should be activated for this animation (see Guided mode). If not otherwise specified, guided mode will be activated.
         * @param {Object} eventEmitter If specified, this event emitter will be notified when an animation starts or ends.
         * @return {Chartist.Svg} The current element where the animation was added
         */


        function animate(animations, guided, eventEmitter) {
          if (guided === undefined) {
            guided = true;
          }

          Object.keys(animations).forEach(function createAnimateForAttributes(attribute) {
            function createAnimate(animationDefinition, guided) {
              var attributeProperties = {},
                  animate,
                  timeout,
                  easing; // Check if an easing is specified in the definition object and delete it from the object as it will not
              // be part of the animate element attributes.

              if (animationDefinition.easing) {
                // If already an easing Bézier curve array we take it or we lookup a easing array in the Easing object
                easing = animationDefinition.easing instanceof Array ? animationDefinition.easing : Chartist.Svg.Easing[animationDefinition.easing];
                delete animationDefinition.easing;
              } // If numeric dur or begin was provided we assume milli seconds


              animationDefinition.begin = Chartist.ensureUnit(animationDefinition.begin, 'ms');
              animationDefinition.dur = Chartist.ensureUnit(animationDefinition.dur, 'ms');

              if (easing) {
                animationDefinition.calcMode = 'spline';
                animationDefinition.keySplines = easing.join(' ');
                animationDefinition.keyTimes = '0;1';
              } // Adding "fill: freeze" if we are in guided mode and set initial attribute values


              if (guided) {
                animationDefinition.fill = 'freeze'; // Animated property on our element should already be set to the animation from value in guided mode

                attributeProperties[attribute] = animationDefinition.from;
                this.attr(attributeProperties); // In guided mode we also set begin to indefinite so we can trigger the start manually and put the begin
                // which needs to be in ms aside

                timeout = Chartist.quantity(animationDefinition.begin || 0).value;
                animationDefinition.begin = 'indefinite';
              }

              animate = this.elem('animate', Chartist.extend({
                attributeName: attribute
              }, animationDefinition));

              if (guided) {
                // If guided we take the value that was put aside in timeout and trigger the animation manually with a timeout
                setTimeout(function () {
                  // If beginElement fails we set the animated attribute to the end position and remove the animate element
                  // This happens if the SMIL ElementTimeControl interface is not supported or any other problems occured in
                  // the browser. (Currently FF 34 does not support animate elements in foreignObjects)
                  try {
                    animate._node.beginElement();
                  } catch (err) {
                    // Set animated attribute to current animated value
                    attributeProperties[attribute] = animationDefinition.to;
                    this.attr(attributeProperties); // Remove the animate element as it's no longer required

                    animate.remove();
                  }
                }.bind(this), timeout);
              }

              if (eventEmitter) {
                animate._node.addEventListener('beginEvent', function handleBeginEvent() {
                  eventEmitter.emit('animationBegin', {
                    element: this,
                    animate: animate._node,
                    params: animationDefinition
                  });
                }.bind(this));
              }

              animate._node.addEventListener('endEvent', function handleEndEvent() {
                if (eventEmitter) {
                  eventEmitter.emit('animationEnd', {
                    element: this,
                    animate: animate._node,
                    params: animationDefinition
                  });
                }

                if (guided) {
                  // Set animated attribute to current animated value
                  attributeProperties[attribute] = animationDefinition.to;
                  this.attr(attributeProperties); // Remove the animate element as it's no longer required

                  animate.remove();
                }
              }.bind(this));
            } // If current attribute is an array of definition objects we create an animate for each and disable guided mode


            if (animations[attribute] instanceof Array) {
              animations[attribute].forEach(function (animationDefinition) {
                createAnimate.bind(this)(animationDefinition, false);
              }.bind(this));
            } else {
              createAnimate.bind(this)(animations[attribute], guided);
            }
          }.bind(this));
          return this;
        }

        Chartist.Svg = Chartist.Class.extend({
          constructor: Svg,
          attr: attr,
          elem: elem,
          parent: parent,
          root: root,
          querySelector: querySelector,
          querySelectorAll: querySelectorAll,
          getNode: getNode,
          foreignObject: foreignObject,
          text: text,
          empty: empty,
          remove: remove,
          replace: replace,
          append: append,
          classes: classes,
          addClass: addClass,
          removeClass: removeClass,
          removeAllClasses: removeAllClasses,
          height: height,
          width: width,
          animate: animate
        });
        /**
         * This method checks for support of a given SVG feature like Extensibility, SVG-animation or the like. Check http://www.w3.org/TR/SVG11/feature for a detailed list.
         *
         * @memberof Chartist.Svg
         * @param {String} feature The SVG 1.1 feature that should be checked for support.
         * @return {Boolean} True of false if the feature is supported or not
         */

        Chartist.Svg.isSupported = function (feature) {
          return document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#' + feature, '1.1');
        };
        /**
         * This Object contains some standard easing cubic bezier curves. Then can be used with their name in the `Chartist.Svg.animate`. You can also extend the list and use your own name in the `animate` function. Click the show code button to see the available bezier functions.
         *
         * @memberof Chartist.Svg
         */


        var easingCubicBeziers = {
          easeInSine: [0.47, 0, 0.745, 0.715],
          easeOutSine: [0.39, 0.575, 0.565, 1],
          easeInOutSine: [0.445, 0.05, 0.55, 0.95],
          easeInQuad: [0.55, 0.085, 0.68, 0.53],
          easeOutQuad: [0.25, 0.46, 0.45, 0.94],
          easeInOutQuad: [0.455, 0.03, 0.515, 0.955],
          easeInCubic: [0.55, 0.055, 0.675, 0.19],
          easeOutCubic: [0.215, 0.61, 0.355, 1],
          easeInOutCubic: [0.645, 0.045, 0.355, 1],
          easeInQuart: [0.895, 0.03, 0.685, 0.22],
          easeOutQuart: [0.165, 0.84, 0.44, 1],
          easeInOutQuart: [0.77, 0, 0.175, 1],
          easeInQuint: [0.755, 0.05, 0.855, 0.06],
          easeOutQuint: [0.23, 1, 0.32, 1],
          easeInOutQuint: [0.86, 0, 0.07, 1],
          easeInExpo: [0.95, 0.05, 0.795, 0.035],
          easeOutExpo: [0.19, 1, 0.22, 1],
          easeInOutExpo: [1, 0, 0, 1],
          easeInCirc: [0.6, 0.04, 0.98, 0.335],
          easeOutCirc: [0.075, 0.82, 0.165, 1],
          easeInOutCirc: [0.785, 0.135, 0.15, 0.86],
          easeInBack: [0.6, -0.28, 0.735, 0.045],
          easeOutBack: [0.175, 0.885, 0.32, 1.275],
          easeInOutBack: [0.68, -0.55, 0.265, 1.55]
        };
        Chartist.Svg.Easing = easingCubicBeziers;
        /**
         * This helper class is to wrap multiple `Chartist.Svg` elements into a list where you can call the `Chartist.Svg` functions on all elements in the list with one call. This is helpful when you'd like to perform calls with `Chartist.Svg` on multiple elements.
         * An instance of this class is also returned by `Chartist.Svg.querySelectorAll`.
         *
         * @memberof Chartist.Svg
         * @param {Array<Node>|NodeList} nodeList An Array of SVG DOM nodes or a SVG DOM NodeList (as returned by document.querySelectorAll)
         * @constructor
         */

        function SvgList(nodeList) {
          var list = this;
          this.svgElements = [];

          for (var i = 0; i < nodeList.length; i++) {
            this.svgElements.push(new Chartist.Svg(nodeList[i]));
          } // Add delegation methods for Chartist.Svg


          Object.keys(Chartist.Svg.prototype).filter(function (prototypeProperty) {
            return ['constructor', 'parent', 'querySelector', 'querySelectorAll', 'replace', 'append', 'classes', 'height', 'width'].indexOf(prototypeProperty) === -1;
          }).forEach(function (prototypeProperty) {
            list[prototypeProperty] = function () {
              var args = Array.prototype.slice.call(arguments, 0);
              list.svgElements.forEach(function (element) {
                Chartist.Svg.prototype[prototypeProperty].apply(element, args);
              });
              return list;
            };
          });
        }

        Chartist.Svg.List = Chartist.Class.extend({
          constructor: SvgList
        });
      })(this || global, Chartist);

      ;
      /**
      * Chartist SVG path module for SVG path description creation and modification.
      *
      * @module Chartist.Svg.Path
      */

      /* global Chartist */

      (function (globalRoot, Chartist) {
        'use strict';
        /**
         * Contains the descriptors of supported element types in a SVG path. Currently only move, line and curve are supported.
         *
         * @memberof Chartist.Svg.Path
         * @type {Object}
         */

        var elementDescriptions = {
          m: ['x', 'y'],
          l: ['x', 'y'],
          c: ['x1', 'y1', 'x2', 'y2', 'x', 'y'],
          a: ['rx', 'ry', 'xAr', 'lAf', 'sf', 'x', 'y']
        };
        /**
         * Default options for newly created SVG path objects.
         *
         * @memberof Chartist.Svg.Path
         * @type {Object}
         */

        var defaultOptions = {
          // The accuracy in digit count after the decimal point. This will be used to round numbers in the SVG path. If this option is set to false then no rounding will be performed.
          accuracy: 3
        };

        function element(command, params, pathElements, pos, relative, data) {
          var pathElement = Chartist.extend({
            command: relative ? command.toLowerCase() : command.toUpperCase()
          }, params, data ? {
            data: data
          } : {});
          pathElements.splice(pos, 0, pathElement);
        }

        function forEachParam(pathElements, cb) {
          pathElements.forEach(function (pathElement, pathElementIndex) {
            elementDescriptions[pathElement.command.toLowerCase()].forEach(function (paramName, paramIndex) {
              cb(pathElement, paramName, pathElementIndex, paramIndex, pathElements);
            });
          });
        }
        /**
         * Used to construct a new path object.
         *
         * @memberof Chartist.Svg.Path
         * @param {Boolean} close If set to true then this path will be closed when stringified (with a Z at the end)
         * @param {Object} options Options object that overrides the default objects. See default options for more details.
         * @constructor
         */


        function SvgPath(close, options) {
          this.pathElements = [];
          this.pos = 0;
          this.close = close;
          this.options = Chartist.extend({}, defaultOptions, options);
        }
        /**
         * Gets or sets the current position (cursor) inside of the path. You can move around the cursor freely but limited to 0 or the count of existing elements. All modifications with element functions will insert new elements at the position of this cursor.
         *
         * @memberof Chartist.Svg.Path
         * @param {Number} [pos] If a number is passed then the cursor is set to this position in the path element array.
         * @return {Chartist.Svg.Path|Number} If the position parameter was passed then the return value will be the path object for easy call chaining. If no position parameter was passed then the current position is returned.
         */


        function position(pos) {
          if (pos !== undefined) {
            this.pos = Math.max(0, Math.min(this.pathElements.length, pos));
            return this;
          } else {
            return this.pos;
          }
        }
        /**
         * Removes elements from the path starting at the current position.
         *
         * @memberof Chartist.Svg.Path
         * @param {Number} count Number of path elements that should be removed from the current position.
         * @return {Chartist.Svg.Path} The current path object for easy call chaining.
         */


        function remove(count) {
          this.pathElements.splice(this.pos, count);
          return this;
        }
        /**
         * Use this function to add a new move SVG path element.
         *
         * @memberof Chartist.Svg.Path
         * @param {Number} x The x coordinate for the move element.
         * @param {Number} y The y coordinate for the move element.
         * @param {Boolean} [relative] If set to true the move element will be created with relative coordinates (lowercase letter)
         * @param {*} [data] Any data that should be stored with the element object that will be accessible in pathElement
         * @return {Chartist.Svg.Path} The current path object for easy call chaining.
         */


        function move(x, y, relative, data) {
          element('M', {
            x: +x,
            y: +y
          }, this.pathElements, this.pos++, relative, data);
          return this;
        }
        /**
         * Use this function to add a new line SVG path element.
         *
         * @memberof Chartist.Svg.Path
         * @param {Number} x The x coordinate for the line element.
         * @param {Number} y The y coordinate for the line element.
         * @param {Boolean} [relative] If set to true the line element will be created with relative coordinates (lowercase letter)
         * @param {*} [data] Any data that should be stored with the element object that will be accessible in pathElement
         * @return {Chartist.Svg.Path} The current path object for easy call chaining.
         */


        function line(x, y, relative, data) {
          element('L', {
            x: +x,
            y: +y
          }, this.pathElements, this.pos++, relative, data);
          return this;
        }
        /**
         * Use this function to add a new curve SVG path element.
         *
         * @memberof Chartist.Svg.Path
         * @param {Number} x1 The x coordinate for the first control point of the bezier curve.
         * @param {Number} y1 The y coordinate for the first control point of the bezier curve.
         * @param {Number} x2 The x coordinate for the second control point of the bezier curve.
         * @param {Number} y2 The y coordinate for the second control point of the bezier curve.
         * @param {Number} x The x coordinate for the target point of the curve element.
         * @param {Number} y The y coordinate for the target point of the curve element.
         * @param {Boolean} [relative] If set to true the curve element will be created with relative coordinates (lowercase letter)
         * @param {*} [data] Any data that should be stored with the element object that will be accessible in pathElement
         * @return {Chartist.Svg.Path} The current path object for easy call chaining.
         */


        function curve(x1, y1, x2, y2, x, y, relative, data) {
          element('C', {
            x1: +x1,
            y1: +y1,
            x2: +x2,
            y2: +y2,
            x: +x,
            y: +y
          }, this.pathElements, this.pos++, relative, data);
          return this;
        }
        /**
         * Use this function to add a new non-bezier curve SVG path element.
         *
         * @memberof Chartist.Svg.Path
         * @param {Number} rx The radius to be used for the x-axis of the arc.
         * @param {Number} ry The radius to be used for the y-axis of the arc.
         * @param {Number} xAr Defines the orientation of the arc
         * @param {Number} lAf Large arc flag
         * @param {Number} sf Sweep flag
         * @param {Number} x The x coordinate for the target point of the curve element.
         * @param {Number} y The y coordinate for the target point of the curve element.
         * @param {Boolean} [relative] If set to true the curve element will be created with relative coordinates (lowercase letter)
         * @param {*} [data] Any data that should be stored with the element object that will be accessible in pathElement
         * @return {Chartist.Svg.Path} The current path object for easy call chaining.
         */


        function arc(rx, ry, xAr, lAf, sf, x, y, relative, data) {
          element('A', {
            rx: +rx,
            ry: +ry,
            xAr: +xAr,
            lAf: +lAf,
            sf: +sf,
            x: +x,
            y: +y
          }, this.pathElements, this.pos++, relative, data);
          return this;
        }
        /**
         * Parses an SVG path seen in the d attribute of path elements, and inserts the parsed elements into the existing path object at the current cursor position. Any closing path indicators (Z at the end of the path) will be ignored by the parser as this is provided by the close option in the options of the path object.
         *
         * @memberof Chartist.Svg.Path
         * @param {String} path Any SVG path that contains move (m), line (l) or curve (c) components.
         * @return {Chartist.Svg.Path} The current path object for easy call chaining.
         */


        function parse(path) {
          // Parsing the SVG path string into an array of arrays [['M', '10', '10'], ['L', '100', '100']]
          var chunks = path.replace(/([A-Za-z])([0-9])/g, '$1 $2').replace(/([0-9])([A-Za-z])/g, '$1 $2').split(/[\s,]+/).reduce(function (result, element) {
            if (element.match(/[A-Za-z]/)) {
              result.push([]);
            }

            result[result.length - 1].push(element);
            return result;
          }, []); // If this is a closed path we remove the Z at the end because this is determined by the close option

          if (chunks[chunks.length - 1][0].toUpperCase() === 'Z') {
            chunks.pop();
          } // Using svgPathElementDescriptions to map raw path arrays into objects that contain the command and the parameters
          // For example {command: 'M', x: '10', y: '10'}


          var elements = chunks.map(function (chunk) {
            var command = chunk.shift(),
                description = elementDescriptions[command.toLowerCase()];
            return Chartist.extend({
              command: command
            }, description.reduce(function (result, paramName, index) {
              result[paramName] = +chunk[index];
              return result;
            }, {}));
          }); // Preparing a splice call with the elements array as var arg params and insert the parsed elements at the current position

          var spliceArgs = [this.pos, 0];
          Array.prototype.push.apply(spliceArgs, elements);
          Array.prototype.splice.apply(this.pathElements, spliceArgs); // Increase the internal position by the element count

          this.pos += elements.length;
          return this;
        }
        /**
         * This function renders to current SVG path object into a final SVG string that can be used in the d attribute of SVG path elements. It uses the accuracy option to round big decimals. If the close parameter was set in the constructor of this path object then a path closing Z will be appended to the output string.
         *
         * @memberof Chartist.Svg.Path
         * @return {String}
         */


        function stringify() {
          var accuracyMultiplier = Math.pow(10, this.options.accuracy);
          return this.pathElements.reduce(function (path, pathElement) {
            var params = elementDescriptions[pathElement.command.toLowerCase()].map(function (paramName) {
              return this.options.accuracy ? Math.round(pathElement[paramName] * accuracyMultiplier) / accuracyMultiplier : pathElement[paramName];
            }.bind(this));
            return path + pathElement.command + params.join(',');
          }.bind(this), '') + (this.close ? 'Z' : '');
        }
        /**
         * Scales all elements in the current SVG path object. There is an individual parameter for each coordinate. Scaling will also be done for control points of curves, affecting the given coordinate.
         *
         * @memberof Chartist.Svg.Path
         * @param {Number} x The number which will be used to scale the x, x1 and x2 of all path elements.
         * @param {Number} y The number which will be used to scale the y, y1 and y2 of all path elements.
         * @return {Chartist.Svg.Path} The current path object for easy call chaining.
         */


        function scale(x, y) {
          forEachParam(this.pathElements, function (pathElement, paramName) {
            pathElement[paramName] *= paramName[0] === 'x' ? x : y;
          });
          return this;
        }
        /**
         * Translates all elements in the current SVG path object. The translation is relative and there is an individual parameter for each coordinate. Translation will also be done for control points of curves, affecting the given coordinate.
         *
         * @memberof Chartist.Svg.Path
         * @param {Number} x The number which will be used to translate the x, x1 and x2 of all path elements.
         * @param {Number} y The number which will be used to translate the y, y1 and y2 of all path elements.
         * @return {Chartist.Svg.Path} The current path object for easy call chaining.
         */


        function translate(x, y) {
          forEachParam(this.pathElements, function (pathElement, paramName) {
            pathElement[paramName] += paramName[0] === 'x' ? x : y;
          });
          return this;
        }
        /**
         * This function will run over all existing path elements and then loop over their attributes. The callback function will be called for every path element attribute that exists in the current path.
         * The method signature of the callback function looks like this:
         * ```javascript
         * function(pathElement, paramName, pathElementIndex, paramIndex, pathElements)
         * ```
         * If something else than undefined is returned by the callback function, this value will be used to replace the old value. This allows you to build custom transformations of path objects that can't be achieved using the basic transformation functions scale and translate.
         *
         * @memberof Chartist.Svg.Path
         * @param {Function} transformFnc The callback function for the transformation. Check the signature in the function description.
         * @return {Chartist.Svg.Path} The current path object for easy call chaining.
         */


        function transform(transformFnc) {
          forEachParam(this.pathElements, function (pathElement, paramName, pathElementIndex, paramIndex, pathElements) {
            var transformed = transformFnc(pathElement, paramName, pathElementIndex, paramIndex, pathElements);

            if (transformed || transformed === 0) {
              pathElement[paramName] = transformed;
            }
          });
          return this;
        }
        /**
         * This function clones a whole path object with all its properties. This is a deep clone and path element objects will also be cloned.
         *
         * @memberof Chartist.Svg.Path
         * @param {Boolean} [close] Optional option to set the new cloned path to closed. If not specified or false, the original path close option will be used.
         * @return {Chartist.Svg.Path}
         */


        function clone(close) {
          var c = new Chartist.Svg.Path(close || this.close);
          c.pos = this.pos;
          c.pathElements = this.pathElements.slice().map(function cloneElements(pathElement) {
            return Chartist.extend({}, pathElement);
          });
          c.options = Chartist.extend({}, this.options);
          return c;
        }
        /**
         * Split a Svg.Path object by a specific command in the path chain. The path chain will be split and an array of newly created paths objects will be returned. This is useful if you'd like to split an SVG path by it's move commands, for example, in order to isolate chunks of drawings.
         *
         * @memberof Chartist.Svg.Path
         * @param {String} command The command you'd like to use to split the path
         * @return {Array<Chartist.Svg.Path>}
         */


        function splitByCommand(command) {
          var split = [new Chartist.Svg.Path()];
          this.pathElements.forEach(function (pathElement) {
            if (pathElement.command === command.toUpperCase() && split[split.length - 1].pathElements.length !== 0) {
              split.push(new Chartist.Svg.Path());
            }

            split[split.length - 1].pathElements.push(pathElement);
          });
          return split;
        }
        /**
         * This static function on `Chartist.Svg.Path` is joining multiple paths together into one paths.
         *
         * @memberof Chartist.Svg.Path
         * @param {Array<Chartist.Svg.Path>} paths A list of paths to be joined together. The order is important.
         * @param {boolean} close If the newly created path should be a closed path
         * @param {Object} options Path options for the newly created path.
         * @return {Chartist.Svg.Path}
         */


        function join(paths, close, options) {
          var joinedPath = new Chartist.Svg.Path(close, options);

          for (var i = 0; i < paths.length; i++) {
            var path = paths[i];

            for (var j = 0; j < path.pathElements.length; j++) {
              joinedPath.pathElements.push(path.pathElements[j]);
            }
          }

          return joinedPath;
        }

        Chartist.Svg.Path = Chartist.Class.extend({
          constructor: SvgPath,
          position: position,
          remove: remove,
          move: move,
          line: line,
          curve: curve,
          arc: arc,
          scale: scale,
          translate: translate,
          transform: transform,
          parse: parse,
          stringify: stringify,
          clone: clone,
          splitByCommand: splitByCommand
        });
        Chartist.Svg.Path.elementDescriptions = elementDescriptions;
        Chartist.Svg.Path.join = join;
      })(this || global, Chartist);

      ;
      /* global Chartist */

      (function (globalRoot, Chartist) {
        'use strict';

        var window = globalRoot.window;
        var document = globalRoot.document;
        var axisUnits = {
          x: {
            pos: 'x',
            len: 'width',
            dir: 'horizontal',
            rectStart: 'x1',
            rectEnd: 'x2',
            rectOffset: 'y2'
          },
          y: {
            pos: 'y',
            len: 'height',
            dir: 'vertical',
            rectStart: 'y2',
            rectEnd: 'y1',
            rectOffset: 'x1'
          }
        };

        function Axis(units, chartRect, ticks, options) {
          this.units = units;
          this.counterUnits = units === axisUnits.x ? axisUnits.y : axisUnits.x;
          this.chartRect = chartRect;
          this.axisLength = chartRect[units.rectEnd] - chartRect[units.rectStart];
          this.gridOffset = chartRect[units.rectOffset];
          this.ticks = ticks;
          this.options = options;
        }

        function createGridAndLabels(gridGroup, labelGroup, useForeignObject, chartOptions, eventEmitter) {
          var axisOptions = chartOptions['axis' + this.units.pos.toUpperCase()];
          var projectedValues = this.ticks.map(this.projectValue.bind(this));
          var labelValues = this.ticks.map(axisOptions.labelInterpolationFnc);
          projectedValues.forEach(function (projectedValue, index) {
            var labelOffset = {
              x: 0,
              y: 0
            }; // TODO: Find better solution for solving this problem
            // Calculate how much space we have available for the label

            var labelLength;

            if (projectedValues[index + 1]) {
              // If we still have one label ahead, we can calculate the distance to the next tick / label
              labelLength = projectedValues[index + 1] - projectedValue;
            } else {
              // If we don't have a label ahead and we have only two labels in total, we just take the remaining distance to
              // on the whole axis length. We limit that to a minimum of 30 pixel, so that labels close to the border will
              // still be visible inside of the chart padding.
              labelLength = Math.max(this.axisLength - projectedValue, 30);
            } // Skip grid lines and labels where interpolated label values are falsey (execpt for 0)


            if (Chartist.isFalseyButZero(labelValues[index]) && labelValues[index] !== '') {
              return;
            } // Transform to global coordinates using the chartRect
            // We also need to set the label offset for the createLabel function


            if (this.units.pos === 'x') {
              projectedValue = this.chartRect.x1 + projectedValue;
              labelOffset.x = chartOptions.axisX.labelOffset.x; // If the labels should be positioned in start position (top side for vertical axis) we need to set a
              // different offset as for positioned with end (bottom)

              if (chartOptions.axisX.position === 'start') {
                labelOffset.y = this.chartRect.padding.top + chartOptions.axisX.labelOffset.y + (useForeignObject ? 5 : 20);
              } else {
                labelOffset.y = this.chartRect.y1 + chartOptions.axisX.labelOffset.y + (useForeignObject ? 5 : 20);
              }
            } else {
              projectedValue = this.chartRect.y1 - projectedValue;
              labelOffset.y = chartOptions.axisY.labelOffset.y - (useForeignObject ? labelLength : 0); // If the labels should be positioned in start position (left side for horizontal axis) we need to set a
              // different offset as for positioned with end (right side)

              if (chartOptions.axisY.position === 'start') {
                labelOffset.x = useForeignObject ? this.chartRect.padding.left + chartOptions.axisY.labelOffset.x : this.chartRect.x1 - 10;
              } else {
                labelOffset.x = this.chartRect.x2 + chartOptions.axisY.labelOffset.x + 10;
              }
            }

            if (axisOptions.showGrid) {
              Chartist.createGrid(projectedValue, index, this, this.gridOffset, this.chartRect[this.counterUnits.len](), gridGroup, [chartOptions.classNames.grid, chartOptions.classNames[this.units.dir]], eventEmitter);
            }

            if (axisOptions.showLabel) {
              Chartist.createLabel(projectedValue, labelLength, index, labelValues, this, axisOptions.offset, labelOffset, labelGroup, [chartOptions.classNames.label, chartOptions.classNames[this.units.dir], axisOptions.position === 'start' ? chartOptions.classNames[axisOptions.position] : chartOptions.classNames['end']], useForeignObject, eventEmitter);
            }
          }.bind(this));
        }

        Chartist.Axis = Chartist.Class.extend({
          constructor: Axis,
          createGridAndLabels: createGridAndLabels,
          projectValue: function projectValue(value, index, data) {
            throw new Error('Base axis can\'t be instantiated!');
          }
        });
        Chartist.Axis.units = axisUnits;
      })(this || global, Chartist);

      ;
      /**
      * The auto scale axis uses standard linear scale projection of values along an axis. It uses order of magnitude to find a scale automatically and evaluates the available space in order to find the perfect amount of ticks for your chart.
      * **Options**
      * The following options are used by this axis in addition to the default axis options outlined in the axis configuration of the chart default settings.
      * ```javascript
      * var options = {
      *   // If high is specified then the axis will display values explicitly up to this value and the computed maximum from the data is ignored
      *   high: 100,
      *   // If low is specified then the axis will display values explicitly down to this value and the computed minimum from the data is ignored
      *   low: 0,
      *   // This option will be used when finding the right scale division settings. The amount of ticks on the scale will be determined so that as many ticks as possible will be displayed, while not violating this minimum required space (in pixel).
      *   scaleMinSpace: 20,
      *   // Can be set to true or false. If set to true, the scale will be generated with whole numbers only.
      *   onlyInteger: true,
      *   // The reference value can be used to make sure that this value will always be on the chart. This is especially useful on bipolar charts where the bipolar center always needs to be part of the chart.
      *   referenceValue: 5
      * };
      * ```
      *
      * @module Chartist.AutoScaleAxis
      */

      /* global Chartist */

      (function (globalRoot, Chartist) {
        'use strict';

        var window = globalRoot.window;
        var document = globalRoot.document;

        function AutoScaleAxis(axisUnit, data, chartRect, options) {
          // Usually we calculate highLow based on the data but this can be overriden by a highLow object in the options
          var highLow = options.highLow || Chartist.getHighLow(data, options, axisUnit.pos);
          this.bounds = Chartist.getBounds(chartRect[axisUnit.rectEnd] - chartRect[axisUnit.rectStart], highLow, options.scaleMinSpace || 20, options.onlyInteger);
          this.range = {
            min: this.bounds.min,
            max: this.bounds.max
          };
          Chartist.AutoScaleAxis["super"].constructor.call(this, axisUnit, chartRect, this.bounds.values, options);
        }

        function projectValue(value) {
          return this.axisLength * (+Chartist.getMultiValue(value, this.units.pos) - this.bounds.min) / this.bounds.range;
        }

        Chartist.AutoScaleAxis = Chartist.Axis.extend({
          constructor: AutoScaleAxis,
          projectValue: projectValue
        });
      })(this || global, Chartist);

      ;
      /**
      * The fixed scale axis uses standard linear projection of values along an axis. It makes use of a divisor option to divide the range provided from the minimum and maximum value or the options high and low that will override the computed minimum and maximum.
      * **Options**
      * The following options are used by this axis in addition to the default axis options outlined in the axis configuration of the chart default settings.
      * ```javascript
      * var options = {
      *   // If high is specified then the axis will display values explicitly up to this value and the computed maximum from the data is ignored
      *   high: 100,
      *   // If low is specified then the axis will display values explicitly down to this value and the computed minimum from the data is ignored
      *   low: 0,
      *   // If specified then the value range determined from minimum to maximum (or low and high) will be divided by this number and ticks will be generated at those division points. The default divisor is 1.
      *   divisor: 4,
      *   // If ticks is explicitly set, then the axis will not compute the ticks with the divisor, but directly use the data in ticks to determine at what points on the axis a tick need to be generated.
      *   ticks: [1, 10, 20, 30]
      * };
      * ```
      *
      * @module Chartist.FixedScaleAxis
      */

      /* global Chartist */

      (function (globalRoot, Chartist) {
        'use strict';

        var window = globalRoot.window;
        var document = globalRoot.document;

        function FixedScaleAxis(axisUnit, data, chartRect, options) {
          var highLow = options.highLow || Chartist.getHighLow(data, options, axisUnit.pos);
          this.divisor = options.divisor || 1;
          this.ticks = options.ticks || Chartist.times(this.divisor).map(function (value, index) {
            return highLow.low + (highLow.high - highLow.low) / this.divisor * index;
          }.bind(this));
          this.ticks.sort(function (a, b) {
            return a - b;
          });
          this.range = {
            min: highLow.low,
            max: highLow.high
          };
          Chartist.FixedScaleAxis["super"].constructor.call(this, axisUnit, chartRect, this.ticks, options);
          this.stepLength = this.axisLength / this.divisor;
        }

        function projectValue(value) {
          return this.axisLength * (+Chartist.getMultiValue(value, this.units.pos) - this.range.min) / (this.range.max - this.range.min);
        }

        Chartist.FixedScaleAxis = Chartist.Axis.extend({
          constructor: FixedScaleAxis,
          projectValue: projectValue
        });
      })(this || global, Chartist);

      ;
      /**
      * The step axis for step based charts like bar chart or step based line charts. It uses a fixed amount of ticks that will be equally distributed across the whole axis length. The projection is done using the index of the data value rather than the value itself and therefore it's only useful for distribution purpose.
      * **Options**
      * The following options are used by this axis in addition to the default axis options outlined in the axis configuration of the chart default settings.
      * ```javascript
      * var options = {
      *   // Ticks to be used to distribute across the axis length. As this axis type relies on the index of the value rather than the value, arbitrary data that can be converted to a string can be used as ticks.
      *   ticks: ['One', 'Two', 'Three'],
      *   // If set to true the full width will be used to distribute the values where the last value will be at the maximum of the axis length. If false the spaces between the ticks will be evenly distributed instead.
      *   stretch: true
      * };
      * ```
      *
      * @module Chartist.StepAxis
      */

      /* global Chartist */

      (function (globalRoot, Chartist) {
        'use strict';

        var window = globalRoot.window;
        var document = globalRoot.document;

        function StepAxis(axisUnit, data, chartRect, options) {
          Chartist.StepAxis["super"].constructor.call(this, axisUnit, chartRect, options.ticks, options);
          var calc = Math.max(1, options.ticks.length - (options.stretch ? 1 : 0));
          this.stepLength = this.axisLength / calc;
        }

        function projectValue(value, index) {
          return this.stepLength * index;
        }

        Chartist.StepAxis = Chartist.Axis.extend({
          constructor: StepAxis,
          projectValue: projectValue
        });
      })(this || global, Chartist);

      ;
      /**
      * The Chartist line chart can be used to draw Line or Scatter charts. If used in the browser you can access the global `Chartist` namespace where you find the `Line` function as a main entry point.
      *
      * For examples on how to use the line chart please check the examples of the `Chartist.Line` method.
      *
      * @module Chartist.Line
      */

      /* global Chartist */

      (function (globalRoot, Chartist) {
        'use strict';

        var window = globalRoot.window;
        var document = globalRoot.document;
        /**
         * Default options in line charts. Expand the code view to see a detailed list of options with comments.
         *
         * @memberof Chartist.Line
         */

        var defaultOptions = {
          // Options for X-Axis
          axisX: {
            // The offset of the labels to the chart area
            offset: 30,
            // Position where labels are placed. Can be set to `start` or `end` where `start` is equivalent to left or top on vertical axis and `end` is equivalent to right or bottom on horizontal axis.
            position: 'end',
            // Allows you to correct label positioning on this axis by positive or negative x and y offset.
            labelOffset: {
              x: 0,
              y: 0
            },
            // If labels should be shown or not
            showLabel: true,
            // If the axis grid should be drawn or not
            showGrid: true,
            // Interpolation function that allows you to intercept the value from the axis label
            labelInterpolationFnc: Chartist.noop,
            // Set the axis type to be used to project values on this axis. If not defined, Chartist.StepAxis will be used for the X-Axis, where the ticks option will be set to the labels in the data and the stretch option will be set to the global fullWidth option. This type can be changed to any axis constructor available (e.g. Chartist.FixedScaleAxis), where all axis options should be present here.
            type: undefined
          },
          // Options for Y-Axis
          axisY: {
            // The offset of the labels to the chart area
            offset: 40,
            // Position where labels are placed. Can be set to `start` or `end` where `start` is equivalent to left or top on vertical axis and `end` is equivalent to right or bottom on horizontal axis.
            position: 'start',
            // Allows you to correct label positioning on this axis by positive or negative x and y offset.
            labelOffset: {
              x: 0,
              y: 0
            },
            // If labels should be shown or not
            showLabel: true,
            // If the axis grid should be drawn or not
            showGrid: true,
            // Interpolation function that allows you to intercept the value from the axis label
            labelInterpolationFnc: Chartist.noop,
            // Set the axis type to be used to project values on this axis. If not defined, Chartist.AutoScaleAxis will be used for the Y-Axis, where the high and low options will be set to the global high and low options. This type can be changed to any axis constructor available (e.g. Chartist.FixedScaleAxis), where all axis options should be present here.
            type: undefined,
            // This value specifies the minimum height in pixel of the scale steps
            scaleMinSpace: 20,
            // Use only integer values (whole numbers) for the scale steps
            onlyInteger: false
          },
          // Specify a fixed width for the chart as a string (i.e. '100px' or '50%')
          width: undefined,
          // Specify a fixed height for the chart as a string (i.e. '100px' or '50%')
          height: undefined,
          // If the line should be drawn or not
          showLine: true,
          // If dots should be drawn or not
          showPoint: true,
          // If the line chart should draw an area
          showArea: false,
          // The base for the area chart that will be used to close the area shape (is normally 0)
          areaBase: 0,
          // Specify if the lines should be smoothed. This value can be true or false where true will result in smoothing using the default smoothing interpolation function Chartist.Interpolation.cardinal and false results in Chartist.Interpolation.none. You can also choose other smoothing / interpolation functions available in the Chartist.Interpolation module, or write your own interpolation function. Check the examples for a brief description.
          lineSmooth: true,
          // If the line chart should add a background fill to the .ct-grids group.
          showGridBackground: false,
          // Overriding the natural low of the chart allows you to zoom in or limit the charts lowest displayed value
          low: undefined,
          // Overriding the natural high of the chart allows you to zoom in or limit the charts highest displayed value
          high: undefined,
          // Padding of the chart drawing area to the container element and labels as a number or padding object {top: 5, right: 5, bottom: 5, left: 5}
          chartPadding: {
            top: 15,
            right: 15,
            bottom: 5,
            left: 10
          },
          // When set to true, the last grid line on the x-axis is not drawn and the chart elements will expand to the full available width of the chart. For the last label to be drawn correctly you might need to add chart padding or offset the last label with a draw event handler.
          fullWidth: false,
          // If true the whole data is reversed including labels, the series order as well as the whole series data arrays.
          reverseData: false,
          // Override the class names that get used to generate the SVG structure of the chart
          classNames: {
            chart: 'ct-chart-line',
            label: 'ct-label',
            labelGroup: 'ct-labels',
            series: 'ct-series',
            line: 'ct-line',
            point: 'ct-point',
            area: 'ct-area',
            grid: 'ct-grid',
            gridGroup: 'ct-grids',
            gridBackground: 'ct-grid-background',
            vertical: 'ct-vertical',
            horizontal: 'ct-horizontal',
            start: 'ct-start',
            end: 'ct-end'
          }
        };
        /**
         * Creates a new chart
         *
         */

        function createChart(options) {
          var data = Chartist.normalizeData(this.data, options.reverseData, true); // Create new svg object

          this.svg = Chartist.createSvg(this.container, options.width, options.height, options.classNames.chart); // Create groups for labels, grid and series

          var gridGroup = this.svg.elem('g').addClass(options.classNames.gridGroup);
          var seriesGroup = this.svg.elem('g');
          var labelGroup = this.svg.elem('g').addClass(options.classNames.labelGroup);
          var chartRect = Chartist.createChartRect(this.svg, options, defaultOptions.padding);
          var axisX, axisY;

          if (options.axisX.type === undefined) {
            axisX = new Chartist.StepAxis(Chartist.Axis.units.x, data.normalized.series, chartRect, Chartist.extend({}, options.axisX, {
              ticks: data.normalized.labels,
              stretch: options.fullWidth
            }));
          } else {
            axisX = options.axisX.type.call(Chartist, Chartist.Axis.units.x, data.normalized.series, chartRect, options.axisX);
          }

          if (options.axisY.type === undefined) {
            axisY = new Chartist.AutoScaleAxis(Chartist.Axis.units.y, data.normalized.series, chartRect, Chartist.extend({}, options.axisY, {
              high: Chartist.isNumeric(options.high) ? options.high : options.axisY.high,
              low: Chartist.isNumeric(options.low) ? options.low : options.axisY.low
            }));
          } else {
            axisY = options.axisY.type.call(Chartist, Chartist.Axis.units.y, data.normalized.series, chartRect, options.axisY);
          }

          axisX.createGridAndLabels(gridGroup, labelGroup, this.supportsForeignObject, options, this.eventEmitter);
          axisY.createGridAndLabels(gridGroup, labelGroup, this.supportsForeignObject, options, this.eventEmitter);

          if (options.showGridBackground) {
            Chartist.createGridBackground(gridGroup, chartRect, options.classNames.gridBackground, this.eventEmitter);
          } // Draw the series


          data.raw.series.forEach(function (series, seriesIndex) {
            var seriesElement = seriesGroup.elem('g'); // Write attributes to series group element. If series name or meta is undefined the attributes will not be written

            seriesElement.attr({
              'ct:series-name': series.name,
              'ct:meta': Chartist.serialize(series.meta)
            }); // Use series class from series data or if not set generate one

            seriesElement.addClass([options.classNames.series, series.className || options.classNames.series + '-' + Chartist.alphaNumerate(seriesIndex)].join(' '));
            var pathCoordinates = [],
                pathData = [];
            data.normalized.series[seriesIndex].forEach(function (value, valueIndex) {
              var p = {
                x: chartRect.x1 + axisX.projectValue(value, valueIndex, data.normalized.series[seriesIndex]),
                y: chartRect.y1 - axisY.projectValue(value, valueIndex, data.normalized.series[seriesIndex])
              };
              pathCoordinates.push(p.x, p.y);
              pathData.push({
                value: value,
                valueIndex: valueIndex,
                meta: Chartist.getMetaData(series, valueIndex)
              });
            }.bind(this));
            var seriesOptions = {
              lineSmooth: Chartist.getSeriesOption(series, options, 'lineSmooth'),
              showPoint: Chartist.getSeriesOption(series, options, 'showPoint'),
              showLine: Chartist.getSeriesOption(series, options, 'showLine'),
              showArea: Chartist.getSeriesOption(series, options, 'showArea'),
              areaBase: Chartist.getSeriesOption(series, options, 'areaBase')
            };
            var smoothing = typeof seriesOptions.lineSmooth === 'function' ? seriesOptions.lineSmooth : seriesOptions.lineSmooth ? Chartist.Interpolation.monotoneCubic() : Chartist.Interpolation.none(); // Interpolating path where pathData will be used to annotate each path element so we can trace back the original
            // index, value and meta data

            var path = smoothing(pathCoordinates, pathData); // If we should show points we need to create them now to avoid secondary loop
            // Points are drawn from the pathElements returned by the interpolation function
            // Small offset for Firefox to render squares correctly

            if (seriesOptions.showPoint) {
              path.pathElements.forEach(function (pathElement) {
                var point = seriesElement.elem('line', {
                  x1: pathElement.x,
                  y1: pathElement.y,
                  x2: pathElement.x + 0.01,
                  y2: pathElement.y
                }, options.classNames.point).attr({
                  'ct:value': [pathElement.data.value.x, pathElement.data.value.y].filter(Chartist.isNumeric).join(','),
                  'ct:meta': Chartist.serialize(pathElement.data.meta)
                });
                this.eventEmitter.emit('draw', {
                  type: 'point',
                  value: pathElement.data.value,
                  index: pathElement.data.valueIndex,
                  meta: pathElement.data.meta,
                  series: series,
                  seriesIndex: seriesIndex,
                  axisX: axisX,
                  axisY: axisY,
                  group: seriesElement,
                  element: point,
                  x: pathElement.x,
                  y: pathElement.y
                });
              }.bind(this));
            }

            if (seriesOptions.showLine) {
              var line = seriesElement.elem('path', {
                d: path.stringify()
              }, options.classNames.line, true);
              this.eventEmitter.emit('draw', {
                type: 'line',
                values: data.normalized.series[seriesIndex],
                path: path.clone(),
                chartRect: chartRect,
                index: seriesIndex,
                series: series,
                seriesIndex: seriesIndex,
                seriesMeta: series.meta,
                axisX: axisX,
                axisY: axisY,
                group: seriesElement,
                element: line
              });
            } // Area currently only works with axes that support a range!


            if (seriesOptions.showArea && axisY.range) {
              // If areaBase is outside the chart area (< min or > max) we need to set it respectively so that
              // the area is not drawn outside the chart area.
              var areaBase = Math.max(Math.min(seriesOptions.areaBase, axisY.range.max), axisY.range.min); // We project the areaBase value into screen coordinates

              var areaBaseProjected = chartRect.y1 - axisY.projectValue(areaBase); // In order to form the area we'll first split the path by move commands so we can chunk it up into segments

              path.splitByCommand('M').filter(function onlySolidSegments(pathSegment) {
                // We filter only "solid" segments that contain more than one point. Otherwise there's no need for an area
                return pathSegment.pathElements.length > 1;
              }).map(function convertToArea(solidPathSegments) {
                // Receiving the filtered solid path segments we can now convert those segments into fill areas
                var firstElement = solidPathSegments.pathElements[0];
                var lastElement = solidPathSegments.pathElements[solidPathSegments.pathElements.length - 1]; // Cloning the solid path segment with closing option and removing the first move command from the clone
                // We then insert a new move that should start at the area base and draw a straight line up or down
                // at the end of the path we add an additional straight line to the projected area base value
                // As the closing option is set our path will be automatically closed

                return solidPathSegments.clone(true).position(0).remove(1).move(firstElement.x, areaBaseProjected).line(firstElement.x, firstElement.y).position(solidPathSegments.pathElements.length + 1).line(lastElement.x, areaBaseProjected);
              }).forEach(function createArea(areaPath) {
                // For each of our newly created area paths, we'll now create path elements by stringifying our path objects
                // and adding the created DOM elements to the correct series group
                var area = seriesElement.elem('path', {
                  d: areaPath.stringify()
                }, options.classNames.area, true); // Emit an event for each area that was drawn

                this.eventEmitter.emit('draw', {
                  type: 'area',
                  values: data.normalized.series[seriesIndex],
                  path: areaPath.clone(),
                  series: series,
                  seriesIndex: seriesIndex,
                  axisX: axisX,
                  axisY: axisY,
                  chartRect: chartRect,
                  index: seriesIndex,
                  group: seriesElement,
                  element: area
                });
              }.bind(this));
            }
          }.bind(this));
          this.eventEmitter.emit('created', {
            bounds: axisY.bounds,
            chartRect: chartRect,
            axisX: axisX,
            axisY: axisY,
            svg: this.svg,
            options: options
          });
        }
        /**
         * This method creates a new line chart.
         *
         * @memberof Chartist.Line
         * @param {String|Node} query A selector query string or directly a DOM element
         * @param {Object} data The data object that needs to consist of a labels and a series array
         * @param {Object} [options] The options object with options that override the default options. Check the examples for a detailed list.
         * @param {Array} [responsiveOptions] Specify an array of responsive option arrays which are a media query and options object pair => [[mediaQueryString, optionsObject],[more...]]
         * @return {Object} An object which exposes the API for the created chart
         *
         * @example
         * // Create a simple line chart
         * var data = {
         *   // A labels array that can contain any sort of values
         *   labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
         *   // Our series array that contains series objects or in this case series data arrays
         *   series: [
         *     [5, 2, 4, 2, 0]
         *   ]
         * };
         *
         * // As options we currently only set a static size of 300x200 px
         * var options = {
         *   width: '300px',
         *   height: '200px'
         * };
         *
         * // In the global name space Chartist we call the Line function to initialize a line chart. As a first parameter we pass in a selector where we would like to get our chart created. Second parameter is the actual data object and as a third parameter we pass in our options
         * new Chartist.Line('.ct-chart', data, options);
         *
         * @example
         * // Use specific interpolation function with configuration from the Chartist.Interpolation module
         *
         * var chart = new Chartist.Line('.ct-chart', {
         *   labels: [1, 2, 3, 4, 5],
         *   series: [
         *     [1, 1, 8, 1, 7]
         *   ]
         * }, {
         *   lineSmooth: Chartist.Interpolation.cardinal({
         *     tension: 0.2
         *   })
         * });
         *
         * @example
         * // Create a line chart with responsive options
         *
         * var data = {
         *   // A labels array that can contain any sort of values
         *   labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
         *   // Our series array that contains series objects or in this case series data arrays
         *   series: [
         *     [5, 2, 4, 2, 0]
         *   ]
         * };
         *
         * // In addition to the regular options we specify responsive option overrides that will override the default configutation based on the matching media queries.
         * var responsiveOptions = [
         *   ['screen and (min-width: 641px) and (max-width: 1024px)', {
         *     showPoint: false,
         *     axisX: {
         *       labelInterpolationFnc: function(value) {
         *         // Will return Mon, Tue, Wed etc. on medium screens
         *         return value.slice(0, 3);
         *       }
         *     }
         *   }],
         *   ['screen and (max-width: 640px)', {
         *     showLine: false,
         *     axisX: {
         *       labelInterpolationFnc: function(value) {
         *         // Will return M, T, W etc. on small screens
         *         return value[0];
         *       }
         *     }
         *   }]
         * ];
         *
         * new Chartist.Line('.ct-chart', data, null, responsiveOptions);
         *
         */


        function Line(query, data, options, responsiveOptions) {
          Chartist.Line["super"].constructor.call(this, query, data, defaultOptions, Chartist.extend({}, defaultOptions, options), responsiveOptions);
        } // Creating line chart type in Chartist namespace


        Chartist.Line = Chartist.Base.extend({
          constructor: Line,
          createChart: createChart
        });
      })(this || global, Chartist);

      ;
      /**
      * The bar chart module of Chartist that can be used to draw unipolar or bipolar bar and grouped bar charts.
      *
      * @module Chartist.Bar
      */

      /* global Chartist */

      (function (globalRoot, Chartist) {
        'use strict';

        var window = globalRoot.window;
        var document = globalRoot.document;
        /**
         * Default options in bar charts. Expand the code view to see a detailed list of options with comments.
         *
         * @memberof Chartist.Bar
         */

        var defaultOptions = {
          // Options for X-Axis
          axisX: {
            // The offset of the chart drawing area to the border of the container
            offset: 30,
            // Position where labels are placed. Can be set to `start` or `end` where `start` is equivalent to left or top on vertical axis and `end` is equivalent to right or bottom on horizontal axis.
            position: 'end',
            // Allows you to correct label positioning on this axis by positive or negative x and y offset.
            labelOffset: {
              x: 0,
              y: 0
            },
            // If labels should be shown or not
            showLabel: true,
            // If the axis grid should be drawn or not
            showGrid: true,
            // Interpolation function that allows you to intercept the value from the axis label
            labelInterpolationFnc: Chartist.noop,
            // This value specifies the minimum width in pixel of the scale steps
            scaleMinSpace: 30,
            // Use only integer values (whole numbers) for the scale steps
            onlyInteger: false
          },
          // Options for Y-Axis
          axisY: {
            // The offset of the chart drawing area to the border of the container
            offset: 40,
            // Position where labels are placed. Can be set to `start` or `end` where `start` is equivalent to left or top on vertical axis and `end` is equivalent to right or bottom on horizontal axis.
            position: 'start',
            // Allows you to correct label positioning on this axis by positive or negative x and y offset.
            labelOffset: {
              x: 0,
              y: 0
            },
            // If labels should be shown or not
            showLabel: true,
            // If the axis grid should be drawn or not
            showGrid: true,
            // Interpolation function that allows you to intercept the value from the axis label
            labelInterpolationFnc: Chartist.noop,
            // This value specifies the minimum height in pixel of the scale steps
            scaleMinSpace: 20,
            // Use only integer values (whole numbers) for the scale steps
            onlyInteger: false
          },
          // Specify a fixed width for the chart as a string (i.e. '100px' or '50%')
          width: undefined,
          // Specify a fixed height for the chart as a string (i.e. '100px' or '50%')
          height: undefined,
          // Overriding the natural high of the chart allows you to zoom in or limit the charts highest displayed value
          high: undefined,
          // Overriding the natural low of the chart allows you to zoom in or limit the charts lowest displayed value
          low: undefined,
          // Unless low/high are explicitly set, bar chart will be centered at zero by default. Set referenceValue to null to auto scale.
          referenceValue: 0,
          // Padding of the chart drawing area to the container element and labels as a number or padding object {top: 5, right: 5, bottom: 5, left: 5}
          chartPadding: {
            top: 15,
            right: 15,
            bottom: 5,
            left: 10
          },
          // Specify the distance in pixel of bars in a group
          seriesBarDistance: 15,
          // If set to true this property will cause the series bars to be stacked. Check the `stackMode` option for further stacking options.
          stackBars: false,
          // If set to 'overlap' this property will force the stacked bars to draw from the zero line.
          // If set to 'accumulate' this property will form a total for each series point. This will also influence the y-axis and the overall bounds of the chart. In stacked mode the seriesBarDistance property will have no effect.
          stackMode: 'accumulate',
          // Inverts the axes of the bar chart in order to draw a horizontal bar chart. Be aware that you also need to invert your axis settings as the Y Axis will now display the labels and the X Axis the values.
          horizontalBars: false,
          // If set to true then each bar will represent a series and the data array is expected to be a one dimensional array of data values rather than a series array of series. This is useful if the bar chart should represent a profile rather than some data over time.
          distributeSeries: false,
          // If true the whole data is reversed including labels, the series order as well as the whole series data arrays.
          reverseData: false,
          // If the bar chart should add a background fill to the .ct-grids group.
          showGridBackground: false,
          // Override the class names that get used to generate the SVG structure of the chart
          classNames: {
            chart: 'ct-chart-bar',
            horizontalBars: 'ct-horizontal-bars',
            label: 'ct-label',
            labelGroup: 'ct-labels',
            series: 'ct-series',
            bar: 'ct-bar',
            grid: 'ct-grid',
            gridGroup: 'ct-grids',
            gridBackground: 'ct-grid-background',
            vertical: 'ct-vertical',
            horizontal: 'ct-horizontal',
            start: 'ct-start',
            end: 'ct-end'
          }
        };
        /**
         * Creates a new chart
         *
         */

        function createChart(options) {
          var data;
          var highLow;

          if (options.distributeSeries) {
            data = Chartist.normalizeData(this.data, options.reverseData, options.horizontalBars ? 'x' : 'y');
            data.normalized.series = data.normalized.series.map(function (value) {
              return [value];
            });
          } else {
            data = Chartist.normalizeData(this.data, options.reverseData, options.horizontalBars ? 'x' : 'y');
          } // Create new svg element


          this.svg = Chartist.createSvg(this.container, options.width, options.height, options.classNames.chart + (options.horizontalBars ? ' ' + options.classNames.horizontalBars : '')); // Drawing groups in correct order

          var gridGroup = this.svg.elem('g').addClass(options.classNames.gridGroup);
          var seriesGroup = this.svg.elem('g');
          var labelGroup = this.svg.elem('g').addClass(options.classNames.labelGroup);

          if (options.stackBars && data.normalized.series.length !== 0) {
            // If stacked bars we need to calculate the high low from stacked values from each series
            var serialSums = Chartist.serialMap(data.normalized.series, function serialSums() {
              return Array.prototype.slice.call(arguments).map(function (value) {
                return value;
              }).reduce(function (prev, curr) {
                return {
                  x: prev.x + (curr && curr.x) || 0,
                  y: prev.y + (curr && curr.y) || 0
                };
              }, {
                x: 0,
                y: 0
              });
            });
            highLow = Chartist.getHighLow([serialSums], options, options.horizontalBars ? 'x' : 'y');
          } else {
            highLow = Chartist.getHighLow(data.normalized.series, options, options.horizontalBars ? 'x' : 'y');
          } // Overrides of high / low from settings


          highLow.high = +options.high || (options.high === 0 ? 0 : highLow.high);
          highLow.low = +options.low || (options.low === 0 ? 0 : highLow.low);
          var chartRect = Chartist.createChartRect(this.svg, options, defaultOptions.padding);
          var valueAxis, labelAxisTicks, labelAxis, axisX, axisY; // We need to set step count based on some options combinations

          if (options.distributeSeries && options.stackBars) {
            // If distributed series are enabled and bars need to be stacked, we'll only have one bar and therefore should
            // use only the first label for the step axis
            labelAxisTicks = data.normalized.labels.slice(0, 1);
          } else {
            // If distributed series are enabled but stacked bars aren't, we should use the series labels
            // If we are drawing a regular bar chart with two dimensional series data, we just use the labels array
            // as the bars are normalized
            labelAxisTicks = data.normalized.labels;
          } // Set labelAxis and valueAxis based on the horizontalBars setting. This setting will flip the axes if necessary.


          if (options.horizontalBars) {
            if (options.axisX.type === undefined) {
              valueAxis = axisX = new Chartist.AutoScaleAxis(Chartist.Axis.units.x, data.normalized.series, chartRect, Chartist.extend({}, options.axisX, {
                highLow: highLow,
                referenceValue: 0
              }));
            } else {
              valueAxis = axisX = options.axisX.type.call(Chartist, Chartist.Axis.units.x, data.normalized.series, chartRect, Chartist.extend({}, options.axisX, {
                highLow: highLow,
                referenceValue: 0
              }));
            }

            if (options.axisY.type === undefined) {
              labelAxis = axisY = new Chartist.StepAxis(Chartist.Axis.units.y, data.normalized.series, chartRect, {
                ticks: labelAxisTicks
              });
            } else {
              labelAxis = axisY = options.axisY.type.call(Chartist, Chartist.Axis.units.y, data.normalized.series, chartRect, options.axisY);
            }
          } else {
            if (options.axisX.type === undefined) {
              labelAxis = axisX = new Chartist.StepAxis(Chartist.Axis.units.x, data.normalized.series, chartRect, {
                ticks: labelAxisTicks
              });
            } else {
              labelAxis = axisX = options.axisX.type.call(Chartist, Chartist.Axis.units.x, data.normalized.series, chartRect, options.axisX);
            }

            if (options.axisY.type === undefined) {
              valueAxis = axisY = new Chartist.AutoScaleAxis(Chartist.Axis.units.y, data.normalized.series, chartRect, Chartist.extend({}, options.axisY, {
                highLow: highLow,
                referenceValue: 0
              }));
            } else {
              valueAxis = axisY = options.axisY.type.call(Chartist, Chartist.Axis.units.y, data.normalized.series, chartRect, Chartist.extend({}, options.axisY, {
                highLow: highLow,
                referenceValue: 0
              }));
            }
          } // Projected 0 point


          var zeroPoint = options.horizontalBars ? chartRect.x1 + valueAxis.projectValue(0) : chartRect.y1 - valueAxis.projectValue(0); // Used to track the screen coordinates of stacked bars

          var stackedBarValues = [];
          labelAxis.createGridAndLabels(gridGroup, labelGroup, this.supportsForeignObject, options, this.eventEmitter);
          valueAxis.createGridAndLabels(gridGroup, labelGroup, this.supportsForeignObject, options, this.eventEmitter);

          if (options.showGridBackground) {
            Chartist.createGridBackground(gridGroup, chartRect, options.classNames.gridBackground, this.eventEmitter);
          } // Draw the series


          data.raw.series.forEach(function (series, seriesIndex) {
            // Calculating bi-polar value of index for seriesOffset. For i = 0..4 biPol will be -1.5, -0.5, 0.5, 1.5 etc.
            var biPol = seriesIndex - (data.raw.series.length - 1) / 2; // Half of the period width between vertical grid lines used to position bars

            var periodHalfLength; // Current series SVG element

            var seriesElement; // We need to set periodHalfLength based on some options combinations

            if (options.distributeSeries && !options.stackBars) {
              // If distributed series are enabled but stacked bars aren't, we need to use the length of the normaizedData array
              // which is the series count and divide by 2
              periodHalfLength = labelAxis.axisLength / data.normalized.series.length / 2;
            } else if (options.distributeSeries && options.stackBars) {
              // If distributed series and stacked bars are enabled we'll only get one bar so we should just divide the axis
              // length by 2
              periodHalfLength = labelAxis.axisLength / 2;
            } else {
              // On regular bar charts we should just use the series length
              periodHalfLength = labelAxis.axisLength / data.normalized.series[seriesIndex].length / 2;
            } // Adding the series group to the series element


            seriesElement = seriesGroup.elem('g'); // Write attributes to series group element. If series name or meta is undefined the attributes will not be written

            seriesElement.attr({
              'ct:series-name': series.name,
              'ct:meta': Chartist.serialize(series.meta)
            }); // Use series class from series data or if not set generate one

            seriesElement.addClass([options.classNames.series, series.className || options.classNames.series + '-' + Chartist.alphaNumerate(seriesIndex)].join(' '));
            data.normalized.series[seriesIndex].forEach(function (value, valueIndex) {
              var projected, bar, previousStack, labelAxisValueIndex; // We need to set labelAxisValueIndex based on some options combinations

              if (options.distributeSeries && !options.stackBars) {
                // If distributed series are enabled but stacked bars aren't, we can use the seriesIndex for later projection
                // on the step axis for label positioning
                labelAxisValueIndex = seriesIndex;
              } else if (options.distributeSeries && options.stackBars) {
                // If distributed series and stacked bars are enabled, we will only get one bar and therefore always use
                // 0 for projection on the label step axis
                labelAxisValueIndex = 0;
              } else {
                // On regular bar charts we just use the value index to project on the label step axis
                labelAxisValueIndex = valueIndex;
              } // We need to transform coordinates differently based on the chart layout


              if (options.horizontalBars) {
                projected = {
                  x: chartRect.x1 + valueAxis.projectValue(value && value.x ? value.x : 0, valueIndex, data.normalized.series[seriesIndex]),
                  y: chartRect.y1 - labelAxis.projectValue(value && value.y ? value.y : 0, labelAxisValueIndex, data.normalized.series[seriesIndex])
                };
              } else {
                projected = {
                  x: chartRect.x1 + labelAxis.projectValue(value && value.x ? value.x : 0, labelAxisValueIndex, data.normalized.series[seriesIndex]),
                  y: chartRect.y1 - valueAxis.projectValue(value && value.y ? value.y : 0, valueIndex, data.normalized.series[seriesIndex])
                };
              } // If the label axis is a step based axis we will offset the bar into the middle of between two steps using
              // the periodHalfLength value. Also we do arrange the different series so that they align up to each other using
              // the seriesBarDistance. If we don't have a step axis, the bar positions can be chosen freely so we should not
              // add any automated positioning.


              if (labelAxis instanceof Chartist.StepAxis) {
                // Offset to center bar between grid lines, but only if the step axis is not stretched
                if (!labelAxis.options.stretch) {
                  projected[labelAxis.units.pos] += periodHalfLength * (options.horizontalBars ? -1 : 1);
                } // Using bi-polar offset for multiple series if no stacked bars or series distribution is used


                projected[labelAxis.units.pos] += options.stackBars || options.distributeSeries ? 0 : biPol * options.seriesBarDistance * (options.horizontalBars ? -1 : 1);
              } // Enter value in stacked bar values used to remember previous screen value for stacking up bars


              previousStack = stackedBarValues[valueIndex] || zeroPoint;
              stackedBarValues[valueIndex] = previousStack - (zeroPoint - projected[labelAxis.counterUnits.pos]); // Skip if value is undefined

              if (value === undefined) {
                return;
              }

              var positions = {};
              positions[labelAxis.units.pos + '1'] = projected[labelAxis.units.pos];
              positions[labelAxis.units.pos + '2'] = projected[labelAxis.units.pos];

              if (options.stackBars && (options.stackMode === 'accumulate' || !options.stackMode)) {
                // Stack mode: accumulate (default)
                // If bars are stacked we use the stackedBarValues reference and otherwise base all bars off the zero line
                // We want backwards compatibility, so the expected fallback without the 'stackMode' option
                // to be the original behaviour (accumulate)
                positions[labelAxis.counterUnits.pos + '1'] = previousStack;
                positions[labelAxis.counterUnits.pos + '2'] = stackedBarValues[valueIndex];
              } else {
                // Draw from the zero line normally
                // This is also the same code for Stack mode: overlap
                positions[labelAxis.counterUnits.pos + '1'] = zeroPoint;
                positions[labelAxis.counterUnits.pos + '2'] = projected[labelAxis.counterUnits.pos];
              } // Limit x and y so that they are within the chart rect


              positions.x1 = Math.min(Math.max(positions.x1, chartRect.x1), chartRect.x2);
              positions.x2 = Math.min(Math.max(positions.x2, chartRect.x1), chartRect.x2);
              positions.y1 = Math.min(Math.max(positions.y1, chartRect.y2), chartRect.y1);
              positions.y2 = Math.min(Math.max(positions.y2, chartRect.y2), chartRect.y1);
              var metaData = Chartist.getMetaData(series, valueIndex); // Create bar element

              bar = seriesElement.elem('line', positions, options.classNames.bar).attr({
                'ct:value': [value.x, value.y].filter(Chartist.isNumeric).join(','),
                'ct:meta': Chartist.serialize(metaData)
              });
              this.eventEmitter.emit('draw', Chartist.extend({
                type: 'bar',
                value: value,
                index: valueIndex,
                meta: metaData,
                series: series,
                seriesIndex: seriesIndex,
                axisX: axisX,
                axisY: axisY,
                chartRect: chartRect,
                group: seriesElement,
                element: bar
              }, positions));
            }.bind(this));
          }.bind(this));
          this.eventEmitter.emit('created', {
            bounds: valueAxis.bounds,
            chartRect: chartRect,
            axisX: axisX,
            axisY: axisY,
            svg: this.svg,
            options: options
          });
        }
        /**
         * This method creates a new bar chart and returns API object that you can use for later changes.
         *
         * @memberof Chartist.Bar
         * @param {String|Node} query A selector query string or directly a DOM element
         * @param {Object} data The data object that needs to consist of a labels and a series array
         * @param {Object} [options] The options object with options that override the default options. Check the examples for a detailed list.
         * @param {Array} [responsiveOptions] Specify an array of responsive option arrays which are a media query and options object pair => [[mediaQueryString, optionsObject],[more...]]
         * @return {Object} An object which exposes the API for the created chart
         *
         * @example
         * // Create a simple bar chart
         * var data = {
         *   labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
         *   series: [
         *     [5, 2, 4, 2, 0]
         *   ]
         * };
         *
         * // In the global name space Chartist we call the Bar function to initialize a bar chart. As a first parameter we pass in a selector where we would like to get our chart created and as a second parameter we pass our data object.
         * new Chartist.Bar('.ct-chart', data);
         *
         * @example
         * // This example creates a bipolar grouped bar chart where the boundaries are limitted to -10 and 10
         * new Chartist.Bar('.ct-chart', {
         *   labels: [1, 2, 3, 4, 5, 6, 7],
         *   series: [
         *     [1, 3, 2, -5, -3, 1, -6],
         *     [-5, -2, -4, -1, 2, -3, 1]
         *   ]
         * }, {
         *   seriesBarDistance: 12,
         *   low: -10,
         *   high: 10
         * });
         *
         */


        function Bar(query, data, options, responsiveOptions) {
          Chartist.Bar["super"].constructor.call(this, query, data, defaultOptions, Chartist.extend({}, defaultOptions, options), responsiveOptions);
        } // Creating bar chart type in Chartist namespace


        Chartist.Bar = Chartist.Base.extend({
          constructor: Bar,
          createChart: createChart
        });
      })(this || global, Chartist);

      ;
      /**
      * The pie chart module of Chartist that can be used to draw pie, donut or gauge charts
      *
      * @module Chartist.Pie
      */

      /* global Chartist */

      (function (globalRoot, Chartist) {
        'use strict';

        var window = globalRoot.window;
        var document = globalRoot.document;
        /**
         * Default options in line charts. Expand the code view to see a detailed list of options with comments.
         *
         * @memberof Chartist.Pie
         */

        var defaultOptions = {
          // Specify a fixed width for the chart as a string (i.e. '100px' or '50%')
          width: undefined,
          // Specify a fixed height for the chart as a string (i.e. '100px' or '50%')
          height: undefined,
          // Padding of the chart drawing area to the container element and labels as a number or padding object {top: 5, right: 5, bottom: 5, left: 5}
          chartPadding: 5,
          // Override the class names that are used to generate the SVG structure of the chart
          classNames: {
            chartPie: 'ct-chart-pie',
            chartDonut: 'ct-chart-donut',
            series: 'ct-series',
            slicePie: 'ct-slice-pie',
            sliceDonut: 'ct-slice-donut',
            sliceDonutSolid: 'ct-slice-donut-solid',
            label: 'ct-label'
          },
          // The start angle of the pie chart in degrees where 0 points north. A higher value offsets the start angle clockwise.
          startAngle: 0,
          // An optional total you can specify. By specifying a total value, the sum of the values in the series must be this total in order to draw a full pie. You can use this parameter to draw only parts of a pie or gauge charts.
          total: undefined,
          // If specified the donut CSS classes will be used and strokes will be drawn instead of pie slices.
          donut: false,
          // If specified the donut segments will be drawn as shapes instead of strokes.
          donutSolid: false,
          // Specify the donut stroke width, currently done in javascript for convenience. May move to CSS styles in the future.
          // This option can be set as number or string to specify a relative width (i.e. 100 or '30%').
          donutWidth: 60,
          // If a label should be shown or not
          showLabel: true,
          // Label position offset from the standard position which is half distance of the radius. This value can be either positive or negative. Positive values will position the label away from the center.
          labelOffset: 0,
          // This option can be set to 'inside', 'outside' or 'center'. Positioned with 'inside' the labels will be placed on half the distance of the radius to the border of the Pie by respecting the 'labelOffset'. The 'outside' option will place the labels at the border of the pie and 'center' will place the labels in the absolute center point of the chart. The 'center' option only makes sense in conjunction with the 'labelOffset' option.
          labelPosition: 'inside',
          // An interpolation function for the label value
          labelInterpolationFnc: Chartist.noop,
          // Label direction can be 'neutral', 'explode' or 'implode'. The labels anchor will be positioned based on those settings as well as the fact if the labels are on the right or left side of the center of the chart. Usually explode is useful when labels are positioned far away from the center.
          labelDirection: 'neutral',
          // If true the whole data is reversed including labels, the series order as well as the whole series data arrays.
          reverseData: false,
          // If true empty values will be ignored to avoid drawing unncessary slices and labels
          ignoreEmptyValues: false
        };
        /**
         * Determines SVG anchor position based on direction and center parameter
         *
         * @param center
         * @param label
         * @param direction
         * @return {string}
         */

        function determineAnchorPosition(center, label, direction) {
          var toTheRight = label.x > center.x;

          if (toTheRight && direction === 'explode' || !toTheRight && direction === 'implode') {
            return 'start';
          } else if (toTheRight && direction === 'implode' || !toTheRight && direction === 'explode') {
            return 'end';
          } else {
            return 'middle';
          }
        }
        /**
         * Creates the pie chart
         *
         * @param options
         */


        function createChart(options) {
          var data = Chartist.normalizeData(this.data);
          var seriesGroups = [],
              labelsGroup,
              chartRect,
              radius,
              labelRadius,
              totalDataSum,
              startAngle = options.startAngle; // Create SVG.js draw

          this.svg = Chartist.createSvg(this.container, options.width, options.height, options.donut ? options.classNames.chartDonut : options.classNames.chartPie); // Calculate charting rect

          chartRect = Chartist.createChartRect(this.svg, options, defaultOptions.padding); // Get biggest circle radius possible within chartRect

          radius = Math.min(chartRect.width() / 2, chartRect.height() / 2); // Calculate total of all series to get reference value or use total reference from optional options

          totalDataSum = options.total || data.normalized.series.reduce(function (previousValue, currentValue) {
            return previousValue + currentValue;
          }, 0);
          var donutWidth = Chartist.quantity(options.donutWidth);

          if (donutWidth.unit === '%') {
            donutWidth.value *= radius / 100;
          } // If this is a donut chart we need to adjust our radius to enable strokes to be drawn inside
          // Unfortunately this is not possible with the current SVG Spec
          // See this proposal for more details: http://lists.w3.org/Archives/Public/www-svg/2003Oct/0000.html


          radius -= options.donut && !options.donutSolid ? donutWidth.value / 2 : 0; // If labelPosition is set to `outside` or a donut chart is drawn then the label position is at the radius,
          // if regular pie chart it's half of the radius

          if (options.labelPosition === 'outside' || options.donut && !options.donutSolid) {
            labelRadius = radius;
          } else if (options.labelPosition === 'center') {
            // If labelPosition is center we start with 0 and will later wait for the labelOffset
            labelRadius = 0;
          } else if (options.donutSolid) {
            labelRadius = radius - donutWidth.value / 2;
          } else {
            // Default option is 'inside' where we use half the radius so the label will be placed in the center of the pie
            // slice
            labelRadius = radius / 2;
          } // Add the offset to the labelRadius where a negative offset means closed to the center of the chart


          labelRadius += options.labelOffset; // Calculate end angle based on total sum and current data value and offset with padding

          var center = {
            x: chartRect.x1 + chartRect.width() / 2,
            y: chartRect.y2 + chartRect.height() / 2
          }; // Check if there is only one non-zero value in the series array.

          var hasSingleValInSeries = data.raw.series.filter(function (val) {
            return val.hasOwnProperty('value') ? val.value !== 0 : val !== 0;
          }).length === 1; // Creating the series groups

          data.raw.series.forEach(function (series, index) {
            seriesGroups[index] = this.svg.elem('g', null, null);
          }.bind(this)); //if we need to show labels we create the label group now

          if (options.showLabel) {
            labelsGroup = this.svg.elem('g', null, null);
          } // Draw the series
          // initialize series groups


          data.raw.series.forEach(function (series, index) {
            // If current value is zero and we are ignoring empty values then skip to next value
            if (data.normalized.series[index] === 0 && options.ignoreEmptyValues) return; // If the series is an object and contains a name or meta data we add a custom attribute

            seriesGroups[index].attr({
              'ct:series-name': series.name
            }); // Use series class from series data or if not set generate one

            seriesGroups[index].addClass([options.classNames.series, series.className || options.classNames.series + '-' + Chartist.alphaNumerate(index)].join(' ')); // If the whole dataset is 0 endAngle should be zero. Can't divide by 0.

            var endAngle = totalDataSum > 0 ? startAngle + data.normalized.series[index] / totalDataSum * 360 : 0; // Use slight offset so there are no transparent hairline issues

            var overlappigStartAngle = Math.max(0, startAngle - (index === 0 || hasSingleValInSeries ? 0 : 0.2)); // If we need to draw the arc for all 360 degrees we need to add a hack where we close the circle
            // with Z and use 359.99 degrees

            if (endAngle - overlappigStartAngle >= 359.99) {
              endAngle = overlappigStartAngle + 359.99;
            }

            var start = Chartist.polarToCartesian(center.x, center.y, radius, overlappigStartAngle),
                end = Chartist.polarToCartesian(center.x, center.y, radius, endAngle);
            var innerStart, innerEnd, donutSolidRadius; // Create a new path element for the pie chart. If this isn't a donut chart we should close the path for a correct stroke

            var path = new Chartist.Svg.Path(!options.donut || options.donutSolid).move(end.x, end.y).arc(radius, radius, 0, endAngle - startAngle > 180, 0, start.x, start.y); // If regular pie chart (no donut) we add a line to the center of the circle for completing the pie

            if (!options.donut) {
              path.line(center.x, center.y);
            } else if (options.donutSolid) {
              donutSolidRadius = radius - donutWidth.value;
              innerStart = Chartist.polarToCartesian(center.x, center.y, donutSolidRadius, startAngle - (index === 0 || hasSingleValInSeries ? 0 : 0.2));
              innerEnd = Chartist.polarToCartesian(center.x, center.y, donutSolidRadius, endAngle);
              path.line(innerStart.x, innerStart.y);
              path.arc(donutSolidRadius, donutSolidRadius, 0, endAngle - startAngle > 180, 1, innerEnd.x, innerEnd.y);
            } // Create the SVG path
            // If this is a donut chart we add the donut class, otherwise just a regular slice


            var pathClassName = options.classNames.slicePie;

            if (options.donut) {
              pathClassName = options.classNames.sliceDonut;

              if (options.donutSolid) {
                pathClassName = options.classNames.sliceDonutSolid;
              }
            }

            var pathElement = seriesGroups[index].elem('path', {
              d: path.stringify()
            }, pathClassName); // Adding the pie series value to the path

            pathElement.attr({
              'ct:value': data.normalized.series[index],
              'ct:meta': Chartist.serialize(series.meta)
            }); // If this is a donut, we add the stroke-width as style attribute

            if (options.donut && !options.donutSolid) {
              pathElement._node.style.strokeWidth = donutWidth.value + 'px';
            } // Fire off draw event


            this.eventEmitter.emit('draw', {
              type: 'slice',
              value: data.normalized.series[index],
              totalDataSum: totalDataSum,
              index: index,
              meta: series.meta,
              series: series,
              group: seriesGroups[index],
              element: pathElement,
              path: path.clone(),
              center: center,
              radius: radius,
              startAngle: startAngle,
              endAngle: endAngle
            }); // If we need to show labels we need to add the label for this slice now

            if (options.showLabel) {
              var labelPosition;

              if (data.raw.series.length === 1) {
                // If we have only 1 series, we can position the label in the center of the pie
                labelPosition = {
                  x: center.x,
                  y: center.y
                };
              } else {
                // Position at the labelRadius distance from center and between start and end angle
                labelPosition = Chartist.polarToCartesian(center.x, center.y, labelRadius, startAngle + (endAngle - startAngle) / 2);
              }

              var rawValue;

              if (data.normalized.labels && !Chartist.isFalseyButZero(data.normalized.labels[index])) {
                rawValue = data.normalized.labels[index];
              } else {
                rawValue = data.normalized.series[index];
              }

              var interpolatedValue = options.labelInterpolationFnc(rawValue, index);

              if (interpolatedValue || interpolatedValue === 0) {
                var labelElement = labelsGroup.elem('text', {
                  dx: labelPosition.x,
                  dy: labelPosition.y,
                  'text-anchor': determineAnchorPosition(center, labelPosition, options.labelDirection)
                }, options.classNames.label).text('' + interpolatedValue); // Fire off draw event

                this.eventEmitter.emit('draw', {
                  type: 'label',
                  index: index,
                  group: labelsGroup,
                  element: labelElement,
                  text: '' + interpolatedValue,
                  x: labelPosition.x,
                  y: labelPosition.y
                });
              }
            } // Set next startAngle to current endAngle.
            // (except for last slice)


            startAngle = endAngle;
          }.bind(this));
          this.eventEmitter.emit('created', {
            chartRect: chartRect,
            svg: this.svg,
            options: options
          });
        }
        /**
         * This method creates a new pie chart and returns an object that can be used to redraw the chart.
         *
         * @memberof Chartist.Pie
         * @param {String|Node} query A selector query string or directly a DOM element
         * @param {Object} data The data object in the pie chart needs to have a series property with a one dimensional data array. The values will be normalized against each other and don't necessarily need to be in percentage. The series property can also be an array of value objects that contain a value property and a className property to override the CSS class name for the series group.
         * @param {Object} [options] The options object with options that override the default options. Check the examples for a detailed list.
         * @param {Array} [responsiveOptions] Specify an array of responsive option arrays which are a media query and options object pair => [[mediaQueryString, optionsObject],[more...]]
         * @return {Object} An object with a version and an update method to manually redraw the chart
         *
         * @example
         * // Simple pie chart example with four series
         * new Chartist.Pie('.ct-chart', {
         *   series: [10, 2, 4, 3]
         * });
         *
         * @example
         * // Drawing a donut chart
         * new Chartist.Pie('.ct-chart', {
         *   series: [10, 2, 4, 3]
         * }, {
         *   donut: true
         * });
         *
         * @example
         * // Using donut, startAngle and total to draw a gauge chart
         * new Chartist.Pie('.ct-chart', {
         *   series: [20, 10, 30, 40]
         * }, {
         *   donut: true,
         *   donutWidth: 20,
         *   startAngle: 270,
         *   total: 200
         * });
         *
         * @example
         * // Drawing a pie chart with padding and labels that are outside the pie
         * new Chartist.Pie('.ct-chart', {
         *   series: [20, 10, 30, 40]
         * }, {
         *   chartPadding: 30,
         *   labelOffset: 50,
         *   labelDirection: 'explode'
         * });
         *
         * @example
         * // Overriding the class names for individual series as well as a name and meta data.
         * // The name will be written as ct:series-name attribute and the meta data will be serialized and written
         * // to a ct:meta attribute.
         * new Chartist.Pie('.ct-chart', {
         *   series: [{
         *     value: 20,
         *     name: 'Series 1',
         *     className: 'my-custom-class-one',
         *     meta: 'Meta One'
         *   }, {
         *     value: 10,
         *     name: 'Series 2',
         *     className: 'my-custom-class-two',
         *     meta: 'Meta Two'
         *   }, {
         *     value: 70,
         *     name: 'Series 3',
         *     className: 'my-custom-class-three',
         *     meta: 'Meta Three'
         *   }]
         * });
         */


        function Pie(query, data, options, responsiveOptions) {
          Chartist.Pie["super"].constructor.call(this, query, data, defaultOptions, Chartist.extend({}, defaultOptions, options), responsiveOptions);
        } // Creating pie chart type in Chartist namespace


        Chartist.Pie = Chartist.Base.extend({
          constructor: Pie,
          createChart: createChart,
          determineAnchorPosition: determineAnchorPosition
        });
      })(this || global, Chartist);

      return Chartist;
    });
    /***/

  },

  /***/
  "./node_modules/ng-chartist/__ivy_ngcc__/fesm2015/ng-chartist.js":
  /*!***********************************************************************!*\
    !*** ./node_modules/ng-chartist/__ivy_ngcc__/fesm2015/ng-chartist.js ***!
    \***********************************************************************/

  /*! exports provided: ChartistComponent, ChartistModule */

  /***/
  function node_modulesNgChartist__ivy_ngcc__Fesm2015NgChartistJs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ChartistComponent", function () {
      return ChartistComponent;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ChartistModule", function () {
      return ChartistModule;
    });
    /* harmony import */


    var chartist__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! chartist */
    "./node_modules/chartist/dist/chartist.js");
    /* harmony import */


    var chartist__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(chartist__WEBPACK_IMPORTED_MODULE_0__);
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * Angular component which renders Chartist chart.
     *
     * See Chartist {\@link https://gionkunz.github.io/chartist-js/api-documentation.html API documentation} and
     * {\@link https://gionkunz.github.io/chartist-js/examples.html examples} for more information.
     * ### Example
     * ```html
     * <x-chartist
     * [type]="type"
     * [data]="data"
     * [options]="options"
     * [responsiveOptions]="responsiveOptions"
     * [events]="events"
     * ></x-chartist>
     * ```
     */


    var ChartistComponent = /*#__PURE__*/function () {
      /**
       * @ignore
       * @param {?} elementRef
       */
      function ChartistComponent(elementRef) {
        _classCallCheck(this, ChartistComponent);

        this.elementRef = elementRef;
        /**
         * Event emitted after Chartist chart has been initialized.
         *
         * Event handler function will receive chart instance argument.
         */

        this.initialized = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
      }
      /**
       * @ignore
       * @return {?}
       */


      _createClass(ChartistComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          if (this.type && this.data) {
            this.renderChart();
          }
        }
        /**
         * @ignore
         * @param {?} changes
         * @return {?}
         */

      }, {
        key: "ngOnChanges",
        value: function ngOnChanges(changes) {
          this.update(changes);
        }
        /**
         * @ignore
         * @return {?}
         */

      }, {
        key: "ngOnDestroy",
        value: function ngOnDestroy() {
          if (this.chart) {
            this.chart.detach();
            this.chart = null;
          }
        }
        /**
         * @ignore
         * @private
         * @return {?}
         */

      }, {
        key: "renderChart",
        value: function renderChart() {
          /** @type {?} */
          var nativeElement = this.elementRef.nativeElement;

          if (!(this.type in chartist__WEBPACK_IMPORTED_MODULE_0__)) {
            throw new Error("".concat(this.type, " is not a valid chart type"));
          }

          this.chart =
          /** @type {?} */
          chartist__WEBPACK_IMPORTED_MODULE_0__[this.type](nativeElement, this.data, this.options, this.responsiveOptions);

          if (this.events) {
            this.bindEvents();
          }

          this.initialized.emit(this.chart);
        }
        /**
         * @ignore
         * @private
         * @param {?} changes
         * @return {?}
         */

      }, {
        key: "update",
        value: function update(changes) {
          if (!this.type || !this.data) {
            return;
          }

          if (!this.chart || 'type' in changes) {
            this.renderChart();
          } else if (changes.data || changes.options) {
            /** @type {?} */
            this.chart.update(this.data, this.options);
          }
        }
        /**
         * @ignore
         * @private
         * @return {?}
         */

      }, {
        key: "bindEvents",
        value: function bindEvents() {
          for (var _i = 0, _Object$keys = Object.keys(this.events); _i < _Object$keys.length; _i++) {
            var event = _Object$keys[_i];
            this.chart.on(event, this.events[event]);
          }
        }
      }]);

      return ChartistComponent;
    }();

    ChartistComponent.ɵfac = function ChartistComponent_Factory(t) {
      return new (t || ChartistComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]));
    };

    ChartistComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
      type: ChartistComponent,
      selectors: [["x-chartist"]],
      inputs: {
        data: "data",
        type: "type",
        options: "options",
        responsiveOptions: "responsiveOptions",
        events: "events"
      },
      outputs: {
        initialized: "initialized"
      },
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵNgOnChangesFeature"]],
      decls: 0,
      vars: 0,
      template: function ChartistComponent_Template(rf, ctx) {},
      styles: ["[_nghost-%COMP%] {\n        display: block;\n      }"]
    });
    /** @nocollapse */

    ChartistComponent.ctorParameters = function () {
      return [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]
      }];
    };

    ChartistComponent.propDecorators = {
      data: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
      }],
      type: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
      }],
      options: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
      }],
      responsiveOptions: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
      }],
      events: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
      }],
      initialized: [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"]
      }]
    };
    /*@__PURE__*/

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](ChartistComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
        args: [{
          selector: 'x-chartist',
          template: '',
          styles: ["\n      :host {\n        display: block;\n      }\n    "]
        }]
      }], function () {
        return [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"]
        }];
      }, {
        initialized: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"]
        }],
        data: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }],
        type: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }],
        options: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }],
        responsiveOptions: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }],
        events: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"]
        }]
      });
    })();
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */


    var ChartistModule = function ChartistModule() {
      _classCallCheck(this, ChartistModule);
    };

    ChartistModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({
      type: ChartistModule
    });
    ChartistModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({
      factory: function ChartistModule_Factory(t) {
        return new (t || ChartistModule)();
      },
      imports: [[]]
    });

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](ChartistModule, {
        declarations: [ChartistComponent],
        exports: [ChartistComponent]
      });
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](ChartistModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"],
        args: [{
          declarations: [ChartistComponent],
          imports: [],
          exports: [ChartistComponent]
        }]
      }], null, null);
    })();
    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    //# sourceMappingURL=ng-chartist.js.map

    /***/

  },

  /***/
  "./src/app/orderList/orderDetail/orderDetail.component.ts":
  /*!****************************************************************!*\
    !*** ./src/app/orderList/orderDetail/orderDetail.component.ts ***!
    \****************************************************************/

  /*! exports provided: OrderDetailComponent */

  /***/
  function srcAppOrderListOrderDetailOrderDetailComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "OrderDetailComponent", function () {
      return OrderDetailComponent;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/material */
    "./node_modules/@angular/material/__ivy_ngcc__/esm2015/material.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
    /* harmony import */


    var app_shared_models_order__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! app/shared/models/order */
    "./src/app/shared/models/order.ts");
    /* harmony import */


    var app_shared_services_orderService__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! app/shared/services/orderService */
    "./src/app/shared/services/orderService.ts");
    /* harmony import */


    var _angular_animations__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @angular/animations */
    "./node_modules/@angular/animations/__ivy_ngcc__/fesm2015/animations.js");
    /* harmony import */


    var _angular_material_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! @angular/material/core */
    "./node_modules/@angular/material/__ivy_ngcc__/esm2015/core.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");

    var _c0 = ["tabGroup"];

    function OrderDetailComponent_mat_option_55_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-option", 85);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var status_r46 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", status_r46);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", status_r46, " ");
      }
    }

    function OrderDetailComponent_mat_option_63_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-option", 85);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var status_r47 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", status_r47);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", status_r47, " ");
      }
    }

    function OrderDetailComponent_mat_option_76_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-option", 85);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var status_r48 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", status_r48);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", status_r48, " ");
      }
    }

    function OrderDetailComponent_button_147_Template(rf, ctx) {
      if (rf & 1) {
        var _r50 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 86);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function OrderDetailComponent_button_147_Template_button_click_0_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r50);

          var ctx_r49 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          return ctx_r49.cancelEdit();
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Cancel");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }
    }

    function OrderDetailComponent_th_150_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 87);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " From ");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }
    }

    function OrderDetailComponent_td_151_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 88);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var element_r51 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", element_r51.writterName, " ");
      }
    }

    function OrderDetailComponent_th_153_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 87);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Message ");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }
    }

    function OrderDetailComponent_td_154_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 89);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var element_r52 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", element_r52.noteMessage, " ");
      }
    }

    function OrderDetailComponent_th_156_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 87);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Created at ");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }
    }

    function OrderDetailComponent_td_157_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 88);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "date");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var element_r53 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 1, element_r53.date), " ");
      }
    }

    function OrderDetailComponent_td_159_Template(rf, ctx) {
      if (rf & 1) {
        var _r56 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 90);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 91);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 7);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 37);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "button", 92);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function OrderDetailComponent_td_159_Template_button_click_4_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r56);

          var element_r54 = ctx.$implicit;

          var ctx_r55 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          return ctx_r55.deleteNote(element_r54);
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "mat-icon");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "delete");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "button", 93);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function OrderDetailComponent_td_159_Template_button_click_7_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r56);

          var element_r54 = ctx.$implicit;

          var ctx_r57 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          return ctx_r57.editNote(element_r54);
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "mat-icon");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "create");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var element_r54 = ctx.$implicit;

        var ctx_r11 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("colspan", ctx_r11.displayedColumns.length);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("@detailExpand", element_r54 == ctx_r11.expandedOrder ? "expanded" : "collapsed");
      }
    }

    function OrderDetailComponent_tr_160_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "tr", 94);
      }
    }

    function OrderDetailComponent_tr_161_Template(rf, ctx) {
      if (rf & 1) {
        var _r60 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "tr", 95);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function OrderDetailComponent_tr_161_Template_tr_click_0_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r60);

          var element_r58 = ctx.$implicit;

          var ctx_r59 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          return ctx_r59.expandedOrder = ctx_r59.expandedOrder === element_r58 ? null : element_r58;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var element_r58 = ctx.$implicit;

        var ctx_r13 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("example-expanded-row", ctx_r13.expandedOrder === element_r58);
      }
    }

    function OrderDetailComponent_tr_162_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "tr", 96);
      }
    }

    function OrderDetailComponent_button_172_Template(rf, ctx) {
      if (rf & 1) {
        var _r63 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 97);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function OrderDetailComponent_button_172_Template_button_click_0_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r63);

          var ctx_r62 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          return ctx_r62.editAddress();
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Edit Address");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }
    }

    function OrderDetailComponent_button_174_Template(rf, ctx) {
      if (rf & 1) {
        var _r65 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 98);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function OrderDetailComponent_button_174_Template_button_click_0_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r65);

          var ctx_r64 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          return ctx_r64.cancelAddress();
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Cancel");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }
    }

    function OrderDetailComponent_button_175_Template(rf, ctx) {
      if (rf & 1) {
        var _r67 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "button", 99);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function OrderDetailComponent_button_175_Template_button_click_0_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r67);

          var ctx_r66 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          return ctx_r66.cancelAddress();
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Save");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }
    }

    function OrderDetailComponent_mat_option_219_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-option", 85);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var status_r68 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", status_r68);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", status_r68, " ");
      }
    }

    function OrderDetailComponent_mat_option_272_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-option", 85);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var event_r69 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", event_r69);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", event_r69, " ");
      }
    }

    function OrderDetailComponent_th_275_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 100);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Event type ");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }
    }

    function OrderDetailComponent_td_276_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 90);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var element_r70 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", element_r70.eventType, " ");
      }
    }

    function OrderDetailComponent_th_278_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 101);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Date ");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }
    }

    function OrderDetailComponent_td_279_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 102);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "date");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var element_r71 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 1, element_r71.date), " ");
      }
    }

    function OrderDetailComponent_th_281_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 101);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " User ");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }
    }

    function OrderDetailComponent_td_282_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 90);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var element_r72 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", element_r72.user, " ");
      }
    }

    function OrderDetailComponent_th_284_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 101);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " IP ");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }
    }

    function OrderDetailComponent_td_285_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 90);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var element_r73 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", element_r73.ip, " ");
      }
    }

    function OrderDetailComponent_th_287_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 101);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Details ");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }
    }

    function OrderDetailComponent_td_288_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 90);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var element_r74 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", element_r74.details, " ");
      }
    }

    function OrderDetailComponent_th_290_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 101);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Agent ");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }
    }

    function OrderDetailComponent_td_291_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 90);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var element_r75 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", element_r75.agent, " ");
      }
    }

    function OrderDetailComponent_tr_292_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "tr", 94);
      }
    }

    function OrderDetailComponent_tr_293_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "tr", 103);
      }
    }

    function OrderDetailComponent_th_301_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 100);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Item ");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }
    }

    function OrderDetailComponent_td_302_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 102);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var element_r77 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", element_r77.item, " ");
      }
    }

    function OrderDetailComponent_th_304_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 100);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Cost");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }
    }

    function OrderDetailComponent_td_305_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 88);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var element_r78 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" $", element_r78.cost, " ");
      }
    }

    function OrderDetailComponent_th_307_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 100);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Quantity");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }
    }

    function OrderDetailComponent_td_308_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 88);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var element_r79 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" $", element_r79.quantity, " ");
      }
    }

    function OrderDetailComponent_th_310_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 100);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Total");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }
    }

    function OrderDetailComponent_td_311_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 90);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var element_r80 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" $", element_r80.quantity * element_r80.cost, " ");
      }
    }

    function OrderDetailComponent_tr_312_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "tr", 94);
      }
    }

    function OrderDetailComponent_tr_313_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "tr", 103);
      }
    }

    function OrderDetailComponent_div_314_Template(rf, ctx) {
      if (rf & 1) {
        var _r83 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 7);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 104);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-card", 11);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 3);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "mat-card-title", 10);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, " Merge orders ");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "button", 105);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "span", 6);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "call_merge");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, " Merge");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "mat-card-content");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 7);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "div", 11);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "mat-form-field", 19);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "mat-label");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "Merge");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "mat-select", 20);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("valueChange", function OrderDetailComponent_div_314_Template_mat_select_valueChange_16_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r83);

          var ctx_r82 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          return ctx_r82.orderStatus = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "mat-option");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "--");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "div", 106);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "button", 38);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function OrderDetailComponent_div_314_Template_button_click_20_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r83);

          var ctx_r84 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          return ctx_r84.goBack();
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](21, "Save Changes");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "button", 107);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function OrderDetailComponent_div_314_Template_button_click_22_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r83);

          var ctx_r85 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          return ctx_r85.goBack();
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "mat-icon");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](24, "reply");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, " Go Back ");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "button", 108);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "mat-icon");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](28, "local_fire_department");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](29, " Mark as hot ");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "button", 109);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "mat-icon");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](32, "print");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](33, " Print ");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var ctx_r44 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](16);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", ctx_r44.orderStatus);
      }
    }

    function OrderDetailComponent_div_315_Template(rf, ctx) {
      if (rf & 1) {
        var _r87 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 37);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "button", 38);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function OrderDetailComponent_div_315_Template_button_click_1_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r87);

          var ctx_r86 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          return ctx_r86.goBack();
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "Save Changes");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "button", 107);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function OrderDetailComponent_div_315_Template_button_click_3_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r87);

          var ctx_r88 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          return ctx_r88.goBack();
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "mat-icon");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "reply");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6, "Go Back ");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "button", 108);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "mat-icon");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "local_fire_department");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10, " Mark as hot ");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "button", 109);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "mat-icon");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "print");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14, " Print ");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }
    }

    var _c1 = function _c1() {
      return ["expandedOrder"];
    };

    var OrderDetailComponent = /*#__PURE__*/function () {
      function OrderDetailComponent(_router, _activeRouter, orderService) {
        _classCallCheck(this, OrderDetailComponent);

        this._router = _router;
        this._activeRouter = _activeRouter;
        this.orderService = orderService;
        this.displayedColumns = ['from', 'message', 'createdAt'];
        this.displayedColumnsLogs = ['eventType', 'date', 'user', 'details', 'ip', 'agent'];
        this.order = new app_shared_models_order__WEBPACK_IMPORTED_MODULE_3__["Order"]();
        this.orderStatus = '';
        this.courier = 'UPS';
        this.noteMessage = '';
        this.notes = new Array();
        this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"]();
        this.isEdit = false;
        this.isDisabled = true;
        this.tabIndex = 0;
        this.logs = new Array();
        this.logDataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"]();
        this.eventTypes = ['OrderUpdated', 'OrderNoteCreated', 'OrderCreated'];
        this.productsDataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"]();
        this.displayedColumnsProd = ['item', 'cost', 'quantity', 'total'];
        this.products = new Array();
        this.router = _router;
        this.activeRouter = _activeRouter;
      }

      _createClass(OrderDetailComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          var _this = this;

          var _a;

          this.id = this.activeRouter.snapshot.params['id'];
          this.order = this.orderService.orders.find(function (a) {
            return a.orderID == _this.id;
          });
          this.statuses = this.orderService.statuses;
          this.orderStatus = (_a = this.order) === null || _a === void 0 ? void 0 : _a.orderStatus;
          this.logDataSource.data = this.orderService.logs;
          this.productsDataSource.data = this.orderService.products;
          this.shippingCouriers = this.orderService.couriers;
        }
      }, {
        key: "ngAfterViewInit",
        value: function ngAfterViewInit() {// this.tabIndex = 0;
        }
      }, {
        key: "tabChanged",
        value: function tabChanged(tabChangeEvent) {
          this.tabIndex = tabChangeEvent.index;
        }
      }, {
        key: "applyFilter",
        value: function applyFilter(event) {
          if (event.value) {
            var filterValue = event.value;
            this.logDataSource.filter = filterValue.trim().toLowerCase();
          } else {
            this.logDataSource.filter = '';
          }
        }
      }, {
        key: "goBack",
        value: function goBack() {
          this.router.navigateByUrl('/orderlist');
        }
      }, {
        key: "saveNote",
        value: function saveNote(noteMessage, isEdit) {
          var _this2 = this;

          var _a, _b;

          if (!isEdit) {
            var id = (_a = this.notes) === null || _a === void 0 ? void 0 : _a.length;

            if (id) {
              id = id + 1;
            } else {
              id = 1;
            }

            var note = {
              'noteId': id,
              'date': new Date(),
              'noteMessage': noteMessage,
              'writterName': 'Mike'
            };
            (_b = this.notes) === null || _b === void 0 ? void 0 : _b.push(note);
            this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTableDataSource"]();
            this.dataSource.data = this.notes;
            this.noteMessage = '';
          } else {
            this.notes.forEach(function (res) {
              if (res.noteId == _this2.noteToEdit) {
                res.noteMessage = noteMessage;
              }
            });
            this.dataSource.data = this.notes;
            this.isEdit = false;
            this.noteMessage = '';
          }
        }
      }, {
        key: "deleteNote",
        value: function deleteNote(note) {
          var index = this.notes.indexOf(note);
          this.notes.splice(index, 1);
          console.log(this.notes);
          this.dataSource.data = this.notes;
        }
      }, {
        key: "editNote",
        value: function editNote(note) {
          this.noteMessage = note.noteMessage;
          this.isEdit = true;
          this.noteToEdit = note.noteId;
        }
      }, {
        key: "cancelEdit",
        value: function cancelEdit() {
          this.noteMessage = '';
          this.isEdit = false;
        }
      }, {
        key: "editAddress",
        value: function editAddress() {
          this.isDisabled = false;
        }
      }, {
        key: "cancelAddress",
        value: function cancelAddress() {
          this.isDisabled = true;
        }
      }]);

      return OrderDetailComponent;
    }();

    OrderDetailComponent.ɵfac = function OrderDetailComponent_Factory(t) {
      return new (t || OrderDetailComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](app_shared_services_orderService__WEBPACK_IMPORTED_MODULE_4__["OrderService"]));
    };

    OrderDetailComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: OrderDetailComponent,
      selectors: [["app-order-detail"]],
      viewQuery: function OrderDetailComponent_Query(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_c0, true);
        }

        if (rf & 2) {
          var _t;

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.tabGroup = _t.first);
        }
      },
      decls: 316,
      vars: 49,
      consts: [["mat-align-tabs", "start", 3, "selectedTabChange"], ["tabGroup", ""], ["label", "Order Details"], [1, "grid-row", "card-header"], [1, "col-4"], ["mat-raised-button", "", "color", "basic", 1, "col-4"], [1, "material-icons"], [1, "grid-row"], [1, "col-4", "barcode-div"], ["src", "https://barcode.tec-it.com/barcode.ashx?data=https%3a%2f%2fwww.tec-it.com&code=MobileQRUrl&dpi=96&dataseparator=", 1, "barcode"], [1, "col-8"], [1, "col-12"], ["disabled", "", "value", "Randolph", "matInput", ""], ["disabled", "", "value", "airo@gmail.com", "matInput", ""], [1, "col-6"], ["label", "Administration"], ["mat-raised-button", "", "color", "accent", 1, "footerbtns", "col-2"], ["mat-raised-button", "", "color", "basic", 1, "footerbtns", "col-2"], [1, "col-3"], ["appearance", "fill"], ["name", "status", 3, "value", "valueChange"], [3, "value", 4, "ngFor", "ngForOf"], ["matInput", "", 3, "value"], ["label", "Payment Details"], ["mat-raised-button", "", "color", "warn", 1, "footerbtns", "col-2"], ["mat-raised-button", "", "color", "primary", 1, "footerbtns", "col-2"], ["clas", "col-6"], ["matInput", "", "disabled", "", "value", "Credit"], ["matInput", "", "disabled", "", "value", ""], ["matInput", "", "disabled", "", "value", "square , Account: Vlada Square Sandbox (API ID: sandbox-sq0idb-E4nW6UvnF2h_8y6zvOCEdg)"], ["matInput", "", "disabled", "", "value", "1111"], ["matInput", "", "disabled", "", "value", "VISA"], ["matInput", "", "disabled", "", "value", "BGXm"], ["matInput", "", "disabled", "", "value", "BGXmQRuwMhd5juk7ma9jLw1QqBgZY"], ["label", "Notes"], [1, "example-full-width"], ["matInput", "", "placeholder", "Write message", 3, "ngModel", "ngModelChange"], [1, "button-row"], ["mat-raised-button", "", "color", "accent", 1, "footerbtns", 3, "click"], ["mat-raised-button", "", "class", "footerbtns", "color", "warn", 3, "click", 4, "ngIf"], ["mat-table", "", "multiTemplateDataRows", "", 1, "mat-elevation-z8", 3, "dataSource"], ["matColumnDef", "from"], ["class", "align", "mat-header-cell", "", 4, "matHeaderCellDef"], ["class", "align", "mat-cell", "", 4, "matCellDef"], ["matColumnDef", "message"], ["class", "break align", "mat-cell", "", 4, "matCellDef"], ["matColumnDef", "createdAt"], ["matColumnDef", "expandedOrder"], ["mat-cell", "", 4, "matCellDef"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", "class", "example-element-row", 3, "example-expanded-row", "click", 4, "matRowDef", "matRowDefColumns"], ["mat-row", "", "class", "example-detail-row", 4, "matRowDef", "matRowDefColumns"], ["label", "Shipping details"], [1, "col-5"], ["mat-raised-button", "", "class", "col-4", "color", "accent", 3, "click", 4, "ngIf"], ["mat-raised-button", "", "class", "col-6", "color", "basic", 3, "click", 4, "ngIf"], ["mat-raised-button", "", "class", "col-6", "color", "accent", 3, "click", 4, "ngIf"], ["matInput", "", "value", "Credit", 3, "disabled"], ["name", "status", 3, "disabled", "value", "valueChange"], [1, "col-6", 2, "height", "50%"], ["disabled", "", "value", "Test/123321/Testa 312Ab", "matInput", "", "placeholder", "Write message"], ["label", "Totals"], ["matInput", "", "disabled", "", "value", "$41.14"], ["matInput", "", "disabled", "", "value", "$32"], ["matInput", "", "disabled", "", "value", "UPS Expedited Mail Innovations"], ["matInput", "", "disabled", "", "value", "$73.14"], ["label", "Activity Log"], ["name", "event", 3, "selectionChange"], ["matColumnDef", "eventType"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["matColumnDef", "date"], ["class", "padding", "mat-header-cell", "", 4, "matHeaderCellDef"], ["class", "break", "mat-cell", "", 4, "matCellDef"], ["matColumnDef", "user"], ["matColumnDef", "ip"], ["matColumnDef", "details"], ["matColumnDef", "agent"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["label", "Products"], ["matColumnDef", "item"], ["matColumnDef", "cost"], ["matColumnDef", "quantity"], ["matColumnDef", "total"], ["class", "grid-row", 4, "ngIf"], ["class", "button-row", 4, "ngIf"], [3, "value"], ["mat-raised-button", "", "color", "warn", 1, "footerbtns", 3, "click"], ["mat-header-cell", "", 1, "align"], ["mat-cell", "", 1, "align"], ["mat-cell", "", 1, "break", "align"], ["mat-cell", ""], [1, "example-element-detail"], ["mat-button", "", "mat-button-base", "", "mat-warn", "", "color", "warn", 1, "footerbtns", 3, "click"], ["mat-button", "", "mat-button-base", "", "mat-accent", "", "color", "accent", 1, "footerbtns", 3, "click"], ["mat-header-row", ""], ["mat-row", "", 1, "example-element-row", 3, "click"], ["mat-row", "", 1, "example-detail-row"], ["mat-raised-button", "", "color", "accent", 1, "col-4", 3, "click"], ["mat-raised-button", "", "color", "basic", 1, "col-6", 3, "click"], ["mat-raised-button", "", "color", "accent", 1, "col-6", 3, "click"], ["mat-header-cell", ""], ["mat-header-cell", "", 1, "padding"], ["mat-cell", "", 1, "break"], ["mat-row", ""], [1, "grid-row", "col-8"], ["mat-button", "", "mat-button-base", "", "mat-primary", "", "color", "accent", 1, "col-4"], [1, "button-row", "col-4"], ["mat-raised-button", "", "color", "basic", 1, "footerbtns", 3, "click"], ["mat-raised-button", "", "color", "warn", 1, "footerbtns"], ["mat-raised-button", "", "color", "primary", 1, "footerbtns"]],
      template: function OrderDetailComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-tab-group", 0, 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("selectedTabChange", function OrderDetailComponent_Template_mat_tab_group_selectedTabChange_0_listener($event) {
            return ctx.tabChanged($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "mat-tab", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-card");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "div", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "mat-card-title", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "mat-card-title", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, " User ID : 12321 ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "button", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "span", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "description");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, " View user profile details");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "div", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "div", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](15, "img", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "div", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "mat-form-field", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "mat-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](20, "Name");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](21, "input", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "div", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "mat-form-field", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "mat-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, "Email");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](26, "input", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](27, "div", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "mat-card-title", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](29);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](30, "date");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "mat-card-title", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](33, "date");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](34, "mat-tab", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "mat-card");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "div", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](37, "mat-card-title", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](38);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](39, "button", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "span", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](41, "description");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](42, " Update Order ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "button", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](44, "span", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](45, "description");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](46, " Resend to XPS");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "div", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](48, "div", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "mat-form-field", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](50, "mat-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](51, "Order Status");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "mat-select", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("valueChange", function OrderDetailComponent_Template_mat_select_valueChange_52_listener($event) {
            return ctx.orderStatus = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](53, "mat-option");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](54, "--");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](55, OrderDetailComponent_mat_option_55_Template, 2, 2, "mat-option", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "div", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](57, "mat-form-field", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](58, "mat-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](59, "Shipping Courier UPS");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](60, "mat-select", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("valueChange", function OrderDetailComponent_Template_mat_select_valueChange_60_listener($event) {
            return ctx.courier = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](61, "mat-option");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](62, "--");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](63, OrderDetailComponent_mat_option_63_Template, 2, 2, "mat-option", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](64, "div", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](65, "mat-form-field", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](66, "mat-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](67, "Tracking Number");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](68, "input", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](69, "div", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](70, "mat-form-field", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](71, "mat-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](72, "Payment");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](73, "mat-select", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("valueChange", function OrderDetailComponent_Template_mat_select_valueChange_73_listener($event) {
            return ctx.orderStatus = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](74, "mat-option");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](75, "--");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](76, OrderDetailComponent_mat_option_76_Template, 2, 2, "mat-option", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](77, "mat-tab", 23);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](78, "mat-card");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](79, "div", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](80, "mat-card-title", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](81);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](82, "button", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](83, "mat-icon");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](84, "local_fire_department");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](85, " Refund items ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](86, "button", 25);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](87, "mat-icon");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](88, "local_atm");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](89, " Partial refund ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](90, "mat-card-content");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](91, "div", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](92, "mat-card-title", 26);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](93, " PAYMENT PROCESSED WITH SQUARE ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](94, "div", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](95, "mat-form-field", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](96, "mat-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](97, "Payment:");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](98, "input", 27);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](99, "mat-form-field", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](100, "mat-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](101, "Method:");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](102, "input", 28);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](103, "mat-form-field", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](104, "mat-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](105, "Payment:");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](106, "input", 29);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](107, "div", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](108, "mat-form-field", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](109, "mat-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](110, "Gateway:");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](111, "input", 29);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](112, "mat-form-field", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](113, "mat-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](114, "Last 4:");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](115, "input", 30);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](116, "mat-form-field", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](117, "mat-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](118, "CardType:");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](119, "input", 31);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](120, "div", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](121, "mat-form-field", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](122, "mat-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](123, "Receipt #:");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](124, "input", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](125, "mat-form-field", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](126, "mat-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](127, "Transaction Reference:");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](128, "input", 33);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](129, "mat-form-field", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](130, "mat-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](131, "Message:");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](132, "input", 28);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](133, "mat-tab", 34);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](134, "mat-card");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](135, "div", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](136, "mat-card-title", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](137);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](138, "mat-card-content");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](139, "div", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](140, "mat-form-field", 35);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](141, "mat-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](142, "Note");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](143, "textarea", 36);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function OrderDetailComponent_Template_textarea_ngModelChange_143_listener($event) {
            return ctx.noteMessage = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](144, "div", 37);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](145, "button", 38);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function OrderDetailComponent_Template_button_click_145_listener() {
            return ctx.saveNote(ctx.noteMessage, ctx.isEdit);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](146, "Save Note");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](147, OrderDetailComponent_button_147_Template, 2, 0, "button", 39);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](148, "table", 40);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](149, 41);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](150, OrderDetailComponent_th_150_Template, 2, 0, "th", 42);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](151, OrderDetailComponent_td_151_Template, 2, 1, "td", 43);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](152, 44);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](153, OrderDetailComponent_th_153_Template, 2, 0, "th", 42);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](154, OrderDetailComponent_td_154_Template, 2, 1, "td", 45);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](155, 46);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](156, OrderDetailComponent_th_156_Template, 2, 0, "th", 42);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](157, OrderDetailComponent_td_157_Template, 3, 3, "td", 43);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](158, 47);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](159, OrderDetailComponent_td_159_Template, 10, 2, "td", 48);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](160, OrderDetailComponent_tr_160_Template, 1, 0, "tr", 49);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](161, OrderDetailComponent_tr_161_Template, 1, 2, "tr", 50);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](162, OrderDetailComponent_tr_162_Template, 1, 0, "tr", 51);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](163, "mat-tab", 52);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](164, "div", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](165, "mat-card-title", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](166);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](167, "div", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](168, "mat-card", 53);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](169, "mat-card-content", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](170, "mat-card-title", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](171, " SHIPPING ADDRESS ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](172, OrderDetailComponent_button_172_Template, 2, 0, "button", 54);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](173, "div", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](174, OrderDetailComponent_button_174_Template, 2, 0, "button", 55);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](175, OrderDetailComponent_button_175_Template, 2, 0, "button", 56);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](176, "div", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](177, "mat-form-field", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](178, "mat-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](179, "First name:");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](180, "input", 57);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](181, "mat-form-field", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](182, "mat-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](183, "Last name:");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](184, "input", 57);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](185, "mat-form-field", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](186, "mat-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](187, "Home phone:");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](188, "input", 57);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](189, "div", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](190, "mat-form-field", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](191, "mat-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](192, "Address:");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](193, "input", 57);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](194, "mat-form-field", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](195, "mat-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](196, "Address 2:");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](197, "input", 57);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](198, "div", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](199, "mat-form-field", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](200, "mat-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](201, "City:");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](202, "input", 57);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](203, "mat-form-field", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](204, "mat-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](205, "State:");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](206, "input", 57);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](207, "mat-form-field", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](208, "mat-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](209, "Zip:");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](210, "input", 57);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](211, "div", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](212, "div", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](213, "mat-form-field", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](214, "mat-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](215, "Country");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](216, "mat-select", 58);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("valueChange", function OrderDetailComponent_Template_mat_select_valueChange_216_listener($event) {
            return ctx.orderStatus = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](217, "mat-option");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](218, "--");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](219, OrderDetailComponent_mat_option_219_Template, 2, 2, "mat-option", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](220, "mat-card", 59);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](221, "mat-card-content");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](222, "mat-card-title");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](223, " BILLING ADDRESS ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](224, "div", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](225, "mat-form-field", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](226, "mat-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](227, "Address");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](228, "textarea", 60);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](229, "mat-tab", 61);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](230, "mat-card");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](231, "div", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](232, "mat-card-title", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](233);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](234, "mat-card-title", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](235, " APPLIED COUPON: STOCKUP30 (30%) ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](236, "mat-card-content");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](237, "div", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](238, "mat-form-field", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](239, "mat-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](240, "Subtotal:");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](241, "input", 62);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](242, "mat-form-field", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](243, "mat-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](244, "Shipping total:");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](245, "input", 63);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](246, "mat-form-field", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](247, "mat-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](248, "Shipping method:");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](249, "input", 64);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](250, "div", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](251, "mat-form-field", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](252, "mat-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](253, "Billed charges:");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](254, "input", 65);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](255, "mat-form-field", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](256, "mat-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](257, "Order total:");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](258, "input", 65);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](259, "mat-tab", 66);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](260, "mat-card");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](261, "div", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](262, "mat-card-title", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](263, " Activity log ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](264, "div", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](265, "div", 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](266, "mat-form-field", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](267, "mat-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](268, "Country");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](269, "mat-select", 67);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("selectionChange", function OrderDetailComponent_Template_mat_select_selectionChange_269_listener($event) {
            return ctx.applyFilter($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](270, "mat-option");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](271, "--");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](272, OrderDetailComponent_mat_option_272_Template, 2, 2, "mat-option", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](273, "table", 40);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](274, 68);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](275, OrderDetailComponent_th_275_Template, 2, 0, "th", 69);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](276, OrderDetailComponent_td_276_Template, 2, 1, "td", 48);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](277, 70);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](278, OrderDetailComponent_th_278_Template, 2, 0, "th", 71);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](279, OrderDetailComponent_td_279_Template, 3, 3, "td", 72);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](280, 73);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](281, OrderDetailComponent_th_281_Template, 2, 0, "th", 71);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](282, OrderDetailComponent_td_282_Template, 2, 1, "td", 48);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](283, 74);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](284, OrderDetailComponent_th_284_Template, 2, 0, "th", 71);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](285, OrderDetailComponent_td_285_Template, 2, 1, "td", 48);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](286, 75);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](287, OrderDetailComponent_th_287_Template, 2, 0, "th", 71);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](288, OrderDetailComponent_td_288_Template, 2, 1, "td", 48);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](289, 76);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](290, OrderDetailComponent_th_290_Template, 2, 0, "th", 71);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](291, OrderDetailComponent_td_291_Template, 2, 1, "td", 48);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](292, OrderDetailComponent_tr_292_Template, 1, 0, "tr", 49);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](293, OrderDetailComponent_tr_293_Template, 1, 0, "tr", 77);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](294, "mat-tab", 78);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](295, "div", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](296, "mat-card-title", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](297, " Products ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](298, "mat-card");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](299, "table", 40);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](300, 79);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](301, OrderDetailComponent_th_301_Template, 2, 0, "th", 69);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](302, OrderDetailComponent_td_302_Template, 2, 1, "td", 72);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](303, 80);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](304, OrderDetailComponent_th_304_Template, 2, 0, "th", 69);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](305, OrderDetailComponent_td_305_Template, 2, 1, "td", 43);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](306, 81);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](307, OrderDetailComponent_th_307_Template, 2, 0, "th", 69);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](308, OrderDetailComponent_td_308_Template, 2, 1, "td", 43);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](309, 82);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](310, OrderDetailComponent_th_310_Template, 2, 0, "th", 69);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](311, OrderDetailComponent_td_311_Template, 2, 1, "td", 48);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](312, OrderDetailComponent_tr_312_Template, 1, 0, "tr", 49);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](313, OrderDetailComponent_tr_313_Template, 1, 0, "tr", 77);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](314, OrderDetailComponent_div_314_Template, 34, 1, "div", 83);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](315, OrderDetailComponent_div_315_Template, 15, 0, "div", 84);
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" Order | ", ctx.order == null ? null : ctx.order.orderID, " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](23);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" CREATED: ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](30, 44, ctx.order == null ? null : ctx.order.date), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" UPDATED: ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](33, 46, ctx.order == null ? null : ctx.order.date), " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" Order | ", ctx.order == null ? null : ctx.order.orderID, " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](14);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", ctx.orderStatus);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.statuses);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", ctx.courier);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.shippingCouriers);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", ctx.order == null ? null : ctx.order.trackingNumber);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", ctx.orderStatus);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.orderService.payments);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" Order | ", ctx.order == null ? null : ctx.order.orderID, " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](56);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" Order | ", ctx.order == null ? null : ctx.order.orderID, " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.noteMessage);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.isEdit);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("dataSource", ctx.dataSource);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](12);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matHeaderRowDef", ctx.displayedColumns);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matRowDefColumns", ctx.displayedColumns);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matRowDefColumns", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](48, _c1));

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" Order | ", ctx.order == null ? null : ctx.order.orderID, " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.isDisabled);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.isDisabled);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", !ctx.isDisabled);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx.isDisabled);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx.isDisabled);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx.isDisabled);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx.isDisabled);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx.isDisabled);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx.isDisabled);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx.isDisabled);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx.isDisabled);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("disabled", ctx.isDisabled)("value", ctx.orderStatus);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.statuses);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](14);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" Order | ", ctx.order == null ? null : ctx.order.orderID, " ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](39);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.eventTypes);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("dataSource", ctx.logDataSource);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](19);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matHeaderRowDef", ctx.displayedColumnsLogs);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matRowDefColumns", ctx.displayedColumnsLogs);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("dataSource", ctx.productsDataSource);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](13);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matHeaderRowDef", ctx.displayedColumnsProd);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matRowDefColumns", ctx.displayedColumnsProd);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.tabIndex == 0);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.tabIndex !== 0);
        }
      },
      directives: [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTabGroup"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTab"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatCard"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatCardTitle"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatButton"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatFormField"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatLabel"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatInput"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatSelect"], _angular_material_core__WEBPACK_IMPORTED_MODULE_6__["MatOption"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgForOf"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatIcon"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatCardContent"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_8__["NgModel"], _angular_common__WEBPACK_IMPORTED_MODULE_7__["NgIf"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatTable"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatColumnDef"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatHeaderCellDef"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatCellDef"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatHeaderRowDef"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatRowDef"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatHeaderCell"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatCell"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatHeaderRow"], _angular_material__WEBPACK_IMPORTED_MODULE_1__["MatRow"]],
      pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_7__["DatePipe"]],
      styles: [".col-1[_ngcontent-%COMP%] {\n  width: 8.33%;\n  padding: 8px 8px;\n  box-sizing: border-box;\n}\n.col-2[_ngcontent-%COMP%] {\n  width: 16.66%;\n  padding: 8px 8px;\n  box-sizing: border-box;\n}\n.col-2-5[_ngcontent-%COMP%] {\n  width: 20%;\n  padding: 8px 8px;\n  box-sizing: border-box;\n}\n.col-3[_ngcontent-%COMP%] {\n  width: 25%;\n  padding: 8px 8px;\n  box-sizing: border-box;\n}\n.col-4[_ngcontent-%COMP%] {\n  width: 33.33%;\n  padding: 8px 8px;\n  box-sizing: border-box;\n}\n.col-5[_ngcontent-%COMP%] {\n  width: 41.66%;\n  padding: 8px 8px;\n  box-sizing: border-box;\n}\n.col-6[_ngcontent-%COMP%] {\n  width: 50%;\n  padding: 8px 8px;\n  box-sizing: border-box;\n}\n.col-7[_ngcontent-%COMP%] {\n  width: 58.33%;\n  padding: 8px 8px;\n  box-sizing: border-box;\n}\n.col-8[_ngcontent-%COMP%] {\n  width: 66.66%;\n  padding: 8px 8px;\n  box-sizing: border-box;\n}\n.col-9[_ngcontent-%COMP%] {\n  width: 75%;\n  padding: 8px 8px;\n  box-sizing: border-box;\n}\n.col-10[_ngcontent-%COMP%] {\n  width: 83.33%;\n  padding: 8px 8px;\n  box-sizing: border-box;\n}\n.col-11[_ngcontent-%COMP%] {\n  width: 91.66%;\n  padding: 8px 8px;\n  box-sizing: border-box;\n}\n.col-12[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 8px 8px;\n  box-sizing: border-box;\n}\n.grid-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.grid-row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n}\n@media only screen and (max-width: 673px) {\n  .row-actions[_ngcontent-%COMP%]    > mat-form-field[_ngcontent-%COMP%] {\n    margin-left: 0 !important;\n    padding-left: 0 !important;\n  }\n  .form-row[_ngcontent-%COMP%] {\n    display: inline-grid !important;\n    width: -webkit-fill-available;\n  }\n  .form-row[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] {\n    width: 100% !important;\n  }\n}\n\n@media only screen and (max-width: 992px) {\n  .col-1[_ngcontent-%COMP%] {\n    width: 16.66%;\n  }\n  .col-2[_ngcontent-%COMP%] {\n    width: 33.32%;\n  }\n  .col-2-5[_ngcontent-%COMP%] {\n    width: 33.32%;\n  }\n  .col-3[_ngcontent-%COMP%] {\n    width: 50%;\n  }\n  .col-4[_ngcontent-%COMP%] {\n    width: 66.66%;\n  }\n  .col-5[_ngcontent-%COMP%] {\n    width: 83.32%;\n  }\n  .col-6[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .col-7[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .col-8[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .col-9[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .col-10[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .col-11[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .col-12[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n\n@media only screen and (max-width: 768px) {\n  [class*=\"col-\"][_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n@media screen and (min-width: 600px) {\n  .mobile-break[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n.mat-icon-button[_ngcontent-%COMP%] {\n  font-size: 40px;\n}\n.refreshbtn[_ngcontent-%COMP%] {\n  float: right;\n}\ntable[_ngcontent-%COMP%] {\n  width: 100%;\n}\ntr.example-detail-row[_ngcontent-%COMP%] {\n  height: 0;\n}\ntr.example-element-row[_ngcontent-%COMP%]:not(.example-expanded-row):hover {\n  background: whitesmoke;\n  cursor: pointer;\n}\ntr.example-element-row[_ngcontent-%COMP%]:not(.example-expanded-row):active {\n  background: #efefef;\n  cursor: pointer;\n}\n.example-element-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  border-bottom-width: 0;\n}\n.example-element-detail[_ngcontent-%COMP%] {\n  overflow: hidden;\n  display: flex;\n}\n.example-element-diagram[_ngcontent-%COMP%] {\n  min-width: 80px;\n  border: 2px solid black;\n  padding: 8px;\n  font-weight: lighter;\n  margin: 8px 0;\n  height: 104px;\n}\n.example-element-symbol[_ngcontent-%COMP%] {\n  font-weight: bold;\n  font-size: 40px;\n  line-height: normal;\n}\n.example-element-description[_ngcontent-%COMP%] {\n  padding: 16px;\n}\n.example-element-description-attribution[_ngcontent-%COMP%] {\n  opacity: 0.5;\n}\nth[_ngcontent-%COMP%] {\n  font-weight: bold;\n  text-align: left;\n}\n.mat-header-cell[_ngcontent-%COMP%] {\n  background-color: #f5f5f5;\n}\n.nopaddingCard[_ngcontent-%COMP%] {\n  padding: 8px !important;\n}\n.footerbtns[_ngcontent-%COMP%] {\n  float: right;\n}\n.card-header[_ngcontent-%COMP%] {\n  background: #ecf3f7;\n}\n.barcode[_ngcontent-%COMP%] {\n  margin-left: 32%;\n  margin-top: 8%;\n  margin-right: 32%;\n}\n.barcode-div[_ngcontent-%COMP%] {\n  border: 1px solid;\n}\n.break[_ngcontent-%COMP%] {\n  word-break: break-all !important;\n  padding-right: 10px !important;\n}\n.noteHeight[_ngcontent-%COMP%] {\n  height: 100px !important;\n}\n.padding[_ngcontent-%COMP%] {\n  padding-left: 10px;\n  padding-right: 10px;\n}\n.align[_ngcontent-%COMP%] {\n  text-align: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9vcmRlckxpc3Qvb3JkZXJMaXN0LmNvbXBvbmVudC5zY3NzIiwiYXBwL29yZGVyTGlzdC9vcmRlckRldGFpbC9vcmRlckRldGFpbC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw4RUFBQTtBQUNBO0VBQ0ksWUFBWTtFQUNaLGdCQUFnQjtFQUNoQixzQkFBc0I7QUNDMUI7QURFQTtFQUNJLGFBQWE7RUFDYixnQkFBZ0I7RUFDaEIsc0JBQXNCO0FDQzFCO0FEQ0E7RUFDSSxVQUFVO0VBQ1YsZ0JBQWdCO0VBQ2hCLHNCQUFzQjtBQ0UxQjtBREFBO0VBQ0ksVUFBVTtFQUNWLGdCQUFnQjtFQUNoQixzQkFBc0I7QUNHMUI7QURBQTtFQUNJLGFBQWE7RUFDYixnQkFBZ0I7RUFDaEIsc0JBQXNCO0FDRzFCO0FEQUE7RUFDSSxhQUFhO0VBQ2IsZ0JBQWdCO0VBQ2hCLHNCQUFzQjtBQ0cxQjtBREFBO0VBQ0ksVUFBVTtFQUNWLGdCQUFnQjtFQUNoQixzQkFBc0I7QUNHMUI7QURBQTtFQUNJLGFBQWE7RUFDYixnQkFBZ0I7RUFDaEIsc0JBQXNCO0FDRzFCO0FEQUE7RUFDSSxhQUFhO0VBQ2IsZ0JBQWdCO0VBQ2hCLHNCQUFzQjtBQ0cxQjtBREFBO0VBQ0ksVUFBVTtFQUNWLGdCQUFnQjtFQUNoQixzQkFBc0I7QUNHMUI7QURBQTtFQUNJLGFBQWE7RUFDYixnQkFBZ0I7RUFDaEIsc0JBQXNCO0FDRzFCO0FEQUE7RUFDSSxhQUFhO0VBQ2IsZ0JBQWdCO0VBQ2hCLHNCQUFzQjtBQ0cxQjtBREFBO0VBQ0ksV0FBVztFQUNYLGdCQUFnQjtFQUNoQixzQkFBc0I7QUNHMUI7QURBQTtFQUNJLGFBQWE7RUFDYixzQkFBc0I7QUNHMUI7QUREQTtFQUNJLGFBQWE7RUFDYixlQUFlO0FDSW5CO0FERkE7RUFDSTtJQUNJLHlCQUF5QjtJQUN6QiwwQkFBMEI7RUNLaEM7RURIRTtJQUNJLCtCQUErQjtJQUMvQiw2QkFBNkI7RUNLbkM7RURIRTtJQUNJLHNCQUFzQjtFQ0s1QjtBQUNGO0FERkEsZ0JBQUE7QUFFQTtFQUNJO0lBQ0ksYUFBYTtFQ0luQjtFREZFO0lBQ0ksYUFBYTtFQ0luQjtFREZFO0lBQ0ksYUFBYTtFQ0luQjtFREZFO0lBQ0ksVUFBVTtFQ0loQjtFREZFO0lBQ0ksYUFBYTtFQ0luQjtFREZFO0lBQ0ksYUFBYTtFQ0luQjtFREZFO0lBQ0ksV0FBVztFQ0lqQjtFREZFO0lBQ0ksV0FBVztFQ0lqQjtFREZFO0lBQ0ksV0FBVztFQ0lqQjtFREZFO0lBQ0ksV0FBVztFQ0lqQjtFREZFO0lBQ0ksV0FBVztFQ0lqQjtFREZFO0lBQ0ksV0FBVztFQ0lqQjtFREZFO0lBQ0ksV0FBVztFQ0lqQjtBQUNGO0FERUEsd0NBQUE7QUFFQTtFQ0FFO0lERU0sV0FBVztFQ0FqQjtBQUNGO0FER0E7RUFDSTtJQUNJLGFBQWE7RUNBbkI7QUFDRjtBREVBO0VBQ0ksZUFBZTtBQ0NuQjtBRENBO0VBQ0ksWUFBWTtBQ0VoQjtBRENBO0VBQ0ksV0FBVztBQ0VmO0FEQ0E7RUFDSSxTQUFTO0FDRWI7QURDQTtFQUNJLHNCQUFzQjtFQUN0QixlQUFlO0FDRW5CO0FEQ0E7RUFDSSxtQkFBbUI7RUFDbkIsZUFBZTtBQ0VuQjtBREVBO0VBQ0ksc0JBQXNCO0FDQzFCO0FERUE7RUFDSSxnQkFBZ0I7RUFDaEIsYUFBYTtBQ0NqQjtBREVBO0VBQ0ksZUFBZTtFQUNmLHVCQUF1QjtFQUN2QixZQUFZO0VBQ1osb0JBQW9CO0VBQ3BCLGFBQWE7RUFDYixhQUFhO0FDQ2pCO0FERUE7RUFDSSxpQkFBaUI7RUFDakIsZUFBZTtFQUNmLG1CQUFtQjtBQ0N2QjtBREVBO0VBQ0ksYUFBYTtBQ0NqQjtBREVBO0VBQ0ksWUFBWTtBQ0NoQjtBRENBO0VBQ0ksaUJBQWlCO0VBQ2pCLGdCQUFnQjtBQ0VwQjtBREFBO0VBQ0kseUJBQXdCO0FDRzVCO0FEREE7RUFDSSx1QkFBdUI7QUNJM0I7QUFsT0E7RUFDSSxZQUFZO0FBcU9oQjtBQW5PQTtFQUNJLG1CQUFrQjtBQXNPdEI7QUFwT0E7RUFDSSxnQkFBZ0I7RUFDaEIsY0FBYztFQUNkLGlCQUFpQjtBQXVPckI7QUFyT0E7RUFDSSxpQkFBaUI7QUF3T3JCO0FBbk9BO0VBQ0ksZ0NBQWdDO0VBRWhDLDhCQUE4QjtBQXFPbEM7QUFuT0E7RUFDSSx3QkFBd0I7QUFzTzVCO0FBbk9BO0VBQ0ksa0JBQWtCO0VBQ2xCLG1CQUFtQjtBQXNPdkI7QUFwT0E7RUFDSSxrQkFBa0I7QUF1T3RCIiwiZmlsZSI6ImFwcC9vcmRlckxpc3Qvb3JkZXJEZXRhaWwvb3JkZXJEZXRhaWwuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBZb3UgY2FuIGFkZCBnbG9iYWwgc3R5bGVzIHRvIHRoaXMgZmlsZSwgYW5kIGFsc28gaW1wb3J0IG90aGVyIHN0eWxlIGZpbGVzICovXHJcbi5jb2wtMSB7XHJcbiAgICB3aWR0aDogOC4zMyU7XHJcbiAgICBwYWRkaW5nOiA4cHggOHB4O1xyXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxufVxyXG5cclxuLmNvbC0yIHtcclxuICAgIHdpZHRoOiAxNi42NiU7XHJcbiAgICBwYWRkaW5nOiA4cHggOHB4O1xyXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxufVxyXG4uY29sLTItNSB7XHJcbiAgICB3aWR0aDogMjAlO1xyXG4gICAgcGFkZGluZzogOHB4IDhweDtcclxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbn1cclxuLmNvbC0zIHtcclxuICAgIHdpZHRoOiAyNSU7XHJcbiAgICBwYWRkaW5nOiA4cHggOHB4O1xyXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxufVxyXG5cclxuLmNvbC00IHtcclxuICAgIHdpZHRoOiAzMy4zMyU7XHJcbiAgICBwYWRkaW5nOiA4cHggOHB4O1xyXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxufVxyXG5cclxuLmNvbC01IHtcclxuICAgIHdpZHRoOiA0MS42NiU7XHJcbiAgICBwYWRkaW5nOiA4cHggOHB4O1xyXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxufVxyXG5cclxuLmNvbC02IHtcclxuICAgIHdpZHRoOiA1MCU7XHJcbiAgICBwYWRkaW5nOiA4cHggOHB4O1xyXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxufVxyXG5cclxuLmNvbC03IHtcclxuICAgIHdpZHRoOiA1OC4zMyU7XHJcbiAgICBwYWRkaW5nOiA4cHggOHB4O1xyXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxufVxyXG5cclxuLmNvbC04IHtcclxuICAgIHdpZHRoOiA2Ni42NiU7XHJcbiAgICBwYWRkaW5nOiA4cHggOHB4O1xyXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxufVxyXG5cclxuLmNvbC05IHtcclxuICAgIHdpZHRoOiA3NSU7XHJcbiAgICBwYWRkaW5nOiA4cHggOHB4O1xyXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxufVxyXG5cclxuLmNvbC0xMCB7XHJcbiAgICB3aWR0aDogODMuMzMlO1xyXG4gICAgcGFkZGluZzogOHB4IDhweDtcclxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbn1cclxuXHJcbi5jb2wtMTEge1xyXG4gICAgd2lkdGg6IDkxLjY2JTtcclxuICAgIHBhZGRpbmc6IDhweCA4cHg7XHJcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG59XHJcblxyXG4uY29sLTEyIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgcGFkZGluZzogOHB4IDhweDtcclxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbn1cclxuXHJcbi5ncmlkLWNvbnRhaW5lciB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcclxufVxyXG4uZ3JpZC1yb3cge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGZsZXgtd3JhcDogd3JhcDtcclxufVxyXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDY3M3B4KSB7XHJcbiAgICAucm93LWFjdGlvbnMgPiBtYXQtZm9ybS1maWVsZCB7XHJcbiAgICAgICAgbWFyZ2luLWxlZnQ6IDAgIWltcG9ydGFudDtcclxuICAgICAgICBwYWRkaW5nLWxlZnQ6IDAgIWltcG9ydGFudDtcclxuICAgIH1cclxuICAgIC5mb3JtLXJvdyB7XHJcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWdyaWQgIWltcG9ydGFudDtcclxuICAgICAgICB3aWR0aDogLXdlYmtpdC1maWxsLWF2YWlsYWJsZTtcclxuICAgIH1cclxuICAgIC5mb3JtLXJvdyBtYXQtZm9ybS1maWVsZCB7XHJcbiAgICAgICAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcclxuICAgIH1cclxufVxyXG5cclxuLypTbWFsbCBzY3JlZW5zKi9cclxuXHJcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogOTkycHgpIHtcclxuICAgIC5jb2wtMSB7XHJcbiAgICAgICAgd2lkdGg6IDE2LjY2JTtcclxuICAgIH1cclxuICAgIC5jb2wtMiB7XHJcbiAgICAgICAgd2lkdGg6IDMzLjMyJTtcclxuICAgIH1cclxuICAgIC5jb2wtMi01IHtcclxuICAgICAgICB3aWR0aDogMzMuMzIlO1xyXG4gICAgfVxyXG4gICAgLmNvbC0zIHtcclxuICAgICAgICB3aWR0aDogNTAlO1xyXG4gICAgfVxyXG4gICAgLmNvbC00IHtcclxuICAgICAgICB3aWR0aDogNjYuNjYlO1xyXG4gICAgfVxyXG4gICAgLmNvbC01IHtcclxuICAgICAgICB3aWR0aDogODMuMzIlO1xyXG4gICAgfVxyXG4gICAgLmNvbC02IHtcclxuICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgIH1cclxuICAgIC5jb2wtNyB7XHJcbiAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICB9XHJcbiAgICAuY29sLTgge1xyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgfVxyXG4gICAgLmNvbC05IHtcclxuICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgIH1cclxuICAgIC5jb2wtMTAge1xyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgfVxyXG4gICAgLmNvbC0xMSB7XHJcbiAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICB9XHJcbiAgICAuY29sLTEyIHtcclxuICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgIH1cclxufVxyXG5cclxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAxMDYwcHgpIHtcclxufVxyXG5cclxuLyogRXh0cmEgc21hbGwgZGV2aWNlcyBcIm1vYmlsZSBwaG9uZXNcIiAqL1xyXG5cclxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3NjhweCkge1xyXG4gICAgW2NsYXNzKj1cImNvbC1cIl0ge1xyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgfVxyXG59XHJcblxyXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA2MDBweCkge1xyXG4gICAgLm1vYmlsZS1icmVhayB7XHJcbiAgICAgICAgZGlzcGxheTogbm9uZTtcclxuICAgIH1cclxufVxyXG4ubWF0LWljb24tYnV0dG9uIHtcclxuICAgIGZvbnQtc2l6ZTogNDBweDtcclxufVxyXG4ucmVmcmVzaGJ0biB7XHJcbiAgICBmbG9hdDogcmlnaHQ7XHJcbn1cclxuXHJcbnRhYmxlIHtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG59XHJcblxyXG50ci5leGFtcGxlLWRldGFpbC1yb3cge1xyXG4gICAgaGVpZ2h0OiAwO1xyXG59XHJcblxyXG50ci5leGFtcGxlLWVsZW1lbnQtcm93Om5vdCguZXhhbXBsZS1leHBhbmRlZC1yb3cpOmhvdmVyIHtcclxuICAgIGJhY2tncm91bmQ6IHdoaXRlc21va2U7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcbn1cclxuXHJcbnRyLmV4YW1wbGUtZWxlbWVudC1yb3c6bm90KC5leGFtcGxlLWV4cGFuZGVkLXJvdyk6YWN0aXZlIHtcclxuICAgIGJhY2tncm91bmQ6ICNlZmVmZWY7XHJcbiAgICBjdXJzb3I6IHBvaW50ZXI7XHJcblxyXG59XHJcblxyXG4uZXhhbXBsZS1lbGVtZW50LXJvdyB0ZCB7XHJcbiAgICBib3JkZXItYm90dG9tLXdpZHRoOiAwO1xyXG59XHJcblxyXG4uZXhhbXBsZS1lbGVtZW50LWRldGFpbCB7XHJcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xyXG4gICAgZGlzcGxheTogZmxleDtcclxufVxyXG5cclxuLmV4YW1wbGUtZWxlbWVudC1kaWFncmFtIHtcclxuICAgIG1pbi13aWR0aDogODBweDtcclxuICAgIGJvcmRlcjogMnB4IHNvbGlkIGJsYWNrO1xyXG4gICAgcGFkZGluZzogOHB4O1xyXG4gICAgZm9udC13ZWlnaHQ6IGxpZ2h0ZXI7XHJcbiAgICBtYXJnaW46IDhweCAwO1xyXG4gICAgaGVpZ2h0OiAxMDRweDtcclxufVxyXG5cclxuLmV4YW1wbGUtZWxlbWVudC1zeW1ib2wge1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICBmb250LXNpemU6IDQwcHg7XHJcbiAgICBsaW5lLWhlaWdodDogbm9ybWFsO1xyXG59XHJcblxyXG4uZXhhbXBsZS1lbGVtZW50LWRlc2NyaXB0aW9uIHtcclxuICAgIHBhZGRpbmc6IDE2cHg7XHJcbn1cclxuXHJcbi5leGFtcGxlLWVsZW1lbnQtZGVzY3JpcHRpb24tYXR0cmlidXRpb24ge1xyXG4gICAgb3BhY2l0eTogMC41O1xyXG59XHJcbnRoIHtcclxuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xyXG4gICAgdGV4dC1hbGlnbjogbGVmdDtcclxufVxyXG4ubWF0LWhlYWRlci1jZWxsIHtcclxuICAgIGJhY2tncm91bmQtY29sb3I6I2Y1ZjVmNTtcclxufVxyXG4ubm9wYWRkaW5nQ2FyZCB7XHJcbiAgICBwYWRkaW5nOiA4cHggIWltcG9ydGFudDtcclxufSIsIi8qIFlvdSBjYW4gYWRkIGdsb2JhbCBzdHlsZXMgdG8gdGhpcyBmaWxlLCBhbmQgYWxzbyBpbXBvcnQgb3RoZXIgc3R5bGUgZmlsZXMgKi9cbi5jb2wtMSB7XG4gIHdpZHRoOiA4LjMzJTtcbiAgcGFkZGluZzogOHB4IDhweDtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbn1cblxuLmNvbC0yIHtcbiAgd2lkdGg6IDE2LjY2JTtcbiAgcGFkZGluZzogOHB4IDhweDtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbn1cblxuLmNvbC0yLTUge1xuICB3aWR0aDogMjAlO1xuICBwYWRkaW5nOiA4cHggOHB4O1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xufVxuXG4uY29sLTMge1xuICB3aWR0aDogMjUlO1xuICBwYWRkaW5nOiA4cHggOHB4O1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xufVxuXG4uY29sLTQge1xuICB3aWR0aDogMzMuMzMlO1xuICBwYWRkaW5nOiA4cHggOHB4O1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xufVxuXG4uY29sLTUge1xuICB3aWR0aDogNDEuNjYlO1xuICBwYWRkaW5nOiA4cHggOHB4O1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xufVxuXG4uY29sLTYge1xuICB3aWR0aDogNTAlO1xuICBwYWRkaW5nOiA4cHggOHB4O1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xufVxuXG4uY29sLTcge1xuICB3aWR0aDogNTguMzMlO1xuICBwYWRkaW5nOiA4cHggOHB4O1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xufVxuXG4uY29sLTgge1xuICB3aWR0aDogNjYuNjYlO1xuICBwYWRkaW5nOiA4cHggOHB4O1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xufVxuXG4uY29sLTkge1xuICB3aWR0aDogNzUlO1xuICBwYWRkaW5nOiA4cHggOHB4O1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xufVxuXG4uY29sLTEwIHtcbiAgd2lkdGg6IDgzLjMzJTtcbiAgcGFkZGluZzogOHB4IDhweDtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbn1cblxuLmNvbC0xMSB7XG4gIHdpZHRoOiA5MS42NiU7XG4gIHBhZGRpbmc6IDhweCA4cHg7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG59XG5cbi5jb2wtMTIge1xuICB3aWR0aDogMTAwJTtcbiAgcGFkZGluZzogOHB4IDhweDtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbn1cblxuLmdyaWQtY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cblxuLmdyaWQtcm93IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC13cmFwOiB3cmFwO1xufVxuXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDY3M3B4KSB7XG4gIC5yb3ctYWN0aW9ucyA+IG1hdC1mb3JtLWZpZWxkIHtcbiAgICBtYXJnaW4tbGVmdDogMCAhaW1wb3J0YW50O1xuICAgIHBhZGRpbmctbGVmdDogMCAhaW1wb3J0YW50O1xuICB9XG4gIC5mb3JtLXJvdyB7XG4gICAgZGlzcGxheTogaW5saW5lLWdyaWQgIWltcG9ydGFudDtcbiAgICB3aWR0aDogLXdlYmtpdC1maWxsLWF2YWlsYWJsZTtcbiAgfVxuICAuZm9ybS1yb3cgbWF0LWZvcm0tZmllbGQge1xuICAgIHdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XG4gIH1cbn1cblxuLypTbWFsbCBzY3JlZW5zKi9cbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogOTkycHgpIHtcbiAgLmNvbC0xIHtcbiAgICB3aWR0aDogMTYuNjYlO1xuICB9XG4gIC5jb2wtMiB7XG4gICAgd2lkdGg6IDMzLjMyJTtcbiAgfVxuICAuY29sLTItNSB7XG4gICAgd2lkdGg6IDMzLjMyJTtcbiAgfVxuICAuY29sLTMge1xuICAgIHdpZHRoOiA1MCU7XG4gIH1cbiAgLmNvbC00IHtcbiAgICB3aWR0aDogNjYuNjYlO1xuICB9XG4gIC5jb2wtNSB7XG4gICAgd2lkdGg6IDgzLjMyJTtcbiAgfVxuICAuY29sLTYge1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG4gIC5jb2wtNyB7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cbiAgLmNvbC04IHtcbiAgICB3aWR0aDogMTAwJTtcbiAgfVxuICAuY29sLTkge1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG4gIC5jb2wtMTAge1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG4gIC5jb2wtMTEge1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG4gIC5jb2wtMTIge1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG59XG5cbi8qIEV4dHJhIHNtYWxsIGRldmljZXMgXCJtb2JpbGUgcGhvbmVzXCIgKi9cbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogNzY4cHgpIHtcbiAgW2NsYXNzKj1cImNvbC1cIl0ge1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG59XG5cbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDYwMHB4KSB7XG4gIC5tb2JpbGUtYnJlYWsge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIH1cbn1cblxuLm1hdC1pY29uLWJ1dHRvbiB7XG4gIGZvbnQtc2l6ZTogNDBweDtcbn1cblxuLnJlZnJlc2hidG4ge1xuICBmbG9hdDogcmlnaHQ7XG59XG5cbnRhYmxlIHtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbnRyLmV4YW1wbGUtZGV0YWlsLXJvdyB7XG4gIGhlaWdodDogMDtcbn1cblxudHIuZXhhbXBsZS1lbGVtZW50LXJvdzpub3QoLmV4YW1wbGUtZXhwYW5kZWQtcm93KTpob3ZlciB7XG4gIGJhY2tncm91bmQ6IHdoaXRlc21va2U7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxudHIuZXhhbXBsZS1lbGVtZW50LXJvdzpub3QoLmV4YW1wbGUtZXhwYW5kZWQtcm93KTphY3RpdmUge1xuICBiYWNrZ3JvdW5kOiAjZWZlZmVmO1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5leGFtcGxlLWVsZW1lbnQtcm93IHRkIHtcbiAgYm9yZGVyLWJvdHRvbS13aWR0aDogMDtcbn1cblxuLmV4YW1wbGUtZWxlbWVudC1kZXRhaWwge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBkaXNwbGF5OiBmbGV4O1xufVxuXG4uZXhhbXBsZS1lbGVtZW50LWRpYWdyYW0ge1xuICBtaW4td2lkdGg6IDgwcHg7XG4gIGJvcmRlcjogMnB4IHNvbGlkIGJsYWNrO1xuICBwYWRkaW5nOiA4cHg7XG4gIGZvbnQtd2VpZ2h0OiBsaWdodGVyO1xuICBtYXJnaW46IDhweCAwO1xuICBoZWlnaHQ6IDEwNHB4O1xufVxuXG4uZXhhbXBsZS1lbGVtZW50LXN5bWJvbCB7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBmb250LXNpemU6IDQwcHg7XG4gIGxpbmUtaGVpZ2h0OiBub3JtYWw7XG59XG5cbi5leGFtcGxlLWVsZW1lbnQtZGVzY3JpcHRpb24ge1xuICBwYWRkaW5nOiAxNnB4O1xufVxuXG4uZXhhbXBsZS1lbGVtZW50LWRlc2NyaXB0aW9uLWF0dHJpYnV0aW9uIHtcbiAgb3BhY2l0eTogMC41O1xufVxuXG50aCB7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xufVxuXG4ubWF0LWhlYWRlci1jZWxsIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y1ZjVmNTtcbn1cblxuLm5vcGFkZGluZ0NhcmQge1xuICBwYWRkaW5nOiA4cHggIWltcG9ydGFudDtcbn1cblxuLmZvb3RlcmJ0bnMge1xuICBmbG9hdDogcmlnaHQ7XG59XG5cbi5jYXJkLWhlYWRlciB7XG4gIGJhY2tncm91bmQ6ICNlY2YzZjc7XG59XG5cbi5iYXJjb2RlIHtcbiAgbWFyZ2luLWxlZnQ6IDMyJTtcbiAgbWFyZ2luLXRvcDogOCU7XG4gIG1hcmdpbi1yaWdodDogMzIlO1xufVxuXG4uYmFyY29kZS1kaXYge1xuICBib3JkZXI6IDFweCBzb2xpZDtcbn1cblxuLmJyZWFrIHtcbiAgd29yZC1icmVhazogYnJlYWstYWxsICFpbXBvcnRhbnQ7XG4gIHBhZGRpbmctcmlnaHQ6IDEwcHggIWltcG9ydGFudDtcbn1cblxuLm5vdGVIZWlnaHQge1xuICBoZWlnaHQ6IDEwMHB4ICFpbXBvcnRhbnQ7XG59XG5cbi5wYWRkaW5nIHtcbiAgcGFkZGluZy1sZWZ0OiAxMHB4O1xuICBwYWRkaW5nLXJpZ2h0OiAxMHB4O1xufVxuXG4uYWxpZ24ge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4iXX0= */"],
      data: {
        animation: [Object(_angular_animations__WEBPACK_IMPORTED_MODULE_5__["trigger"])('detailExpand', [Object(_angular_animations__WEBPACK_IMPORTED_MODULE_5__["state"])('collapsed', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_5__["style"])({
          height: '0px',
          minHeight: '0'
        })), Object(_angular_animations__WEBPACK_IMPORTED_MODULE_5__["state"])('expanded', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_5__["style"])({
          height: '*'
        })), Object(_angular_animations__WEBPACK_IMPORTED_MODULE_5__["transition"])('expanded <=> collapsed', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_5__["animate"])('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))])]
      }
    });
    /*@__PURE__*/

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](OrderDetailComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
          selector: 'app-order-detail',
          templateUrl: './orderDetail.component.html',
          styleUrls: ['./orderDetail.component.scss'],
          animations: [Object(_angular_animations__WEBPACK_IMPORTED_MODULE_5__["trigger"])('detailExpand', [Object(_angular_animations__WEBPACK_IMPORTED_MODULE_5__["state"])('collapsed', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_5__["style"])({
            height: '0px',
            minHeight: '0'
          })), Object(_angular_animations__WEBPACK_IMPORTED_MODULE_5__["state"])('expanded', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_5__["style"])({
            height: '*'
          })), Object(_angular_animations__WEBPACK_IMPORTED_MODULE_5__["transition"])('expanded <=> collapsed', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_5__["animate"])('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))])]
        }]
      }], function () {
        return [{
          type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]
        }, {
          type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]
        }, {
          type: app_shared_services_orderService__WEBPACK_IMPORTED_MODULE_4__["OrderService"]
        }];
      }, {
        tabGroup: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
          args: ['tabGroup']
        }]
      });
    })();
    /***/

  },

  /***/
  "./src/app/orderList/orderList.component.ts":
  /*!**************************************************!*\
    !*** ./src/app/orderList/orderList.component.ts ***!
    \**************************************************/

  /*! exports provided: OrderListComponent */

  /***/
  function srcAppOrderListOrderListComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "OrderListComponent", function () {
      return OrderListComponent;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _angular_animations__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/animations */
    "./node_modules/@angular/animations/__ivy_ngcc__/fesm2015/animations.js");
    /* harmony import */


    var _shared_models_order__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ../shared/models/order */
    "./src/app/shared/models/order.ts");
    /* harmony import */


    var _shared_services_orderService__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../shared/services/orderService */
    "./src/app/shared/services/orderService.ts");
    /* harmony import */


    var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/material */
    "./node_modules/@angular/material/__ivy_ngcc__/esm2015/material.js");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
    /* harmony import */


    var _angular_material_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! @angular/material/core */
    "./node_modules/@angular/material/__ivy_ngcc__/esm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");

    function OrderListComponent_mat_option_34_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-option", 46);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var status_r31 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", status_r31);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", status_r31, " ");
      }
    }

    function OrderListComponent_mat_option_39_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-option", 46);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var coupon_r32 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", coupon_r32);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", coupon_r32, " ");
      }
    }

    function OrderListComponent_mat_option_44_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-option", 46);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var store_r33 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", store_r33);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", store_r33, " ");
      }
    }

    function OrderListComponent_mat_option_50_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-option", 46);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var timeframe_r34 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", timeframe_r34);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", timeframe_r34, " ");
      }
    }

    function OrderListComponent_mat_option_55_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-option", 46);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var payment_r35 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", payment_r35);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", payment_r35, " ");
      }
    }

    function OrderListComponent_mat_option_60_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-option", 46);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var state_r36 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", state_r36);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", state_r36, " ");
      }
    }

    function OrderListComponent_mat_option_65_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-option", 46);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var storeNumber_r37 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", storeNumber_r37);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", storeNumber_r37, " ");
      }
    }

    function OrderListComponent_mat_option_70_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-option", 46);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var dropShipApi_r38 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", dropShipApi_r38);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", dropShipApi_r38, " ");
      }
    }

    function OrderListComponent_mat_option_76_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-option", 46);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var franchiseApi_r39 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", franchiseApi_r39);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", franchiseApi_r39, " ");
      }
    }

    function OrderListComponent_mat_option_81_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-option", 46);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var group_r40 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", group_r40);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", group_r40, " ");
      }
    }

    function OrderListComponent_mat_option_86_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-option", 46);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var packer_r41 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", packer_r41);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", packer_r41, " ");
      }
    }

    function OrderListComponent_th_97_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 47);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " OrderID ");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }
    }

    function OrderListComponent_td_98_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 48);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var element_r42 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", element_r42.orderID, " ");
      }
    }

    function OrderListComponent_th_100_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 49);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Date ");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }
    }

    function OrderListComponent_td_101_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 48);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "date");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var element_r43 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 1, element_r43.date), " ");
      }
    }

    function OrderListComponent_th_103_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 47);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Business Name ");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }
    }

    function OrderListComponent_td_104_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 48);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var element_r44 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", element_r44.businessName, " ");
      }
    }

    function OrderListComponent_th_106_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 47);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Applied Credit ");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }
    }

    function OrderListComponent_td_107_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 48);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var element_r45 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" $", element_r45.appliedCredit, " ");
      }
    }

    function OrderListComponent_th_109_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 47);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Billed Chargers ");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }
    }

    function OrderListComponent_td_110_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 48);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var element_r46 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" $", element_r46.billedCharges, " ");
      }
    }

    function OrderListComponent_th_112_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 47);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, " Order Total ");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }
    }

    function OrderListComponent_td_113_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 48);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var element_r47 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" $", element_r47.billedCharges + element_r47.appliedCredit, " ");
      }
    }

    function OrderListComponent_th_115_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "th", 50);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "Details");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }
    }

    var _c0 = function _c0(a1) {
      return ["./orderDetail", a1];
    };

    function OrderListComponent_td_116_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 48);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "a", 51);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "button", 52);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-icon");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, "read_more");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var element_r48 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("routerLink", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](1, _c0, element_r48.orderID));
      }
    }

    function OrderListComponent_td_118_mat_option_21_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-option", 46);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var status_r52 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", status_r52);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", status_r52, " ");
      }
    }

    function OrderListComponent_td_118_mat_option_27_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-option", 46);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var payment_r53 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", payment_r53);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", payment_r53, " ");
      }
    }

    function OrderListComponent_td_118_Template(rf, ctx) {
      if (rf & 1) {
        var _r55 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "td", 48);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "div", 53);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "div", 54);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "b");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "Store:");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](6);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](7, "div", 54);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "b");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Affilliate:");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](10);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "div", 54);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "b");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "Tracking Number:");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](14);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](15, "div", 1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "div", 55);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "mat-form-field", 56);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "mat-label");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, "Order Status");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](20, "mat-select", 57);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("valueChange", function OrderListComponent_td_118_Template_mat_select_valueChange_20_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r55);

          var element_r49 = ctx.$implicit;
          return element_r49.orderStatus = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](21, OrderListComponent_td_118_mat_option_21_Template, 2, 2, "mat-option", 14);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](22, "div", 55);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "mat-form-field", 56);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "mat-label");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, "Payment Status");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "mat-select", 58);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("valueChange", function OrderListComponent_td_118_Template_mat_select_valueChange_26_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r55);

          var element_r49 = ctx.$implicit;
          return element_r49.paymentStatus = $event;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](27, OrderListComponent_td_118_mat_option_27_Template, 2, 2, "mat-option", 14);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var element_r49 = ctx.$implicit;

        var ctx_r27 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵattribute"]("colspan", ctx_r27.columnsToDisplay.length);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("@detailExpand", element_r49 == ctx_r27.expandedOrder ? "expanded" : "collapsed");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", element_r49.store, " ");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", element_r49.affiliate, " ");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"](" ", element_r49.trackingNumber, " ");

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", element_r49.orderStatus);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r27.statuses);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", element_r49.paymentStatus);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx_r27.payments);
      }
    }

    function OrderListComponent_tr_119_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "tr", 59);
      }
    }

    function OrderListComponent_tr_120_Template(rf, ctx) {
      if (rf & 1) {
        var _r59 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵgetCurrentView"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "tr", 60);

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function OrderListComponent_tr_120_Template_tr_click_0_listener() {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵrestoreView"](_r59);

          var element_r57 = ctx.$implicit;

          var ctx_r58 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

          return ctx_r58.expandedOrder = ctx_r58.expandedOrder === element_r57 ? null : element_r57;
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var element_r57 = ctx.$implicit;

        var ctx_r29 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵnextContext"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵclassProp"]("example-expanded-row", ctx_r29.expandedOrder === element_r57);
      }
    }

    function OrderListComponent_tr_121_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "tr", 61);
      }
    }

    var _c1 = function _c1() {
      return ["expandedOrder"];
    };

    var _c2 = function _c2() {
      return [5, 10, 25, 100];
    };

    var OrderListComponent = /*#__PURE__*/function () {
      function OrderListComponent(orderService) {
        _classCallCheck(this, OrderListComponent);

        this.orderService = orderService;
        this.resultsLength = 0;
        this.columnsToDisplay = ['orderID', 'date', 'businessName', 'appliedCredit', 'billedCharges', 'orderTotal', 'details'];
        this.expandedOrder = new _shared_models_order__WEBPACK_IMPORTED_MODULE_2__["Order"]();
        this.orders = new Array();
        this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatTableDataSource"]();
        this.packers = new Array();
        this.groups = new Array();
        this.franchiseApies = new Array();
        this.dropShipApies = new Array();
        this.storeNumbers = new Array();
        this.states = new Array();
        this.payments = new Array();
        this.timeframes = new Array();
        this.stores = new Array();
        this.coupons = new Array();
        this.statuses = new Array();
        this.last = '';
        this.packer = '';
        this.group = '';
        this.franchiseApi = '';
        this.dropShipApi = '';
        this.storeNumber = '';
        this.state = '';
        this.payment = '';
        this.timeFrame = '';
        this.store = '';
        this.coupon = '';
        this.status = '';
        this.dateTo = '';
        this.dateFrom = '';
        this.search = '';
        this.checkbox = false;
      }

      _createClass(OrderListComponent, [{
        key: "ngAfterViewInit",
        value: function ngAfterViewInit() {
          this.dataSource.paginator = this.paginator;
          this.dataSource.paginator._intl.itemsPerPageLabel = 'Items per page';
          this.dataSource.paginator._intl.previousPageLabel = 'Previous page';
          this.dataSource.paginator._intl.nextPageLabel = 'Next page';
        }
      }, {
        key: "ngOnInit",
        value: function ngOnInit() {
          this.orders = this.orderService.orders;
          this.dataSource.data = this.orders;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.packers = this.orderService.packers;
          this.groups = this.orderService.groups;
          this.franchiseApies = this.orderService.franchiseApies;
          this.dropShipApies = this.orderService.dropShipApies;
          this.storeNumbers = this.orderService.storeNumbers;
          this.states = this.orderService.states;
          this.payments = this.orderService.payments;
          this.timeframes = this.orderService.timeframes;
          this.stores = this.orderService.stores;
          this.coupons = this.orderService.coupons;
          this.statuses = this.orderService.statuses;
          this.resultsLength = this.orders.length;
        }
      }, {
        key: "applyFilter",
        value: function applyFilter(event) {
          var filterValue = event.target.value;
          this.dataSource.filter = filterValue.trim().toLowerCase();
        }
      }, {
        key: "orderStatusFilter",
        value: function orderStatusFilter(event) {
          if (event.value) {
            var array = new Array();
            array = this.orders.filter(function (res) {
              return res.orderStatus == event.value;
            });
            this.dataSource.data = array;
          } else {
            this.dataSource.filter = '';
          }
        }
      }, {
        key: "storeFilter",
        value: function storeFilter(event) {
          if (event.value) {
            var array = new Array();
            array = this.orders.filter(function (res) {
              return res.store == event.value;
            });
            this.dataSource.data = array;
          } else {
            this.dataSource.filter = '';
          }
        }
      }, {
        key: "paymentStatusFilter",
        value: function paymentStatusFilter(event) {
          if (event.value) {
            var array = new Array();
            array = this.orders.filter(function (res) {
              return res.paymentStatus == event.value;
            });
            this.dataSource.data = array;
          } else {
            this.dataSource.filter = '';
          }
        }
      }, {
        key: "timeFrameFilter",
        value: function timeFrameFilter(event) {
          var today = new Date();
          var yesterday = today.getUTCDate() - 2;
          var array = new Array();

          if (event.value) {
            if (event.value == 'Today') {
              console.log(today, "today");
              array = this.orders.filter(function (res) {
                return res.date.getUTCDate() == today.getUTCDate();
              });
            }

            if (event.value == 'Yesterday') {
              array = this.orders.filter(function (res) {
                return res.date.getUTCDate() == yesterday;
              });
            }

            this.dataSource.data = array;
          } else {
            this.dataSource.filter = '';
          }
        }
      }, {
        key: "dateFromFilter",
        value: function dateFromFilter(event) {
          var array = new Array();

          if (event.value) {
            array = this.orders.filter(function (res) {
              return event.value <= res.date;
            });
            this.dataSource.data = array;
          } else {
            this.dataSource.filter = '';
          }
        }
      }, {
        key: "dateToFilter",
        value: function dateToFilter(event) {
          var array = new Array();

          if (event.value) {
            array = this.orders.filter(function (res) {
              return event.value >= res.date;
            });
            this.dataSource.data = array;
          } else {
            this.dataSource.filter = '';
          }
        }
      }, {
        key: "refreshInputs",
        value: function refreshInputs() {
          this.last = '';
          this.packer = '';
          this.group = '';
          this.franchiseApi = '';
          this.dropShipApi = '';
          this.storeNumber = '';
          this.state = '';
          this.payment = '';
          this.timeFrame = '';
          this.store = '';
          this.coupon = '';
          this.status = '';
          this.dateTo = '';
          this.dateFrom = '';
          this.search = '';
          this.checkbox = false;
          this.dataSource = new _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatTableDataSource"]();
          this.dataSource.data = this.orderService.orders;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      }]);

      return OrderListComponent;
    }();

    OrderListComponent.ɵfac = function OrderListComponent_Factory(t) {
      return new (t || OrderListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_shared_services_orderService__WEBPACK_IMPORTED_MODULE_3__["OrderService"]));
    };

    OrderListComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
      type: OrderListComponent,
      selectors: [["app-orders"]],
      viewQuery: function OrderListComponent_Query(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵviewQuery"](_angular_material__WEBPACK_IMPORTED_MODULE_4__["MatPaginator"], true);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵstaticViewQuery"](_angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSort"], true);
        }

        if (rf & 2) {
          var _t;

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.paginator = _t.first);
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵloadQuery"]()) && (ctx.sort = _t.first);
        }
      },
      decls: 123,
      vars: 40,
      consts: [[1, "nopaddingCard"], [1, "grid-row"], [1, "col-12"], ["color", "accent", "mat-raised-button", "", "mat-button-base", "", "mat-basic", "", 1, "refreshbtn", 3, "click"], [1, "col-2"], ["matInput", "", 3, "ngModel", "ngModelChange", "keyup"], ["matSuffix", ""], ["appearance", "fill", 1, "col-2"], ["matInput", "", "disabled", "", 3, "ngModel", "matDatepicker", "ngModelChange", "dateInput", "dateChange"], ["matSuffix", "", 3, "for"], ["disabled", "false", 3, "dateChange"], ["picker", ""], ["picker1", ""], ["name", "status", 3, "value", "valueChange", "selectionChange"], [3, "value", 4, "ngFor", "ngForOf"], ["name", "coupon", 3, "value", "valueChange"], ["name", "store", 3, "value", "valueChange", "selectionChange"], ["name", "timeframe", 3, "value", "valueChange", "selectionChange"], ["name", "payment", 3, "value", "valueChange", "selectionChange"], ["name", "state", 3, "value", "valueChange"], ["name", "storeNumber", 3, "value", "valueChange"], ["name", "dropShipApi", 3, "value", "valueChange"], ["name", "franchiseApi", 3, "value", "valueChange"], ["name", "group", 3, "value", "valueChange"], ["name", "packer", 3, "value", "valueChange"], ["matInput", "", 3, "ngModel", "ngModelChange"], [1, "col-2", 2, "margin-top", "20px"], [3, "ngModel", "ngModelChange"], [1, "table-responsive", "mat-elevation-z8"], ["mat-table", "", "matSort", "", "multiTemplateDataRows", "", 3, "dataSource"], ["matColumnDef", "orderID"], ["mat-sort-header", "", "mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "date"], ["mat-sort-header", "", "mat-header-cell", "", "style", "padding-left: 10px;", 4, "matHeaderCellDef"], ["matColumnDef", "businessName"], ["matColumnDef", "appliedCredit"], ["matColumnDef", "billedCharges"], ["matColumnDef", "orderTotal"], ["matColumnDef", "details"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["matColumnDef", "expandedOrder"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", "class", "example-element-row", 3, "example-expanded-row", "click", 4, "matRowDef", "matRowDefColumns"], ["mat-row", "", "class", "example-detail-row", 4, "matRowDef", "matRowDefColumns"], [3, "length", "pageSize", "pageSizeOptions"], [3, "value"], ["mat-sort-header", "", "mat-header-cell", ""], ["mat-cell", ""], ["mat-sort-header", "", "mat-header-cell", "", 2, "padding-left", "10px"], ["mat-header-cell", ""], [3, "routerLink"], ["mat-icon-button", ""], [1, "example-element-detail"], [1, "col-4"], [1, "col-6"], ["appearance", "fill"], ["name", "status", 3, "value", "valueChange"], ["name", "payment", 3, "value", "valueChange"], ["mat-header-row", ""], ["mat-row", "", 1, "example-element-row", 3, "click"], ["mat-row", "", 1, "example-detail-row"]],
      template: function OrderListComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-card");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "mat-card-content", 0);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](2, "div", 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "mat-card-title", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](4, " FILTER ORDERS ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](5, "button", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function OrderListComponent_Template_button_click_5_listener() {
            return ctx.refreshInputs();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "mat-icon");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](7, "refresh");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](8, "Refresh ");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](9, "div", 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "mat-form-field", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](11, "mat-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](12, "Search");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](13, "input", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function OrderListComponent_Template_input_ngModelChange_13_listener($event) {
            return ctx.search = $event;
          })("keyup", function OrderListComponent_Template_input_keyup_13_listener($event) {
            return ctx.applyFilter($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "mat-icon", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "search");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "mat-form-field", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](17, "mat-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](18, "Date from");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](19, "input", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function OrderListComponent_Template_input_ngModelChange_19_listener($event) {
            return ctx.dateFrom = $event;
          })("dateInput", function OrderListComponent_Template_input_dateInput_19_listener($event) {
            return ctx.dateFromFilter($event);
          })("dateChange", function OrderListComponent_Template_input_dateChange_19_listener($event) {
            return ctx.dateFromFilter($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "mat-datepicker-toggle", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "mat-datepicker", 10, 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("dateChange", function OrderListComponent_Template_mat_datepicker_dateChange_21_listener($event) {
            return ctx.dateFromFilter($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](23, "mat-form-field", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](24, "mat-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](25, "Date to");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](26, "input", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function OrderListComponent_Template_input_ngModelChange_26_listener($event) {
            return ctx.dateTo = $event;
          })("dateInput", function OrderListComponent_Template_input_dateInput_26_listener($event) {
            return ctx.dateToFilter($event);
          })("dateChange", function OrderListComponent_Template_input_dateChange_26_listener($event) {
            return ctx.dateToFilter($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](27, "mat-datepicker-toggle", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](28, "mat-datepicker", 10, 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("dateChange", function OrderListComponent_Template_mat_datepicker_dateChange_28_listener($event) {
            return ctx.dateToFilter($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](30, "mat-form-field", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](31, "mat-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](32, "Order status");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](33, "mat-select", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("valueChange", function OrderListComponent_Template_mat_select_valueChange_33_listener($event) {
            return ctx.status = $event;
          })("selectionChange", function OrderListComponent_Template_mat_select_selectionChange_33_listener($event) {
            return ctx.orderStatusFilter($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](34, OrderListComponent_mat_option_34_Template, 2, 2, "mat-option", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](35, "mat-form-field", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](36, "mat-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](37, "Coupon");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](38, "mat-select", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("valueChange", function OrderListComponent_Template_mat_select_valueChange_38_listener($event) {
            return ctx.coupon = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](39, OrderListComponent_mat_option_39_Template, 2, 2, "mat-option", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](40, "mat-form-field", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](41, "mat-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](42, "Store");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](43, "mat-select", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("valueChange", function OrderListComponent_Template_mat_select_valueChange_43_listener($event) {
            return ctx.store = $event;
          })("selectionChange", function OrderListComponent_Template_mat_select_selectionChange_43_listener($event) {
            return ctx.storeFilter($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](44, OrderListComponent_mat_option_44_Template, 2, 2, "mat-option", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](45, "div", 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](46, "mat-form-field", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](47, "mat-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](48, "Timeframe");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](49, "mat-select", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("valueChange", function OrderListComponent_Template_mat_select_valueChange_49_listener($event) {
            return ctx.timeFrame = $event;
          })("selectionChange", function OrderListComponent_Template_mat_select_selectionChange_49_listener($event) {
            return ctx.timeFrameFilter($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](50, OrderListComponent_mat_option_50_Template, 2, 2, "mat-option", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](51, "mat-form-field", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](52, "mat-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](53, "Payment status");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](54, "mat-select", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("valueChange", function OrderListComponent_Template_mat_select_valueChange_54_listener($event) {
            return ctx.payment = $event;
          })("selectionChange", function OrderListComponent_Template_mat_select_selectionChange_54_listener($event) {
            return ctx.paymentStatusFilter($event);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](55, OrderListComponent_mat_option_55_Template, 2, 2, "mat-option", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](56, "mat-form-field", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](57, "mat-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](58, "State");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](59, "mat-select", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("valueChange", function OrderListComponent_Template_mat_select_valueChange_59_listener($event) {
            return ctx.state = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](60, OrderListComponent_mat_option_60_Template, 2, 2, "mat-option", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](61, "mat-form-field", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](62, "mat-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](63, "Store number");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](64, "mat-select", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("valueChange", function OrderListComponent_Template_mat_select_valueChange_64_listener($event) {
            return ctx.storeNumber = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](65, OrderListComponent_mat_option_65_Template, 2, 2, "mat-option", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](66, "mat-form-field", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](67, "mat-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](68, "DropShip Api");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](69, "mat-select", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("valueChange", function OrderListComponent_Template_mat_select_valueChange_69_listener($event) {
            return ctx.dropShipApi = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](70, OrderListComponent_mat_option_70_Template, 2, 2, "mat-option", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](71, "div", 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](72, "mat-form-field", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](73, "mat-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](74, "Franchise Api");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](75, "mat-select", 22);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("valueChange", function OrderListComponent_Template_mat_select_valueChange_75_listener($event) {
            return ctx.franchiseApi = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](76, OrderListComponent_mat_option_76_Template, 2, 2, "mat-option", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](77, "mat-form-field", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](78, "mat-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](79, "Group");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](80, "mat-select", 23);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("valueChange", function OrderListComponent_Template_mat_select_valueChange_80_listener($event) {
            return ctx.group = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](81, OrderListComponent_mat_option_81_Template, 2, 2, "mat-option", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](82, "mat-form-field", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](83, "mat-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](84, "Packer");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](85, "mat-select", 24);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("valueChange", function OrderListComponent_Template_mat_select_valueChange_85_listener($event) {
            return ctx.packer = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](86, OrderListComponent_mat_option_86_Template, 2, 2, "mat-option", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](87, "mat-form-field", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](88, "mat-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](89, "Last 4");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](90, "input", 25);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function OrderListComponent_Template_input_ngModelChange_90_listener($event) {
            return ctx.last = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](91, "div", 26);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](92, "mat-checkbox", 27);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("ngModelChange", function OrderListComponent_Template_mat_checkbox_ngModelChange_92_listener($event) {
            return ctx.checkbox = $event;
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](93, "Corporate stores");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](94, "mat-card", 28);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](95, "table", 29);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](96, 30);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](97, OrderListComponent_th_97_Template, 2, 0, "th", 31);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](98, OrderListComponent_td_98_Template, 2, 1, "td", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](99, 33);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](100, OrderListComponent_th_100_Template, 2, 0, "th", 34);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](101, OrderListComponent_td_101_Template, 3, 3, "td", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](102, 35);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](103, OrderListComponent_th_103_Template, 2, 0, "th", 31);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](104, OrderListComponent_td_104_Template, 2, 1, "td", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](105, 36);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](106, OrderListComponent_th_106_Template, 2, 0, "th", 31);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](107, OrderListComponent_td_107_Template, 2, 1, "td", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](108, 37);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](109, OrderListComponent_th_109_Template, 2, 0, "th", 31);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](110, OrderListComponent_td_110_Template, 2, 1, "td", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](111, 38);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](112, OrderListComponent_th_112_Template, 2, 0, "th", 31);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](113, OrderListComponent_td_113_Template, 2, 1, "td", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](114, 39);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](115, OrderListComponent_th_115_Template, 2, 0, "th", 40);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](116, OrderListComponent_td_116_Template, 5, 3, "td", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerStart"](117, 41);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](118, OrderListComponent_td_118_Template, 28, 9, "td", 32);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementContainerEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](119, OrderListComponent_tr_119_Template, 1, 0, "tr", 42);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](120, OrderListComponent_tr_120_Template, 1, 2, "tr", 43);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](121, OrderListComponent_tr_121_Template, 1, 0, "tr", 44);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](122, "mat-paginator", 45);
        }

        if (rf & 2) {
          var _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](22);

          var _r1 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](29);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](13);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.search);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.dateFrom)("matDatepicker", _r0);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("for", _r0);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.dateTo)("matDatepicker", _r1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("for", _r1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", ctx.status);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.statuses);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", ctx.coupon);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.coupons);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", ctx.store);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.stores);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", ctx.timeFrame);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.timeframes);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", ctx.payment);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.payments);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", ctx.state);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.states);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", ctx.storeNumber);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.storeNumbers);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", ctx.dropShipApi);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.dropShipApies);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", ctx.franchiseApi);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.franchiseApies);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", ctx.group);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.groups);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("value", ctx.packer);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.packers);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](4);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.last);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngModel", ctx.checkbox);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("dataSource", ctx.dataSource);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](24);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matHeaderRowDef", ctx.columnsToDisplay);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matRowDefColumns", ctx.columnsToDisplay);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matRowDefColumns", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](38, _c1));

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("length", ctx.resultsLength)("pageSize", 10)("pageSizeOptions", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction0"](39, _c2));
        }
      },
      directives: [_angular_material__WEBPACK_IMPORTED_MODULE_4__["MatCard"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatCardContent"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatCardTitle"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatButton"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatIcon"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatFormField"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatLabel"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_5__["NgModel"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSuffix"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatDatepickerInput"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatDatepickerToggle"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatDatepicker"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSelect"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgForOf"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatCheckbox"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatTable"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSort"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatColumnDef"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatHeaderCellDef"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatCellDef"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatHeaderRowDef"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatRowDef"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatPaginator"], _angular_material_core__WEBPACK_IMPORTED_MODULE_7__["MatOption"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatHeaderCell"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSortHeader"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatCell"], _angular_router__WEBPACK_IMPORTED_MODULE_8__["RouterLinkWithHref"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatHeaderRow"], _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatRow"]],
      pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_6__["DatePipe"]],
      styles: [".col-1[_ngcontent-%COMP%] {\n  width: 8.33%;\n  padding: 8px 8px;\n  box-sizing: border-box;\n}\n.col-2[_ngcontent-%COMP%] {\n  width: 16.66%;\n  padding: 8px 8px;\n  box-sizing: border-box;\n}\n.col-2-5[_ngcontent-%COMP%] {\n  width: 20%;\n  padding: 8px 8px;\n  box-sizing: border-box;\n}\n.col-3[_ngcontent-%COMP%] {\n  width: 25%;\n  padding: 8px 8px;\n  box-sizing: border-box;\n}\n.col-4[_ngcontent-%COMP%] {\n  width: 33.33%;\n  padding: 8px 8px;\n  box-sizing: border-box;\n}\n.col-5[_ngcontent-%COMP%] {\n  width: 41.66%;\n  padding: 8px 8px;\n  box-sizing: border-box;\n}\n.col-6[_ngcontent-%COMP%] {\n  width: 50%;\n  padding: 8px 8px;\n  box-sizing: border-box;\n}\n.col-7[_ngcontent-%COMP%] {\n  width: 58.33%;\n  padding: 8px 8px;\n  box-sizing: border-box;\n}\n.col-8[_ngcontent-%COMP%] {\n  width: 66.66%;\n  padding: 8px 8px;\n  box-sizing: border-box;\n}\n.col-9[_ngcontent-%COMP%] {\n  width: 75%;\n  padding: 8px 8px;\n  box-sizing: border-box;\n}\n.col-10[_ngcontent-%COMP%] {\n  width: 83.33%;\n  padding: 8px 8px;\n  box-sizing: border-box;\n}\n.col-11[_ngcontent-%COMP%] {\n  width: 91.66%;\n  padding: 8px 8px;\n  box-sizing: border-box;\n}\n.col-12[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 8px 8px;\n  box-sizing: border-box;\n}\n.grid-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.grid-row[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n}\n@media only screen and (max-width: 673px) {\n  .row-actions[_ngcontent-%COMP%]    > mat-form-field[_ngcontent-%COMP%] {\n    margin-left: 0 !important;\n    padding-left: 0 !important;\n  }\n  .form-row[_ngcontent-%COMP%] {\n    display: inline-grid !important;\n    width: -webkit-fill-available;\n  }\n  .form-row[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] {\n    width: 100% !important;\n  }\n}\n\n@media only screen and (max-width: 992px) {\n  .col-1[_ngcontent-%COMP%] {\n    width: 16.66%;\n  }\n  .col-2[_ngcontent-%COMP%] {\n    width: 33.32%;\n  }\n  .col-2-5[_ngcontent-%COMP%] {\n    width: 33.32%;\n  }\n  .col-3[_ngcontent-%COMP%] {\n    width: 50%;\n  }\n  .col-4[_ngcontent-%COMP%] {\n    width: 66.66%;\n  }\n  .col-5[_ngcontent-%COMP%] {\n    width: 83.32%;\n  }\n  .col-6[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .col-7[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .col-8[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .col-9[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .col-10[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .col-11[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .col-12[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n\n@media only screen and (max-width: 768px) {\n  [class*=\"col-\"][_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n@media screen and (min-width: 600px) {\n  .mobile-break[_ngcontent-%COMP%] {\n    display: none;\n  }\n}\n.mat-icon-button[_ngcontent-%COMP%] {\n  font-size: 40px;\n}\n.refreshbtn[_ngcontent-%COMP%] {\n  float: right;\n}\ntable[_ngcontent-%COMP%] {\n  width: 100%;\n}\ntr.example-detail-row[_ngcontent-%COMP%] {\n  height: 0;\n}\ntr.example-element-row[_ngcontent-%COMP%]:not(.example-expanded-row):hover {\n  background: whitesmoke;\n  cursor: pointer;\n}\ntr.example-element-row[_ngcontent-%COMP%]:not(.example-expanded-row):active {\n  background: #efefef;\n  cursor: pointer;\n}\n.example-element-row[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  border-bottom-width: 0;\n}\n.example-element-detail[_ngcontent-%COMP%] {\n  overflow: hidden;\n  display: flex;\n}\n.example-element-diagram[_ngcontent-%COMP%] {\n  min-width: 80px;\n  border: 2px solid black;\n  padding: 8px;\n  font-weight: lighter;\n  margin: 8px 0;\n  height: 104px;\n}\n.example-element-symbol[_ngcontent-%COMP%] {\n  font-weight: bold;\n  font-size: 40px;\n  line-height: normal;\n}\n.example-element-description[_ngcontent-%COMP%] {\n  padding: 16px;\n}\n.example-element-description-attribution[_ngcontent-%COMP%] {\n  opacity: 0.5;\n}\nth[_ngcontent-%COMP%] {\n  font-weight: bold;\n  text-align: left;\n}\n.mat-header-cell[_ngcontent-%COMP%] {\n  background-color: #f5f5f5;\n}\n.nopaddingCard[_ngcontent-%COMP%] {\n  padding: 8px !important;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9vcmRlckxpc3Qvb3JkZXJMaXN0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDhFQUFBO0FBQ0E7RUFDSSxZQUFZO0VBQ1osZ0JBQWdCO0VBQ2hCLHNCQUFzQjtBQUMxQjtBQUVBO0VBQ0ksYUFBYTtFQUNiLGdCQUFnQjtFQUNoQixzQkFBc0I7QUFDMUI7QUFDQTtFQUNJLFVBQVU7RUFDVixnQkFBZ0I7RUFDaEIsc0JBQXNCO0FBRTFCO0FBQUE7RUFDSSxVQUFVO0VBQ1YsZ0JBQWdCO0VBQ2hCLHNCQUFzQjtBQUcxQjtBQUFBO0VBQ0ksYUFBYTtFQUNiLGdCQUFnQjtFQUNoQixzQkFBc0I7QUFHMUI7QUFBQTtFQUNJLGFBQWE7RUFDYixnQkFBZ0I7RUFDaEIsc0JBQXNCO0FBRzFCO0FBQUE7RUFDSSxVQUFVO0VBQ1YsZ0JBQWdCO0VBQ2hCLHNCQUFzQjtBQUcxQjtBQUFBO0VBQ0ksYUFBYTtFQUNiLGdCQUFnQjtFQUNoQixzQkFBc0I7QUFHMUI7QUFBQTtFQUNJLGFBQWE7RUFDYixnQkFBZ0I7RUFDaEIsc0JBQXNCO0FBRzFCO0FBQUE7RUFDSSxVQUFVO0VBQ1YsZ0JBQWdCO0VBQ2hCLHNCQUFzQjtBQUcxQjtBQUFBO0VBQ0ksYUFBYTtFQUNiLGdCQUFnQjtFQUNoQixzQkFBc0I7QUFHMUI7QUFBQTtFQUNJLGFBQWE7RUFDYixnQkFBZ0I7RUFDaEIsc0JBQXNCO0FBRzFCO0FBQUE7RUFDSSxXQUFXO0VBQ1gsZ0JBQWdCO0VBQ2hCLHNCQUFzQjtBQUcxQjtBQUFBO0VBQ0ksYUFBYTtFQUNiLHNCQUFzQjtBQUcxQjtBQURBO0VBQ0ksYUFBYTtFQUNiLGVBQWU7QUFJbkI7QUFGQTtFQUNJO0lBQ0kseUJBQXlCO0lBQ3pCLDBCQUEwQjtFQUtoQztFQUhFO0lBQ0ksK0JBQStCO0lBQy9CLDZCQUE2QjtFQUtuQztFQUhFO0lBQ0ksc0JBQXNCO0VBSzVCO0FBQ0Y7QUFGQSxnQkFBQTtBQUVBO0VBQ0k7SUFDSSxhQUFhO0VBSW5CO0VBRkU7SUFDSSxhQUFhO0VBSW5CO0VBRkU7SUFDSSxhQUFhO0VBSW5CO0VBRkU7SUFDSSxVQUFVO0VBSWhCO0VBRkU7SUFDSSxhQUFhO0VBSW5CO0VBRkU7SUFDSSxhQUFhO0VBSW5CO0VBRkU7SUFDSSxXQUFXO0VBSWpCO0VBRkU7SUFDSSxXQUFXO0VBSWpCO0VBRkU7SUFDSSxXQUFXO0VBSWpCO0VBRkU7SUFDSSxXQUFXO0VBSWpCO0VBRkU7SUFDSSxXQUFXO0VBSWpCO0VBRkU7SUFDSSxXQUFXO0VBSWpCO0VBRkU7SUFDSSxXQUFXO0VBSWpCO0FBQ0Y7QUFFQSx3Q0FBQTtBQUVBO0VBQUU7SUFFTSxXQUFXO0VBQWpCO0FBQ0Y7QUFHQTtFQUNJO0lBQ0ksYUFBYTtFQUFuQjtBQUNGO0FBRUE7RUFDSSxlQUFlO0FBQ25CO0FBQ0E7RUFDSSxZQUFZO0FBRWhCO0FBQ0E7RUFDSSxXQUFXO0FBRWY7QUFDQTtFQUNJLFNBQVM7QUFFYjtBQUNBO0VBQ0ksc0JBQXNCO0VBQ3RCLGVBQWU7QUFFbkI7QUFDQTtFQUNJLG1CQUFtQjtFQUNuQixlQUFlO0FBRW5CO0FBRUE7RUFDSSxzQkFBc0I7QUFDMUI7QUFFQTtFQUNJLGdCQUFnQjtFQUNoQixhQUFhO0FBQ2pCO0FBRUE7RUFDSSxlQUFlO0VBQ2YsdUJBQXVCO0VBQ3ZCLFlBQVk7RUFDWixvQkFBb0I7RUFDcEIsYUFBYTtFQUNiLGFBQWE7QUFDakI7QUFFQTtFQUNJLGlCQUFpQjtFQUNqQixlQUFlO0VBQ2YsbUJBQW1CO0FBQ3ZCO0FBRUE7RUFDSSxhQUFhO0FBQ2pCO0FBRUE7RUFDSSxZQUFZO0FBQ2hCO0FBQ0E7RUFDSSxpQkFBaUI7RUFDakIsZ0JBQWdCO0FBRXBCO0FBQUE7RUFDSSx5QkFBd0I7QUFHNUI7QUFEQTtFQUNJLHVCQUF1QjtBQUkzQiIsImZpbGUiOiJhcHAvb3JkZXJMaXN0L29yZGVyTGlzdC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIFlvdSBjYW4gYWRkIGdsb2JhbCBzdHlsZXMgdG8gdGhpcyBmaWxlLCBhbmQgYWxzbyBpbXBvcnQgb3RoZXIgc3R5bGUgZmlsZXMgKi9cclxuLmNvbC0xIHtcclxuICAgIHdpZHRoOiA4LjMzJTtcclxuICAgIHBhZGRpbmc6IDhweCA4cHg7XHJcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG59XHJcblxyXG4uY29sLTIge1xyXG4gICAgd2lkdGg6IDE2LjY2JTtcclxuICAgIHBhZGRpbmc6IDhweCA4cHg7XHJcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG59XHJcbi5jb2wtMi01IHtcclxuICAgIHdpZHRoOiAyMCU7XHJcbiAgICBwYWRkaW5nOiA4cHggOHB4O1xyXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxufVxyXG4uY29sLTMge1xyXG4gICAgd2lkdGg6IDI1JTtcclxuICAgIHBhZGRpbmc6IDhweCA4cHg7XHJcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG59XHJcblxyXG4uY29sLTQge1xyXG4gICAgd2lkdGg6IDMzLjMzJTtcclxuICAgIHBhZGRpbmc6IDhweCA4cHg7XHJcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG59XHJcblxyXG4uY29sLTUge1xyXG4gICAgd2lkdGg6IDQxLjY2JTtcclxuICAgIHBhZGRpbmc6IDhweCA4cHg7XHJcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG59XHJcblxyXG4uY29sLTYge1xyXG4gICAgd2lkdGg6IDUwJTtcclxuICAgIHBhZGRpbmc6IDhweCA4cHg7XHJcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG59XHJcblxyXG4uY29sLTcge1xyXG4gICAgd2lkdGg6IDU4LjMzJTtcclxuICAgIHBhZGRpbmc6IDhweCA4cHg7XHJcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG59XHJcblxyXG4uY29sLTgge1xyXG4gICAgd2lkdGg6IDY2LjY2JTtcclxuICAgIHBhZGRpbmc6IDhweCA4cHg7XHJcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG59XHJcblxyXG4uY29sLTkge1xyXG4gICAgd2lkdGg6IDc1JTtcclxuICAgIHBhZGRpbmc6IDhweCA4cHg7XHJcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG59XHJcblxyXG4uY29sLTEwIHtcclxuICAgIHdpZHRoOiA4My4zMyU7XHJcbiAgICBwYWRkaW5nOiA4cHggOHB4O1xyXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxufVxyXG5cclxuLmNvbC0xMSB7XHJcbiAgICB3aWR0aDogOTEuNjYlO1xyXG4gICAgcGFkZGluZzogOHB4IDhweDtcclxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XHJcbn1cclxuXHJcbi5jb2wtMTIge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbiAgICBwYWRkaW5nOiA4cHggOHB4O1xyXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcclxufVxyXG5cclxuLmdyaWQtY29udGFpbmVyIHtcclxuICAgIGRpc3BsYXk6IGZsZXg7XHJcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xyXG59XHJcbi5ncmlkLXJvdyB7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgZmxleC13cmFwOiB3cmFwO1xyXG59XHJcbkBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogNjczcHgpIHtcclxuICAgIC5yb3ctYWN0aW9ucyA+IG1hdC1mb3JtLWZpZWxkIHtcclxuICAgICAgICBtYXJnaW4tbGVmdDogMCAhaW1wb3J0YW50O1xyXG4gICAgICAgIHBhZGRpbmctbGVmdDogMCAhaW1wb3J0YW50O1xyXG4gICAgfVxyXG4gICAgLmZvcm0tcm93IHtcclxuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtZ3JpZCAhaW1wb3J0YW50O1xyXG4gICAgICAgIHdpZHRoOiAtd2Via2l0LWZpbGwtYXZhaWxhYmxlO1xyXG4gICAgfVxyXG4gICAgLmZvcm0tcm93IG1hdC1mb3JtLWZpZWxkIHtcclxuICAgICAgICB3aWR0aDogMTAwJSAhaW1wb3J0YW50O1xyXG4gICAgfVxyXG59XHJcblxyXG4vKlNtYWxsIHNjcmVlbnMqL1xyXG5cclxuQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA5OTJweCkge1xyXG4gICAgLmNvbC0xIHtcclxuICAgICAgICB3aWR0aDogMTYuNjYlO1xyXG4gICAgfVxyXG4gICAgLmNvbC0yIHtcclxuICAgICAgICB3aWR0aDogMzMuMzIlO1xyXG4gICAgfVxyXG4gICAgLmNvbC0yLTUge1xyXG4gICAgICAgIHdpZHRoOiAzMy4zMiU7XHJcbiAgICB9XHJcbiAgICAuY29sLTMge1xyXG4gICAgICAgIHdpZHRoOiA1MCU7XHJcbiAgICB9XHJcbiAgICAuY29sLTQge1xyXG4gICAgICAgIHdpZHRoOiA2Ni42NiU7XHJcbiAgICB9XHJcbiAgICAuY29sLTUge1xyXG4gICAgICAgIHdpZHRoOiA4My4zMiU7XHJcbiAgICB9XHJcbiAgICAuY29sLTYge1xyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgfVxyXG4gICAgLmNvbC03IHtcclxuICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgIH1cclxuICAgIC5jb2wtOCB7XHJcbiAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICB9XHJcbiAgICAuY29sLTkge1xyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgfVxyXG4gICAgLmNvbC0xMCB7XHJcbiAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICB9XHJcbiAgICAuY29sLTExIHtcclxuICAgICAgICB3aWR0aDogMTAwJTtcclxuICAgIH1cclxuICAgIC5jb2wtMTIge1xyXG4gICAgICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgfVxyXG59XHJcblxyXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDEwNjBweCkge1xyXG59XHJcblxyXG4vKiBFeHRyYSBzbWFsbCBkZXZpY2VzIFwibW9iaWxlIHBob25lc1wiICovXHJcblxyXG5AbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDc2OHB4KSB7XHJcbiAgICBbY2xhc3MqPVwiY29sLVwiXSB7XHJcbiAgICAgICAgd2lkdGg6IDEwMCU7XHJcbiAgICB9XHJcbn1cclxuXHJcbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDYwMHB4KSB7XHJcbiAgICAubW9iaWxlLWJyZWFrIHtcclxuICAgICAgICBkaXNwbGF5OiBub25lO1xyXG4gICAgfVxyXG59XHJcbi5tYXQtaWNvbi1idXR0b24ge1xyXG4gICAgZm9udC1zaXplOiA0MHB4O1xyXG59XHJcbi5yZWZyZXNoYnRuIHtcclxuICAgIGZsb2F0OiByaWdodDtcclxufVxyXG5cclxudGFibGUge1xyXG4gICAgd2lkdGg6IDEwMCU7XHJcbn1cclxuXHJcbnRyLmV4YW1wbGUtZGV0YWlsLXJvdyB7XHJcbiAgICBoZWlnaHQ6IDA7XHJcbn1cclxuXHJcbnRyLmV4YW1wbGUtZWxlbWVudC1yb3c6bm90KC5leGFtcGxlLWV4cGFuZGVkLXJvdyk6aG92ZXIge1xyXG4gICAgYmFja2dyb3VuZDogd2hpdGVzbW9rZTtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxufVxyXG5cclxudHIuZXhhbXBsZS1lbGVtZW50LXJvdzpub3QoLmV4YW1wbGUtZXhwYW5kZWQtcm93KTphY3RpdmUge1xyXG4gICAgYmFja2dyb3VuZDogI2VmZWZlZjtcclxuICAgIGN1cnNvcjogcG9pbnRlcjtcclxuXHJcbn1cclxuXHJcbi5leGFtcGxlLWVsZW1lbnQtcm93IHRkIHtcclxuICAgIGJvcmRlci1ib3R0b20td2lkdGg6IDA7XHJcbn1cclxuXHJcbi5leGFtcGxlLWVsZW1lbnQtZGV0YWlsIHtcclxuICAgIG92ZXJmbG93OiBoaWRkZW47XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG59XHJcblxyXG4uZXhhbXBsZS1lbGVtZW50LWRpYWdyYW0ge1xyXG4gICAgbWluLXdpZHRoOiA4MHB4O1xyXG4gICAgYm9yZGVyOiAycHggc29saWQgYmxhY2s7XHJcbiAgICBwYWRkaW5nOiA4cHg7XHJcbiAgICBmb250LXdlaWdodDogbGlnaHRlcjtcclxuICAgIG1hcmdpbjogOHB4IDA7XHJcbiAgICBoZWlnaHQ6IDEwNHB4O1xyXG59XHJcblxyXG4uZXhhbXBsZS1lbGVtZW50LXN5bWJvbCB7XHJcbiAgICBmb250LXdlaWdodDogYm9sZDtcclxuICAgIGZvbnQtc2l6ZTogNDBweDtcclxuICAgIGxpbmUtaGVpZ2h0OiBub3JtYWw7XHJcbn1cclxuXHJcbi5leGFtcGxlLWVsZW1lbnQtZGVzY3JpcHRpb24ge1xyXG4gICAgcGFkZGluZzogMTZweDtcclxufVxyXG5cclxuLmV4YW1wbGUtZWxlbWVudC1kZXNjcmlwdGlvbi1hdHRyaWJ1dGlvbiB7XHJcbiAgICBvcGFjaXR5OiAwLjU7XHJcbn1cclxudGgge1xyXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XHJcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xyXG59XHJcbi5tYXQtaGVhZGVyLWNlbGwge1xyXG4gICAgYmFja2dyb3VuZC1jb2xvcjojZjVmNWY1O1xyXG59XHJcbi5ub3BhZGRpbmdDYXJkIHtcclxuICAgIHBhZGRpbmc6IDhweCAhaW1wb3J0YW50O1xyXG59Il19 */"],
      data: {
        animation: [Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["trigger"])('detailExpand', [Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["state"])('collapsed', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({
          height: '0px',
          minHeight: '0'
        })), Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["state"])('expanded', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({
          height: '*'
        })), Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["transition"])('expanded <=> collapsed', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animate"])('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))])]
      }
    });
    /*@__PURE__*/

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](OrderListComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
        args: [{
          selector: 'app-orders',
          templateUrl: './orderList.component.html',
          styleUrls: ['./orderList.component.scss'],
          animations: [Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["trigger"])('detailExpand', [Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["state"])('collapsed', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({
            height: '0px',
            minHeight: '0'
          })), Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["state"])('expanded', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["style"])({
            height: '*'
          })), Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["transition"])('expanded <=> collapsed', Object(_angular_animations__WEBPACK_IMPORTED_MODULE_1__["animate"])('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))])]
        }]
      }], function () {
        return [{
          type: _shared_services_orderService__WEBPACK_IMPORTED_MODULE_3__["OrderService"]
        }];
      }, {
        paginator: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
          args: [_angular_material__WEBPACK_IMPORTED_MODULE_4__["MatPaginator"]]
        }],
        sort: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"],
          args: [_angular_material__WEBPACK_IMPORTED_MODULE_4__["MatSort"], {
            "static": true
          }]
        }]
      });
    })();
    /***/

  },

  /***/
  "./src/app/orderList/orderList.module.ts":
  /*!***********************************************!*\
    !*** ./src/app/orderList/orderList.module.ts ***!
    \***********************************************/

  /*! exports provided: OrderListModule */

  /***/
  function srcAppOrderListOrderListModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "OrderListModule", function () {
      return OrderListModule;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
    /* harmony import */


    var _demo_material_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! ../demo-material-module */
    "./src/app/demo-material-module.ts");
    /* harmony import */


    var _angular_flex_layout__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @angular/flex-layout */
    "./node_modules/@angular/flex-layout/__ivy_ngcc__/esm2015/flex-layout.js");
    /* harmony import */


    var ng_chartist__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! ng-chartist */
    "./node_modules/ng-chartist/__ivy_ngcc__/fesm2015/ng-chartist.js");
    /* harmony import */


    var _orderList_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ./orderList.component */
    "./src/app/orderList/orderList.component.ts");
    /* harmony import */


    var _orderList_routing__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! ./orderList.routing */
    "./src/app/orderList/orderList.routing.ts");
    /* harmony import */


    var _orderDetail_orderDetail_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! ./orderDetail/orderDetail.component */
    "./src/app/orderList/orderDetail/orderDetail.component.ts");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");

    var OrderListModule = function OrderListModule() {
      _classCallCheck(this, OrderListModule);
    };

    OrderListModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
      type: OrderListModule
    });
    OrderListModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
      factory: function OrderListModule_Factory(t) {
        return new (t || OrderListModule)();
      },
      providers: [],
      imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _demo_material_module__WEBPACK_IMPORTED_MODULE_3__["DemoMaterialModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormsModule"], _angular_flex_layout__WEBPACK_IMPORTED_MODULE_4__["FlexLayoutModule"], ng_chartist__WEBPACK_IMPORTED_MODULE_5__["ChartistModule"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(_orderList_routing__WEBPACK_IMPORTED_MODULE_7__["OrderListRoutes"])], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
    });

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](OrderListModule, {
        declarations: [_orderList_component__WEBPACK_IMPORTED_MODULE_6__["OrderListComponent"], _orderDetail_orderDetail_component__WEBPACK_IMPORTED_MODULE_8__["OrderDetailComponent"]],
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _demo_material_module__WEBPACK_IMPORTED_MODULE_3__["DemoMaterialModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormsModule"], _angular_flex_layout__WEBPACK_IMPORTED_MODULE_4__["FlexLayoutModule"], ng_chartist__WEBPACK_IMPORTED_MODULE_5__["ChartistModule"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
      });
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](OrderListModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
          imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], _demo_material_module__WEBPACK_IMPORTED_MODULE_3__["DemoMaterialModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_9__["FormsModule"], _angular_flex_layout__WEBPACK_IMPORTED_MODULE_4__["FlexLayoutModule"], ng_chartist__WEBPACK_IMPORTED_MODULE_5__["ChartistModule"], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(_orderList_routing__WEBPACK_IMPORTED_MODULE_7__["OrderListRoutes"])],
          declarations: [_orderList_component__WEBPACK_IMPORTED_MODULE_6__["OrderListComponent"], _orderDetail_orderDetail_component__WEBPACK_IMPORTED_MODULE_8__["OrderDetailComponent"]],
          providers: [],
          exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        }]
      }], null, null);
    })();
    /***/

  },

  /***/
  "./src/app/orderList/orderList.routing.ts":
  /*!************************************************!*\
    !*** ./src/app/orderList/orderList.routing.ts ***!
    \************************************************/

  /*! exports provided: OrderListRoutes */

  /***/
  function srcAppOrderListOrderListRoutingTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "OrderListRoutes", function () {
      return OrderListRoutes;
    });
    /* harmony import */


    var _orderList_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! ./orderList.component */
    "./src/app/orderList/orderList.component.ts");
    /* harmony import */


    var _orderList_orderDetail_orderDetail_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ../orderList/orderDetail/orderDetail.component */
    "./src/app/orderList/orderDetail/orderDetail.component.ts");

    var OrderListRoutes = [{
      path: '',
      component: _orderList_component__WEBPACK_IMPORTED_MODULE_0__["OrderListComponent"]
    }, {
      path: 'orderDetail/:id',
      component: _orderList_orderDetail_orderDetail_component__WEBPACK_IMPORTED_MODULE_1__["OrderDetailComponent"]
    }];
    /***/
  },

  /***/
  "./src/app/shared/models/order.ts":
  /*!****************************************!*\
    !*** ./src/app/shared/models/order.ts ***!
    \****************************************/

  /*! exports provided: Order */

  /***/
  function srcAppSharedModelsOrderTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "Order", function () {
      return Order;
    });

    var Order = function Order() {
      _classCallCheck(this, Order);

      this.orderID = '';
      this.date = new Date();
      this.store = '';
      this.businessName = '';
      this.trackingNumber = '';
      this.orderStatus = '';
      this.paymentStatus = '';
      this.affiliate = '';
      this.appliedCredit = 0;
      this.billedCharges = 0;
      this.orderTotal = 0;
    };
    /***/

  },

  /***/
  "./src/app/shared/services/orderService.ts":
  /*!*************************************************!*\
    !*** ./src/app/shared/services/orderService.ts ***!
    \*************************************************/

  /*! exports provided: OrderService, ActivityLog, Product */

  /***/
  function srcAppSharedServicesOrderServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "OrderService", function () {
      return OrderService;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ActivityLog", function () {
      return ActivityLog;
    });
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "Product", function () {
      return Product;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");

    var OrderService = function OrderService() {
      _classCallCheck(this, OrderService);

      this.orders = [{
        orderID: '1A3',
        date: new Date(2020, 2, 13),
        store: 'Sharman Cosmetic Store',
        businessName: 'Mirijevo trans',
        trackingNumber: '12A',
        orderStatus: 'Pending',
        paymentStatus: 'Paid',
        affiliate: 'Julija',
        appliedCredit: 100,
        billedCharges: 80,
        orderTotal: 0
      }, {
        orderID: '1A4B',
        date: new Date(2019, 12, 12),
        store: 'EASTLAND CBD',
        businessName: 'Mlekara Glozane',
        trackingNumber: '13A',
        orderStatus: 'Shipped',
        paymentStatus: 'Paid',
        affiliate: 'Boban',
        appliedCredit: 120,
        billedCharges: 80,
        orderTotal: 0
      }, {
        orderID: '1A21A3',
        date: new Date(2020, 1, 4),
        store: 'Kansas Store',
        businessName: 'Vojislav d.o.o',
        trackingNumber: '12A',
        orderStatus: 'Pending',
        paymentStatus: 'Paid',
        affiliate: 'Radmila',
        appliedCredit: 1330,
        billedCharges: 150,
        orderTotal: 0
      }, {
        orderID: '1X3',
        date: new Date(2020, 5, 2),
        store: 'Sharman Cosmetic Store',
        businessName: 'Test123',
        trackingNumber: '12A',
        orderStatus: 'Pending',
        paymentStatus: 'Not paid',
        affiliate: 'Ljubovinka',
        appliedCredit: 1030,
        billedCharges: 230,
        orderTotal: 0
      }, {
        orderID: '1e3',
        date: new Date(2020, 11, 1),
        store: 'Sharman Cosmetic Store',
        businessName: 'FirmName',
        trackingNumber: 'AJ12A',
        orderStatus: 'Proccesing',
        paymentStatus: 'Paid',
        affiliate: 'Jaroslava',
        appliedCredit: 100,
        billedCharges: 80,
        orderTotal: 0
      }, {
        orderID: '13O3',
        date: new Date(2020, 6, 1),
        store: 'Kansas Store',
        businessName: 'Mesara mance',
        trackingNumber: '1OT2A',
        orderStatus: 'Pending',
        paymentStatus: 'Pending',
        affiliate: 'Otilia',
        appliedCredit: 120,
        billedCharges: 99,
        orderTotal: 0
      }, {
        orderID: '1TEST3',
        date: new Date(2020, 4, 4),
        store: 'EASTLAND CBD',
        businessName: 'Skroz dobra pekara',
        trackingNumber: '12SA',
        orderStatus: 'Proccesing',
        paymentStatus: 'Paid',
        affiliate: 'Andjela',
        appliedCredit: 100,
        billedCharges: 100,
        orderTotal: 0
      }, {
        orderID: '12TS2',
        date: new Date(2020, 3, 3),
        store: 'Sharman Cosmetic Store',
        businessName: 'Planeta sport',
        trackingNumber: '1B21',
        orderStatus: 'Shipped',
        paymentStatus: 'Not Paid',
        affiliate: 'Branislava',
        appliedCredit: 1000,
        billedCharges: 800,
        orderTotal: 0
      }, {
        orderID: '1A34A',
        date: new Date(),
        store: 'EASTLAND CBD',
        businessName: 'Koceljeva trans',
        trackingNumber: '01E',
        orderStatus: 'Proccesing',
        paymentStatus: 'Paid',
        affiliate: 'Davorinka',
        appliedCredit: 1200,
        billedCharges: 20,
        orderTotal: 0
      }, {
        orderID: '01AS',
        date: new Date(2020, 5, 12),
        store: 'Sharman Cosmetic Store',
        businessName: 'Pozarevac prevoz',
        trackingNumber: '1E21',
        orderStatus: 'Pending',
        paymentStatus: 'Paid',
        affiliate: 'Draginja',
        appliedCredit: 1300,
        billedCharges: 12,
        orderTotal: 0
      }, {
        orderID: '00F9S',
        date: new Date(2020, 2, 2),
        store: 'Kansas Store',
        businessName: 'Mirijevo trans',
        trackingNumber: '12A21',
        orderStatus: 'Proccesing',
        paymentStatus: 'Not Paid',
        affiliate: 'Julija',
        appliedCredit: 320,
        billedCharges: 10,
        orderTotal: 0
      }, {
        orderID: '00F9S',
        date: new Date(2020, 2, 2),
        store: 'Kansas Store',
        businessName: 'Mirijevo trans',
        trackingNumber: '12A21',
        orderStatus: 'Proccesing',
        paymentStatus: 'Not Paid',
        affiliate: 'Julija',
        appliedCredit: 320,
        billedCharges: 10,
        orderTotal: 0
      }, {
        orderID: '00F9S',
        date: new Date(2020, 2, 2),
        store: 'Kansas Store',
        businessName: 'Mirijevo trans',
        trackingNumber: '12A21',
        orderStatus: 'Proccesing',
        paymentStatus: 'Not Paid',
        affiliate: 'Julija',
        appliedCredit: 320,
        billedCharges: 10,
        orderTotal: 0
      }, {
        orderID: '00F9S',
        date: new Date(2020, 2, 2),
        store: 'Kansas Store',
        businessName: 'Mirijevo trans',
        trackingNumber: '12A21',
        orderStatus: 'Proccesing',
        paymentStatus: 'Not Paid',
        affiliate: 'Julija',
        appliedCredit: 320,
        billedCharges: 10,
        orderTotal: 0
      }];
      this.couriers = ['UPS', 'USPS'];
      this.statuses = ['Pending', 'Proccesing', 'Shipped'];
      this.coupons = ['HEMP20V', 'CBD', 'MDA40'];
      this.stores = ['Sharman Cosmetic Store', 'Kansas Store', 'EASTLAND CBD'];
      this.timeframes = ['Today', 'Yesterday', 'This week'];
      this.payments = ['Pending', 'Not paid', 'Paid'];
      this.states = ['Alabama', 'Alaska', 'Alberta'];
      this.storeNumbers = ['302', '2B', '156'];
      this.dropShipApies = ['Marc Gordon', 'Vladimir Krsmanovic', 'Vojislav Djordjevic'];
      this.franchiseApies = ['Marc Gordon', 'Vladimir Krsmanovic', 'Vojislav Djordjevic'];
      this.groups = ['Wholesale', 'Retail', 'Distributor'];
      this.packers = ['Dzimi Hendriks', 'Erik Klepton', 'BB King'];
      this.logs = [{
        eventType: 'OrderUpdated',
        date: new Date(),
        user: 'Vojislav Djordjevic',
        details: '[order_id] => 525041 [first_name] Test => Test123',
        ip: '87.116.160.66',
        agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36'
      }, {
        eventType: 'OrderNoteCreated',
        date: new Date(),
        user: 'Marko Markovic',
        details: '[order_id] => 525041 [first_name] Test => Test123',
        ip: '87.116.160.66',
        agent: 'Mozilla/5.0 (Windows NT 10.0;ecko) Chrome/85.0.4183.102 Safari/537.36'
      }, {
        eventType: 'OrderCreated',
        date: new Date(),
        user: 'Stevan Sreckovic',
        details: '[order_id] => 525041 [first_name] Test => Test123',
        ip: '87.126.160.66',
        agent: 'Mozilla/5.0 (Windows NT 10.0;ecko) Chrome/85.0.4183.102 Safari/537.36'
      }];
      this.products = [{
        item: '	Water Soluble, Full Spectrum Hemp Oil (30mL)Selected Flavor Flavor Cherry Limeade',
        cost: 41.32,
        quantity: 1,
        total: 0
      }, {
        item: '	Water Solu bleade',
        cost: 32,
        quantity: 2,
        total: 0
      }];
    };

    OrderService.ɵfac = function OrderService_Factory(t) {
      return new (t || OrderService)();
    };

    OrderService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
      token: OrderService,
      factory: OrderService.ɵfac,
      providedIn: 'root'
    });
    /*@__PURE__*/

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](OrderService, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
        args: [{
          providedIn: 'root'
        }]
      }], null, null);
    })();

    var ActivityLog = function ActivityLog() {
      _classCallCheck(this, ActivityLog);
    };

    var Product = function Product() {
      _classCallCheck(this, Product);
    };
    /***/

  }
}]);
//# sourceMappingURL=orderList-orderList-module-es5.js.map