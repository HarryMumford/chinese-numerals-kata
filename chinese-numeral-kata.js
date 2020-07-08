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
  const numString = num.toString()

  const intString = Math.abs(numString.split(".")[0]).toString()
  const int = Math.abs(Number(intString))

  const decimalString = numString.split(".")[1]
  const decimal = Number(decimalString)

  const arrayOfMagnitudes = formArrayOfMagnitudes(int)

  // Negative?
  if (num < 0) {
    output += numerals["-"]
  }

  // 0 - 10?
  if (int < 11) {
    output += numerals[int]
  }

  // 10 - 19?
  if (int > 10 && int < 20) {
    for (let i = 0; i < arrayOfMagnitudes.length; i++) {
      const currentDigit = intString[i]
      const currentMagnitude = arrayOfMagnitudes[i]
      const currentNumeral = numerals[currentMagnitude * currentDigit]

      output += currentNumeral
    }
  }

  // Multi digit numbers
  if (int > 19) {
    for (let i = 0; i < arrayOfMagnitudes.length - 1; i++) {
      const currentDigit = Number(intString[i])
      const currentMagnitude = arrayOfMagnitudes[i]
      const currentNumeral = numerals[currentDigit] + numerals[currentMagnitude]

      if (currentDigit === 0) {
        output += numerals[0]
      } else {
        output += currentNumeral
      }
    }

    const lastDigit = Number(intString[intString.length - 1])
    const lastNumeral = numerals[lastDigit]

    if (lastDigit !== 0) {
      output += lastNumeral
    }

    // Shorten inner zeros
    output = output.replace(/零+/g, "零")

    // Remove trailing zeros
    output = output.replace(/零+$/g, "")
  }

  // Add decimal
  if (decimal) {
    output += numerals["."]
    for (let i = 0; i < decimalString.length; i++) {
      const currentDigit = Number(decimalString[i])
      const currentNumeral = numerals[currentDigit]

      output += currentNumeral
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

describe("chinese-numerals", function() {
  describe("/ integers", function() {
    it("/ defined", function() {
      expect(toChineseNumeral(9)).toEqual("九")
      expect(toChineseNumeral(1)).toEqual("一")
    })
    it("/ multi-digit", function() {
      expect(toChineseNumeral(21)).toEqual("二十一")
      expect(toChineseNumeral(956)).toEqual("九百五十六")
    })
    it("/ trailing-zero", function() {
      expect(toChineseNumeral(110)).toEqual("一百一十")
      expect(toChineseNumeral(20)).toEqual("二十")
      expect(toChineseNumeral(2000)).toEqual("二千")
    })
    it("/ inner-zeros", function() {
      expect(toChineseNumeral(2002)).toEqual("二千零二")
    })
    it("/ 11-19", function() {
      expect(toChineseNumeral(11)).toEqual("十一")
      expect(toChineseNumeral(15)).toEqual("十五")
    })
    it("/ negative", function() {
      expect(toChineseNumeral(-5)).toEqual("负五")
      expect(toChineseNumeral(-21)).toEqual("负二十一")
    })
  })
  it("/ fractional-numbers", function() {
    expect(toChineseNumeral(0.5)).toEqual("零点五")
  })
  it("/ special-cases", function() {
    expect(toChineseNumeral(10)).toEqual("十")
    expect(toChineseNumeral(110)).toEqual("一百一十")
    expect(toChineseNumeral(111)).toEqual("一百一十一")
    expect(toChineseNumeral(1000)).toEqual("一千")
    expect(toChineseNumeral(10000)).toEqual("一万")
    expect(toChineseNumeral(10006)).toEqual("一万零六")
    expect(toChineseNumeral(10306.005)).toEqual("一万零三百零六点零零五")
  })
})
