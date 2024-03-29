import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MenuOptions from './MenuOptions';
import { setLateralMenu } from '../features/content/contentSlice';

function LateralNavbar() {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.content?.currentBoard?.name);
  const { isLateralMenuExpanded, isNavbarModalExpanded, isGenericModalExpanded } = useSelector((state) => state.content);
  const lateralMenuRef = useRef(null);

  const [shouldLateralToggleBeDisplayed, setShouldLateralToggleBeDisplayed] = useState(!(!isGenericModalExpanded && !isNavbarModalExpanded && !isLateralMenuExpanded));

  useEffect(() => {
    setShouldLateralToggleBeDisplayed(!(!isGenericModalExpanded && !isNavbarModalExpanded && !isLateralMenuExpanded));
  }, [isLateralMenuExpanded, isNavbarModalExpanded, isGenericModalExpanded])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (lateralMenuRef.current && !lateralMenuRef.current.contains(event.target)) {
        dispatch(setLateralMenu(false));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <>
      {isLateralMenuExpanded
        ? (
          <div className="lateral-menu lateral-menu-open" ref={lateralMenuRef}>
            <div className="inner-lateral-menu-header">
              <img src={`${process.env.PUBLIC_URL}/assets/logo-mobile.svg`} alt="Logo" />
              <div className="project-name-wrapper">
                Kanban
              </div>
              <div className="board-name-side-bar-wrapper">
                {name}
              </div>
            </div>
            <MenuOptions className="custom-menu-options" />
          </div>
        ) : (
          <div
            className={`lateral-menu lateral-menu-closed ${shouldLateralToggleBeDisplayed && "hidden"}`}
            onClick={() => dispatch(setLateralMenu(true))}
          >
            <svg className="lateral-menu-closed-image" xmlns="http://www.w3.org/2000/svg" width="16" height="11">
              <path
                d="M15.815 4.434A9.055 9.055 0 0 0 8 0 9.055 9.055 0 0 0 .185 4.434a1.333 1.333 0 0 0 0 1.354A9.055 9.055 0 0 0 8 10.222c3.33 0 6.25-1.777 7.815-4.434a1.333 1.333 0 0 0 0-1.354ZM8 8.89A3.776 3.776 0 0 1 4.222 5.11 3.776 3.776 0 0 1 8 1.333a3.776 3.776 0 0 1 3.778 3.778A3.776 3.776 0 0 1 8 8.89Zm2.889-3.778a2.889 2.889 0 1 1-5.438-1.36 1.19 1.19 0 1 0 1.19-1.189H6.64a2.889 2.889 0 0 1 4.25 2.549Z"
                fill="currentcolor"
              />
            </svg>
          </div>
        )}
    </>
  );
}

export default LateralNavbar;
