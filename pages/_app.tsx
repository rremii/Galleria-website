import type {AppProps} from 'next/app'
import Layout from '../app/components/layout/layout'
import './../styles/style.scss'
import {store} from "../app/store/ReduxStore";
import {Provider} from "react-redux";

function App({Component, pageProps}: AppProps) {
    return (
        <Provider store={store}>
            <div className="MainWrapper">
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </div>
        </Provider>
    )
}

export default App
