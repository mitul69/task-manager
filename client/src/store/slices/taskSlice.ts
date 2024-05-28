import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5001';

export interface Task {
    id: number;
    title: string;
    description: string;
    status: string;
}

interface TasksState {
    tasks: Task[];
    task: Task | null;
    operation: string;
    loading: boolean;
    error: string | null;
    showDialog: boolean
}

const initialState: TasksState = {
    tasks: [],
    task: null,
    operation: "",
    loading: false,
    error: null,
    showDialog: false
};

// Async thunks for API calls

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    const response = await axios.get('/api/tasks');
    return response.data;
});

export const createTask = createAsyncThunk('tasks/createTask', async (task: Task) => {
    const response = await axios.post('/api/tasks', task);
    return response.data;
});

export const updateTask = createAsyncThunk('tasks/updateTask', async (task: Task) => {
    const response = await axios.put(`/api/tasks/${task.id}`, task);
    return response.data;
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id: number) => {
    await axios.delete(`/api/tasks/${id}`);
    return id;
});

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setShowDialog(state, action: PayloadAction<boolean>) {
            state.showDialog = action.payload;
            if(!action.payload){
                state.task = null;
            }
        },
        setTask(state, action: PayloadAction<Task | null>) {
            state.task = action.payload;
            if (action.payload) {
                state.showDialog = true
            }
        }
    },
    extraReducers: (builder) => {
        builder
            // Get All Tasks
            .addCase(fetchTasks.pending, (state) => {
                state.operation = "list";
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
                state.tasks = action.payload;
                state.operation = ""
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.operation = ""
                state.error = action.error.message || 'Failed to fetch tasks';
            })

            // Create Tasks
            .addCase(createTask.pending, (state) => {
                state.error = null;
            })
            .addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
                state.showDialog = false
                state.tasks.push(action.payload);
                state.task = null;
            })
            .addCase(createTask.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to create tasks';
            })

            // Update Task
            .addCase(updateTask.pending, (state) => {
                state.error = null;
            })
            .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
                state.showDialog = false
                const index = state.tasks.findIndex((task) => task.id === action.payload.id);
                if (index !== -1) {
                    state.tasks[index] = action.payload;
                }
                state.task = null;
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to update tasks';
            })

            // Delete Task
            .addCase(deleteTask.pending, (state) => {
                state.operation = "delete";
                state.error = null;
            })
            .addCase(deleteTask.fulfilled, (state, action: PayloadAction<number>) => {
                state.tasks = state.tasks.filter((task) => task.id !== action.payload);
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.operation = "";
                state.error = action.error.message || 'Failed to delete task';
            });
    },
});
export const { setShowDialog, setTask} = taskSlice.actions

export default taskSlice.reducer;