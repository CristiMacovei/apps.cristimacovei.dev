import React, {useRef, useState} from 'react'

const PopupSettings = (props) => {
  const widthError = useRef()
  const widthInput = useRef()

  const heightError = useRef()
  const heightInput = useRef()

  const [isPopupEnabled, setIsPopupEnabled] = useState(false)

  const togglePopup = () => {
    setIsPopupEnabled(!isPopupEnabled)
  }

  const verifyWidth = (evt) => {
    const value = evt.target.value

    if (value <= 600) {
      widthError.current.classList.add('hidden')
      widthInput.current.classList.remove('border-2')
    }
    else {
      widthError.current.classList.remove('hidden')
      widthInput.current.classList.add('border-2')
    }
  }

  const verifyHeight = (evt) => {
    const value = evt.target.value

    if (value <= 600) {
      heightError.current.classList.add('hidden')
      heightInput.current.classList.remove('border-2')
    }
    else {
      heightError.current.classList.remove('hidden')
      heightInput.current.classList.add('border-2')
    }
  }

  return (
    <>
      <div className={props.hidden ? 'hidden ' : '' + 'mt-3 h-1/2'}>
        <div className="flex pl-1 mb-2 align-middle">
          <input onChange={togglePopup} className='mt-1.5 mr-1' type="checkbox" name="popup-enabled" id="extension-popup-enabled-input" />
          <label htmlFor="popup-enabled"> Enable Popup </label>

          <input disabled={!isPopupEnabled} className='ml-3 mt-1.5 mr-1' type="checkbox" name="inject-html-enabled" id='extension-popup-inject-html-enabled' />
          <label htmlFor="inject-html-enabled">{ 'Inject HTML (only if you know what you\'re doing)' }</label>
        </div>
        
        <textarea disabled={!isPopupEnabled} className='block w-full p-3 bg-gray-200 border-red-500 rounded-md outline-none h-3/4' defaultValue='' type='text' name='popup' id='extension-popup-input' placeholder='Popup Text' />
      
        <div className='flex pl-2 mt-3'>
          <div className='w-1/3'>
            <div className='flex text-center align-middle w-fit'>
              <span className='block my-auto mr-2 h-fit' htmlFor="extension-popup-width">Width: </span>
              <input ref={widthInput} onChange={verifyWidth} disabled={!isPopupEnabled} className='block w-1/3 h-10 text-center bg-gray-200 border-red-500 rounded-md outline-none' type="number" name="extension-popup-width" id="extension-popup-width-input" defaultValue='400' placeholder='400'/>
            </div>

            <label ref={widthError} className='hidden text-red-500' htmlFor="extension-popup-width">Maximum width is 600px</label>
          </div>

          <div className='w-1/3'>
            <div className='flex text-center align-middle w-fit'>
              <span className='block my-auto mr-2 h-fit' htmlFor="extension-popup-height">Height: </span>
              <input ref={heightInput} onChange={verifyHeight} disabled={!isPopupEnabled} className='block w-1/3 h-10 text-center bg-gray-200 border-red-500 rounded-md outline-none' type="number" name="extension-popup-height" id="extension-popup-height-input" defaultValue='400' placeholder='400'/>
            </div>

            <label ref={heightError} className='hidden text-red-500' htmlFor="extension-popup-height">Maximum height is 600px</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default PopupSettings