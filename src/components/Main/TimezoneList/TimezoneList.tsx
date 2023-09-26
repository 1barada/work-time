import { Timezone } from "countries-and-timezones";
import { FunctionComponent, useEffect, useRef, useState } from "react";
import TimezoneListItem from "./TimezoneListItem/TimezoneListItem";
import styles from './TimezoneList.module.css';
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { setNewOpenedTimezonesOrder, updateGmt } from "../../../store/reducers/TimezonesSlice/TimezonesSlice";
import {DragDropContext, DropResult, Droppable} from 'react-beautiful-dnd';
import { setHourLineSelectorHeight, setHourLineSelectorTopLeftPosition } from "../../../store/reducers/HourlineSelectorSlice/HourlineSelectorSlice";
import { TimezoneListItemConstants, hourlineConstants } from "../../../data/constants";
import { useSelector } from "react-redux";
import HourLineSelector from "./HourLineSelector/HourLineSelector";

interface TimezoneListProps {
    timezones: (Timezone & {isHome: boolean})[]
}
 
const TimezoneList: FunctionComponent<TimezoneListProps> = ({
    timezones
}) => {
    const openedTimezones = useSelector<RootState, (Timezone & { isHome: boolean; })[]>(state => state.timezonesSlice.openedTimezones);
    const [date, setDate] = useState<Date>(new Date());
    const dispatch = useDispatch<AppDispatch>();
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const minuteInterval = setInterval(() => {
            setDate(new Date());
        }, 60000);

        return () => clearInterval(minuteInterval);
    }, []);

    useEffect(() => {
        
        const topAndBottomOffset = (TimezoneListItemConstants.height - hourlineConstants.cellHeight) / 2;
        
        function onResize() {
            if (!containerRef.current) return;
            
            const boundaries = containerRef.current.getBoundingClientRect();

            dispatch(setHourLineSelectorTopLeftPosition({
                x: boundaries.left + (boundaries.width * (1 - hourlineConstants.hourlineWidthRatio)),
                y: boundaries.top + topAndBottomOffset
            }));
            dispatch(setHourLineSelectorHeight(boundaries.height - (topAndBottomOffset * 2)));
        }
        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize', onResize);
        }
    }, []);

    useEffect(() => {
        if (!containerRef.current) return;

        const boundaries = containerRef.current.getBoundingClientRect();
        const topAndBottomOffset = (TimezoneListItemConstants.height - hourlineConstants.cellHeight) / 2;
        dispatch(setHourLineSelectorTopLeftPosition({
            x: boundaries.x + (boundaries.width * (1 - hourlineConstants.hourlineWidthRatio)),
            y: boundaries.y + topAndBottomOffset + window.scrollY
        }));
        dispatch(setHourLineSelectorHeight(boundaries.height - (topAndBottomOffset * 2)));
    }, [openedTimezones]);

    useEffect(() => {
        const offset = date.getTimezoneOffset();
        const hoursOffset = Math.floor(offset / 60);
        const minutesOffset = (hoursOffset * 60) - offset;

        dispatch(updateGmt({
            hours: date.getHours() + hoursOffset,
            minutes: date.getMinutes() + minutesOffset
        }));
    }, [date]);

    const onDragEnd = (result: DropResult) => {
        dispatch(setNewOpenedTimezonesOrder(result));
    };

    return (
        <div ref={containerRef}>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId='timezone-list'>
                    {(provided) => (
                        <div 
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {timezones.map((timezone, index) => 
                                <TimezoneListItem 
                                    timezone={timezone} 
                                    index={index} 
                                    key={timezone.name}
                                />
                            )}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <HourLineSelector/>
        </div>
    );
}
 
export default TimezoneList;