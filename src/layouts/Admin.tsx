import React from 'react';
import { Route, Switch } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import { AdminNavbar } from "../components/Navbars/AdminNavbar";
import { AdminFooter } from "../components/Footers/AdminFooter";
import { Sidebar } from "../components/Sidebar/Sidebar";

import routes from "../routes";

const getRoutes = (routes: any) => {
    return routes.map((prop: any, key: any) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path: any, location: any) => {
    for (let i = 0; i < routes.length; i++) {
      if (
        location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };

export const AdminLayout: React.FC<any> = (props) => {
    return(
        <>
        <Sidebar
          {...props}
          routes={routes}
          logo={{
            innerLink: "/admin/index",
            imgSrc: require("assets/img/brand/argon-react.png"),
            imgAlt: "..."
          }}
        />
        <div className="main-content" ref="mainContent">
          <AdminNavbar
            {...props}
            brandText={getBrandText(props.location.pathname, props.location)}
          />
          <Switch>{getRoutes(routes)}</Switch>
          <Container fluid>
            <AdminFooter />
          </Container>
        </div>
      </>
    );
}
