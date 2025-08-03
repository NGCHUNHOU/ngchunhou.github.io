import Frame from './Frame'
import Header from './Header'
import Footer from './Footer'
import Head from 'next/head'
function Layout({ pageName, children }) {
    return (
        <>
          <div className="body flex flex-col" id="mainBody">
            <Header></Header>
              <Head>
                <title>{`NG CHUN HOU | ${pageName}`}</title>
                <meta name="description" content="my portfolio site" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
              </Head>
              <div className="flex-grow w-full h-[calc(100%-56px-52px)]">
                {children}
              </div>
            <Footer></Footer>
          </div>
        </>
    )

}
export default Layout
