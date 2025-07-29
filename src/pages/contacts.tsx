import Home from './index'
import topBarItems from '@/data/headerItems'
import Layout from './components/layout'

function contacts() {
    return (
      <Layout pageName={topBarItems[2].pageTitle}>
        <div>child from contacts</div>
      </Layout>
    )

}
export default contacts
