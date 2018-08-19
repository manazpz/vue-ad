
export function toThousands(num) {
  num = num + ''
  if (!num.includes('.')) {
    num += '.'
  }
  return num.replace(/(\d)(?=(\d{3})+\.)/g, function($0, $1) {
    return $1 + ','
  }).replace(/\.$/, '')
}

export function commafyback(num) {
  var x = num.split(',')
  return parseFloat(x.join(''))
}

export function keyToValue(data) {
  return data.reduce((acc, cur) => {
    acc[cur.keyWord] = cur.name
    return acc
  }, {})
}

export const checkPhone = (rule, value, callback) => {
  const phoneReg = /^1[3|4|5|7|8][0-9]\d{8}$/
  if (!rule.required) {
    if (!value) {
      return callback()
    }
  }
  if (!value) {
    return callback(new Error('手机号不为空!'))
  }
  if (!Number.isInteger(+value)) {
    return callback(new Error('请输入数字值!'))
  } else {
    if (phoneReg.test(value)) {
      return callback()
    } else {
      return callback(new Error('手机号格式不正确'))
    }
  }
}

export const checkEmail = (rule, value, callback) => {
  const phoneReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
  if (!rule.required) {
    if (!value) {
      return callback()
    }
  }
  if (!value) {
    return callback(new Error('邮箱不为空!'))
  }
  if (phoneReg.test(value)) {
    return callback()
  } else {
    return callback(new Error('邮箱格式不正确'))
  }
}

export const checkIdCard = (rule, value, callback) => {
  const phoneReg = /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/
  if (!rule.required) {
    if (!value) {
      return callback()
    }
  }
  if (!value) {
    return callback(new Error('身份证不为空!'))
  }
  if (phoneReg.test(value)) {
    return callback()
  } else {
    return callback(new Error('身份证不正确'))
  }
}

export const checkBankNo = (rule, value, callback) => {
  if (!rule.required) {
    if (!value) {
      return callback()
    }
  }
  if (!value) {
    return callback(new Error('银行账号不为空!'))
  }
  if (!Number.isInteger(+value)) {
    return callback(new Error('请输入数字值!'))
  } else {
    return callback()
  }
}

export const checkNo = (rule, value, callback) => {
  if (!rule.required) {
    if (!value) {
      return callback()
    }
  }
  if (!value) {
    return callback(new Error('数值不为空!'))
  }
  if (!Number.isInteger(+value)) {
    return callback(new Error('请输入数字值!'))
  } else {
    return callback()
  }
}
