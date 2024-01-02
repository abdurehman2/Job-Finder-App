import { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { useAuth } from 'src/context/AuthContext';

import AppTasks from '../app-tasks';
import AppCurrentVisits from '../app-current-visits';
import AppWidgetSummary from '../app-widget-summary';

// ----------------------------------------------------------------------

export default function AppView() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalUsersThisMonth, setTotalUsersThisMonth] = useState(0);
  const [totalCompanies, setTotalCompanies] = useState(0);
  const [totalCompaniesThisMonth, setTotalCompaniesThisMonth] = useState(0);
  const [totalJobs, setTotalJobs] = useState(0);
  const { token } = useAuth();

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response = await fetch('http://localhost:6600/admin/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const users = await response.json();
          setTotalUsers(users.length);
          const currentDate = new Date();
          const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
          const usersThisMonth = users.filter((user) => new Date(user.createdAt) >= startOfMonth);
          setTotalUsersThisMonth(usersThisMonth.length);
        } else {
          console.error('Failed to fetch total users');
        }
      } catch (error) {
        console.error('Error fetching total users:', error);
      }
    };

    const fetchTotalCompanies = async () => {
      try {
        const response = await fetch('http://localhost:6600/admin/company', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const companies = await response.json();
          setTotalCompanies(companies.length);
          const currentDate = new Date();
          const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
          const companiesThisMonth = companies.filter(
            (company) => new Date(company.createdAt) >= startOfMonth
          );

          setTotalCompaniesThisMonth(companiesThisMonth.length);
        } else {
          console.error('Failed to fetch total companies');
        }
      } catch (error) {
        console.error('Error fetching total companies:', error);
      }
    };

    const fetchTotalJobs = async () => {
      try {
        const response = await fetch('http://localhost:6600/admin/jobs', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const jobs = await response.json();
          setTotalJobs(jobs.length);
        } else {
          console.error('Failed to fetch total companies');
        }
      } catch (error) {
        console.error('Error fetching total companies:', error);
      }
    };

    fetchTotalUsers();
    fetchTotalCompanies();
    fetchTotalJobs();
  }, [token]);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="New Users This Month"
            total={
              totalUsersThisMonth + totalCompaniesThisMonth > 0
                ? totalUsersThisMonth + totalCompaniesThisMonth
                : '0'
            }
            color="success"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Total Users"
            total={totalUsers + totalCompanies}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Jobs Posted"
            total={totalJobs > 0 ? totalJobs : '0'}
            color="error"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppTasks
            title="Tasks"
            list={
              [
                // { id: '1', name: 'Create FireStone Logo' },
                // { id: '2', name: 'Add SCSS and JS files if required' },
                // { id: '3', name: 'Stakeholder Meeting' },
                // { id: '4', name: 'Scoping & Estimations' },
                // { id: '5', name: 'Sprint Showcase' },
              ]
            }
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentVisits
            title="User Account Division"
            chart={{
              series: [
                { label: 'Companies', value: totalCompanies },
                { label: 'Users', value: totalUsers },
              ],
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
