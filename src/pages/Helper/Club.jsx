import React, { useState } from "react";
import TopBar from "../../components/topbar/TopBar";
import { AppContainer } from "../styles";
import useMobileNavigate from "../../hooks/useMobileNavigate";

export default function Club() {
  const [closeOption, setCloseOption] = useState(false);
  useMobileNavigate(closeOption, "/home");
  
  return (
    <>
      <AppContainer show={closeOption}>
        <TopBar
          closeOption={closeOption}
          setCloseOption={setCloseOption}
          titleName="교내 동아리"
        />
        ss
      </AppContainer>
    </>
  );
}

