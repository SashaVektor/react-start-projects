import React, { useEffect, useRef, useState } from 'react';
import { Block } from './Block';
import './index.scss';

const currencyRateLink = 'https://cdn.cur.su/api/latest.json';
function App() {
  const [fromCurrency, setFromCurrency] = useState('UAH');
  const [fromPrice, setFromPrice] = useState(0);
  const [toPrice, setToPrice] = useState(1);
  const [toCurrency, setToCurrency] = useState('USD');

  // const [rates, setRates] = useState({});

  const ratesRef = useRef({});


  useEffect(() => {
    fetch(currencyRateLink)
    .then(res => res.json())
    .then(json => {
      ratesRef.current = json.rates;
      onChangeToPrice(1);
    })
    .catch(() => {
      alert('Getting error')
    })
  }, []) 

  const onChangeFromPrice = (value) => {
    const price = value / ratesRef.current[fromCurrency];
    const result = price * ratesRef.current[toCurrency];
    setFromPrice(value);
    setToPrice(result.toFixed(3));
  }

  const onChangeToPrice = (value) => {
    const result = (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value;
    setFromPrice(result.toFixed(3))
    setToPrice(value);
  }

  useEffect(() => {
    onChangeFromPrice(fromPrice);
  },[fromCurrency])

  useEffect(() => {
    onChangeToPrice(toPrice);
  },[toCurrency])
 

  return (
    <div className="App">
      <Block value={fromPrice} currency={fromCurrency} 
      onChangeCurrency={setFromCurrency} onChangeValue={onChangeFromPrice}/>
      <Block value={toPrice} currency={toCurrency} 
      onChangeCurrency={setToCurrency} onChangeValue={onChangeToPrice}/>
    </div>
  );
}

export default App;
