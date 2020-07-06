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
  const absNumeral = numerals[Math.abs(num)]
  let arrayOfMagnitudes = formArrayOfMagnitudes(num)

  //negative?
  if (num < 0) {
    output += "负"
  }

  //standard defined numeral
  if (absNumeral != undefined) {
    output += absNumeral
  }

  //10 - 19?
  if (absNumeral == undefined) {
    arrayOfMagnitudes.forEach(i => {
      output += numerals[i]
    })
  }

  return output
}

function formArrayOfMagnitudes(num) {
  let arr = []
  let sNumber = num.toString()

  for (let i = 0, len = sNumber.length; i < len; i++) {
    const currentDigit = sNumber.charAt(i)
    const currentMagnitude = 10 ** (len - 1 - i)
    arr.push(currentDigit * currentMagnitude)
  }

  return arr
}

// inputs => outputs

describe("Chinese Numerals:", function() {
  it("Single integers", function() {
    expect(toChineseNumeral(9)).toEqual("九")
    expect(toChineseNumeral(1)).toEqual("一")
    // expect(toChineseNumeral(21)).toEqual("二十一")
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
