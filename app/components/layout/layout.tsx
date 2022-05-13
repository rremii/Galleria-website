import Head from 'next/head';
import React, {FC} from 'react';
import Header from "../ui/Header";

type LayoutType = {
    children: React.ReactNode
}

const Layout: FC<LayoutType> = ({children}) => {

    return <>
        <Head>
            <title>Galleria</title>
        </Head>
        <Header/>
        {children}
    </>
};
export default Layout;
