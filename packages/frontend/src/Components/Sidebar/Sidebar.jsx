import React from 'react';

import {
  Nav,
  NavItem,
  Button
} from 'reactstrap';

import {NavLink} from 'react-router-dom';

import classnames from 'classnames';

const menuItems = [
  {
    id: "compose",
    iconClass: "cui-pencil",
    label: "Compose",
    handler: (props) => {
        props.showComposer()
    }
  },
  {
    id: "inbox",
    iconClass: "cui-inbox",
    label: "Inbox",
    href: "inbox"
  },
  {
    id: "contacts",
    iconClass: "fa fa-address-book-o",
    label: "Contacts",
    href: "contacts"
  },
]

const buildMenuItem = (props, match, location, m, i) => {

  const {
    label,
    iconClass,
    iconImage,
    href,
    handler,
    id
  } = m;
  let classes = classnames("d-inline-flex",
                           "flex-column",
                           "sidebar-icon-color",
                           "justify-content-start",
                           "sidebar-background-color");

  let navLink = null;

  let url = `${match.url}/${href}`;
  let active = href?location.pathname.startsWith(url):false;
  let nohover = false;

  if(handler)  {
    nohover = true;
    navLink = (
      <Button size="sm" onClick={()=>handler(props)}>
        {
          iconImage &&
            <div className={classes}>
              <img className="img-icon d-inline" alt={id} src={iconImage} />
              <span className="nav-item-label">{label}</span>
            </div>
        }
        {
          !iconImage &&
            <div className={classes}>
              <i className={classnames("icon", iconClass)} />
              <span className="nav-item-label">{label}</span>
            </div>
        }
      </Button>
    );
  } else if(iconImage) {
     navLink = (
        <NavLink to={url} >
          <div className={classes}>
            <img className="img-icon d-inline" alt={id} src={iconImage} />
            <span className="nav-item-label">{label}</span>
          </div>
        </NavLink>
    );
  } else {
    navLink = (
      <NavLink to={url} >
        <div className={classes}>
          <i className={classnames("icon", iconClass)} />
          <span className="nav-item-label">{label}</span>
        </div>
      </NavLink>
    );
  }

  return (
    <NavItem key={i} className={classnames({nohover: nohover, active: active})}>
      {navLink}
    </NavItem>
  );
}

export default class Sidebar extends React.Component {

  render() {
    const {match, location, isSub} = this.props;

    let navClasses = classnames("col-md-1",
                                "d-md-block",
                                "pt-0",
                                "justify-content-start",
                                "align-items-start",
                                "sidebar",
                                "sidebar-background-color",
                                {sub: isSub})
    return (
      <div className={navClasses}>
        <div >
          <Nav vertical className="border flex-column" style={{
  position: 'sticky'}}>

            {
              menuItems.map((m,i)=>{
                return buildMenuItem(this.props, match, location, m, i)
              })
            }
          </Nav>
      </div>
    </div>
    )
  }

}
