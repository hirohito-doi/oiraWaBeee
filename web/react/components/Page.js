import React from 'react';
import Calendar from './Calendar/Calendar';

// const useStyles = makeStyles(theme => ({
//   root: {
//     display: 'flex',
//   },
//   appBar: {
//     zIndex: theme.zIndex.drawer + 1,
//   },
//   content: {
//     flexGrow: 1,
//     padding: theme.spacing(3),
//   },
// }));

const Page = () => {
  // const classes = useStyles();

  return (
    <div className="landing-page">
      <main className="page-content">
        <div className="main-content">
          <Calendar />
        </div>
      </main>
    </div>
  )
}

export default Page;