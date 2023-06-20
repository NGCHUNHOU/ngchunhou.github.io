import Frame from './Frame'
import Header from './Header'
import Footer from './Footer'
function Body() {
    return (
        <>
            <div className="body relative" id="mainBody">
                <Header></Header>
                <Frame></Frame>
                <Footer></Footer>
            </div>
        </>
    )

}
export default Body