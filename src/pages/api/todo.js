import mongoose from "mongoose";

const uri =
  "mongodb+srv://msalman1221998:bsf1805004@cluster0.dvmf9te.mongodb.net/todo_app";

mongoose
  .connect(uri, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });
const ProductSchema = new mongoose.Schema({
  todo: {
    type: String,
    required: true,
  },
});

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

export default async function handler(req, res) {
  console.log(req.method)
  // console.log(req.method==="GET") 
  if (req.method === "POST") {
    try {
      let data = new Product(req.body);
      let result = await data.save();
      res.send(result);
      console.log("Successfully Create:", result);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  } else if (req.method === "GET") {
    try {
      let data = await Product.find();
      res.send(data);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }
  } else if ("/:_id",req.method === "DELETE") {
    try {
      const deletedData = await Product.findOneAndDelete({ _id: req.query.id });
      res.status(200).json(deletedData);
      console.log('Successfully Delete:', deletedData);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  } else if ("/:_id",req.method === "PATCH") {
    // debugger
    try {
      const prevProduct = await Product.findOne({ _id: req.query.id });
      await Product.updateOne({ _id: req.query.id }, { $set: req.body });
      const updatedProduct = await Product.findOne({
        _id: req.query.id,
      });
      res.send(updatedProduct);
      console.log(
        `Successfully Updated:\n Previous data:`,
        prevProduct,
        "\n Updated data:",
        updatedProduct
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server error");
    }    
  } else {
    res.status(400).send("Invalid request method");
  }
}
