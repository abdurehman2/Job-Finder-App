import PropTypes from 'prop-types';
import React, { useState } from 'react';

import Button from '@mui/material/Button';
import { Stack, Popover } from '@mui/material';
// import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import { useAuth } from 'src/context/AuthContext';

export default function EditUserDialog({ open, onClose, user }) {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.decodedPassword);
  const accountType = 'Seeker';
  const role = 'User';
  const [contact, setContact] = useState(user.contact);
  const [location, setLocation] = useState(user.location);
  const [profileURL, setProfileURL] = useState(user.profileUrl);
  const [cvURL, setCVURL] = useState(user.cvUrl);
  const [jobTitle, setJobTitle] = useState(user.jobTitle);
  const [about, setAbout] = useState(user.about);
  const [status, setStatus] = useState(user.status);
  const { token } = useAuth();

  const handleEditUser = async () => {
    // Validate input fields if needed
    const userData = {
      firstName,
      lastName,
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
      const response = await fetch(`http://localhost:6600/admin/users/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        // Assuming your API returns user data and token upon successful registration
        // onCreateUser(data.user, data.token);
        console.log(data.user);
        console.log(data.token);
        alert('Updated Successfully!');
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
      const response = await fetch(`http://localhost:6600/admin/users/${user._id}/block`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
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
      const response = await fetch(`http://localhost:6600/admin/users/${user._id}/unblock`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
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
      <DialogTitle>Edit User</DialogTitle>
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
          Update User
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
