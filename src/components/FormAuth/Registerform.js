import { Steps } from 'antd';
import React, { useState } from 'react';
import FirstFormRegister from './FirstFormRegister';
import SecondFormRegister from './SecondFormRegister';


const steps = [
  {
    title: 'First',
    content: 'First-content',
  },
  {
    title: 'Second',
    content: 'Second-content',
  },
];
const Registerform = () => {
  const [current, setCurrent] = useState(0);
  const [dataFirstForm, setDataFirstForm] = useState([])

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  return (
    <>
      <Steps style={{ margin: "20px 0" }} current={current} items={items} />
      {steps[current].title === 'First' ? <FirstFormRegister next={next} setDataFirstForm={setDataFirstForm} /> : <SecondFormRegister current={current} steps={steps} prev={prev} dataFirstForm={dataFirstForm}/>}
    </>
  );
};
export default Registerform;