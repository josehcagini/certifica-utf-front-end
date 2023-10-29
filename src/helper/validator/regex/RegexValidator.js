
const RegexValidator = {
    type: {
        number : {
            interval: {
                oneToNinetyNine : {
                    min: 1,
                    max: 99,
                    pattern: /\b[1-9]{1,2}\b/,
                }
            }
        }
    }
}

export default RegexValidator;