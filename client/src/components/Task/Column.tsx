import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TaskItem from './TaskItem';
import { Task } from 'store/slices/taskSlice';

interface ColumnProps {
    column: {
        label: string
        key: string
    }
    tasks: Task[],
}
const Column = ({ column, tasks }: ColumnProps) => {
    return (
        <div className="column">
            <h2>{column.label}</h2>
            <Droppable droppableId={column.key}>
                {(provided) => (
                    <div
                        className="task-list"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {tasks.map((task: Task, index: number) => (
                            <TaskItem key={task.id} task={task} index={index} />
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default Column;
