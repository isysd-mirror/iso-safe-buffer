/* eslint-disable node/no-deprecated-api */
'use strict'
//import path from '../iso-path/path.js'
import obuffer from '../iso-buffer/buffer.js'
export var Buffer = obuffer.Buffer
export var SlowBuffer = obuffer.SlowBuffer
export var INSPECT_MAX_BYTES = obuffer.INSPECT_MAX_BYTES
export var kMaxLength = obuffer.kMaxLength
export var kStringMaxLength = obuffer.kStringMaxLength
export var constants = obuffer.constants
export var transcode = obuffer.transcode
export var buffer = obuffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}

export function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  // module.exports = buffer
} else {
  // Copy properties from require('buffer')
  buffer.Buffer = Buffer = SafeBuffer
}

export default buffer

