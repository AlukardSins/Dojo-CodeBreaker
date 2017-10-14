class CodeBreaker {
	//randNumber = '1234'
	constructor() {
		let text = ''
		let possible = '0123456789'
		for (let i = 0; i < 4; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length))
		}
		this.randNumber = text
	}
	setSecret(number) {
		this.randNumber = number
	}
	getSecret() {
		return this.randNumber
	}
	tryCode(number) {
		let exp = new RegExp('^\\d{4}$')
		let result = ''
		if (exp.test(number)) {
			if(number===this.randNumber) {
				result = 'xxxx'
			} else { 
				for (var i = 0; i < 4; i++) {
					if (number.charAt(i) === this.randNumber.charAt(i)) {
						result = 'x' + result
					}
					else if (this.randNumber.includes(number.charAt(i))) {
						result += '_'
					}
				}
			}
			return result
		}
		return null
	}
}

module.exports = CodeBreaker