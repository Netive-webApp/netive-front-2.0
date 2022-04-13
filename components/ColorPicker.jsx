

import { useState } from "react";
import { ChromePicker      } from 'react-color';
const CustomColorPickerH = ({id}) => {
    const [color, setColor] = useState('#000000');
    const [showColorPicker, setShowColorPicker] = useState(false);
    return (
        <>
        <button type="button" className="color-picker" id={id} style={{ background: color }} onClick={() => setShowColorPicker(!showColorPicker)}></button>
        { showColorPicker &&
            <ChromePicker color={color} onChange={updatedColor=>setColor(updatedColor.hex)}/>
        }
        
        </>
    );
};

export default CustomColorPickerH;


