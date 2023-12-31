import { Helmet } from 'react-helmet-async';

import { UserView } from 'src/sections/employer/view';

// ----------------------------------------------------------------------

export default function EmployerPage() {
  return (
    <>
      <Helmet>
        <title> Employer | Minimal UI </title>
      </Helmet>

      <UserView />
    </>
  );
}
