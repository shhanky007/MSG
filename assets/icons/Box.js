import * as React from "react"
import Svg, { Path, G, Circle, Line } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: title */

 function Box(props) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width="22" height="16" viewBox="0 0 22 16">
      {/* <defs>
        <style>.a{fill:#2b2b2b;}</style>
        </defs> */}
      <G transform="translate(-0.01 -31.419)">
        <Path class="a" d="M19.21,153.174l-8.2-2.8-8.2,2.8-2.8,4.579,2.578.88V163.5l8.422,2.875,8.422-2.875v-4.867l2.578-.88Zm-2.471.555-5.729,1.955-5.729-1.955,5.729-1.955Zm-14.762,3.3,1.531-2.5,6.517,2.225-1.531,2.5Zm1.9,2.047,5.171,1.765,1.317-2.154v6.073l-6.489-2.215Zm7.778,5.684v-6.073l1.317,2.154,5.171-1.765v3.469Zm1.87-5.506-1.531-2.5,6.517-2.224,1.531,2.5Z" transform="translate(0 -118.956)" fill="#000" />
      </G>
    </Svg>

  )
}

export default Box

