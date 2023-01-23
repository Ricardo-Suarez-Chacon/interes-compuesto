import { useState } from 'react';
import {Formik, Form } from 'formik';
import Input from './components/Input';
import Button from './components/Button';
import Container from './components/Container';
import Section from './components/Section';
import Balance from './components/Balance';

const compundInterest = (deposit, contribution, years, rate) => {
  let total = deposit
  for( let i=0; i < years; i++ ){
    total = (total + contribution)*(rate+1)
  }
  return Math.round(total)
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 1,
  maximumFractionDigits: 2,
})

function App() {
  const [balance, setBalance] = useState('')
  const handleSubmit = ({deposit, contribution, years, rate})=>{
    const val = compundInterest(Number(deposit), Number(contribution), Number(years), Number(rate))
    setBalance(formatter.format(val))
  }
  return (
    <Container >
      <Section>
        <Formik
        initialValues={{
          deposit: '',
          contribution: '',
          years: '',
          rate: '',
        }}
        onSubmit={handleSubmit}
        >
          <Form>
            <Input name="deposit" label="Initial Deposit" />
            <Input name="contribution" label="Annual contribution" />
            <Input name="years" label="Years" />
            <Input name="rate" label="Interest rate" />
            <Button>Calculate</Button>
          </Form>
        </Formik>
        {balance !== '' ? <Balance>Final balance : {balance}</Balance>:null}
      </Section>
    </Container>
  );
}

export default App;
