const { Jimp } = require('jimp');

async function run() {
  const image = await Jimp.read('public/logo.png');
  console.log(`Original dimensions: ${image.bitmap.width}x${image.bitmap.height}`);
  
  // Autocrop transparent pixels
  image.autocrop();
  console.log(`Autocropped dimensions: ${image.bitmap.width}x${image.bitmap.height}`);
  
  // Create a perfect square canvas based on the maximum dimension
  const maxDim = Math.max(image.bitmap.width, image.bitmap.height);
  const squareSize = maxDim + 20; // leaves 10px padding on the longest side
  
  const x = Math.round((squareSize - image.bitmap.width) / 2);
  const y = Math.round((squareSize - image.bitmap.height) / 2);
  
  const padded = new Jimp({
    width: squareSize,
    height: squareSize,
    color: 0x00000000 // transparent
  });
  
  padded.composite(image, x, y);
  
  await padded.write('public/favicon.png');
  console.log(`Centred in a perfect square and saved to public/favicon.png! New dimensions: ${squareSize}x${squareSize} (centered at x=${x}, y=${y})`);
}

run().catch(async (err) => {
  console.error("Failed with primary approach, trying fallback constructor...", err);
  try {
    const JimpClass = require('jimp');
    const image = await JimpClass.read('public/logo.png');
    image.autocrop();
    const maxDim = Math.max(image.bitmap.width, image.bitmap.height);
    const squareSize = maxDim + 20;
    
    const x = Math.round((squareSize - image.bitmap.width) / 2);
    const y = Math.round((squareSize - image.bitmap.height) / 2);
    
    const padded = new JimpClass(squareSize, squareSize, 0x00000000);
    padded.composite(image, x, y);
    await padded.write('public/favicon.png');
    console.log(`Padded and saved to public/favicon.png via fallback!`);
  } catch (fallbackErr) {
    console.error("Fallback also failed:", fallbackErr);
  }
});
