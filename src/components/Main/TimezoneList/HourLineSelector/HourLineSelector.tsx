import { FunctionComponent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../store';
import { HourlineSelectorState, removeSelectedTime, setSelectedTime } from '../../../../store/reducers/HourlineSelectorSlice/HourlineSelectorSlice';
import styles from './HourLineSelector.module.css';
import { hourlineConstants } from '../../../../data/constants';
import { TimezonesState } from '../../../../store/reducers/TimezonesSlice/TimezonesSlice';
import minutesToHoursAndMinutes from '../../../../utils/minutesToHoursAndMinutes';
import { useDispatch } from 'react-redux';

interface IHourLineSelectorProps {
    
}

enum SelectorStates {
    Default,
    Selecting,
    Selected
}

const baseSelectedWidth = hourlineConstants.cellWidth / 2;
const containerWidth = hourlineConstants.cellWidth * 24;

const HourLineSelector: FunctionComponent<IHourLineSelectorProps> = () => {
    const [selectedWidth, setSelectedWidth] = useState<number>(baseSelectedWidth * 2);
    const [isMouseOn, setIsMouseOn] = useState<boolean>(false); 
    const [selectorState, setSelectorState] = useState<SelectorStates>(SelectorStates.Default);
    const dispatch = useDispatch<AppDispatch>();

    const [leftPosition, setLeftPosition] = useState<number>(0);
    const [rightPosition, setRightPosition] = useState<number>(0);
    
    const {
        selectorTopLeftPosition,
        selectorWidth,
        selectorHeight
    } = useSelector<RootState, HourlineSelectorState>(state => state.hourlineSelectorSlice);
    const {
        homeTimezone,
        gmt
    } = useSelector<RootState, TimezonesState>(state => state.timezonesSlice);

    useEffect(() => {
        if (
            isMouseOn || 
            !homeTimezone) {
            return;
        }

        if (selectorState === SelectorStates.Default) {
            const hours = minutesToHoursAndMinutes(gmt.hours * 60 + gmt.minutes + homeTimezone.utcOffset).hours;
            setLeftPosition(hours * baseSelectedWidth * 2);
            setRightPosition((hours + 1) * baseSelectedWidth * 2);
        }
    }, [homeTimezone, gmt]);

    function onMouseMove(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        switch(selectorState) {
            case SelectorStates.Default: {
                const bounds = e.currentTarget.getBoundingClientRect();
                let x = e.clientX - bounds.left;
                if (x < 0) x = 0;
                if (x > bounds.width) x = bounds.width - baseSelectedWidth * 2;
                setLeftPosition(Math.floor(x / (baseSelectedWidth * 2)) * baseSelectedWidth * 2);
                setRightPosition((Math.floor(x / (baseSelectedWidth * 2)) + 1) * baseSelectedWidth * 2);
                break;
            }
            case SelectorStates.Selecting: {
                const bounds = e.currentTarget.getBoundingClientRect();
                let x = e.clientX - bounds.left;
                if (x < leftPosition + baseSelectedWidth) x = leftPosition;
                if (x > bounds.width) x = bounds.width;
                setRightPosition((Math.floor(x / baseSelectedWidth) + 1) * baseSelectedWidth);
                setSelectedWidth(((Math.floor((x - leftPosition) / baseSelectedWidth)) + 1) * baseSelectedWidth);
                break;
            }
            case SelectorStates.Selected: {
                break;
            }
        }
    }

    function onMouseEnter(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        setIsMouseOn(true);
    }

    function onMouseLeave(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        setIsMouseOn(false);

        if (selectorState === SelectorStates.Default && homeTimezone) {
            const hours = minutesToHoursAndMinutes(gmt.hours * 60 + gmt.minutes + homeTimezone.utcOffset).hours;
            setLeftPosition(hours * baseSelectedWidth * 2);
            setRightPosition((hours + 1) * baseSelectedWidth * 2);
        }
    }

    function onMouseDown(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (selectorState === SelectorStates.Default) {
            const bounds = e.currentTarget.getBoundingClientRect();
            let x = e.clientX - bounds.left;
            if (x < 0) x = 0;
            if (x > bounds.width) x = bounds.width - baseSelectedWidth * 2;
            setLeftPosition(Math.floor(x / (baseSelectedWidth)) * baseSelectedWidth);
            setRightPosition((Math.floor(x / (baseSelectedWidth * 2)) + 1) * baseSelectedWidth * 2);
            setSelectorState(SelectorStates.Selecting);
        } else if (selectorState === SelectorStates.Selected) {
            dispatch(removeSelectedTime());
            setSelectedWidth(baseSelectedWidth * 2);
            setSelectorState(SelectorStates.Default);
        }
    }

    function onMouseUp(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (selectorState === SelectorStates.Selecting) {
            dispatch(setSelectedTime({
                from: {
                    hours: Math.floor(leftPosition / (baseSelectedWidth * 2)),
                    minutes: (leftPosition / baseSelectedWidth) % 2 === 0 ? 0 : 30
                },
                to: {
                    hours: Math.floor(rightPosition / (baseSelectedWidth * 2)),
                    minutes: (rightPosition / baseSelectedWidth) % 2 === 0 ? 0 : 30
                }
            }));
            setSelectorState(SelectorStates.Selected);
        }
    }

    return (
        <div 
            className={`${styles['hour-selector']} ${selectorState === SelectorStates.Selecting ? styles.dragging : ''}`}
            style={{
                top: selectorTopLeftPosition.y,
                left: selectorTopLeftPosition.x,
                width: selectorWidth,
                height: selectorHeight,
            }}
            onMouseEnter={onMouseEnter}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
        >
            <div
                className={styles['selected-left-right']}
                style={{
                    opacity: selectorState === SelectorStates.Selected ? 0.5 : 0,
                    width: leftPosition
                }}
            ></div>
            <div 
                className={styles.selected}
                style={{
                    width: selectedWidth
                }}
            ></div>
            <div
                className={styles['selected-left-right']}
                style={{
                    opacity: selectorState === SelectorStates.Selected ? 0.5 : 0,
                    width: containerWidth - rightPosition
                }}
            ></div>
        </div>
    );
};

export default HourLineSelector;