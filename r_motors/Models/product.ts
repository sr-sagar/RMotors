import mongoose , { Document,Schema,Model } from "mongoose";
interface IProduct extends Document {
    productTitle: string,
    productDescription: string,
    productPrice: string,
    productImgURL: string[], 
}
const productSchema = new Schema<IProduct>({
    productTitle: {
        type: String,
        required: true,
    },
    productDescription: {
        type: String,
        required: true,
    },
    productPrice: {
        type: String,
        required: true,
    },
    productImgURL: {
        type: [String],
        required: true,
    },
},{timestamps: true})


const ProductModel:Model<IProduct> = mongoose.models.Products || mongoose.model<IProduct>('Products', productSchema);

export default ProductModel;