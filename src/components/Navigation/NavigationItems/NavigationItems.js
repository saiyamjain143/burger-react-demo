import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";
import "./NavigationItems.css";

const navigationItems = (props) => (
  <ul className="NavigationItems">
    <NavigationItem link="/" exact>
      Burger Builder
    </NavigationItem>
    {props.isAuthenticated ? (
      <NavigationItem link="/orders">Orders</NavigationItem>
    ) : null}
    {/* <NavigationItem link="/checkout">Checkout</NavigationItem> */}
    {props.isAuthenticated ? (
      <NavigationItem link="/logout">Log Out</NavigationItem>
    ) : (
      <NavigationItem link="/auth">Log In</NavigationItem>
    )}
  </ul>
);

export default navigationItems;
