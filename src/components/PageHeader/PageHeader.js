import { Helmet } from "react-helmet";

const PageHeader = (props) => {
    return (
        <div className="application">
            <Helmet>
                <meta charSet="utf-8" />
                <title>{props.title}</title>
            </Helmet>
            ...
        </div>
    );
};

export default PageHeader;
