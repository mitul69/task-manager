import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store';
import { Task, deleteTask, setTask } from 'store/slices/taskSlice';

interface TaskItemProps {
    task: Task,
    index: number
}
const TaskItem = ({ task, index }: TaskItemProps) => {


    const dispatch = useDispatch<AppDispatch>();
    const handleEdit = () => {
        dispatch(setTask(task))
    }
    const handleDelete = () => {
        dispatch(deleteTask(task.id))
    }
    return (
        <Draggable draggableId={`${task.id}`} index={index}>
            {(provided) => (
                <Card className='task-item'
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}>
                    <Card.Body>
                        <Card.Title>{task.title}</Card.Title>
                        <Card.Text>
                           {task.description}
                        </Card.Text>
                        <Card.Link onClick={handleEdit}>Edit</Card.Link>
                        <Card.Link onClick={handleDelete}>Delete</Card.Link>
                    </Card.Body>
                </Card>
            )}
        </Draggable>
    );
};

export default TaskItem;
