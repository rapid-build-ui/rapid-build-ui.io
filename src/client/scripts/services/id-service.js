angular.module('rapid-build').service('idService', ['$log',
	function($log) {
		/* Private Props
		 ****************/
		const DIV = '__'; // uid divider
		var uid   = ['0', '0', '0', '0'];

		/* Public Methods
		 *****************/
		this.next = () => { // :string
			var digit, index;
			index = uid.length;
			while (index) {
				index--;
				digit = uid[index].charCodeAt(0);
				if (digit === 57) {
					uid[index] = 'A';
					return uid.join('');
				}
				if (digit !== 90) {
					uid[index] = String.fromCharCode(digit + 1);
					return uid.join('');
				}
				uid[index] = '0';
			}
			uid.unshift('0');
			return uid.join('');
		};

		this.getElmId = (id) => { // :string (recursive function)
			var _uid     = this.next(),
				newId    = id ? `${_uid}${DIV}${id}` : _uid,
				isUnique = !document.getElementById(newId);

			if (isUnique) return newId;
			return this.getElmId(id);
		}
	}
]);
