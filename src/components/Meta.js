import React from "react";
import { Helmet } from "react-helmet";
const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <title>{title}</title>
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome To OLX ",
  description: "Sell Your Products",
  keywords: "electronics,buy electronics,cheap electronics",
};
export default Meta;
