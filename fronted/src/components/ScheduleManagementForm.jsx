import React, { Component } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box
} from '@mui/material';

class ScheduleManagementForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      starttime: '',
      endtime: '',
      breaktime: '',
      day: ''
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { id, starttime, endtime, breaktime, day } = this.state;

    fetch("http://localhost:3001/createSchedule", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, starttime, endtime, breaktime, day })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Schedule created successfully!');
      } else {
        alert('Error creating schedule');
      }
    })
    .catch(error => {
      console.error('Error creating schedule:', error);
      alert('Error creating schedule');
    });
  };

  render() {
    return (
      <Container>
        <Typography variant="h4">Create Schedule</Typography>
        <form onSubmit={this.handleSubmit}>
          <TextField
            label="Schedule ID"
            name="id"
            value={this.state.id}
            onChange={this.handleChange}
            margin="normal"
            fullWidth
            required
          />
          <TextField
            label="Start Time"
            name="starttime"
            value={this.state.starttime}
            onChange={this.handleChange}
            margin="normal"
            fullWidth
            required
          />
          <TextField
            label="End Time"
            name="endtime"
            value={this.state.endtime}
            onChange={this.handleChange}
            margin="normal"
            fullWidth
            required
          />
          <TextField
            label="Break Time"
            name="breaktime"
            value={this.state.breaktime}
            onChange={this.handleChange}
            margin="normal"
            fullWidth
            required
          />
          <TextField
            label="Day"
            name="day"
            value={this.state.day}
            onChange={this.handleChange}
            margin="normal"
            fullWidth
            required
          />
          <Box mt={2}>
            <Button type="submit" variant="contained" color="primary">
              Create Schedule
            </Button>
          </Box>
        </form>
      </Container>
    );
  }
}

export default ScheduleManagementForm;
