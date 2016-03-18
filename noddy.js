#!/usr/local/bin/node
var child_process = require('child_process');
var fs = require('fs');

//Usage 'noddy <input icon 1024x1024> <output name>' This outputs an AppIcon Set folder ready to import.
if (process.argv.length != 4) {
    console.log(process.argv.length);
    console.error('Usage: noddy <input icon 1024x1024> <output name>');
    process.exit(1);
}

var emptyIconSet = {
    'images': [
        {
            'size' : '29x29',
            'idiom' : 'iphone',
            'scale' : '1x'
        },
        {
            'size' : '29x29',
            'idiom' : 'iphone',
            'scale' : '2x'
        },
        {
            'idiom' : 'iphone',
            'size' : '29x29',
            'scale' : '3x'
        },
        {
            'idiom' : 'iphone',
            'size' : '40x40',
            'scale' : '2x'
        },
        {
            'idiom' : 'iphone',
            'size' : '40x40',
            'scale' : '3x'
        },
        {
            'size' : '57x57',
            'idiom' : 'iphone',
            'scale' : '1x'
        },
        {
            'size' : '57x57',
            'idiom' : 'iphone',
            'scale' : '2x'
        },
        {
            'size' : '60x60',
            'idiom' : 'iphone',
            'scale' : '2x'
        },
        {
            'idiom' : 'iphone',
            'size' : '60x60',
            'scale' : '3x'
        },
        {
            'size' : '29x29',
            'idiom' : 'ipad',
            'scale' : '1x'
        },
        {
            'size' : '29x29',
            'idiom' : 'ipad',
            'scale' : '2x'
        },
        {
            'idiom' : 'ipad',
            'size' : '40x40',
            'scale' : '1x'
        },
        {
            'idiom' : 'ipad',
            'size' : '40x40',
            'scale' : '2x'
        },
        {
            'size' : '50x50',
            'idiom' : 'ipad',
            'scale' : '1x'
        },
        {
            'size' : '50x50',
            'idiom' : 'ipad',
            'scale' : '2x'
        },
        {
            'idiom' : 'ipad',
            'size' : '72x72',
            'scale' : '1x'
        },
        {
            'idiom' : 'ipad',
            'size' : '72x72',
            'scale' : '2x'
        },
        {
            'size' : '76x76',
            'idiom' : 'ipad',
            'scale' : '1x'
        },
        {
            'idiom' : 'ipad',
            'size' : '76x76',
            'scale' : '2x'
        },
        {
            'idiom' : 'ipad',
            'size' : '83.5x83.5',
            'scale' : '2x'
        }
    ],
    'info': {
        'version': 1,
        'author': 'xcode'
    }
};

var originalIcon = process.argv[2];
var outputDirectory = process.argv[3] + '.appiconset';
child_process.execSync('mkdir ' + outputDirectory);
var images = emptyIconSet.images.map((image) => {
    var dimensions = image.size.split('x');
    var scale = image.scale.slice(0, -1);
    var width = dimensions[0]*scale;
    var height = dimensions[1]*scale;
    var newSize = width + 'x' + height;
    var iconFile = 'icon' + newSize + '.png';
    var command = 'convert ' + originalIcon + ' -adaptive-resize ' + newSize + ' ' + outputDirectory + '/' + iconFile;
    child_process.execSync(command, {encoding: 'UTF-8'});
    return Object.assign({}, image, {filename: iconFile})
});
fs.writeFileSync(outputDirectory + '/Contents.json', JSON.stringify({'images':images, 'info':{
    'version': 1,
    'author': 'noddy'
}}));

console.log('AppIcon set produced at : ' + outputDirectory);