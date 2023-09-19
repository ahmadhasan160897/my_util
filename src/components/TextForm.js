import React from 'react';
import {useState, useEffect } from 'react';

export default function TextForm(props) {

    const handleUpClick = () => {
        console.log("Uppercase was clicked" + text)
        let newText = text.toUpperCase();
        setText(newText);
        props.showAlert("Converted to Upper Case", "success");
        //setText("You have Clicked on handle up click");
    }

    const handleSaveClick = () => {
      let textEle = text;
      let fileNameEle = document.getElementById("fileName");
      let saveBtn = document.getElementById("saveBtn");
    
        const textData = text
        const textDataBlob = new Blob([text], { type: "text/plain" });
      
        const downloadUrl = window.URL.createObjectURL(textDataBlob)
      
        const downloadLink = document.createElement('a');
        downloadLink.download = fileNameEle.value
        downloadLink.href = downloadUrl;
        downloadLink.click()
      
        console.log(textData);
        console.log(textDataBlob);
        props.showAlert("File Saved and Downloaded", "primary");
    }


    const handleDnClick = () => {
      console.log("Lowercase was clicked" + text)
      let newText = text.toLowerCase();
      setText(newText);
      props.showAlert("Converted to Lower Case", "success");
    }
    const handleClearClick = () => {
      console.log("Clear was clicked", "success")
      let newText = '';
      setText(newText);
      props.showAlert("Text Cleared", "success");
    }

    const handleCut = () => {
      var text = document.getElementById("myBox");
      text.select();
      navigator.clipboard.writeText(text.value);
      let newText = '';
      setText(newText);
      props.showAlert("Cut and pasted to Clipboard", "success");
    }

    const handleCopy = () => {
      var text = document.getElementById("myBox");
      text.select();
      navigator.clipboard.writeText(text.value);
      props.showAlert("Copied to Clipboard", "success");
    }

    const handlePaste = () => {
    var myBox = document.getElementById("myBox");
     setTimeout(async () => {
      var curPos =  document.getElementById("myBox").selectionStart;
                //console.log(curPos);
                let x = myBox.value;
                let text_to_insert = await navigator.clipboard.readText();
                let m = x.slice(0, curPos) + text_to_insert + x.slice(curPos);
      setText(m); 
      props.showAlert("Pasted from Clipboard", "success");
    }, );    
    }

   const handleOnChange = (event) => {
    console.log("On change")
    setText(event.target.value);
}
const getWordCount = () => {
  // Split the text by whitespace and filter out empty strings
  const words = text.trim().split(/\s+/).filter(Boolean);
  return words.length;
  //console.log(words.length)
};

const extraSpaces = () => {
  //const spaces = text.split(/\s+/);
  const spaces = text.split(/[ ]+/);
  setText(spaces.join(" "))
  props.showAlert("Extra Spaced Removed", "success")
}


const getCharCount = () => {
  // Split the text by whitespace and filter out empty strings
  let characters = text.split('');
  let filter1 = characters.filter((i)=>{
  return i !== " ";
})
return filter1.length; 
     
};


    const [text, setText] = useState('');
    //text = "new text"; --- wrong way to change state
    //setText("new text"); correct way to change state
  return (
    <>
        <div className='container' style={{color:props.mode==='light'?'black':'white'}} >
        <h1>{props.heading} </h1>
        {/* <h1>{props.heading} - {text} </h1>  */}
        <div className="mb-3">
        {/* <label for="myBox" className="form-label">Example textarea</label>  */}
        <textarea className="form-control" value={text} onChange={handleOnChange} style={{backgroundColor:props.mode==='light'?'white':'gray' , color:props.mode==='light'?'black':'white'}} id="myBox" rows="8" ></textarea>
        </div>
        
        <div className='demo'>
          <div>
        
        <button className='btn btn-primary mx my-1' disabled={text.length===0} onClick={handleUpClick}>Uppercase</button>
        <button className='btn btn-primary mx-1 my-1' disabled={text.length===0} onClick={handleDnClick}>Lowercase</button>
        <button className='btn btn-primary mx my-1' disabled={text.length===0} onClick={handleClearClick}>Clear</button>
        <button className='btn btn-primary mx-1 my-1' disabled={text.length===0} onClick={handleCut}>Cut</button>
        <button className='btn btn-primary mx my-1' disabled={text.length===0} onClick={handleCopy}>Copy</button>
        <button className='btn btn-primary mx-1 my-1' disabled={text.length===0} onClick={handlePaste}>Paste</button>
        <button className='btn btn-primary mx-0.5 my-1' disabled={text.length===0} onClick={extraSpaces}>Extra Space (-)</button>
       {/* <button className='btn btn-primary mx-2' onClick={handlePauseClick}>Pause</button>
        <button className='btn btn-primary mx-2' onClick={handlePlayClick}>Play</button>
        <button className='btn btn-primary mx-2' onClick={handleStopClick}>Stop</button> */}
        </div>
        <div>
       <input type="text"   id="fileName" placeholder="Enter File Name" class="form-control mx-1" />
</div>
        {/*<input type="text"className='form-outline w-25' id="fileName" placeholder="Enter File Name" />*/}
       <input type="submit" disabled={text.length===0} className='btn btn-primary mx-2' onClick={handleSaveClick} value="Save & Download" id="saveBtn" />
       {/* <button type="button" class="btn btn-primary" onClick={toggleStyle}>{btntext}</button> */}
    </div>
   <br/>
   <div>
      <h1>Your Text Summary</h1>
      {/*    <p>{text.split(" ").filter((element) => {return element.length!=0}).length}</p>   */}
      <p>{getWordCount()} words and {getCharCount()} characters</p>
      {/* <p>{text.split(" ").length -1} words and {text.length} characters </p> */}
     {/* <p>{0.008 * (text.split(" ").length -1)} Minutes Read</p>  */}
      <p>{0.008 * (getWordCount())} Minutes Read</p>
      <h2>Preview</h2>
      {text.length > 0 ?text : "Enter something to texbox above to preview it here!..."}
      </div>


     </div>

    </>
  );
}
