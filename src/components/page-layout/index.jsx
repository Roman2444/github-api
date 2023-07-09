import React from 'react';
import classes from './PageLayout.module.css'

export default function PageLayout({head, footer, children}) {

  return (
    <div className={classes.pageLayout}>
      <div className={classes.head}>
        {head}
      </div>
      <div className={classes.center}>
        {children}
      </div>
      <div className={classes.footer}>
        {footer}
      </div>
    </div>
  );
}