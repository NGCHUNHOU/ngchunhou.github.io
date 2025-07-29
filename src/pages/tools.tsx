import Home from './index'
import topBarItems from '@/data/headerItems'
import Layout from './components/layout'

function tools() {
    return (
      <Layout pageName={topBarItems[1].pageTitle}>
          <div>child from tools</div>
      </Layout>
    )

}
export default tools
