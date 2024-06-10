import React, { useMemo } from 'react';

type ExpensiveComponentProps = {
  a: number;
  b: number;
};

const UseMemo: React.FC<ExpensiveComponentProps> = ({ a, b }) => {
  const computeExpensiveValue = (a: number, b: number): number => {
    console.log('Computing expensive value...');
    // Simulate an expensive computation
    return a + b;
  };

  const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);

  return (
    <div>
      <p>Computed Value: {memoizedValue}</p>
    </div>
  );
};

export default UseMemo;
