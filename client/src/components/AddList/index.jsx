import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import Badge from '@components/Badge';

import './AddList.scss';
import closeSvg from '@img/close.svg';
import { addList } from '@actions/listsActions';

const AddList = (props) => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [selectedColor, setSelectedColor] = useState("green");
  const [inputValue, setInputValue] = useState('');


  const dispatch = useDispatch()

  return (
    <div className="add-list">
      <ul onClick={() => { setVisiblePopup(!visiblePopup) }} className="main__list">
        <li >
          <i><svg width="16" height="12" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="listIconPlus">
            <path d="M8 1V15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M1 8H15" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          </i>
          <span>Add List</span>
        </li>
      </ul>

      {visiblePopup && <div className="add-list__popup">
        <img onClick={() => setVisiblePopup(false)} src={closeSvg} alt="Close button" className="add-list__popup-close-btn" />
        <input onChange={e => setInputValue(e.target.value)} value={inputValue} className="field" type="text" placeholder="Folder Name" />
        <div className="add-list__popup-colors">
          {props.colors.map((color, index) => (
            <Badge onClick={() => setSelectedColor(color)} key={index} color={color} className={selectedColor === color && 'active'} />
          ))}
        </div>
        <button className="button" onClick={() => dispatch(addList(props.userId, inputValue, selectedColor))}>Add New List</button>
      </div>
      }
    </div>
  );
}

const mapStateToProps = state => ({
  colors: state.lists.сolors,
  userId: state.user.currentUser.userId

})


export default connect(mapStateToProps, null)(AddList)