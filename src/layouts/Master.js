import {Card, Col, Container, Row} from "react-bootstrap";
import AppNavbar from "./Navbar/AppNavbar";
import {Outlet} from "react-router-dom";

function Master() {
    return (
        <Container fluid>

            <Row className="justify-content-md-center">
                <Col>
                    <Card>
                        <Card.Body>
                            <AppNavbar/>
                            <Outlet/>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        </Container>
    );
}

export default Master;