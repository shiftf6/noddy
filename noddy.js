#!/usr/local/bin/node
const child_process = require('child_process');
const fs = require('fs');

//Usage 'noddy <input icon 1024x1024> <output name>' This outputs an AppIcon Set folder ready to import.
if (process.argv.length !== 4) {
  console.log(process.argv.length);
  console.error('Usage: noddy <input icon 1024x1024> <output name>');
  process.exit(1);
}

const emptyIconSet = {
  'images': [
    {
      "idiom" : "iphone",
      "size" : "20x20",
      "scale" : "2x"
    },
    {
      "idiom" : "iphone",
      "size" : "20x20",
      "scale" : "3x"
    },
    {
      "size" : "29x29",
      "idiom" : "iphone",
      "scale" : "1x"
    },
    {
      "size" : "29x29",
      "idiom" : "iphone",
      "scale" : "2x"
    },
    {
      "size" : "29x29",
      "idiom" : "iphone",
      "scale" : "3x"
    },
    {
      "size" : "40x40",
      "idiom" : "iphone",
      "scale" : "2x"
    },
    {
      "size" : "40x40",
      "idiom" : "iphone",
      "scale" : "3x"
    },
    {
      "size" : "57x57",
      "idiom" : "iphone",
      "scale" : "1x"
    },
    {
      "size" : "57x57",
      "idiom" : "iphone",
      "scale" : "2x"
    },
    {
      "size" : "60x60",
      "idiom" : "iphone",
      "scale" : "2x"
    },
    {
      "size" : "60x60",
      "idiom" : "iphone",
      "scale" : "3x"
    },
    {
      "idiom" : "ipad",
      "size" : "20x20",
      "scale" : "1x"
    },
    {
      "idiom" : "ipad",
      "size" : "20x20",
      "scale" : "2x"
    },
    {
      "size" : "29x29",
      "idiom" : "ipad",
      "scale" : "1x"
    },
    {
      "size" : "29x29",
      "idiom" : "ipad",
      "scale" : "2x"
    },
    {
      "size" : "40x40",
      "idiom" : "ipad",
      "scale" : "1x"
    },
    {
      "size" : "40x40",
      "idiom" : "ipad",
      "scale" : "2x"
    },
    {
      "size" : "50x50",
      "idiom" : "ipad",
      "scale" : "1x"
    },
    {
      "size" : "50x50",
      "idiom" : "ipad",
      "scale" : "2x"
    },
    {
      "size" : "72x72",
      "idiom" : "ipad",
      "scale" : "1x"
    },
    {
      "size" : "72x72",
      "idiom" : "ipad",
      "scale" : "2x"
    },
    {
      "size" : "76x76",
      "idiom" : "ipad",
      "scale" : "1x"
    },
    {
      "size" : "76x76",
      "idiom" : "ipad",
      "scale" : "2x"
    },
    {
      "size" : "83.5x83.5",
      "idiom" : "ipad",
      "scale" : "2x"
    },
    {
      "size" : "1024x1024",
      "idiom" : "ios-marketing",
      "scale" : "1x"
    }
  ],
  'info': {
    'version': 1,
    'author': 'xcode'
  }
};

const emptyLaunchImageSet = {
  'images': [
    {
      'orientation': 'portrait',
      'idiom': 'iphone',
      'extent': 'full-screen',
      'minimum-system-version': '11.0',
      'subtype': '2436h',
      'scale': '3x'
    },
    {
      'orientation': 'landscape',
      'idiom': 'iphone',
      'extent': 'full-screen',
      'minimum-system-version': '11.0',
      'subtype': '2436h',
      'scale': '3x'
    },
    {
      'orientation': 'portrait',
      'idiom': 'iphone',
      'extent': 'full-screen',
      'minimum-system-version': '8.0',
      'subtype': '736h',
      'scale': '3x'
    },
    {
      'orientation': 'landscape',
      'idiom': 'iphone',
      'extent': 'full-screen',
      'minimum-system-version': '8.0',
      'subtype': '736h',
      'scale': '3x'
    },
    {
      'orientation': 'portrait',
      'idiom': 'iphone',
      'extent': 'full-screen',
      'minimum-system-version': '8.0',
      'subtype': '667h',
      'scale': '2x'
    },
    {
      'orientation': 'portrait',
      'idiom': 'iphone',
      'extent': 'full-screen',
      'minimum-system-version': '7.0',
      'scale': '2x'
    },
    {
      'orientation': 'portrait',
      'idiom': 'iphone',
      'extent': 'full-screen',
      'minimum-system-version': '7.0',
      'subtype': 'retina4',
      'scale': '2x'
    },
    {
      'orientation': 'portrait',
      'idiom': 'iphone',
      'extent': 'full-screen',
      'scale': '1x'
    },
    {
      'orientation': 'portrait',
      'idiom': 'iphone',
      'extent': 'full-screen',
      'scale': '2x'
    },
    {
      'orientation': 'portrait',
      'idiom': 'iphone',
      'extent': 'full-screen',
      'subtype': 'retina4',
      'scale': '2x'
    }
  ],
  'info': {
    'version': 1,
    'author': 'xcode'
  }
};

const originalIcon = process.argv[2];
const outputDirectory = process.argv[3] + '.appiconset';
child_process.execSync('mkdir ' + outputDirectory);
const images = emptyIconSet.images.map((image) => {
  const dimensions = image.size.split('x');
  const scale = image.scale.slice(0, -1);
  const width = dimensions[0] * scale;
  const height = dimensions[1] * scale;
  const newSize = width + 'x' + height;
  const iconFile = 'icon' + newSize + '.png';
  const command = 'convert ' + originalIcon + ' -adaptive-resize ' + newSize + ' ' + outputDirectory + '/' + iconFile;
  child_process.execSync(command, {encoding: 'UTF-8'});
  return Object.assign({}, image, {filename: iconFile});
});
fs.writeFileSync(outputDirectory + '/Contents.json', JSON.stringify({
  'images': images, 'info': {
    'version': 1,
    'author': 'noddy'
  }
}));

console.log('AppIcon set produced at : ' + outputDirectory);