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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const accountType = 'Seeker';
  const role = 'User';
  const [contact, setContact] = useState('');
  const [location, setLocation] = useState('');
  const [profileURL, setProfileURL] = useState('');
  const [cvURL, setCVURL] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [about, setAbout] = useState('');
  const status = 'Active';

  const handleCreateUser = async () => {
    // Validate input fields if needed
    const userData = {
      firstName,
      lastName,
      username,
      email,
      password,
      contact,
      location,
      profileURL,
      cvURL,
      jobTitle,
      about,
      status,
      role,
      accountType,
    };

    try {
      const response = await fetch('http://localhost:6600/admin/register/user', {
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
      <DialogTitle>Create New User</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <TextField
            label="First Name"
            type="name"
            fullwidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            label="Last Name"
            type="name"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            label="Username"
            type="username"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            type="password"
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
            value={profileURL}
            onChange={(e) => setProfileURL(e.target.value)}
          />
          <TextField
            label="CV URL"
            type="cvURL"
            fullWidth
            value={cvURL}
            onChange={(e) => setCVURL(e.target.value)}
          />
          <TextField
            label="Job Title"
            type="jobTitle"
            fullWidth
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
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
          Create User
        </Button>
      </DialogActions>
    </Popover>
  );
}
CreateUserDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
