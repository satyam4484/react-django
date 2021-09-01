import React, { Component, Fragment } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export default class App extends Component {
  state = {
    text: "",
    items: [],
  };

  //   on text input change
  handlechange = (e) => {
    this.setState({ text: e.target.value });
  };

  //   fetch all data when component loads
  componentDidMount = () => {
    fetch("http://127.0.0.1:8000/todo/getdata/")
      .then((response) => response.json())
      .then((data) => {
        let newval = [];
        data.forEach((element) => {
          newval.push(element);
        });
        this.setState({ items: newval });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // post request with the data provided
  adddata = (e) => {
    let requesturl = "http://127.0.0.1:8000/todo/getdata/";
    let data = JSON.stringify({ title: this.state.text });
    this.setState({ text: "" });

    fetch(requesturl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        let item = [...this.state.items, data];
        this.setState({ items: item, text: "" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //   delete post
  deletepost = (e) => {
    let url = `http://127.0.0.1:8000/todo/getdata/${e.target.id}/`;
    //   return;
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      //   body: data,
    }).catch((error) => {
      console.log(error);
    });
    let pr = e.target.parentNode.parentNode;
    pr.remove();
  };

  //   render method
  render() {
    return (
      <Fragment>
        <div className="container mt-2">
          <h1 className="text-center alert alert-danger fw-bold">
            Welcome to React- Django todo list
          </h1>
          <div className="row">
            {/* form to add data  */}
            <div className="col-sm-4">
              <h2 className="text-center alert alert-primary">Add your Data</h2>
              <label htmlFor="data" className="fw-bold  fs-2 mb-2">
                Enter Your task
              </label>
              <input
                type="text"
                className="form-control shadow-lg mt-2 fw-bold"
                onChange={this.handlechange}
                placeholder="Task......."
                value={this.state.text}
              />
              <button
                className="btn btn-success shadow-lg mt-2 text-center"
                onClick={this.adddata}
              >
                Add Data
              </button>
            </div>

            {/* data to be added dyanmically  */}
            <div className="col-sm-8">
              <h2 className="text-center alert alert-primary">Your Data </h2>
              <table className="table">
                <thead>
                  <tr class="shadow-lg mb-2">
                    <th className="col">Title</th>
                    <th className="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.items.map((element) => {
                    return (
                      <Fragment>
                        <tr className="shadow-lg mt-2 ">
                          <td className="fs-6 fw-bold">{element.title}</td>
                          <td>
                            <button
                              key={element.id}
                              id={element.id}
                              onClick={this.deletepost}
                              className="btn btn-danger mx-1 btn-sm"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      </Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
