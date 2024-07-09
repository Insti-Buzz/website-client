import React,{useState} from 'react'

import '../css/ExchangeProduct.css'
// import '../css/MyOrders.css'

function ExchangeProduct() {

    const [option, setOption] = useState('option-1');
    const handleRadioBtn = (event) => {
      setOption(event.target.value);
      setIssue('');
  }

  const [issue, setIssue] = useState('damaged');
  const handleIssueBtn = (event) => {
    setIssue(event.target.id);
  }
  
  const [selectedImages, setSelectedImages] = useState(['','','']);

  const handleFileChange = (index)=> (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newSelectedImages = [...selectedImages];
        newSelectedImages[index] = e.target.result;
        setSelectedImages(newSelectedImages);
      };
      reader.readAsDataURL(file);

    } else {
      const newSelectedImages = [...selectedImages];
      newSelectedImages[index] = '';
      setSelectedImages(newSelectedImages);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', selectedImages);

    // try {
    //   const response = await axios.post('/upload', formData, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   });
    //   console.log('File uploaded successfully:', response.data);
    // } catch (error) {
    //   console.error('Error uploading file:', error);
    // }
  };

  return (
    <>
    <div className="exchange-container">
        <div className="exchange-container-1 block-3">
            <div className="exchange-user-details">
                <div className="exchange-user-name">Anantu</div>
                <div className="exchange-user-address">Helooo</div>
                <div className="exchange-user-phone">94929320</div>
            </div>
            <div className="exchange-product-details">
                    <div className="exchange-info ">
                      <img src={'item.product.imageUrl[0]'} alt="ordered product info" />
                      <div className='exchange-sub-block'>
                        <div className='ex-name-sty-container'>
                          <div className='exchange-product-name'>White IITM</div>
                          <div className='sm-text'>{'item.style'}</div>
                        </div>
                          <div className='ex-sty-qty-container'>
                            <span className='sm-text' style={{marginRight:10+"px"}}>Size: {'item.size'}</span>
                            <span className='sm-text'>Qty: {'item.quantity'}</span>
                          </div>
                      </div>
                  </div>
                  <div className="exchange-price"><h2>₹{'item.price'}</h2><span className='smm-text'>Inclusive of all taxes.</span></div>
                  
            </div>
        </div>
        <div className="exchange-container-2 block-3">
            <div className="conatiner-2-heading">Reason for Exchnage :</div>
            <div className="radio-btn-container">
                <div>
                    <input type="radio" name="exchange-reason" id="defect" value='option-1' onChange={handleRadioBtn} defaultChecked />
                    <label for="defect">I recieved a wrong/defective product</label>
                </div>
                <div style={{marginLeft:'120px'}}>
                    <input type="radio" name="exchange-reason" id="size-issue" value='option-2' onChange={handleRadioBtn}/>
                    <label for="size-issue">Size issue</label>
                </div>
            </div>     
        </div>
        {option === 'option-1' ? 
      <>
      <div className="exchange-container-3 block-3">
        <div className="container-3-heading">Add Photos</div>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
                  <input id='image-1' type='file' style={{display:'none'}} onChange={handleFileChange(0)}></input>
                  <label for='image-1'><div className="image-1-container">{selectedImages[0] ? <img src={selectedImages[0]}></img> : '+'}</div></label>
                  
                  <input id='image-2' type='file' style={{display:'none'}} onChange={handleFileChange(1)}></input>
                  <label for='image-2'><div className="image-1-container">{selectedImages[1] ? <img src={selectedImages[1]}></img> : '+'}</div></label>
                  
                  <input id='image-3' type='file' style={{display:'none'}} onChange={handleFileChange(2)}></input>
                  <label for='image-3'><div className="image-1-container">{selectedImages[2] ? <img src={selectedImages[2]}></img> : '+'}</div></label>
                  
                  
                  {/* <button type='submit'>Upload</button> */}
          </form>
        </div>
        <div className="container-3-heading-2">Select Issue</div>
        <form action="" className="exchange-reason-form">
          <div>
          <input type="radio" name="exchange-reason" id="damaged" onChange={handleIssueBtn} defaultChecked />
          <label for="damaged">The package was damaged</label>
          </div>
          <div>
          <input type="radio" name="exchange-reason" id="poor-quality" onChange={handleIssueBtn} />
          <label for="poor-quality">The product was not of good quality</label>
          </div>
          <div>
          <input type="radio" name="exchange-reason" id="torn" onChange={handleIssueBtn} />
          <label for="torn">The product was torn</label>
          </div>
          <div>
          <input type="radio" name="exchange-reason" id="stained" onChange={handleIssueBtn} />
          <label for="stained">The product was stained</label>
         </div>
         <div>
          <input type="radio" name="exchange-reason" id="others" onChange={handleIssueBtn}/>
          <label for="others">Other</label>
          </div>
        </form>
      </div>
            {
              issue === 'others' ?
      <>
      <div className="exchange-container-4-heading block-3">Please describe the issue</div>
      <div className="exchange-container-4 block-3">
        <textarea type="text" name="describe-issue" id="describe-issue" placeholder="Required..." required/>
      </div>
                </> :
                <></>
}
      </>
            :
      
        <div className="exchange-container-5 block-3">
          <div className="container-3-heading-2">Select Issue</div>
        <form action="" className="exchange-reason-form">
          <div>
          <input type="radio" name="exchange-reason" id="wrong-size" onChange={handleIssueBtn} defaultChecked />
          <label for="wrong-size">Recieved wrong size</label>
          </div>
          <div>
          <input type="radio" name="exchange-reason" id="too-small" onChange={handleIssueBtn} />
          <label for="too-small">Product too small</label>
          </div>
          <div>
          <input type="radio" name="exchange-reason" id="too-large" onChange={handleIssueBtn} />
          <label for="too-large">Product too large</label>
          </div>

        </form>
        
        <div className="product-product-size">
              <div className='title-container'>
                <p className='title'>Select Size</p>
                <span className="size-unavailable">Size unavailable? <a href="">Click here</a> to return the product.</span>
              </div>
              </div>
              <div className="exchange-product-size-input-container">
                <label>
                  <input
                    type="radio"
                    name="radios"
                    value="XS"
                    id="XS"
                    onClick={(e) => {
                      // changeButton(e.target.value);
                    }}
                  />
                  <span>XS</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="radios"
                    value="S"
                    id="S"
                    onClick={(e) => {
                      // changeButton(e.target.value);
                    }}
                  />
                  <span>S</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="radios"
                    value="M"
                    id="M"
                    onClick={(e) => {
                      // changeButton(e.target.value);
                    }}
                  />
                  <span>M</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="radios"
                    value="L"
                    id="L"
                    onClick={(e) => {
                      // changeButton(e.target.value);
                    }}
                  />
                  <span>L</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="radios"
                    value="XL"
                    id="XL"
                    onClick={(e) => {
                      // changeButton(e.target.value);
                    }}
                  />
                  <span>XL</span>
                </label>
                <label>
                  <input
                    type="radio"
                    name="radios"
                    value="2XL"
                    id="2XL"
                    onClick={(e) => {
                      // changeButton(e.target.value);
                    }}
                  />
                  <span>2XL</span>
                </label>
              </div>
        </div>
        }
        
        <div className="condition-accept-container">
          
        <label class="checkbox-container">All the tags / price cards are intact
          <input type="checkbox" />
          <span class="checkmark"></span>
        </label>
        </div>
        <div className="all-form-submit-button-container">
          <div className="all-form-submit-button">Submit</div>
        </div>
    </div>

    </>
  )
}

export default ExchangeProduct
