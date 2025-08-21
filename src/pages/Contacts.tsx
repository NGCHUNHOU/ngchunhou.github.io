import Home from './index'
import topBarItems from '@/data/headerItems'
import Layout from './components/Layout'

function Contacts() {
    return (
      <Layout pageName={topBarItems[2].pageTitle}>
        <div>child from Contacts</div>
      </Layout>
    )

}
export default Contacts
