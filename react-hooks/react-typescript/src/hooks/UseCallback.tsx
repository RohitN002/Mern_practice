import React, { useState, useCallback } from 'react';

interface ButtonProps {
  onClick: () => void;
  label: string;
}

const Button: React.FC<ButtonProps> = React.memo(({ onClick, label }) => {
  console.log(`Rendering button: ${label}`);
  return <button onClick={onClick}>{label}</button>;
});

const UseCallBack: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [multiplier, setMultiplier] = useState<number>(1);

  const increment = useCallback((): void => {
    setCount((prevCount) => prevCount + multiplier);
  }, [multiplier]);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setMultiplier(multiplier + 1)}>Increase Multiplier</button>
      <Button onClick={increment} label="Increment" />
    </div>
  );
};

export default UseCallBack;
