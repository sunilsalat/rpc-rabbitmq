const express = require("express");
const { RPCRequest, RPCObserver } = require("./rpc");

const app = express();
app.use(express.json());

const PORT = 8000;

const fakeProductResponse = {
  _id: "yt345njh543jf3543895",
  title: "phone",
  price: 600,
};

RPCObserver("PRODUCT_RPC", fakeProductResponse);

app.get("/customer", async (req, res) => {
  const requestPayload = {
    customerId: "yt345njh543jf3543895",
  };

  try {
    const responseData = await RPCRequest("CUSTOMER_RPC", requestPayload);
    console.log({ responseData });
    return res.status(200).json({ result: responseData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "no data found" });
  }
});

app.get("/", async (req, res) => {
  return res.json({ msg: "product Service" });
});

app.listen(PORT, () => {
  console.log(`Product is running on ${PORT}`);
});
