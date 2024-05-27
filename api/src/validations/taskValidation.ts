import * as yup from 'yup';

export const taskValidationSchema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().optional(),
  status: yup.mixed().oneOf(['To Do', 'In Progress', 'Done']).required('Status is required'),
});
