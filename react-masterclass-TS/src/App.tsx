import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { hourSelector, minuteState } from "./atoms";

function App() {
  const [minutes, setMinutes] = useRecoilState(minuteState);
  const hours = useRecoilValue(hourSelector);
  const onMinuteChange = (event: React.FormEvent<HTMLInputElement>) => {
    setMinutes(+event.currentTarget.value); // + will get a string and turn it into a number
  };
  return (
    <div>
      <input
        value={minutes}
        onChange={onMinuteChange}
        type="number"
        placeholder="minutes"
      />
      <input value={hours} type="number" placeholder="hours" />
    </div>
  );
}

export default App;
