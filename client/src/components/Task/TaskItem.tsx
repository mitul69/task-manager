import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Task, setTask } from 'store/slices/taskSlice';

interface TaskItemProps {
    task: Task,
    index: number
}
const TaskItem = ({ task, index }: TaskItemProps) => {


    const dispatch = useDispatch();
    const handleEdit = () => {
        dispatch(setTask(task))
    }
    return (
        <Draggable draggableId={`${task.id}`} index={index}>
            {(provided) => (
                <div
                    className="card"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    {task.title}
                    <Button onClick={handleEdit}> Edit</Button>
                </div>
            )}
        </Draggable>
    );
};

export default TaskItem;
