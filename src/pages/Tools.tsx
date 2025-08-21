import Home from './index'
import topBarItems from '@/data/headerItems'
import Layout from './components/Layout'

function Tools() {
    return (
      <Layout pageName={topBarItems[1].pageTitle}>
          <div>child from Tools</div>
      </Layout>
    )

}
export default Tools
