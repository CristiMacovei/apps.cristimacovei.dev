import {useState} from 'react';

export default function Toggle(props) {
  const [isOpen, setIsOpen] = useState(false);

  function switchOpenState() {
    setIsOpen(!isOpen);
  }

  return (
    <>
    {
      isOpen ? (
        <div>
          <div className={`cursor-pointer ${props.className}`} onClick={switchOpenState}>
            <svg xmlns="http://www.w3.org/2000/svg" className="inline-block w-6 h-6 pb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
            
            <span> {props.name} </span>
          </div>
          
          { props.children }
        </div>
      ) : (
        <div className='w-full h-full'>
          <div className={`cursor-pointer ${props.className}`} onClick={switchOpenState}>
            <svg xmlns="http://www.w3.org/2000/svg" className="inline-block w-6 h-6 pb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
            
            <span> {props.name} </span>
          </div>
        </div>
      )
    }
    </>
  );
}