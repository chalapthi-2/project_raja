import mongoose from 'mongoose';

const serviceSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  pricing: {
    Hatchback: { type: Number, required: true },
    Sedan: { type: Number, required: true },
    SUV: { type: Number, required: true },
    MUV: { type: Number, required: true },
    Luxury: { type: Number, required: true },
  },
}, { timestamps: true });

const Service = mongoose.model('Service', serviceSchema);

export default Service;
