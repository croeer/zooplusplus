import React from 'react'; // we need this to make JSX compile

type TotalSaldoProps = {
  total: number
}

const TotalSaldo = ({ total }: TotalSaldoProps) => <div>
  <p text-align='left!'>{ total.toLocaleString('de-de', { 
		style: 'currency', 
		currency: 'EUR' 
	})
   }</p>
</div>

export default TotalSaldo;
