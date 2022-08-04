export default function ColorInput(props) { 
  return (
    <div className='w-2/3 py-2 pl-4 mx-auto'>
      <div className='flex flex-row items-center justify-start gap-8'>
        <span>{props.name}</span>
        <input type="color" name={props.colorName} />
      </div>  
    </div>
  );
}