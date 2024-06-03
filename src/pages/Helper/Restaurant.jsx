import React, { useState } from "react";
import TopBar from "../../components/topbar/TopBar";
import { AppContainer } from "../styles";
import useMobileNavigate from "../../hooks/useMobileNavigate";

export default function Restaurant() {
  const [closeOption, setCloseOption] = useState(false);
  useMobileNavigate(closeOption, "/home");
  
  return (
    <>
      <AppContainer show={closeOption}>
        <TopBar
          closeOption={closeOption}
          setCloseOption={setCloseOption}
          titleName="오늘 뭐 먹지?"
        />
        ss
      </AppContainer>
    </>
  );
}

