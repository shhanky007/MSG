import * as React from "react"
import Svg, { Path, G, Circle,Line } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

export function Hamburger(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 21 17">
      <G id="hamburger" transform="translate(-19 -43)">
        <Line id="Line_1" data-name="Line 1" x2="18" transform="translate(20.5 44.5)" fill="none" stroke="#000" stroke-linecap="round" stroke-width="3" />
        <Line id="Line_1-2" data-name="Line 1" x2="18" transform="translate(20.5 51.5)" fill="none" stroke="#000" stroke-linecap="round" stroke-width="3" />
        <Path id="Path_50" data-name="Path 50" d="M0,0H9" transform="translate(20.5 58.5)" fill="none" stroke="#000" stroke-linecap="round" stroke-width="3" />
      </G>
    </Svg>

  )
}

export default Hamburger

