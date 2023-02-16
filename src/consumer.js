const express = require("express");
const { RPCObserver, RPCRequest } = require("./rpc");

const app = express();
app.use(express.json());

const PORT = 9000;

const fakeCustomerResponse = {
  _id: "yt345njh543jf35435",
  name: "Mike",
  country: "Poland",
};

RPCObserver("CUSTOMER_RPC", fakeCustomerResponse);

app.get("/wishlist", async (req, res) => {
  const requestPayload = {
    productId: "yt345njh543jf3543895",
  };

  try {
    const responseData = await RPCRequest("PRODUCT_RPC", requestPayload);
    console.log({ responseData });
    return res.status(200).json({ result: responseData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "no data found" });
  }
});

app.get("/", async (req, res) => {
  return res.json({ msg: "Customer Service" });
});

app.listen(PORT, () => {
  console.log(`Customer is running on ${PORT}`);
});
