import { Helmet } from "react-helmet";
import AppBanner from "../appBanner/AppBanner";

import ComicsList from "../comicsList/ComicsList";
import { Outlet, useOutlet } from "react-router-dom";

const ComicsPage = () => {
    const outLet = useOutlet();

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Page with list of comics"
                />
                <title>Comics page</title>
            </Helmet>
            {
                outLet?<><Outlet/></>: <><AppBanner/><ComicsList/></>
            }
        </>
    )
}

export default ComicsPage;