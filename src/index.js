const QRCode = require('qrcode')
const dayjs = require('dayjs')
const canvas = document.getElementById('canvas')
const sanitizeFilename = require('sanitize-filename')
const generateButton = document.getElementById('generate')
const downloadButton = document.getElementById('download')

const textInput = document.getElementById('text')
const errorCorrectionSelect = document.getElementById('errorCorrection')
const maskPatternSelect = document.getElementById('maskPattern')

const marginInput = document.getElementById('margin')
const scaleInput = document.getElementById('scale')
const fgColorInput = document.getElementById('fgColor')
const bgColorInput = document.getElementById('bgColor')


generateButton.addEventListener('click', function() {

  const text = textInput.value
  const errorCorrection = errorCorrectionSelect.value
  let maskPattern = parseInt(maskPatternSelect.value, 10)
  maskPattern = isNaN(maskPattern) ? undefined : maskPattern

  const margin = parseInt(marginInput.value, 10)
  const scale = parseInt(scaleInput.value, 10)
  const fgColor = fgColorInput.value
  const bgColor = bgColorInput.value

  QRCode.toCanvas(canvas, text, {
    errorCorrectionLevel: errorCorrection,
    maskPattern: maskPattern,
    margin: margin,
    scale: scale,
    color: {
      dark: fgColor,
      light: bgColor
    }
  },
  function (error) {
    if (error) console.error(error)
    downloadButton.disabled = false
  })

})

downloadButton.addEventListener('click', function() {
  const filename = sanitizeFilename("qrcode-" + textInput.value + dayjs().format("-YYYY-MM-DD-HH-mm-ss") + ".png");
  const a = document.createElement("a");
  a.href = canvas.toDataURL("image/png");
  a.download = filename;
  a.click();
})
