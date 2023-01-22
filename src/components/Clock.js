import React, { useEffect, useState } from "react";

function Clock({ started, tick }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let interval = null;

    if (started) {
      interval = setInterval(() => {
        setValue(tick());
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [started, tick]);

  return (
    <div className="clock">
      Time: {value}
    </div>
  );
}

export default Clock;
