import * as React from "react"
import Svg, { Path, G,Ellipse, Circle } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

 function VerySad(props) {
  const {color}=props;

    return (
      <Svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40">
      <G id="very_sad" transform="translate(-50 -337)" opacity="0.3">
        <G id="Ellipse_34" data-name="Ellipse 34" transform="translate(50 337)" fill="none" stroke={color} stroke-width="3">
          <Circle cx="20" cy="20" r="20" stroke="none"/>
          <Circle cx="20" cy="20" r="18.5" fill="none"/>
        </G>
        <Path id="Path_223" data-name="Path 223" d="M0,1.222a7.963,7.963,0,0,1,7.112-4.1,8.024,8.024,0,0,1,7.138,4.1" transform="translate(63.538 363.566)" fill="none" stroke={color} stroke-linecap="round" stroke-width="3"/>
        <Ellipse id="Ellipse_35" data-name="Ellipse 35" cx="1.467" cy="2.201" rx="1.467" ry="2.201" transform="translate(74.81 348.699) rotate(7)" fill="none" stroke={color} stroke-width="3"/>
        <Ellipse id="Ellipse_36" data-name="Ellipse 36" cx="1.467" cy="2.201" rx="1.467" ry="2.201" transform="translate(65.986 353.068) rotate(173)" fill="none" stroke={color} stroke-width="3"/>
      </G>
    </Svg>
    )
}

 export default VerySad

