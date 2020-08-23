import * as React from "react"
import Svg, { Path, G, Circle, Rect,Text,Tspan } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

const Barcode = (props) => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width="404" height="239" viewBox="0 0 404 239">
      <G id="bar-code" transform="translate(0 -86)">
        <G id="Group_3" data-name="Group 3" transform="translate(0 85)">
          <G id="Group_1" data-name="Group 1" transform="translate(0 1)">
            <Rect id="Rectangle_1" data-name="Rectangle 1" width="26.933" height="235.818" />
            <Rect id="Rectangle_2" data-name="Rectangle 2" width="17.956" height="176.358" transform="translate(40.4)" />
            <Rect id="Rectangle_3" data-name="Rectangle 3" width="17.956" height="176.358" transform="translate(89.778)" />
            <Rect id="Rectangle_4" data-name="Rectangle 4" width="26.933" height="176.358" transform="translate(121.2)" />
            <Rect id="Rectangle_5" data-name="Rectangle 5" width="13.467" height="176.358" transform="translate(67.333)" />
            <Rect id="Rectangle_6" data-name="Rectangle 6" width="13.467" height="176.358" transform="translate(157.111)" />
            <Path id="Path_22" data-name="Path 22" d="M361.628,85H333.2V261.358h53.867V85H361.628Z" transform="translate(-113.244 -85)" />
            <Rect id="Rectangle_7" data-name="Rectangle 7" width="22.444" height="176.358" transform="translate(179.556)" />
            <Rect id="Rectangle_8" data-name="Rectangle 8" width="26.933" height="176.358" transform="translate(345.644)" />
            <Path id="Path_23" data-name="Path 23" d="M465.939,85H442V261.358h40.4V85H465.939Z" transform="translate(-150.222 -85)" />
            <Rect id="Rectangle_9" data-name="Rectangle 9" width="22" height="236" transform="translate(382)" />
          </G>
          {/* <Text id="Example" transform="translate(39 228)" font-size="59" font-family="ProximaNova-Semibold, Proxima Nova" font-weight="600" letter-spacing="0.183em">
            <Tspan x="0" y="0">EXAMPLE</Tspan>
            </Text> */}
        </G>
      </G>
    </Svg>


  )
}

export default Barcode

