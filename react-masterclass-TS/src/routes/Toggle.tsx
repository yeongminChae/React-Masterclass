import { useState } from "react";
import Switch from "react-switch";
import "../styles/styles.css";

const Toggle = () => {
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked((current) => !current);
  };

  return (
    <div className="example">
      <label>
        <Switch
          onChange={handleChange}
          checked={checked}
          className="react-switch"
          onColor="#86d3ff"
          onHandleColor="#2693e6"
          handleDiameter={30}
          uncheckedIcon={false}
          checkedIcon={false}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          height={15}
          width={48}
        />
        <p>
          <span className="text">{checked ? "Bright☀️" : "Dark🌙"}</span>
        </p>
      </label>
    </div>
  );
};

export default Toggle;
