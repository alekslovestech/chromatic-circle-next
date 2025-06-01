//use the old syntax here for the standalone file
const sharp = require("sharp");
const pngToIco = require("png-to-ico");
const fs = require("fs");
const path = require("path");

const sizes: number[] = [16, 32, 48, 64, 128, 256];
const smallSizes: number[] = [16, 32, 48];
const largeSizes: number[] = [64, 128, 256];

async function generateIcons(): Promise<void> {
  const smallSvgPath: string = path.join(
    __dirname,
    "../src/assets/icons/icon_small.svg"
  );
  const largeSvgPath: string = path.join(
    __dirname,
    "../src/assets/icons/icon.svg"
  );
  const appDir: string = path.join(__dirname, "../src/app");

  // Ensure app directory exists
  if (!fs.existsSync(appDir)) {
    fs.mkdirSync(appDir, { recursive: true });
  }

  // Generate PNG files for each size using appropriate SVG
  const generatePngBuffer = (svgPath: string, size: number) =>
    sharp(svgPath)
      .resize(size, size, {
        fit: "contain",
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .png()
      .toBuffer();

  // Generate all sizes
  const pngBuffers = await Promise.all([
    ...smallSizes.map((size) => generatePngBuffer(smallSvgPath, size)),
    ...largeSizes.map((size) => generatePngBuffer(largeSvgPath, size)),
  ]);

  // Create ICO file with all sizes
  const icoPath = path.join(appDir, "favicon.ico");

  // Convert PNG buffers to ICO
  const icoBuffer = await pngToIco(pngBuffers);

  // Write the ICO file
  await fs.promises.writeFile(icoPath, icoBuffer);

  console.log("✅ Icons generated successfully in src/app/");
}

generateIcons().catch((error: Error) => {
  console.error("Error generating icons:", error);
  process.exit(1);
});
