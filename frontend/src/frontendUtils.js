// converts any string into Pascal with whitespaces between, matching the regex
// https://javascript.plainenglish.io/convert-string-to-different-case-styles-snake-kebab-camel-and-pascal-case-in-javascript-da724b7220d7
exports.toPascalCaseWithWhiteSpace = (str) =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toLowerCase())
    .map((y) => y.charAt(0).toUpperCase() + y.substr(1).toLowerCase())
    .join(" ");

exports.debounce = (fn) => {

  // Setup a timer
  var timeout;

  // Return a function to run debounced
  return function () {

    // Setup the arguments
    var context = this;
    var args = arguments;

    // If there's a timer, cancel it
    if (timeout) {
      window.cancelAnimationFrame(timeout);
    }

    // Setup the new requestAnimationFrame()
    timeout = window.requestAnimationFrame(function () {
      fn.apply(context, args);
    });

  }

};