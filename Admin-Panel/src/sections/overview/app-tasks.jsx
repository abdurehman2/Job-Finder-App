import { useState } from 'react';
import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
// import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import FormControlLabel from '@mui/material/FormControlLabel';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function AnalyticsTasks({ title, subheader, list, ...other }) {
  const [selected, setSelected] = useState(['2']);
  const [isCreateTaskOpen, setCreateTaskOpen] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');

  const handleClickComplete = (taskId) => {
    const tasksCompleted = selected.includes(taskId)
      ? selected.filter((value) => value !== taskId)
      : [...selected, taskId];

    setSelected(tasksCompleted);
  };

  const handleOpenCreateTask = () => {
    setCreateTaskOpen(true);
  };

  const handleCloseCreateTask = () => {
    setCreateTaskOpen(false);
    setNewTaskName(''); // Clear the input field
  };

  const handleCreateTask = () => {
    // Perform logic to create the new task
    const newTask = {
      id: String(Date.now()), // You can generate a unique ID
      name: newTaskName,
    };

    // Update the task list
    // You may want to use a state management library for more complex scenarios
    list.push(newTask);

    // Close the popover and clear the input field
    handleCloseCreateTask();
  };

  return (
    <>
      <Card {...other}>
        <CardHeader
          title={title}
          subheader={subheader}
          action={
            <IconButton onClick={handleOpenCreateTask}>
              <Iconify icon="eva:plus-fill" />
            </IconButton>
          }
        />

        {list.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            checked={selected.includes(task.id)}
            onChange={() => handleClickComplete(task.id)}
          />
        ))}
      </Card>

      <Popover
        open={isCreateTaskOpen}
        anchorEl={null}
        onClose={handleCloseCreateTask}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Stack p={2} spacing={2}>
          <TextField
            fullWidth
            label="New Task"
            variant="outlined"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
          />
          <Button fullWidth variant="contained" onClick={handleCreateTask}>
            Create
          </Button>
        </Stack>
      </Popover>
    </>
  );
}

AnalyticsTasks.propTypes = {
  list: PropTypes.array,
  subheader: PropTypes.string,
  title: PropTypes.string,
};

// ----------------------------------------------------------------------

function TaskItem({ task, checked, onChange }) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      mb={3}
      sx={{
        pl: 2,
        pr: 1,
        py: 1,
        '&:not(:last-of-type)': {
          borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
        },
        ...(checked && {
          color: 'text.disabled',
          textDecoration: 'line-through',
        }),
      }}
    >
      <FormControlLabel
        control={<Checkbox checked={checked} onChange={onChange} />}
        label={task.name}
        sx={{ flexGrow: 1, m: 0 }}
      />
    </Stack>
  );
}

TaskItem.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  task: PropTypes.object,
};
