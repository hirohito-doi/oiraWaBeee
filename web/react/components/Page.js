import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Calendar from './organisms/Scheduler';

const Page = () => {
  return (
    <div className="landing-page">
      <CssBaseline />
      <main className="page-content">
        <div className="main-content">
          <Calendar />
        </div>
      </main>
    </div>
  )
}

export default Page;