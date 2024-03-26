import React, { useState } from "react";
import TopBar from "../../components/topbar/TopBar";

export default function QuestionAdd() {
  
  const [closeOption, setCloseOption] = useState(false);
  return (
    <div>
      <TopBar
        closeOption={closeOption}
        setCloseOption={setCloseOption}
        CurrentTitle={1}
      />
    </div>
  );
}
