import { useState } from 'react';

import Toggle from './Toggle';

export default function ImageColorInput(props) { 
  const [type, setType] = useState('image');

  function switchTypes() {
    if (type === 'color') {
      setType('image');
    }
    else {
      setType('color');
    }
  }

  return (
    <div className='w-2/3 py-2 pl-4 mx-auto'>
      <Toggle name={props.name}>
        <div className='flex flex-row items-center justify-start gap-8'>
          <div className='flex flex-row items-center justify-start gap-2'>
            <label htmlFor={`${props.name}-color`}>Color {props.name}</label>
            <input type="checkbox" checked={type === 'color'} name={`${props.name}-color`} onChange={switchTypes} />
          </div>
          
          <div className='flex flex-row items-center justify-center gap-2'>
            <label htmlFor={`${props.name}-image`}>Image {props.name}</label>
            <input type="checkbox" checked={type === 'image'} name={`${props.name}-image`} onChange={switchTypes} />
          </div>
        </div>

        <div className='flex flex-row items-center justify-center gap-6 mt-4'>
          {
            type === 'image' ? 
            <>
              <input type="file" name={props.imageName} ref={props.refImage} accept='image/png'/>
            </> : 
            <>
              <span>Choose color</span>
              <input type="color" name={props.colorName} ref={props.refColor} />
            </>
          }
        </div>
      </Toggle>   
    </div>
  );
}