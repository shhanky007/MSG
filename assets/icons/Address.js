import * as React from "react"
import Svg, { Path, G, Circle, Rect,Text,Tspan } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

const Address = (props) => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg"  width="58" height="58" viewBox="0 0 58 58">
  {/* <defs>
    <filter id="Ellipse_9" x="0" y="0" width="58" height="58" filterUnits="userSpaceOnUse">
      <feOffset input="SourceAlpha"/>
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feFlood flood-opacity="0.11"/>
      <feComposite operator="in" in2="blur"/>
      <feComposite in="SourceGraphic"/>
    </filter>
  </defs> */}
  <G id="address" transform="translate(-21 -467)">
    <G transform="matrix(1, 0, 0, 1, 21, 467)" filter="url(#Ellipse_9)">
      <Circle id="Ellipse_9-2" data-name="Ellipse 9" cx="20" cy="20" r="20" transform="translate(9 9)" fill="#fff"/>
    </G>
    <G id="pin" transform="translate(-19.043 486)">
      <Path id="Union_2" data-name="Union 2" d="M7.617,20,1.523,12.188A7.548,7.548,0,0,1,0,7.617,7.626,7.626,0,0,1,3.105,1.488,7.47,7.47,0,0,1,7.617,0a8.223,8.223,0,0,1,2.414.375A7.414,7.414,0,0,1,14.859,5.2a8.112,8.112,0,0,1,.372,2.4,7.6,7.6,0,0,1-1.52,4.58ZM3.516,7.617a4.1,4.1,0,1,0,4.1-4.1A4.106,4.106,0,0,0,3.516,7.617Z" transform="translate(61.043 0)" fill="#f7941d"/>
    </G>
  </G>
</Svg>

  )
}

export default Address

