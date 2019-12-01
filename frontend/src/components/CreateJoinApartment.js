import React, { Component } from "react";
import { Card, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./GroupCard.css";
import NavbarLogo from "./NavLogo";
import { withRouter } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;

class CreateJoinApartment extends Component {
  constructor(props) {
    super(props);

    this.onChangeCode = this.onChangeCode.bind(this);

    this.state = {
      user: "",
      code: ""
    };

    this.onChangeCode = this.onChangeCode.bind(this);
    this.onSubmitCreate = this.onSubmitCreate.bind(this);
    this.onSubmitJoin = this.onSubmitJoin.bind(this);
  }

  // for create
  onSubmitCreate(e) {
    axios
      .get("http://localhost:4000/apartment/create")
      .then(res => {
        console.log(res);
        if (res.data == "Success") {
          this.props.history.push("/home");
        } else {
          this.props.history.push("/join");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  // for join
  onSubmitJoin(e) {
    axios
      .post("http://localhost:4000/apartment/join", this.state)
      .then(res => {
        if (res.data == "Success") {
          this.props.history.push("/home");
        } else {
          this.props.history.push("/join");
        }
      })
      .catch(function(error) {
        console.log(error);
      });

    console.log(this.state.code);
  }

  onChangeCode(e) {
    this.setState({ code: e.target.value });
    console.log(this.state.code);
  }

  render() {
    return (
      <div
        style={{ display: "flex", flexDirection: "column", height: "100vh" }}
      >
        <NavbarLogo />
        <Container
          style={{
            height: "55%",
            width: "60%",
            margin: "0px, 15px",
            marginTop: "100px",
            align: "center"
          }}
        >
          <Card className="group-code-card" style={{ margin: "auto" }}>
            <Card.Body className="group-code-body">
              <Card.Title className="group-title" style={{ fontSize: "30px" }}>
                Group Code:
              </Card.Title>
              <div style={{ paddingTop: "2px", paddingBottom: "10px" }}>
                <form className="group-form">
                  <input
                    type="group-code-text"
                    name="group-code"
                    placeholder="ABC123"
                    onChange={this.onChangeCode}
                  />
                </form>
              </div>
              <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                <Button
                  className="group-button1"
                  onClick={() => this.onSubmitJoin()}
                >
                  Join Group
                </Button>
              </div>
              <Card.Text className="group-text">or</Card.Text>
              <div style={{ paddingBottom: "10px" }}>
                <Button
                  className="group-button2"
                  onClick={() => this.onSubmitCreate()}
                >
                  Create Group
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}
export default withRouter(CreateJoinApartment);