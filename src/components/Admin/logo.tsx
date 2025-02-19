import React from "react";

type IconProps = {
  containerClass?: string;
  polygonClass?: string;
  frameClass?: string;
};

const CustomSVG: React.FC<IconProps> = ({
  containerClass = "",
  polygonClass = "",
  frameClass = "",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      className={containerClass}
    >
      <g>
        <polygon
          className={polygonClass}
          points="9.571,20.464 17.635,24.934 25.7,20.464 25.7,11.525 17.635,7.056 9.571,11.525"
        />
        <polygon
          className={frameClass}
          points="32,0 0,0 0,32 32,32 26.946,26.828 5.054,26.828 5.054,5.172 26.946,5.172"
        />
      </g>
    </svg>
  );
};

export default CustomSVG;
