import React, {Fragment} from 'react';

import {
  Navbar,
  Nav,
  NavLink,
  NavItem,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';



const navItems = [
  {
    button: "Get Started",
    href: "/app/signup"
  }
];

const buildNavItem = (props, item, idx) => {
  if(item.button) {
    return (
      <Button key={idx} color="warning" size="sm" onClick={
          e=>{
            window.location=item.href
          }
        }>
        <span className="button-text">{item.button}</span>
      </Button>
    );
  } else if(item.subs) {
    return (
      <UncontrolledDropdown key={idx} nav inNavbar>
        <DropdownToggle nav caret>
          {item.label}
        </DropdownToggle>
        <DropdownMenu right>
          {item.subs.map((m, i)=>{
            return (
              <DropdownItem key={i}>
                {m.label}
              </DropdownItem>
            )
          })}
        </DropdownMenu>
      </UncontrolledDropdown>
    )
  } else {
    if(item.exec) {
      return (
        <NavItem key={idx}>
          <NavLink href="#" onClick={props[item.exec]}>{item.label}</NavLink>
        </NavItem>
      )
    } else {
      return (
        <NavItem key={idx}>
          <NavLink href={item.href}>{item.label}</NavLink>
        </NavItem>
      )
    }

  }
}


export default class TopNav extends React.Component {

  render() {

    return (
      <Fragment>

        <Navbar dark  className="d-none d-md-flex top-nav">

              <Nav>
                {
                  navItems.map((m,i)=>{
                    return buildNavItem(this.props, m, i)
                  })
                }
              </Nav>

        </Navbar>



      </Fragment>

    )
  }


}
