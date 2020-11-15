import { ChangeEvent, useState } from 'react';

export default function useInput(
  initialValue = ''
): [string, (ev: ChangeEvent<HTMLInputElement>) => void] {
  const [value, setValue] = useState(initialValue);
  return [value, (ev) => setValue(ev.target.value)];
}
