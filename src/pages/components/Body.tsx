import Frame from './Frame'
import Header from './Header'
import Footer from './Footer'
function Body({ children }) {
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
