import numeral from 'numeral'

export default function () {
  numeral.register('locale', 'pt-br', {
    delimiters: {
      thousands: '.',
      decimal: ','
    },
    abbreviations: {
      thousand: 'mil',
      million: 'milhões',
      billion: 'b',
      trillion: 't'
    },
    ordinal: function (number) {
      return 'º'
    },
    currency: {
      symbol: 'R$'
    }
  })
  numeral.locale('pt-br')
}
