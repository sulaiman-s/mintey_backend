const mongoose=require("mongoose");
const config=require("config")
mongoose.set('strictQuery', false);
mongoose.connect(config.get('DBCONFIG.connectionString'), {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Could not connect to MongoDB', err));
