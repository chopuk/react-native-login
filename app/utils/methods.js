export const isValidObjectField = (obj) => {
    return Object.values(obj).every(value => value.trim())
}

export const updateError = (error, stateUpdater) => {
    stateUpdater(error)
    setTimeout(() =>{
        stateUpdater('')
    }, 2500)
}

export const isEmailValid = (value) => {
    const regx = /^[^@]+@[^@]+\.[^@]+$/
    return regx.test(value)
}

export const displayPrice = (price) =>{
    var formattedPrice = price.toFixed(2)
    return "£" + formattedPrice
}

export const truncateString = (string, limit) => {
    if (string.length > limit) {
      return string.substring(0, limit-3) + "..."
    } else {
      return string
    }
  }