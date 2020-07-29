import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import "./ContactData.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components//UI/Spinner/Spinner";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      pinCode: "",
    },
    loading: false,
  };

  orderhandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    axios
      .post("/orders.json", {
        ingredients: this.props.ingredients,
        price: this.props.price,
        customer: {
          name: "Saiyam",
          address: {
            address1: "Near the Jain temple",
            address2: "At and Post Gholvad",
            pincode: 401702,
            city: "Gholvad",
            state: "Maharashtra",
            country: "India",
          },
          email: " saiyamjain143@gmail.com",
          phoneNo: "+917276891706",
        },
        deliveryMethod: "faster",
      })
      .then((response) => {
        this.setState({ loading: false });
        this.props.history.push("/");
      })
      .catch((error) => {
        this.setState({ loading: false });
      });
  };

  render() {
    let form = (
      <form>
        <input
          className="Input"
          type="text"
          placeholder="Your Name"
          name="name"
        />
        <input
          className="Input"
          type="text"
          placeholder="Your email"
          name="email"
        />
        <input
          className="Input"
          type="text"
          placeholder="Your street"
          name="street"
        />
        <input
          className="Input"
          type="text"
          placeholder="Your pin code"
          name="pin code"
        />
        <Button clicked={this.orderhandler} btnType="Success">
          ORDER
        </Button>
      </form>
    );

    if (this.state.loading) form = <Spinner />;

    return (
      <div className="ContactData">
        <h4>Enter your contact data: </h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
