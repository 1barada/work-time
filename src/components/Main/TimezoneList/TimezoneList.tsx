import { Timezone } from "countries-and-timezones";
import { FunctionComponent, useEffect, useState } from "react";
import TimezoneListItem from "./TimezoneListItem/TimezoneListItem";
import styles from './TimezoneList.module.css';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { setNewOpenedTimezonesOrder, updateGmt } from "../../../store/reducers/TimezonesSlice/TimezonesSlice";
import {DragDropContext, DropResult, Droppable} from 'react-beautiful-dnd';

interface TimezoneListProps {
    timezones: (Timezone & {isHome: boolean})[]
}
 
const TimezoneList: FunctionComponent<TimezoneListProps> = ({
    timezones
}) => {
    const [date, setDate] = useState<Date>(new Date());
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const minuteInterval = setInterval(() => {
            setDate(new Date());
        }, 60000);

        return () => clearInterval(minuteInterval);
    }, []);

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
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId='timezone-list'>
                {(provided) => (
                    <div 
                        className={styles.container}
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
    );
}
 
export default TimezoneList;