
import { Form, Modal } from "react-bootstrap"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "store";
import { Task, createTask, setShowDialog, updateTask } from "store/slices/taskSlice";
import { Field, Formik, ErrorMessage } from 'formik';
import { Button, Form as RBForm } from 'react-bootstrap';


const TaskForm = () => {
    const { operation, error, showDialog, task } = useSelector((state: RootState) => state.tasks);
    const dispatch = useDispatch<AppDispatch>();


    const handleSave = (values: Task) => {
        if (task) {
            dispatch(updateTask(values));
        } else {
            dispatch(createTask(values));
        }

    };

    const hideDialog = () => {
        dispatch(setShowDialog(false))
    }

    return (
        <Modal show={showDialog} size="lg">
            <Modal.Header>{operation} Task</Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={task || { id: 0, title: '', description: '', status: 'To Do' }}
                    validate={values => {
                        const errors: any = {};
                        if (!values.title) {
                            errors.title = 'Required';
                        }
                        if (!values.status) {
                            errors.status = 'Required';
                        }
                        console.log(error)
                        return errors;
                    }}
                    enableReinitialize
                    onSubmit={(values) => handleSave(values)}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        /* and other goodies */
                    }) => (
                        <form onSubmit={handleSubmit} id="taskForm">
                            <div className="form-group">
                                <label htmlFor="titleHelp">Title</label>
                                <Field as={RBForm.Control} className="form-text" aria-describedby="titleHelp" id="title" placeholder="Title" name="title" />
                                <ErrorMessage name="title" component="div" />
                            </div>

                            <div className="form-group mt-2">
                                <label htmlFor="descriptionHelp">Description</label>
                                <Field name="description">
                                    {({ field }: any) => (
                                        <div>
                                            <Form.Control {...field} as="textarea" rows={3} />
                                            <ErrorMessage name="message" component="div" />
                                        </div>
                                    )}
                                </Field>
                                <ErrorMessage name="description" component="div" />
                            </div>

                            <div className="form-group mt-2 mb-5">
                                <label htmlFor="titleHelp">Status</label>
                                <Field name="status" as={RBForm.Select}>
                                    <option value="To Do">To Do</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Done">Done</option>
                                </Field>
                                <ErrorMessage name="select" component="div" />
                            </div>

                            <Modal.Footer>
                                <Button variant="secondary" onClick={hideDialog}>Close</Button>
                                <Button variant="primary" type="submit" form="taskForm">Submit</Button>
                            </Modal.Footer>

                        </form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    )
}

export default TaskForm;