import Home from './index'
import topBarItems from '@/data/headerItems'
import Layout from './components/layout'

function personal_infos() {
    return (
      <Layout pageName={topBarItems[0].pageTitle}>
        <div>child from personal_infos</div>
      </Layout>
    )

}
export default personal_infos
