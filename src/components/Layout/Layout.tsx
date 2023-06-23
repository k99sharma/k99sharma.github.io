// importing components
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

// importing type
import { ReactNode } from "react";

// prop type
type LayoutProp = {
    children: ReactNode
}

// layout function
export default function Layout({ children }: LayoutProp){
    return(
        <div className="layout flex justify-center items-center bg-red-500">
            <div className="w-full sm:w-3/6 bg-yellow-600 p-5">
                <div className="layout__navbar mb-10">
                    <Navbar />
                </div>
                {
                    children
                }
                <div className="layout__footer">
                    <Footer />
                </div>
            </div>
        </div>
    )
}