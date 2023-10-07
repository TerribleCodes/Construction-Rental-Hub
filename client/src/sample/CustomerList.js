import React from "react";
import axios from "axios";

const CustomerList = (props) => {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    axios("http://localhost:5000/customers")
      .then((response) => {
        if (response.status === 200) {
          setData(response.data.rows);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);
  return <div>CustomerList component</div>;
};

export default CustomerList;
