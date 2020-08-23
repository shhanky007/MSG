import * as React from "react"
import Svg, { Path, G, Circle,Line,Ellipse } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

export function Greate(props) {
  const {color}=props;

  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
  <G id="great" transform="translate(-215 -337)" opacity="0.6">
    <Ellipse id="Ellipse_49" data-name="Ellipse 49" cx="1.467" cy="2.201" rx="1.467" ry="2.201" transform="translate(239.81 348.699) rotate(7)" fill="none" stroke={color} stroke-width="3"/>
    <Ellipse id="Ellipse_48" data-name="Ellipse 48" cx="1.467" cy="2.201" rx="1.467" ry="2.201" transform="translate(230.986 353.068) rotate(173)" fill="none" stroke={color} stroke-width="3"/>
    <G id="Ellipse_42" data-name="Ellipse 42" transform="translate(215 337)" fill="none" stroke={color} stroke-width="3">
      <Circle cx="20" cy="20" r="20" stroke="none"/>
      <Circle cx="20" cy="20" r="18.5" fill="none"/>
    </G>
    <Path id="Path_228" data-name="Path 228" d="M0-2.874a7.823,7.823,0,0,0,6.988,4.1A7.882,7.882,0,0,0,14-2.874" transform="translate(228.247 363.566)" fill="none" stroke={color} stroke-linecap="round" stroke-width="3"/>
  </G>
</Svg>


  )
}

export default Greate

