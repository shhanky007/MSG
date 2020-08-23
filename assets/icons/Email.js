import * as React from "react"
import Svg, { Path, G, Circle, Line } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

function Email(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg"  width="58" height="58" viewBox="0 0 58 58">
    {/* <defs>
      <filter id="Ellipse_8" x="0" y="0" width="58" height="58" filterUnits="userSpaceOnUse">
        <feOffset input="SourceAlpha"/>
        <feGaussianBlur stdDeviation="3" result="blur"/>
        <feFlood flood-opacity="0.11"/>
        <feComposite operator="in" in2="blur"/>
        <feComposite in="SourceGraphic"/>
      </filter>
    </defs> */}
    <G id="email" transform="translate(-21 -396)">
      <G transform="matrix(1, 0, 0, 1, 21, 396)" filter="url(#Ellipse_8)">
        <Circle id="Ellipse_8-2" data-name="Ellipse 8" cx="20" cy="20" r="20" transform="translate(9 9)" fill="#fff"/>
      </G>
      <Path id="Icon_material-email" data-name="Icon material-email" d="M21.543,6H5.06A2.058,2.058,0,0,0,3.01,8.06L3,20.422a2.066,2.066,0,0,0,2.06,2.06H21.543a2.066,2.066,0,0,0,2.06-2.06V8.06A2.066,2.066,0,0,0,21.543,6Zm0,4.121L13.3,15.271,5.06,10.121V8.06L13.3,13.211,21.543,8.06Z" transform="translate(37 411)" fill="#f04c62"/>
    </G>
  </Svg>
  

  )
}

export default Email

