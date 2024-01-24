import React from 'react'
import './style.css'

function Modal(props) {
  // console.log("modal:", props)
  return (
    <>
      {props.modal && (
        <div className='modal'>
          <div className='overlay'>
            <div id='modal-h2'>
              <h2>Log Out?</h2>
            </div>
            <div className='yes-no'>
              <button onClick={props.logout}>Yes</button>
              <button onClick={props.toggleModal}>No</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Modal