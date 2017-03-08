// const sha3 = require('js-sha3').sha3_256
const sha3 = require('js-sha3').keccak_256
const uts46 = require('idna-uts46')
// const SHA3 = require('crypto-js/sha3')

module.exports = function namehash (inputName) {

  let node = new Buffer('0000000000000000000000000000000000000000000000000000000000000000', 'hex')
  if(inputName && inputName !== '') {
    let name = normalize(inputName)
    var labels = name.split('.')
    for(var i = labels.length - 1; i >= 0; i--) {
      const combined = new Buffer([node, sha3(labels[i])])
      node = sha3(combined)
    }
  }
  return '0x' + node.toString('hex')


  console.log('called with ' + inputName)

  // Reject empty names:
  if (!inputName || inputName === '') {
    let result = ''
    for (let i = 0; i < 32; i++) {
      result += '00'
    }
    return result
  }

  name = normalize(inputName)
  const split = name.split('.')

  const label = split.shift()
  const remainder = split.join('.')

  console.log('finishing with ', typeof sha3(label))

  console.log(sha3(label))

  return sha3(namehash(remainder) + sha3(label))
}

/*
function sha3 (input) {
  return SHA3(input, { outputLength: 256 })
}
*/

function normalize(name) {
  return uts46.toUnicode(name, {useStd3ASCII: true, transitional: false})
}
