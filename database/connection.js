const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/MeroPasal',{
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

