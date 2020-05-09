import * as React from "react";

import { FormName } from "./lovers/FormName";

type Props = {
  loversData: (ids: object) => void;
}

export const Default: React.FunctionComponent<Props> = (props) => {

    return <>
    <section className="lovers">
      <div className="container is-fluid has-text-centered">
          <h1>EmojiLovers</h1>
          <h4>What lovers first name?</h4>
          <FormName loversData={props.loversData} />
      </div>
    </section>
    </>
}