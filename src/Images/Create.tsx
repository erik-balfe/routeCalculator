import React from 'react';

interface Props extends React.SVGProps<SVGSVGElement> {
  children?: React.ReactNode;
}

function MyIcon(props: Props) {
  return (
    <svg {...props} width="117" height="117" viewBox="0 0 117 117" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path id="Union" fillRule="evenodd" clipRule="evenodd" d="M58.5 113.5C88.8757 113.5 113.5 88.8757 113.5 58.5C113.5 28.1243 88.8757 3.5 58.5 3.5C28.1243 3.5 3.5 28.1243 3.5 58.5C3.5 88.8757 28.1243 113.5 58.5 113.5ZM58.5 116.5C90.5325 116.5 116.5 90.5325 116.5 58.5C116.5 26.4675 90.5325 0.5 58.5 0.5C26.4675 0.5 0.5 26.4675 0.5 58.5C0.5 90.5325 26.4675 116.5 58.5 116.5ZM58.5 37C59.3284 37 60 37.6716 60 38.5V57H78.5C79.3284 57 80 57.6716 80 58.5C80 59.3284 79.3284 60 78.5 60H60V78.5C60 79.3284 59.3284 80 58.5 80C57.6716 80 57 79.3284 57 78.5V60H38.5C37.6716 60 37 59.3284 37 58.5C37 57.6716 37.6716 57 38.5 57H57V38.5C57 37.6716 57.6716 37 58.5 37Z" fill="currentcolor" fillOpacity="0.6" />
    </svg>

  );
}

export default MyIcon;
