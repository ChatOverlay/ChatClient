import React from 'react'
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import "./TopBar.css"
export default function TopBar({closeOption ,setCloseOption , CurrentTitle}) {
  return (
    <div className="top__bar">
    <div
      className="icon__container"
      onClick={() => setCloseOption(!closeOption)}
    >
      {closeOption ? (
        <KeyboardDoubleArrowRightIcon />
      ) : (
        <KeyboardDoubleArrowLeftIcon />
      )}
    </div>
    <div className="number__container">{CurrentTitle}</div>
  </div>
  )
}
