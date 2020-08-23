import * as React from "react"
import Svg, { Path, G, Circle, Line } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

function Excellant(props) {
  const {color}=props;
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
    <G id="excellant" transform="translate(-270 -337)">
      <G id="Ellipse_45" data-name="Ellipse 45" transform="translate(270 337)" fill="none" stroke={color} stroke-width="3">
        <Circle cx="20" cy="20" r="20" stroke="none"/>
        <Circle cx="20" cy="20" r="18.5" fill="none"/>
      </G>
      <Path id="Path_229" data-name="Path 229" d="M18-2.874s-.313,7.909-9.016,8A8.364,8.364,0,0,1,0-2.874Z" transform="translate(281.5 363.07)" fill="none" stroke={color} stroke-linecap="round" stroke-width="3"/>
      <G id="Group_166" data-name="Group 166" transform="translate(-1)">
        <G id="Ellipse_47" data-name="Ellipse 47" transform="translate(280 348)" fill="none" stroke={color} stroke-width="4">
          <Circle cx="3.5" cy="3.5" r="3.5" stroke="none"/>
          <Circle cx="3.5" cy="3.5" r="1.5" fill="none"/>
        </G>
        <G id="Ellipse_46" data-name="Ellipse 46" transform="translate(295 348)" fill="none" stroke={color} stroke-width="4">
          <Circle cx="3.5" cy="3.5" r="3.5" stroke="none"/>
          <Circle cx="3.5" cy="3.5" r="1.5" fill="none"/>
        </G>
      </G>
    </G>
  </Svg>
  

  )
}

export default Excellant

