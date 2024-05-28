import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import { fetchTasks, updateTask, Task, setShowDialog } from 'store/slices/taskSlice';
import { Button, Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { DragDropContext } from 'react-beautiful-dnd';
import TaskForm from './TaskForm';
import Column from './Column';


const columns = [{
  key: "toDo",
  label: "To Do"
},
{
  key: "inProgress",
  label: "In Progress"
},
{
  key: "done",
  label: "Done"
}
]
const TaskList: React.FC = () => {
  const { tasks, operation, error } = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch<AppDispatch>();


  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);


  const grouppedTask: any = useMemo(() => {

    const taskList: {
      "toDo": Task[],
      "inProgress": Task[],
      "done": Task[],
    } = {
      "toDo": [],
      "inProgress": [],
      "done": [],
    }

    tasks.forEach((task: Task) => {
      if (task.status === "To Do") {
        taskList.toDo.push(task)
      } else if (task.status === "In Progress") {
        taskList.inProgress.push(task)
      } else {
        taskList.done.push(task)
      }
    });
    return taskList;
  }, [tasks])


  const toggelDialog = () => {
    dispatch(setShowDialog(true))
  }

  const onDragEnd = (result: any) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId) {
      return;
    }
    let _task = { ...grouppedTask[source.droppableId][source.index] };
    if (destination.droppableId === "toDo") {
      _task.status = "To Do";
    } else if (destination.droppableId === "inProgress") {
      _task.status = "In Progress";
    } else {
      _task.status = "Done";
    }
    dispatch(updateTask(_task))
  };

  return (
    <Container>
      <h1 className="mt-4">Task Management</h1>
      {operation === "list" && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board">
          <Row>
            {columns.map((column) => {
              return <Col>
                <Column key={column.key} column={column} tasks={grouppedTask[column.key] || []} />
              </Col>
            })}
          </Row>
        </div>
      </DragDropContext>
      <TaskForm />
      <Button className="add-task-button" onClick={toggelDialog}>+</Button>
    </Container>
  );
};

export default TaskList;