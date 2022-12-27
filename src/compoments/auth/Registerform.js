import React, { useState } from 'react';
import { Button, message, Steps, Form, Input, Checkbox } from 'antd';
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
      {steps[current].title === 'First' ? <FirstFormRegister next={next} /> : <SecondFormRegister current={current} steps={steps} prev={prev} />}
    </>
  );
};
export default Registerform;