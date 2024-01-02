import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Button from '@mui/material/Button';
import { Stack, Popover } from '@mui/material';
// import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

export default function CreateUserDialog({ open, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const accountType = 'Employer';
  const role = 'User';
  const [contact, setContact] = useState('');
  const [location, setLocation] = useState('');
  const [profileUrl, setProfileURL] = useState('');
  const [about, setAbout] = useState('');
  const status = 'Active';

  const handleCreateUser = async () => {
    // Validate input fields if needed
    const userData = {
      name,
      email,
      password,
      contact,
      location,
      profileUrl,
      about,
      status,
      role,
      accountType,
    };

    try {
      const response = await fetch('http://localhost:6600/admin/register/company', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        // Assuming your API returns user data and token upon successful registration
        // onCreateUser(data.user, data.token);
        console.log(data.user);
        console.log(data.token);
        alert('Company created');
        onClose();
      } else {
        console.error('Failed to create user:', response.status);
        // Handle error cases
      }
    } catch (error) {
      console.error('Error during user creation:', error);
      // Handle error cases
    }

    // onCreateUser({ email, password });

    // Close the dialog
    onClose();
  };

  return (
    <Popover
      open={open}
      close={onClose}
      anchorOrigin={{
        vertical: 'center',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'center',
        horizontal: 'right',
      }}
      PaperProps={{
        sx: {
          width: 900, // Set the desired width
        },
      }}
    >
      <DialogTitle>Create New Employer</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <TextField
            label="Name"
            type="name"
            fullwidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="text"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField label="Account Type" type="accountType" fullWidth value={accountType} />
          <TextField label="Role" type="role" fullWidth value={role} />
          <TextField
            label="Contact"
            type="contact"
            fullWidth
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
          <TextField
            label="Location"
            type="location"
            fullWidth
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <TextField
            label="Profile URL"
            type="profileURL"
            fullWidth
            value={profileUrl}
            onChange={(e) => setProfileURL(e.target.value)}
          />
          <TextField
            label="About"
            type="about"
            fullWidth
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
          <TextField label="Status" type="status" value={status} />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleCreateUser} color="primary">
          Create Employer
        </Button>
      </DialogActions>
    </Popover>
  );
}
CreateUserDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
