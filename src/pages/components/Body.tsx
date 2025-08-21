import Frame from './Frame'
import Header from './Header'
import Footer from './Footer'
import {ReactNode} from 'react'
function Body({ children } : { children: ReactNode }) {
    return (
        <>
            <div className="body relative" id="mainBody">
                <Header></Header>
                {children}
                <Footer></Footer>
            </div>
        </>
    )

}
export default Body
