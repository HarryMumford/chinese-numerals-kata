function toChineseNumeral(num) {
  var numerals = {
    "-": "负",
    ".": "点",
    0: "零",
    1: "一",
    2: "二",
    3: "三",
    4: "四",
    5: "五",
    6: "六",
    7: "七",
    8: "八",
    9: "九",
    10: "十",
    100: "百",
    1000: "千",
    10000: "万"
  }

  let output = ""
  const absNum = Math.abs(num)
  const absNumeral = numerals[absNum]
  const numString = num.toString()
  const arrayOfMagnitudes = formArrayOfMagnitudes(num)

  //negative?
  if (num < 0) {
    output += "负"
  }

  //standard defined numeral
  if (absNumeral != undefined) {
    return (output += absNumeral)
  }

  //10 - 19?
  if (absNum > 10 && absNum < 20) {
    for (let i = 0; i < arrayOfMagnitudes.length; i++) {
      const currentDigit = numString[i]
      const currentMagnitude = arrayOfMagnitudes[i]
      const currentNumeral = numerals[currentMagnitude * currentDigit]
      output += currentNumeral
    }
  }

  //Multi digit numbers
  if (absNum > 19) {
    for (let i = 0; i < arrayOfMagnitudes.length; i++) {
      const currentDigit = numString[i]
      const currentMagnitude = arrayOfMagnitudes[i]
      if (currentMagnitude != 1) {
        const currentNumeral =
          numerals[currentDigit] + numerals[currentMagnitude]
        output += currentNumeral
      } else {
        output += numerals[currentDigit]
      }
    }
  }

  return output
}

function formArrayOfMagnitudes(num) {
  let arr = []
  let numLength = num.toString().length

  for (let i = 0; i < numLength; i++) {
    const currentMagnitude = 10 ** (numLength - 1 - i)
    arr.push(currentMagnitude)
  }

  return arr
}

// inputs => outputs

describe("Chinese Numerals:", function() {
  it("Single integers", function() {
    expect(toChineseNumeral(9)).toEqual("九")
    expect(toChineseNumeral(1)).toEqual("一")
    expect(toChineseNumeral(21)).toEqual("二十一")
  })
  it("11 - 19", function() {
    expect(toChineseNumeral(11)).toEqual("十一")
    expect(toChineseNumeral(15)).toEqual("十五")
  })
  it("Negative numbers", function() {
    expect(toChineseNumeral(-5)).toEqual("负五")
  })
  // it("Fractional numbers", function() {
  //   expect(toChineseNumeral(0.5)).toEqual("零点五")
  // })
  // it("Special Cases", function() {
  //   expect(toChineseNumeral(10)).toEqual("十")
  //   expect(toChineseNumeral(110)).toEqual("一百一十")
  //   expect(toChineseNumeral(111)).toEqual("一百一十一")
  //   expect(toChineseNumeral(1000)).toEqual("一千")
  //   expect(toChineseNumeral(10000)).toEqual("一万")
  //   expect(toChineseNumeral(10006)).toEqual("一万零六")
  //   expect(toChineseNumeral(10306.005)).toEqual("一万零三百零六点零零五")
  // })
})
