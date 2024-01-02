import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Button from '@mui/material/Button';
import { Stack, Popover } from '@mui/material';
// import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

export default function EditUserDialog({ open, onClose, user }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.decodedPassword);
  const [accountType, setAccountType] = useState(user.accountType);
  const [role, setRole] = useState(user.role);
  const [contact, setContact] = useState(user.contact);
  const [location, setLocation] = useState(user.location);
  const [profileURL, setProfileURL] = useState(user.profileURL);
  const [about, setAbout] = useState(user.about);
  const [status, setStatus] = useState(user.status);

  const handleEditUser = async () => {
    // Validate input fields if needed
    const userData = {
      name,
      email,
      password,
      contact,
      location,
      profileURL,
      about,
      status,
      role,
      accountType,
    };

    try {
      const response = await fetch(`http://localhost:6600/admin/company/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        // const data = await response.json();
        // Assuming your API returns user data and token upon successful registration
        // onCreateUser(data.user, data.token);
        alert('Company Updated');
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

  const handleBlockUser = async () => {
    try {
      const response = await fetch(`http://localhost:6600/admin/company/${user._id}/block`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Assuming your API returns user data and token upon successful registration
        // onCreateUser(data.user, data.token)
        console.log(data);
        alert('User Blocked Successfully!');
        onClose();
      } else {
        console.error('Failed to block user:', response.status);
        // Handle error cases
      }
    } catch (error) {
      console.error('Error during user creation:', error);
    }
  };

  const handleUnblockUser = async () => {
    try {
      const response = await fetch(`http://localhost:6600/admin/company/${user._id}/unblock`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // Assuming your API returns user data and token upon successful registration
        // onCreateUser(data.user, data.token)
        console.log(data);
        alert('User Unblocked Successfully!');
        onClose();
      } else {
        console.error('Failed to block user:', response.status);
        // Handle error cases
      }
    } catch (error) {
      console.error('Error during user creation:', error);
    }
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
          <TextField
            label="Account Type"
            type="accountType"
            fullWidth
            value={accountType}
            onChange={(e) => setAccountType(e.target.value)}
          />
          <TextField
            label="Role"
            type="role"
            fullWidth
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
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
            label="About"
            type="about"
            fullWidth
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          />
          <TextField
            label="Status"
            type="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleEditUser} color="primary">
          Update Employer
        </Button>
        {user.status === 'Active' ? (
          <Button onClick={handleBlockUser} color="error">
            Block User
          </Button>
        ) : (
          <Button onClick={handleUnblockUser} color="error">
            Unblock User
          </Button>
        )}
      </DialogActions>
    </Popover>
  );
}
EditUserDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.any,
};
