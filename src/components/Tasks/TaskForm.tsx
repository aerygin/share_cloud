import { SetStateAction, useCallback, useState } from 'react';
import { ITask } from '../../types';
import moment from 'moment';
import '../../styles/taskForm.css';
import Flex from '../Core/UI/Flex';
import Button from '../Core/UI/Button';
import Spacer from '../Core/UI/Spacer';
import useTaskForm from '../../hooks/useTaskForm';

const TaskForm = ({
  task,
  setTasks,
  afterSubmit,
}: {
  setTasks: React.Dispatch<SetStateAction<ITask[]>>;
  task?: ITask;
  afterSubmit?: () => void;
}) => {
  const [formData, setFormData] = useState({
    name: task?.name ?? '',
    description: task?.description ?? '',
    start: task?.start
      ? moment(task?.start).format('YYYY-MM-DD').toString()
      : '',
    end: task?.end ? moment(task?.end).format('YYYY-MM-DD').toString() : '',
  });

  const { validateForm, errors } = useTaskForm({ formData });

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    },
    [formData]
  );

  const handleSumbit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const isValid = validateForm();

      if (isValid) {
        const baseFormData = {
          ...formData,
          start: moment(formData.start).startOf('day').toDate(),
          end: moment(formData.end).endOf('day').toDate(),
        };
        if (task?.id) {
          setTasks((prev) => {
            return prev.map((t) => {
              if (t.id === task.id) {
                return { ...baseFormData, id: task.id };
              }
              return t;
            });
          });
        } else {
          const id = new Date().valueOf();
          setTasks((prev) => {
            prev.push({ ...baseFormData, id });
            return prev;
          });
        }
        afterSubmit && afterSubmit();
      }
    },
    [formData, validateForm, setTasks, task?.id, afterSubmit]
  );

  const handleDelete = useCallback(() => {
    setTasks((prev) => {
      const filtered = prev.filter((t) => t.id !== task?.id);
      return filtered;
    });
    afterSubmit && afterSubmit();
  }, [task?.id, setTasks, afterSubmit]);

  return (
    <form onSubmit={handleSumbit}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <Flex sx={{ flexDirection: 'column' }}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            autoComplete="off"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <>{errors.name && <div className="error">{errors.name}</div>}</>
        </Flex>
        <Flex sx={{ flexDirection: 'column' }}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </Flex>
        <Flex sx={{ flexDirection: 'column' }}>
          <label htmlFor="startAt">Start Date</label>
          <input
            type="date"
            id="start"
            name="start"
            value={formData.start}
            onChange={handleChange}
          />
          <>{errors.start && <div className="error">{errors.start}</div>}</>
        </Flex>
        <Flex sx={{ flexDirection: 'column' }}>
          <label htmlFor="endAt">End Date</label>
          <input
            type="date"
            id="end"
            name="end"
            value={formData.end}
            onChange={handleChange}
          />
          <> {errors.end && <div className="error">{errors.end}</div>}</>
        </Flex>
        <Spacer />
        <Flex>
          <Button sx={{ width: '100%' }} type="submit">
            Save
          </Button>
          {!!task?.id ? (
            <Button
              onClick={handleDelete}
              sx={{ width: '100%', backgroundColor: 'red' }}
            >
              Delete
            </Button>
          ) : null}
        </Flex>
      </div>
    </form>
  );
};

export default TaskForm;
