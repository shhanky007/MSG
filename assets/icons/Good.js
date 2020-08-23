import * as React from "react"
import Svg, { Path, G, Circle,Line,Ellipse } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

export function Good(props) {
  const {color}=props;

  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
    <G id="good" transform="translate(-160 -337)" opacity="0.5">
      <G id="Ellipse_38" data-name="Ellipse 38" transform="translate(160 337)" fill="none" stroke={color} stroke-width="3">
        <Circle cx="20" cy="20" r="20" stroke="none"/>
        <Circle cx="20" cy="20" r="18.5" fill="none"/>
      </G>
      <Path id="Path_227" data-name="Path 227" d="M0,0H14.25" transform="translate(173.587 364.788)" fill="none" stroke={color} stroke-linecap="round" stroke-width="3"/>
      <G id="Ellipse_40" data-name="Ellipse 40" transform="translate(171.525 349.578)" fill="none" stroke={color} stroke-width="3">
        <Circle cx="2.923" cy="2.923" r="2.923" stroke="none"/>
        <Circle cx="2.923" cy="2.923" r="1.423" fill="none"/>
      </G>
      <G id="Ellipse_41" data-name="Ellipse 41" transform="translate(183.35 349.578)" fill="none" stroke={color} stroke-width="3">
        <Circle cx="2.923" cy="2.923" r="2.923" stroke="none"/>
        <Circle cx="2.923" cy="2.923" r="1.423" fill="none"/>
      </G>
    </G>
  </Svg>
  

  )
}

export default Good

