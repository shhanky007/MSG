import * as React from "react"
import Svg, { Path, G, Circle } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

export function SvgComponent(props) {
  return (
    <Svg width={24} height={24} {...props}>
      <Path fill="none" d="M-1-1h582v402H-1z" />
      <G>
        <Circle fill="#333" r={2} cy={12} cx={12} />
        <Circle fill="#333" r={2} cy={5} cx={12} />
        <Circle fill="#333" r={2} cy={19} cx={12} />
      </G>
    </Svg>
  )
}

// export default SvgComponent

