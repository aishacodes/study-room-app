import * as React from 'react';
import { SVGProps } from 'react';
const StarIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill={props.color}
    viewBox="0 0 24 24"
    width="1.5em"
    height="1.5em"
    {...props}
  >
    <path d="M24 12.024C17.562 12.412 12.41 17.563 12.023 24h-.047C11.588 17.563 6.436 12.412 0 12.024v-.047C6.437 11.588 11.588 6.436 11.976 0h.047c.388 6.437 5.54 11.588 11.977 11.976v.047Z" />
  </svg>
);
export default StarIcon;