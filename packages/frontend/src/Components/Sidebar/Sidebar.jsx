import React from 'react';

import {
  Nav,
  NavItem
} from 'reactstrap';

import {NavLink} from 'react-router-dom';

import classnames from 'classnames';

const menuItems = [
  {
    id: "inbox",
    iconClass: "cui-inbox",
    label: "Inbox",
    href: "inbox"
  },
  {
    id: "compose",
    iconClass: "cui-pencil",
    label: "Compose",
    href: "compose"
  },
  {
    id: "contacts",
    iconClass: "fa fa-address-book-o",
    label: "Contacts",
    href: "contacts"
  },
]

export default class Sidebar extends React.Component {

  render() {
    const {match, location, isSub} = this.props;

    let navClasses = classnames("col-md-1",
                                "d-none",
                                "d-md-block",
                                "bg-light",
                                "sidebar",
                                {sub: isSub})
    return (
      <div className={navClasses}>
        <div >
          <Nav vertical className="flex-column">

            {
              menuItems.map((m,i)=>{
                const {
                  label,
                  iconClass,
                  iconImage,
                  href,
                  id
                } = m;
                let classes = classnames("d-inline-flex",
                                         "flex-column",
                                         "justify-content-start");
                let url = `${match.url}/${href}`;
                let active = location.pathname.startsWith(url);

                if(iconImage) {
                  return (
                    <NavItem key={i} className={classnames({active: active})}>

                      <NavLink to={url} >
                        <div className={classes}>
                          <img className="img-icon d-inline" alt={id} src={iconImage} />
                          <span className="nav-item-label">{label}</span>
                        </div>
                      </NavLink>

                    </NavItem>
                  )
                } else {
                  return (
                    <NavItem key={i} className={classnames({active: active})}>
                      <NavLink to={url} >
                        <div className={classes}>
                          <i className={classnames("icon", iconClass)} />
                          <span className="nav-item-label">{label}</span>
                        </div>
                      </NavLink>
                    </NavItem>
                  )
                }

              })
            }






          </Nav>
      </div>
    </div>
    )
  }

}
