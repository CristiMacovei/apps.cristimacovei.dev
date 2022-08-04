import {useRef} from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

import Toggle from '../components/theme-maker/Toggle';
import ImageColorInput from '../components/theme-maker/ImageColorInput';
import ColorInput from '../components/theme-maker/ImageColorInput';
import ImageInput from '../components/theme-maker/ImageInput';

export default function ThemeMaker() {
  const refImageNTPBackground = useRef();
  const refImageFrame = useRef();
  const refImageFrameInactive = useRef();
  const refImageFrameIncognito = useRef();
  const refImageFrameIncognitoInactive = useRef();
  const refImageToolbar = useRef();
  const refImageButtonBackground = useRef();

  const refImageTabBackgroundV = useRef();
  const refImageFrameOverlay = useRef();
  const refImageFrameOverlayInactive = useRef();
  const refImageNTPAttribution = useRef();
  const refImageWindowControlBackend = useRef();

  function hexToRGB(hex) {
    hex = hex.substring(1);
    
    const rgb = parseInt(hex, 16);

    const red = (rgb >> 16) & 0xFF;
    const green = (rgb >> 8) & 0xFF;
    const blue = rgb & 0xFF;

    return [red, green, blue];
  }
    
  
  function handleSubmit(evt) {
    evt.preventDefault();

    const fData = new FormData(evt.target);

    const data = {
      name: fData.get('name'),
      description: fData.get('description'),
    };

    let manifest = {
      manifest_version: 3,
      name: data.name,
      description: data.description,
      version: '1.0.0',
      author: 'Cristi Macovei - auto generated',
      theme: {
        images: {},
        colors: {}
      }
    };

    const zip = new JSZip();

    const imageFolder = zip.folder('images');

    // save images
    const imageInputs = [
      [refImageNTPBackground, 'ntp_background'],
      [refImageFrame, 'frame'],
      [refImageFrameInactive, 'frame_inactive'],
      [refImageFrameIncognito, 'frame_incognito'],
      [refImageFrameIncognitoInactive, 'frame_incognito_inactive'],
      [refImageToolbar, 'toolbar'],
      [refImageButtonBackground, 'button_background'],
      [refImageTabBackgroundV, 'tab_background_v'],
      [refImageFrameOverlay, 'frame_overlay'],
      [refImageFrameOverlayInactive, 'frame_overlay_inactive'],
      [refImageNTPAttribution, 'ntp_attribution'],
      [refImageWindowControlBackend, 'window_control_backend']
    ];

    for (let [ref, name] of imageInputs) {
      if (ref?.current?.files?.[0]) {
        imageFolder.file(`${name}.png`, ref.current.files[0]);
  
        manifest.theme.images[`theme_${name}`] = `images/${name}.png`;
      }
    }

    // save colors
    const colors = [
      'ntp_background',
      'frame',
      'frame_inactive',
      'frame_incognito',
      'frame_incognito_inactive',
      'toolbar',
      'button_background',
      'tab_text',
      'tab_background_text',
      'bookmark_text',
      'ntp_text',
      'ntp_link',
      'ntp_header'
    ];

    for (let color of colors) {
      const colorData = fData.get(color);

      if (colorData) {
        manifest.theme.colors[color] = hexToRGB(colorData);
      }
    }

    // console.log(fData.get('ntp_background'));
    // console.log(manifest);

    zip.file('manifest.json', JSON.stringify(manifest));

    zip.generateAsync({type: 'blob'})
    .then(file => {
      saveAs(file, `theme-${manifest.name}.zip`)
    })
  }

  return (
    <div className='block w-screen h-screen'>
      <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center gap-4 mt-10'>
        <input className='w-2/3 p-3 bg-gray-200 rounded-md text-md' type="text" name="name" placeholder='Title ( < 45 characters )'/>

        <textarea className='w-2/3 p-3 bg-gray-200 rounded-md text-md' name="description" placeholder='Description ( < 128 characters )'></textarea>

        {/* images and colors */}
        <div className='w-full'>
          <Toggle name='image or color' className='w-2/3 p-3 mx-auto'>
            <div className='p-6'>
              <ImageColorInput 
                name='New Tab Background'
                colorName='ntp_background'
                imageName='theme_ntp_background'
                refImage={refImageNTPBackground}
              />

              <ImageColorInput
                name='Frame'
                colorName='frame'
                imageName='theme_frame'
                refImage={refImageFrame}
              />

              <ImageColorInput
                name='Frame Inactive'
                colorName='frame_inactive'
                imageName='theme_frame_inactive'
                refImage={refImageFrameInactive}
              />

              <ImageColorInput
                name='Frame Incognito'
                colorName='frame_incognito'
                imageName='theme_frame_incognito'
                refImage={refImageFrameIncognito}
              />
              
              <ImageColorInput
                name='Frame Incognito Inactive'
                colorName='frame_incognito_inactive'
                imageName='theme_frame_incognito_inactive'
                refImage={refImageFrameIncognitoInactive}
              />

              <ImageColorInput
                name='Toolbar'
                colorName='toolbar'
                imageName='theme_toolbar'
                refImage={refImageToolbar}
              />

              <ImageColorInput
                name='Button Background'
                colorName='button_background'
                imageName='theme_button_background'
                refImage={refImageButtonBackground}
              />
            </div>
          </Toggle>
        </div>

        {/* colors */}
        <div className='w-full'>
          <Toggle name='colors' className='w-2/3 p-3 mx-auto'>
            <div className='p-6'>
              <ColorInput name='Tab text' colorName='tab_text' />

              <ColorInput name='Tab background text' colorName='tab_background_text' />

              <ColorInput name='Bookmark text' colorName='bookmark_text' />

              <ColorInput name='New tab text' colorName='ntp_text' />

              <ColorInput name='New tab link' colorName='ntp_link' />

              <ColorInput name='New tab header' colorName='ntp_header' />
            </div>
          </Toggle>
        </div>

        {/* images */}
        <div className='w-full'>
          <Toggle name='images' className='w-2/3 p-3 mx-auto'>
            <div className='p-6'>
              <ImageInput name='Tab background v' imageName='theme_tab_background_v' refImage={refImageTabBackgroundV}/>

              <ImageInput name='Frame overlay' imageName='theme_frame_overlay' refImage={refImageFrameOverlay}/>

              <ImageInput name='Frame overlay inactive' imageName='theme_frame_overlay_inactive' refImage={refImageFrameOverlayInactive} />

              <ImageInput name='New tab attribution' imageName='theme_ntp_attribution' refImage={refImageNTPAttribution}/>

              <ImageInput name='Window control background' imageName='theme_window_control_backend' refImage={refImageWindowControlBackend}/>
            </div>
          </Toggle>
        </div>

        {/* upload */}
        <input className='block p-4 text-white bg-blue-500 rounded-md outline-none cursor-pointer'type="submit" value="Pack theme" />
      </form>
    </div>
  );
}