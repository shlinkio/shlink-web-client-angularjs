'use strict';

var fs = require('fs'),
    appRoot = require('app-root-path').path,
    capitalize = function (string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    createElement = function (elementType, elementsDir, elementFile, element,module) {
        // Create elements dir if it doesn't exist
        if (! fs.existsSync(elementsDir)) {
            fs.mkdirSync(elementsDir);
        }

        // Read the element template and replace specific element and module names
        var content = fs.readFileSync(appRoot + '/scripts/templates/' + elementType + '-template.txt', 'utf-8')
                        .replace(new RegExp('%' + elementType + '%', 'g'), element)
                        .replace(new RegExp('%' + elementType + 'Ctrl%', 'g'), capitalize(element) + 'Ctrl')
                        .replace('%module%', module);

        // Create element file
        fs.writeFileSync(elementFile, content);
    },
    addElementToIndex = function (elementTypePlural, element) {
        // Add element to index.html
        var lines = fs.readFileSync(appRoot + '/app/index.html', 'utf-8').split('\n'),
            firstLineFound = false,
            lastLineFound = false,
            prev = [],
            next = [],
            line;
        for (var i in lines) {
            line = lines[i];

            if (line.indexOf('build:js /js/main.min.js') > 0) {
                firstLineFound = true;
            }

            if (firstLineFound && line.indexOf('/build') > 0) {
                lastLineFound = true;
                firstLineFound = false;
            }

            if (lastLineFound) {
                next.push(line);
            } else {
                prev.push(line);
            }
        }
        prev.push('        <script src="/js/' + elementTypePlural + '/' + element + '.js"></script>');
        fs.writeFileSync(appRoot + '/app/index.html', prev.concat(next).join('\n'));
    },
    addElementToGruntfile = function (elementTypePlural, element) {
        // Add filter to Gruntfile
        var gruntfileLines = fs.readFileSync(appRoot + '/Gruntfile.js', 'utf-8').split('\n'),
            firstLineFound = false,
            lastLineFound = false,
            prev = [],
            next = [],
            line;
        for (var i in gruntfileLines) {
            line = gruntfileLines[i];

            if (line.indexOf('jsUglifyTemplate[jsFile] = [') > 0) {
                firstLineFound = true;
            }

            if (firstLineFound && line.indexOf('];') > 0) {
                lastLineFound = true;
                firstLineFound = false;
                prev[prev.length - 1] = prev[prev.length - 1] + ',';
            }

            if (lastLineFound) {
                next.push(line);
            } else {
                prev.push(line);
            }
        }

        prev.push('        \'app/js/' + elementTypePlural + '/' + element + '.js\'');
        fs.writeFileSync(appRoot + '/Gruntfile.js', prev.concat(next).join('\n'));
    };

module.exports = {
    createAngularElement: function (elementType, element, theModule) {
        var elementTypePlural = elementType + 's',
            elementsDir = appRoot + '/app/js/' + elementTypePlural,
            module = theModule || 'shlink',
            elementFile = elementsDir + '/' + element + '.js';

        createElement(elementType, elementsDir, elementFile, element, module);
        addElementToIndex(elementTypePlural, element);
        addElementToGruntfile(elementTypePlural, element);
    }
};
