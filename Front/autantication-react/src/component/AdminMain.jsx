import React from "react";
import { Link } from "react-router-dom";

// bootstrap
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const AdminMain = () => {
  return (
    <div>
      <Container style={{ minHeight: "85vh" }}>
        <Row xs={1} sm={2} md={4} className="g-4">
          <Col>
            <Card key="dashboard">
              <Card.Img
                variant="top"
                src="/images/admin-02.jpg"
                alt="admin dashboard"
              />
              <Card.Body>
                <Card.Title className="adminCard">
                  Dash Board Management
                </Card.Title>
                <div className="actionButton">
                  <Button
                    style={{
                      backgroundColor: "#fb485c",
                      border: "1px solid #fb485c",
                    }}
                  >
                    <Link to="manage-vacations">Go Manage</Link>
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card key="reports">
              <Card.Img
                variant="top"
                src="/images/admin-01.jpg"
                alt="admin reports"
              />
              <Card.Body>
                <Card.Title className="adminCard">Reports</Card.Title>
                <div className="actionButton">
                  <Button
                    style={{
                      backgroundColor: "#fb485c",
                      border: "1px solid #fb485c",
                    }}
                  >
                    <Link to="reports">Go Analyst</Link>
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AdminMain;
